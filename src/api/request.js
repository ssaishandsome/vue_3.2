import axios from "axios";
import {ElMessage} from "element-plus";
//导入util定义的判断token过期的方法
import { diffTokenTime } from "@/util/auth";
import store from "@/store";


const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: '/api',
  timeout: 5000,
});

//一个请求拦截器，为发送的请求设置请求头token
service.interceptors.request.use((config)=>{
  if(localStorage.getItem('token')){
    if(diffTokenTime()){
      //退出登录
      store.dispatch('app/logout')
      return Promise.reject(new Error("token已过期，请重新登录"))
    }
  }const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: '/api',
  timeout: 5000,
});
  config.headers['token'] = localStorage.getItem('token')
  //console.log(config)
  return config
},error=>{
   return Promise.reject(new Error(error))
}
)

//一个响应请求拦截器,来拦截服务器发送的响应，并进行处理响应状态的
service.interceptors.response.use((response)=>{
  const {code,msg,data} = response.data;
  if(code === 200 || code === 201){
    //ElMessage(msg)
    //console.log(data)
    return data;
  }else{
    //element plus 消息提示
    ElMessage.error(msg)
    return Promise.reject(msg)
  }
},error=>{
  //连响应都失败了
   error.response && ElMessage.error(error.response.data);
  //return Promise.reject(new Error(error.response))
}
)

export default service;