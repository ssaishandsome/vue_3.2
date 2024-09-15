import {login as loginApi} from '../../api/login.js'
import router from '@/router/index.js';

export default{
    namespaced: true,
    state:()=>({
        token: localStorage.getItem('token') || '',   //读取token，没读到就为空
    }),
    mutations:{
        setToken(state,token){
            state.token = token;
            localStorage.setItem('token',token);
        },
    },
    actions:{
        login({commit},userInfo){
            return new Promise((resolve,reject)=>{
                //失败了就传入then的第二个参数
                //成功就传入then的第一个参数
                loginApi(userInfo).then(res=>{
                    // commit调用mutations中的方法
                    commit('setToken',res.data.token);
                    router.replace('/');
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
}