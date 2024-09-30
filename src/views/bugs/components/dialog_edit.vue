<template>
    <!-- model-value 实现单向绑定 -->
    <el-dialog
    :model-value="dialogEditVisible"
    title="编辑Bug"
    width="1000"
    :before-close="handleClose"
    @close="handleClose"
    >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="auto" style="max-width: 600px">
    <el-form-item label="Bug名称" prop="bugName">
      <el-input v-model="form.bugName" />
    </el-form-item>
    <el-form-item label="Bug描述" prop="bugDescription">
      <el-input v-model="form.bugDescription" />
    </el-form-item>
    <!-- <el-form-item label="Bug创建人" prop="bugCreatedBy">
      <el-input v-model="form.bugCreatedBy" />
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
import  {createBugs} from '@/api/bugs'
import { useStore } from 'vuex';

const form = ref({
    "bugName": "",       // 用例名称
  "bugDescription":"",  //用例描述
  "bugCreatedBy": "",  // 创建人
  "bugCreatedTime":""//创建时间(注意这里是string类型)
})

// 从父组件传来的表单数据
const props = defineProps({
    dialogEditTable:{
        tpye:Object,
        default:()=>{}
    },
    bugId:{
        type:Number,
        default:()=>0,
    },
    dialogEditVisible:{
        type:Boolean,
        default:()=>false
    }
})


const bugId = ref()
bugId.value = props.bugId
console.log('bugId',bugId.value)

// 监听父组件传来的数据(仅限于用例中的数据)，并更改
watch(()=>props.dialogEditTable, (newVal)=>{
    form.value = newVal
},{deep:true,immediate:true
})

const store = useStore()


// 接收父组件传来的数据
const emits = defineEmits(['update:modelValue','initBugList'])
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
          form.value.bugCreatedBy = store.getters.username
          form.value.bugCreatedTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
/////////////////////////////////////////////////////////////////
          const res = await createBugs(form.value)

          emits('initBugList') //重新刷新项目列表
          handleClose()
        }else{
          console.log('error submit')
          return false
        }
    })
}



const rules = ref({
    bugName: [
        { required: true, message: '请输入Bug名称', trigger: 'blur' }
      ],
      bugDescription: [
        { required: true, message: '请输入Bug描述', trigger: 'blur' }
      ],
})



</script>