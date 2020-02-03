//主要负责登陆 保存用户信息


//import store from 

import {
  getUserinfo,
  setTokenInfo,
  setTokenSessionStorage,
  clearAll
} from 'Utils/passwordManagement'
import api from 'Plugins/api'
import store from 'Plugins/store'
import axios from "axios";
import {
  SERVER_PATH
} from "Config";

let serverpath = SERVER_PATH;
export function loginAjax(userDatas, success, error) {
  if (GLOBAL.serverPath) {
    serverpath = GLOBAL.serverPath
  } else {
    serverpath = SERVER_PATH;
  }

  axios.post(serverpath + "/login", {
    username: userDatas.username,
    password: userDatas.password,
    userType: 1,
    p: "8njq6ZY",   
  },{
    headers: {
      ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest:[function (data) {
      let ret = []
      for (let it in data) {
        ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
      }
      return ret.join("&")
    }]
  }).then((data) => {
    data = data.data;
    let auth = data.auth || {};
    let user = data.user || {};
    let userData = {
      unitName: user.unitName,
      unitId: user.unitId,
      username: user.userName,
      password: userDatas.password,
      realName: user.realName,
      level: user.userLevel,
      userId: user.id
    };
    success && success(userData, auth.token);
  }).catch((XMLHttpRequest, textStatus, errorThrown) => {
    clearAll();
    error && error(XMLHttpRequest, textStatus, errorThrown);
  })
 
}
export function exit(){
    clearAll();
    window.location.href = "/";
}
export function autoUserLogin() {
  return new Promise(function (a, b) {
    let userinfo = getUserinfo();
    if (userinfo && userinfo.username && userinfo.password) {
      loginAjax(userinfo, (data, token) => {
        setTokenInfo(token)
        a();
      })
    } else {
      b()
    }
  })
}

function getUserLoadConfigJson() {
  return new Promise((resolve, reject) => {
    let userInfo = getUserinfo();
    let unitId = userInfo && userInfo.unitId || ''
    api['user/loadConfigJson']({
      unitId: unitId
    }).then(resData => {
      store.commit("set_loadConfigJson", resData);
      resolve(resData)
    }).catch(function (err) {
      reject()
    })
  })
}
export function setTokenAndGetConfig(_token) {
  setTokenSessionStorage(_token);
  return Promise.resolve();
  // return getUserLoadConfigJson()
}

export function userLoginAndGetConfig() {
  return new Promise((a, b) => {
    autoUserLogin().then(() => {
        a();
    //   getUserLoadConfigJson().then(() => {
    //     a()
    //   }, () => {
    //     b()
    //   })
    }, () => {
      b()
    })
  })
}
