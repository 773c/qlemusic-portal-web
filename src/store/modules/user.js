import {getToken,setToken,removeToken} from "@/utils/auth";
import {login,getInfo,logout} from "@/api/login";

const user = {
  state:{
    token: getToken(),
    avatar:'',
    userInfo:{}
  },
  mutations:{
    SET_TOKEN:(state,token) => {
      state.token = token;
    },
    SET_USERINFO:(state,userInfo) => {
      state.userInfo = userInfo
      state.avatar = userInfo.headIcon
    }
  },
  actions:{
    Login({commit},userInfo){
      console.log(userInfo);
      return new Promise((resolve,reject) => {
        login(userInfo).then(response => {
          console.log(response);
          //获取后台数据
          const data = response.data
          //保存到cookies中
          setToken(data)
          //提交到mutations
          commit('SET_TOKEN',data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({commit}){
      return new Promise((resolve,reject) => {
        getInfo().then(response => {
          console.log(response);
          //获取后台数据data
          const data = response.data
          //提交到mutations
          commit('SET_USERINFO',data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({commit}){
      return new Promise((resolve,reject) => {
        logout().then(() => {
          commit('SET_TOKEN','')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user

