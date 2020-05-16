import {
  CONSOLE_REQUEST_ENABLE,
  CONSOLE_RESPONSE_ENABLE
} from '../index.js'


import {
  userLoginAndGetConfig
} from 'Utils/loginPreservationUserInfo.js'
import api from "Plugins/api"


export function requestSuccessFunc(requestObj) {
  CONSOLE_REQUEST_ENABLE && console.info('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
  if (GLOBAL.serverPath) {
    requestObj.url = GLOBAL.serverPath + requestObj.path;
  }
  // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
  // ...

  return requestObj
}

export function requestFailFunc(requestError) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  // ...

  return Promise.reject(requestError);
}

export function responseSuccessFunc(responseObj) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // ...
  // 假设我们请求体为
  // {
  //     code: 1010,
  //     msg: 'this is a msg',
  //     data: null
  // }
  return responseObj.data.body
  //TODO: 这里由于没有服务端 暂时先把数据全部返回出去
  let resData = responseObj.data
  let code = resData.status * 1 //强转数字 
  let msg = resData.description || "";

  if (code > 600) { //表示接受服务端的报错信息 用于提示
    code = 600;
  }
  switch (code) {
    case 200: // 如果业务成功，直接进成功回调  
      return resData.body;
      //case 401:
      // 如果业务失败，根据不同 code 做不同处理
      // 比如最常见的授权过期跳登录
      // 特定弹窗
      // 跳转特定页面等
      //location.href = xxx // 这里的路径也可以放到全局配置里
      //  return;

    case 500:
      responseObj.config.showErrorText && GLOBAL.vbus.$emit('global.$dialog.show', "服务端异常");
      console.error("请求发生错误default", responseObj)
      return Promise.reject(resData);
    case 600:
      responseObj.config.showErrorText && GLOBAL.vbus.$emit('global.$dialog.show', msg || "服务端异常 600");
      console.error("请求发生错误default", responseObj)
      return Promise.reject(resData);
    default:
      // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
      responseObj.config.showErrorText && GLOBAL.vbus.$emit('global.$dialog.show', "其他错误");
      console.error("请求发生错误default", responseObj)
      return Promise.reject(resData);

  }
}

export function responseFailFunc(responseError) {
  //  console.log(arguments)
  return new Promise((a, b) => {
    try {
      if (responseError.message == "Network Error") {
        GLOBAL.vbus.$emit('global.$dialog.show', "网络异常");
        b(responseError);
        return 
      }
      if (responseError.code == 'ECONNABORTED' && responseError.message.indexOf('timeout') != -1) {
        /* return new Promise(() => {
          let promise = new Promise(function () {
            api[responseError.config.apiName]({
              ...responseError.config.params
            }).then((data) => {
              a(data)
            }, () => {
              b()
            })
          })
          GLOBAL.vbus.$emit('global.$dialog.confim', {
            title: "提示",
            content: "当前网络存在异常，是否从新发起请求",
            fn: promise
          }, a, b);
        }) */
        GLOBAL.vbus.$emit('global.$dialog.alert', {
            title: "提示",
            content: "当前网络存在异常，请重试",
          });
        b(responseError)
        return 
      }
      switch (responseError.request.status * 1) {
        case 401:
          userLoginAndGetConfig().then(() => {
            api[responseError.config.apiName]({
              ...responseError.config.params
            }).then((data) => {
              a(data)
            }, () => {
              b()
            })
          }, () => {
            b(responseError);
          })
          break
        default:
          let showErrorText = responseError.config.showErrorText;
          showErrorText && GLOBAL.vbus.$emit('global.$dialog.show', "服务器异常");
          b(responseError);
      }
    } catch (e) {
      b(responseError);
    }
  })


  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  // ...
}
