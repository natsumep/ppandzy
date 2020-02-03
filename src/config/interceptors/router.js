
//import store from 'Plugins/store'
import { getTokenInfo, getVuexToken, getServerPath,getRequestCodeData,setRequestCodeData ,getCodeFlag} from 'Utils/passwordManagement'
import { userLoginAndGetConfig, setTokenAndGetConfig } from 'Utils/loginPreservationUserInfo.js'

export function routerBeforeEachFunc(to, from, next) {
   
    // 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理
    _changeTitle(to);
    next()
    // return
    // if (to.path == "/login") {
    //     next()
    //     return true
    // }
    // checkCode(next,to);
}


function _changeTitle(to) {
    let title = (to && (to.query.title || to.query.params || to.meta.title)) ;
    if(title){
        document.title = title
    } 
}
export function routerAfterEachFunc() {
}

function checkUserTokenDo(next) {
    let vuexToken = getVuexToken();
    if (vuexToken) {   //如果存在vuex 的token
        next()
        return true
    }
    // 如果vuex不存在token的话 这个时候去本地存储查询是否存在未过期的token
    // 同时调用用户接口获取用户详细信息
    let tokenInfo = getTokenInfo();
    let _token = tokenInfo.token;
    var toUrl = {
        path: '/login',
    }
    if (_token) {
        if (!tokenInfo.isPass) {
            userLoginAndGetConfig().then(() => {
                next()
            }, () => {
                next(toUrl)
            })
        } else {
            let pormise = setTokenAndGetConfig(_token);
            pormise.then(function () {
                next()
            }, () => {
                next(toUrl)
            })
        }
    } else {
        next(toUrl)
    }
 
}

//检验本地是否存在code，用来判断是否要向服务端传送userid
function checkCode(next,to){
    checkUserTokenDo(next);
}
