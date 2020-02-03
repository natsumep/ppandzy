import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from 'Config/index'
import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from 'Config/interceptors/axios'
import session from "Utils/session"  //
let token = session.get("u");
AXIOS_DEFAULT_CONFIG.headers = {
    token: token
}
let axiosInstance = {}
//console.log(AXIOS_DEFAULT_CONFIG)
GLOBAL.axiosChild =  axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance
    .interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入失败拦截
axiosInstance
    .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance