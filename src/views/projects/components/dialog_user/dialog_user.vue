<template>
    <!-- model-value 实现单向绑定 -->
    <el-dialog
    :model-value="dialogUserVisible"
    title="添加项目人员"
    :before-close="handleClose"
    @close="handleClose"
    append-to-body
    >
    <div style="display: flex; justify-content: center; font-weight: bold;">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next"
      :page-size="10"
      :total="currentTotal">
    </el-pagination>
    </div>
    <el-table
      :data="UserList"
      stripe
      style="width: 100%"
      ref="AddUsersTable"
      @selection-change="handleSelectionChange"
    >
    <el-table-column   v-for="(item,index) in useroptions" :key="index" :label="item.label" :prop="item.props">
    </el-table-column>
    <el-table-column  type="selection" label="选择" width="55">
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
// 为了处理父组件传来的数据
import {Plus} from '@element-plus/icons-vue'
import { defineEmits } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import {getUsers} from '@/api/projects'
import {useroptions} from './useroptions'


const store = useStore()
const AddUsersTable = ref([])

const handleSelectionChange = (val) => {
  this.AddUsersTable = val
  console.log(val)
}

// 从父组件传来的表单数据
const props = defineProps({
    projectId:{
        type:Number,
        default:()=>0,
    },
    dialogUserVisible:{
      type:Boolean,
      default:()=>false
    }
})

const projectId = ref()
const dialogUserVisible = ref()
projectId.value = props.projectId
dialogUserVisible.value = props.dialogUserVisible
console.log('projectId', projectId.value)
console.log('dialogUservisible', dialogUserVisible.value)
// 接收父组件传来的数据
const emits = defineEmits(['update:modelValue','initGetModules'])
const handleClose = () => {
    emits('update:modelValue', false)
}

// 控制添加人员
const newMember = ref([])
const formAdd = ref({
  projectId: projectId.value,
  members: newMember
})

const handleAdd = () => {
  for (let i = 0; i < this.AddUsersTable.length; i++) {
    const users = this.AddUsersTable[i]
    console.log(users)
    // this.$axios.post().then(res=>{}) 具体操作
  }
}

const formRef = ref(null)
// 使用formref.value.validate()进行表单验证
const handleConfirm = () => {
    formRef.value.validate(async (valid)=>{
        if (valid) {
          console.log('success submit')
          handleAdd()
          form.value.projectID = projectId.value
          const res = await handleAdd(form.value)
          emits('initGetUsers') // 重新刷新项目列表------------------------------------------需要更改
          handleClose()
        } else {
          console.log('error submit')
          return false
        }
    })
}

const form = ref({
  pageNum: 1,
  pageSize: 10,
  projectId: projectId.value
})

// 获得没有加入这个项目的人员列表
const tableDataUser = ref([])
const UserList = ref([])
let currentPage = 1
let currentTotal = 1
const initGetUsers = async() => {
  form.value.pageNum = currentPage
  tableDataUser.value = await getUsers(form.value)
  UserList.value = tableDataUser.value.records
  currentPage = tableDataUser.value.current
  currentTotal = tableDataUser.value.total
  console.log('初始化用户请求已经发送', typeof tableDataUser.value, tableDataUser.value.records)
  console.log(UserList.value)
}

// 人员列表翻页功能
const handleCurrentChange = (val) => {
  currentPage = val
  initGetUsers()
}

if(props.dialogUserVisible){
  initGetUsers()
}

</script>