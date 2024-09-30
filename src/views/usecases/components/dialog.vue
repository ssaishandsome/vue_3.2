<template>
    <!-- model-value 实现单向绑定 -->
    <el-dialog
    :model-value="dialogVisible"
    title="添加用例"
    width="500"
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
    <el-form-item label="优先级" prop="testPriority">
      <el-select v-model="form.testPriority" placeholder="设定优先级">
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
import { defineEmits } from 'vue';
import { ref } from 'vue';
import  {createTests} from '@/api/usecases'
import { useStore } from 'vuex';

const store = useStore()

// 接收父组件传来的数据
const emits = defineEmits(['update:modelValue','initTestList'])
const handleClose = () => {
    emits('update:modelValue', false)
}

//  modelvalue是干嘛的////////////////////

const formRef = ref(null)
// 使用formref.value.validate()进行表单验证
const handleConfirm = ()=>{
    formRef.value.validate(async (valid)=>{
        if(valid){
          console.log('success submit')
          const now = new Date();
          form.value.testCreatedBy = store.getters.username
          form.value.testCreatedTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
          const res = await createTests(form.value)
          emits('initTestList') //重新刷新项目列表
          handleClose()
        }else{
          console.log('error submit')
          return false
        }
    })
}

const form = ref({
    "testName": "",       // 用例名称
  "testDescription":"",  //用例描述
  "testCreatedBy": "",  // 创建人
  "testCreatedTime":"",//创建时间(注意这里是string类型)
  "projectId":"",//所属项目
  "moduleId":"",//所属模块
  "testPriority":""   //优先级
})

const rules = ref({
    testName: [
        { required: true, message: '请输入用例名称', trigger: 'blur' }
      ],
      testDescription: [
        { required: true, message: '请输入用例描述', trigger: 'blur' }
      ],
      testCreatedBy:[
        { required: true, message: '请输入用例创建人', trigger: 'blur' }
      ],
      projectId:[
        {required: true, message: '请选择用例所属项目', trigger: 'blur'}
      ],
      moduleId:[
        {required: true, message: '请选择用例所属模块', trigger: 'blur'}
      ],
      testPriority:[
        {required: true, message: '请选择用例优先级', trigger: 'blur'}
      ]

})

</script>