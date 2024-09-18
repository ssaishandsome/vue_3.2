<template>
    <!-- model-value 实现单向绑定 -->
    <el-dialog
    :model-value="dialogVisible"
    title="添加项目"
    width="500"
    :before-close="handleClose"
    @close="handleClose"
    >
    <el-form :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
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
import  {createProjects} from '@/api/projects'
import { useStore } from 'vuex';

const store = useStore()

const emits = defineEmits(['update:modelValue'])
const handleClose = () => {
    emits('update:modelValue', false)
}

const handleConfirm = async ()=>{
    const now = new Date();
    form.value.projectCreatedBy = store.getters.username
    form.value.projectCreatedTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    const res = await createProjects(form.value)
}

const form = ref({
    "projectName": "",       // 项目名称
  "projectDescription":"",  //项目描述
  "projectCreatedBy": "",  // 创建人
  "projectCreatedTime":""//创建时间(注意这里是string类型)
})

const rules = ref({
    projectName: [
        { required: true, message: '请输入项目名称', trigger: 'blur' }
      ],
      projectDescription: [
        { required: true, message: '请输入项目描述', trigger: 'blur' }
      ],
      projectCreatedBy:[
        { required: true, message: '请输入项目创建人', trigger: 'blur' }
      ]
})

</script>