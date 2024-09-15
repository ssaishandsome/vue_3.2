import axios from "axios";
import {ElMessage} from "element-plus";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: '/api',
  timeout: 5000,
});

service.interceptors.request.use((response)=>{
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