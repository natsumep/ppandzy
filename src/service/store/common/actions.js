import api from 'Plugins/api'
//import consts from 'Plugins/const'
import {getUserinfo} from "Utils/passwordManagement";
export default {

    getUserLoadConfigJson({ commit, state }) {
        return new Promise((resolve, reject) => {
            let userInfo = getUserinfo();
            let unitId  = userInfo&&userInfo.unitId||''
            api['user/loadConfigJson']({
                unitId:unitId
            }).then(resData => {
                commit("set_loadConfigJson", resData);
                resolve(resData)
            }).catch(function (err) {
                console.log(err);
            })
        })
    },
    getUnitInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            api['unit/infoTree']().then(resData => {
                commit("set_unitinfo", resData)
                resolve(resData)
            }).catch(function (err) {
                console.log(err);
            })
        })
    },
}
