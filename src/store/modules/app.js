import {login as loginApi} from '../../api/login.js'
import {logout as logoutApi} from '../../api/login.js'
import router from '../../router/index.js';
import { setTokenTime } from '@/util/auth.js';

export default{
    namespaced: true,
    state:()=>({
        token: localStorage.getItem('token') || '',   //读取token，没读到就为空
        siderType:true,  //控制汉堡按钮的变量
        username:localStorage.getItem('username') || '',
        role: localStorage.getItem('role') || ''
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
        setRole(state,role){
            state.role = role;
            localStorage.setItem('role',role);
        }
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
                    commit('setRole',res.role)
                    setTokenTime();
                    router.replace('/');
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        logout({commit}){
            commit('setToken','')
            localStorage.clear();
            router.replace('/login')
        }
    }
}