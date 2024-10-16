<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="11">
      <el-select v-model="projectSelect" filterable placeholder="请选择" @change="initGetBugs">
        <el-option
          v-for="item in projectOptions"
          :key="item.projectId"
          :label="item.projectName"
          :value="item.projectId">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
        <el-button type="primary" @click="handleDialog">创建Bug</el-button>
      </el-col>
    </el-row>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next"
      :page-size="10"
      :total="currentTotal">
    </el-pagination>
    <el-table :data="bugList" stripe style="width: 100%">
      <el-table-column  v-for="(item,index) in options" :key="index" :label="item.label" :prop="item.props">
        <template #default="{row}" v-if="item.props === 'action'">
          <el-button type="danger" :icon="Delete" circle @click="handleDelete(row)" />
          <el-button type="primary" :icon="Edit" circle  @click="handleDialogEdit(row)"/>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 传入子组件的变量和函数，需要在这里传入 -->
  <Dialog v-model="dialogVisible" @initGetBugs="reGetBugs" :queryForm="queryForm"></Dialog>
  <!-- 必须等点击编辑按钮之后，才能开始传数据，否则数据传送异步 -->
  <span v-if="dialogEditVisible">  
    <DialogEdit v-model="dialogEditVisible" @initGetBugs="reGetBugs" :dialogEditTable="dialogEditTable"
  :bugId="bugId" :dialogEditVisible="dialogEditVisible"
  ></DialogEdit></span>
</template>

<script setup>
import { Search,Delete,Edit } from '@element-plus/icons-vue';
import {ref} from 'vue'
import {getBugs, deleteBugs} from '@/api/bugs'
import {getProjects} from '@/api/projects'
import {options} from './options'
import Dialog from './components/dialog.vue'
import DialogEdit from './components/dialog_edit.vue';

const queryForm = ref({
  query: '',
})

const tableData = ref([])

// 下拉菜单获取项目列表
const projectSelect = ref()
const projectOptions = ref([])

const initGetProjects = async() => {
  const res = await getProjects(queryForm.value)
  projectOptions.value = res
  console.log('所选项目', projectOptions.value)
}

//控制添加bug的弹窗的显示
const dialogVisible=ref(false)

const handleDialog = () => {
  dialogVisible.value = true
}
//控制编辑bug的弹窗
const dialogEditVisible=ref(false)

// 编辑bug的弹窗中的编辑bug部分
const dialogEditTable = ref({})

//记录bug的ID
const bugId = ref()

const handleDialogEdit = async (row) => {
  dialogEditVisible.value = true
  //拿到代理对象的属性，使用JOSN.stringify()方法，将对象转换为字符串，再使用JSON.parse()方法，将字符串转换为对象
  dialogEditTable.value = JSON.parse(JSON.stringify(row))
  console.log(row)
  bugId.value = dialogEditTable.value.bugId
  // // 发送路由请求，获得？？列表
  // ModulesList.value = await getModules(dialogEditTable.value.bugId)
}

const tem = ref({})
const handleDelete = async(row) => {
  tem.value = JSON.parse(JSON.stringify(row))
  bugId.value = tem.value.bugId
  console.log(bugId.value)
  await deleteBugs(bugId.value)
  initGetBugs(projectId)
}

const form = ref({
  size: 10,
  current: 1

})

let currentPage = 1
let currentTotal = 1

let projectId = 0

const handleCurrentChange = (val) => {
  currentPage = val
  initGetBugs(projectId)
}

const tableDataBugs = ref([])
const bugList = ref([])

const initGetBugs = async(val) => {
  console.log(val)
  projectId = val
  form.value.pageNum = currentPage
  tableDataBugs.value = await getBugs(val, form.value)
  console.log(tableDataBugs.value)
  currentPage = tableDataBugs.value.current
  currentTotal = tableDataBugs.value.total
  bugList.value = tableDataBugs.value.records
  console.log('初始化bug请求已经发送', bugList.value)
}

const reGetBugs = () => {
  initGetBugs(projectId)
}

initGetProjects()


</script>

<style lang="scss" scoped>
.header{
  padding-bottom:24px;
  box-sizing: border-box;
}
</style>
