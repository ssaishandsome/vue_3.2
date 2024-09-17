<template>
<div class="login-container">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="电话号码">
        <el-input v-model="form.phone" placeholder="请输入电话号码"/>
        </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="确认密码">
        <el-input v-model="form.password_repeat" placeholder="请再次输入密码"/>
        </el-form-item>
        <el-form-item label="角色">
        <el-radio-group v-model="form.role">
            <el-radio value="项目经理">项目经理</el-radio>
            <el-radio value="测试工程师">测试工程师</el-radio>
            <el-radio value="开发工程师">开发工程师</el-radio>
        </el-radio-group>
        </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="onCancle">Cancel</el-button>
    </el-form-item>
    </el-form>

</div>

</template>

<script setup>
import {ref} from 'vue'
import router from '../../router/index.js';

const form = ref({
  username: '',
  email: '',
  phone: '',
  password: '',
  password_repeat: '',
  role: '',
})
const onSubmit = () => {
  console.log(form.value.email)
}
const onCancle = () => {
  console.log('cancel')
  router.replace('/login')
}

</script>

<style scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
</style>