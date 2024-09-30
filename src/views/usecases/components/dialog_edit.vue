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
    <el-form-item label="用例名称" prop="testName">
      <el-input v-model="form.testName" />
    </el-form-item>
    <el-form-item label="用例描述" prop="testDescription">
      <el-input v-model="form.testDescription" />
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
import  {createTests} from '@/api/usecases'
import { useStore } from 'vuex';

const form = ref({
    "testName": "",       // 用例名称
  "testDescription":"",  //用例描述
  "testCreatedBy": "",  // 创建人
  "testCreatedTime":""//创建时间(注意这里是string类型)
})

// 从父组件传来的表单数据
const props = defineProps({
    dialogEditTable:{
        tpye:Object,
        default:()=>{}
    },
    testId:{
        type:Number,
        default:()=>0,
    },
    dialogEditVisible:{
        type:Boolean,
        default:()=>false
    }
})


const testId = ref()
testId.value = props.testId
console.log('testId',testId.value)

// 监听父组件传来的数据(仅限于用例中的数据)，并更改
watch(()=>props.dialogEditTable, (newVal)=>{
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
          const now = new Date();
          form.value.testCreatedBy = store.getters.username
          form.value.testCreatedTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
/////////////////////////////////////////////////////////////////
          const res = await createTests(form.value)

          emits('initTestList') //重新刷新项目列表
          handleClose()
        }else{
          console.log('error submit')
          return false
        }
    })
}



const rules = ref({
    testName: [
        { required: true, message: '请输入用例名称', trigger: 'blur' }
      ],
      testDescription: [
        { required: true, message: '请输入用例描述', trigger: 'blur' }
      ],
})



</script>