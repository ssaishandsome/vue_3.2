<template>
    <!-- model-value 实现单向绑定 -->
    <el-dialog
    :model-value="dialogEditVisible"
    title="编辑用例"
    width="1000"
    :before-close="handleClose"
    @close="handleClose"
    >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="auto" style="max-width: 600px">
      <el-form-item label="用例名称" prop="testCaseName">
      <el-input v-model="form.testCaseName" />
    </el-form-item>
    <el-form-item label="用例目的" prop="testPurpose">
      <el-input v-model="form.testPurpose" />
    </el-form-item>
    <el-form-item label="用例前置条件" prop="preconditions">
      <el-input v-model="form.preconditions" />
    </el-form-item>
    <el-form-item label="用例步骤" prop="testSteps">
      <el-input v-model="form.testSteps" />
    </el-form-item>
    <el-form-item label="用例预期结果" prop="expectedResult">
      <el-input v-model="form.expectedResult" />
    </el-form-item>
    <el-form-item label="优先级" prop="priority">
      <el-select v-model="form.priority" placeholder="选择优先级">
        <el-option label="高" value="高" />
        <el-option label="中" value="中" />
        <el-option label="低" value="低" />
      </el-select>
    </el-form-item>
    <el-form-item label="所属项目" prop="projectId">
      <el-select v-model="form.projectId" placeholder="选择一个项目">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="所属模块" prop="moduleId">
      <el-select v-model="form.moduleId" placeholder="选择一个模块">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="用例创建人" prop="testCreatedBy">
      <el-input v-model="form.testCreatedBy" />
    </el-form-item> -->
  </el-form>
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
import { defineEmits, defineProps, watch } from 'vue';
import { ref } from 'vue';
import  {createTests, getTestCases, updateTests} from '@/api/usecases'
import { useStore } from 'vuex';

const form = ref({
  "testCaseId":"",//用例id
  "testCaseName": "",       // 用例名称
  "testPurpose": "",       // 用例目的描述
  "preconditions": "",  // 用例前置条件创建人
  "testSteps": "",           // 用例步骤
  "expectedResult": "",// 用例预期结果
  "priority": "",   // 优先级
  "creator": "",// 创建人
  "projectId": "",//所属项目
  "moduleId":"",//所属模块
})


// 从父组件传来的表单数据
const props = defineProps({
    dialogEditTable:{
        tpye:Object,
        default:()=>{}
    },
    testCaseId:{
        type:Number,
        default:()=>0,
    },
    dialogEditVisible:{
        type:Boolean,
        default:()=>false
    }
})

form.value = props.dialogEditTable
const testCaseId = ref()
testCaseId.value = props.testCaseId
console.log('testCaseId',testCaseId.value)

// 监听父组件传来的数据(仅限于用例中的数据)，并更改
watch(()=>props.dialogEditTable,
 (newVal)=>{
    form.value = newVal
},{deep:true,immediate:true
})

const store = useStore()


// 接收父组件传来的数据
const emits = defineEmits(['update:modelValue','initTestList'])
const handleClose = () => {
    emits('update:modelValue', false)
}
// modelvalue是干嘛的来着///////////////////////////


const formRef = ref(null)
// 使用formref.value.validate()进行表单验证
const handleConfirm = ()=>{
    formRef.value.validate(async (valid)=>{
        if(valid){
          console.log('success submit')
/////////////////////////////////////////////////////////////////
        console.log(form.value)
          await updateTests(testCaseId.value,form.value)
          emits('initTestList') //重新刷新项目列表
          handleClose()
        }else{
          console.log('error submit')
          return false
        }
    })
}



const rules = ref({
    testCaseName: [
        { required: true, message: '请输入用例名称', trigger: 'blur' }
      ],
      testPurpose: [
        { required: true, message: '请输入用例目的描述', trigger: 'blur' }
      ],
      preconditions:[
        { required: true, message: '请输入用例前置条件', trigger: 'blur' }
      ],
      testSteps:[
        { required: true, message: '请输入用例步骤', trigger: 'blur' }
      ],
      expectedResult:[
        { required: true, message: '请输入用例预期结果', trigger: 'blur' }
      ],
      projectId:[
        {required: true, message: '请选择用例所属项目', trigger: 'blur'}
      ],
      moduleId:[
        {required: true, message: '请选择用例所属模块', trigger: 'blur'}
      ],
      priority:[
        {required: true, message: '请选择用例优先级', trigger: 'blur'}
      ]

})



</script>