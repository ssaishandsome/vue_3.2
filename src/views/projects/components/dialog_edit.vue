<template>
    <!-- model-value 实现单向绑定 -->
    <el-dialog
    :model-value="dialogEditVisible"
    title="编辑项目"
    width="1000"
    :before-close="handleClose"
    @close="handleClose"
    >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="auto" style="max-width: 600px">
    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model="form.projectName" />
    </el-form-item>
    <el-form-item label="项目描述" prop="projectDescription">
      <el-input v-model="form.projectDescription" />
    </el-form-item>
    <!-- <el-form-item label="项目创建人" prop="projectCreatedBy">
      <el-input v-model="form.projectCreatedBy" />
    </el-form-item> -->
  </el-form>
    <div style="display: flex; justify-content: center; font-weight: bold;">
        <span>项目模块表</span>
    </div>
    <div style="display: flex; justify-content: flex-end;">
        <el-button type="primary" @click="handleDialog">添加项目模块</el-button>
    </div>
        <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column  width="180" v-for="(item,index) in options" :key="index" :label="item.label" :prop="item.props">
            
            <template #default="{row}" v-if="item.props === 'action'">
            <el-button type="danger" :icon="Delete" circle @click="handleDialog" />
            </template>
        </el-table-column>
        </el-table>

        <!-- 项目人员表 -->
         

    <DialogMuduleEdit v-model="dialogModuleVisible" :projectId="projectId" @initGetModules="initGetModules"></DialogMuduleEdit>
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
import { defineEmits,defineProps,watch } from 'vue';
import { ref } from 'vue';
import  {createProjects,getModules} from '@/api/projects'
import { useStore } from 'vuex';
import {options} from './options'
import DialogMuduleEdit from './dialog_module/dialog_module.vue'

const form = ref({
    "projectName": "",       // 项目名称
  "projectDescription":"",  //项目描述
  "projectCreatedBy": "",  // 创建人
  "projectCreatedTime":""//创建时间(注意这里是string类型)
})

// 从父组件传来的表单数据
const props = defineProps({
    dialogEditTable:{
        tpye:Object,
        default:()=>{}
    },
    projectId:{
        type:Number,
        default:()=>0,
    },
    dialogEditVisible:{
        type:Boolean,
        default:()=>false
    }
})


const projectId = ref()
projectId.value = props.projectId
console.log('projectId',projectId.value)

// 监听父组件传来的数据(仅限于项目中的数据)，并更改
watch(()=>props.dialogEditTable, (newVal)=>{
    form.value = newVal
},{deep:true,immediate:true
})

const store = useStore()


// 接收父组件传来的数据
const emits = defineEmits(['update:modelValue','initProjectList'])
const handleClose = () => {
    emits('update:modelValue', false)
}



const formRef = ref(null)
// 使用formref.value.validate()进行表单验证
const handleConfirm = ()=>{
    formRef.value.validate(async (valid)=>{
        if(valid){
          console.log('success submit')
          const now = new Date();
          form.value.projectCreatedBy = store.getters.username
          form.value.projectCreatedTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
          const res = await createProjects(form.value)
          emits('initProjectList') //重新刷新项目列表
          handleClose()
        }else{
          console.log('error submit')
          return false
        }
    })
}



const rules = ref({
    projectName: [
        { required: true, message: '请输入项目名称', trigger: 'blur' }
      ],
      projectDescription: [
        { required: true, message: '请输入项目描述', trigger: 'blur' }
      ],
})

// ____________________________________________________________________________________
// 添加项目模块

const dialogModuleVisible = ref(false)
const handleDialog = () => {
    dialogModuleVisible.value = true
    //console.log('dialogModuleVisible',dialogModuleVisible.value)
}

//初始化模块列表
const ModulesList = ref([])
const initGetModules = async() => {
    // 发送路由请求，获得模块列表
    ModulesList.value = await getModules(projectId.value)
    console.log('初始化模块请求已经发送')
}

if(props.dialogEditVisible){
    initGetModules()
}

const tableData = ref([])
tableData.value = ModulesList.value

</script>