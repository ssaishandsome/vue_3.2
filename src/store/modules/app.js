import {login as loginApi} from '../../api/login.js'
import router from '../../router/index.js';
import { setTokenTime } from '@/util/auth.js';

export default{
    namespaced: true,
    state:()=>({
        token: localStorage.getItem('token') || '',   //读取token，没读到就为空
        siderType:true,  //控制汉堡按钮的变量
        username:'',
    }),
    mutations:{
        setToken(state,token){
            state.token = token;
            localStorage.setItem('token',token);
        },
        changeSiderType(state){
            state.siderType = !state.siderType;
            //console.log(state.siderType)
        },
        setUsername(state,username){
            state.username = username;
            localStorage.setItem('username',username);
        },
    },
    actions:{
        login({commit},userInfo){
            return new Promise((resolve,reject)=>{
                //失败了就传入then的第二个参数
                //成功就传入then的第一个参数
                loginApi(userInfo).then(res=>{
                    console.log(res)
                    // commit调用mutations中的方法
                    commit('setToken',res.token);
                    setTokenTime();
                    router.replace('/');
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        // logout({commit}){
        //     commit('setToken','')
        //     localStorage.clear();
        //     router.replace('/login')
        // }
    }
}