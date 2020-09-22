import {getToken,setToken,removeToken} from "@/utils/auth";
import {login} from "@/api/login";

const user = {
  state:{
    token: getToken(),
    avatar:''
  },
  mutations:{
    SET_TOKEN:(state,token) => {
      state.token = token;
    },
    SET_AVATAR:(state,avatar) => {
      state.avatar = avatar
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
    }
  }
}

export default user

