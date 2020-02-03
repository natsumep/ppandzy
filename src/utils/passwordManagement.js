/**
 * 主要用于获取本地存储 和 写入;
 * 
 * 后续如果需要可以开放其他的数据获取 和写入
 * 
 */
import session from "Utils/session"  //
import encryption from "Utils/encryption"  // 加密解密
import store from 'Plugins/store'
let KEY = "CPTBTPTPBCPTDTPT";
let TOKEN_PASS_TIME = 1000 * 60 * 60 * 12;  //

//设置local信息
function setLocalInfo(key, value) {
    if (value) {
        try {
            let string = JSON.stringify(value);
            let userInfo = _encryptInfo(string);
            session.setLocal(key, userInfo)
        } catch (e) {
            console.log(e);
        }
    } else {
        session.clearLocal(key)
    }
}

//加密
function _encryptInfo(string) {
    let str = encryption.encrypt(string, KEY);
    return str;
}



//获取用户信息
export function getUserinfo() {
    var string = session.getLocal("_u") //用户账号 密码
    try {
        if (!string) {
            return false
        }
        let decryptInfo = encryption.decrypt(string, KEY);
        return JSON.parse(decryptInfo)
    } catch (e) {
        console.log("error User" + e);
        return false
    }
    //setLocal
}

//设置用户信息
export function setUserinfo(userObj, outherInfo) {
    setLocalInfo("_u", userObj)
    //store.commit("set_userinfo",outherInfo)
    //setLocal
}

//设置token 信息
export function setTokenInfo(token, time) {
    var tokenInfo = {
        token: token,
        createTime: time || (+new Date() - 1000 * 60)
    } // 设置token 过期时间

    setLocalInfo("_t", token && tokenInfo)
    setTokenSessionStorage(token)
    //setLocal
}


function _checkTokenTime(time) {
    let newDate = +new Date();
    if (newDate - time > TOKEN_PASS_TIME) {
        return false
    } else {
        return true
    }
}

export function getTokenInfo() {
    let tokenInfo = session.getLocal("_t") //用户账号 密码
    try {
        if (!tokenInfo) {
            return {
                isPass: false
            }
        }
        tokenInfo = encryption.decrypt(tokenInfo, KEY);
        tokenInfo = JSON.parse(tokenInfo);
        var flag = _checkTokenTime(tokenInfo.createTime);
        let tokenObj = { token: tokenInfo.token };
        if (flag) {
            tokenObj.isPass = true;
        } else {
            tokenObj.isPass = false;
        }
        return tokenObj;
    } catch (e) {
        console.error(e)
        clearAll();
        return {
            isPass: false
        }
    }
}

export function setTokenSessionStorage(value) {
    if (value) {
        setVuexToken(value);
    } 
    GLOBAL.axiosChild && GLOBAL.axiosChild.defaults && GLOBAL.axiosChild.defaults.headers && (GLOBAL.axiosChild.defaults.headers.token = value);
}

export function getVuexToken() {
    return store.state.token;
}

export function setVuexToken(token) {
    store.commit('set_user_token', token)
}

export function clearAll() {
    setUserinfo(); // 清空数据
    setTokenInfo(); // 清空数据
    setCodeFlag();//设置未推送ID标志缓存
    setVuexToken();
}
export function getRequestCodeData() {
    return session.getLocal("_rcode_data");
}
export function setRequestCodeData(data) {
    if (data) {
        session.setLocal("_rcode_data", data)
    } else {
        session.clearLocal("_rcode_data");
    }
}
export function getCodeFlag() {
    return session.getLocal("_code_flag");
}
export function setCodeFlag(boolean) {
    if(typeof boolean == "boolean"){
        session.setLocal("_code_flag", boolean);
    }else{
        session.clearLocal("_code_flag");
    }
}

