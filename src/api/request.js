import axios from "axios";
import {ElMessage} from "element-plus";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: '/api',
  timeout: 5000,
});

//一个请求拦截器，为发送的请求设置请求头token
service.interceptors.request.use((config)=>{
  config.headers.Authorization = localStorage.getItem('token')
  return config
},error=>{
   return Promise.reject(new Error(error))
}
)

//一个响应请求拦截器,来拦截服务器发送的响应，并进行处理
service.interceptors.response.use((response)=>{
  console.log(response);
  const {data,meta} = response.data;
  if(meta.status === 200 || meta.status === 201){
    return data;
  }else{
    //element plus 消息提示
    ElMessage.error(meta.msg)
    return Promise.reject(meta.msg)
  }
},error=>{
  //连响应都失败了
   error.response && ElMessage.error(error.response.data);
   return Promise.reject(error.response.data)
}
)

export default service;