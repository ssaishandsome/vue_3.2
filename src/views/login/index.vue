<template>
    <div class="login-container">
      <!-- 绑定验证规则 -->
        <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
            <div class="title-container">
                <h3 class="title">用户登录</h3>
            </div>
            <!-- 绑定验证数据 -->
            <el-form-item prop="username">

                <svg-icon icon="user" class="svg-container"/>
                <el-input v-model="form.username" />
            </el-form-item>

            <el-form-item prop="password">

                <svg-icon icon="password" class="svg-container"/>
                <el-input v-model="form.password" :type="passwordType"></el-input>
                <svg-icon :icon="passwordType==='password'?'eye':'eye-open'" @click="ChangeType" class="eye"/>
            </el-form-item>
            <!-- 统一校验 -->
            <el-button type="primary" class="login-button" @click="handleLogin">用户登录</el-button>
            
        </el-form>
        <el-button type="primary" class="regist-button" @click="handleRegist">用户注册</el-button>
    </div>
</template>

<script setup>
// console.log(process.env.VUE_APP_BASE_URL)
import {ref} from 'vue'
//将引入的组件导入到模板中
import {User} from '@element-plus/icons-vue'

// import {login} from '../../api/login.js'
import {useStore} from 'vuex'
import router from '../../router/index.js';

const store = useStore()


const form = ref({
    username: '',
    password: ''
})

const rules= ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
    ],
    password:[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
    ]
})

const formRef = ref(null)
const handleLogin = ()=>{
  // 调用校验方法,验证rules中定义的校验规则
  formRef.value.validate(async(valid) => {
    if (valid) {
      // alert('submit!');
      // 调用登录接口
      // await login(form.value)

      // ***调用vuex中app.js的actions 登录方法****
      store.dispatch('app/login',form.value)
    } else {
      console.log('error submit!!');
      return false;
    }
  })
}
const handleRegist = ()=>{
  console.log('注册')
  router.replace('/regist')
}


const passwordType = ref('password')
const ChangeType = ()=>{
  if(passwordType.value === 'password'){
    passwordType.value = 'text'
  }else{
    passwordType.value = 'password'
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {    //最外面的边框
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      //display: inline-block;
      // height: 470px;
      width: 89%;
      left: 20px;
      .el-input__wrapper {
        background: transparent;
        z-index: 1;
        //background-color:#2d3a4b; /* 你选择的颜色 */
      }
      input {
        background:transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: white;
        height: 40px;
        caret-color: white;  //指示器颜色
      }
    }
    .login-button {
      text-align: center;
      width: 100%;
      box-sizing: border-box;
    }
    
  }
  .regist-button{ // 
        margin-top: 10px;
        width: 100px;
        height: 30px;
        color: hsl(0, 0%, 100%);
        background-color: #409eff;
        cursor: pointer;
        &:hover {
          background-color: #66b1ff;
        }
        margin-left: 620px;
      }
  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .eye{
    // 定义z轴更上面，显示在组件上方
    z-index: 2;
  }
  .svg-container {
    // right: 200px;
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

</style>
