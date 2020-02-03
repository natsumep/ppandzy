//全局getters函数 返回你想要的全局状态格式
export default {
    userinfoGetter: state => state.userinfoObj,
    loadConfigJsonGetter: state => state.userLoadConfigJson,
    unitinfoGetter: state => state.unitinfoObj,
    userLoginConfigGetter: state => state.userLoginConfig,
    routeScrollGetter: (state) => (name) => {
        return state.routeScroll[name];
    },
    //是否是前3级
    isUnitForUnitTypeGetter:state=>{
       return state.userLoadConfigJson.unitType == "UNIT";
    },
    isSystemUnitForUnitTypeGetter:state=>{
        return state.userLoadConfigJson.unitType == "SYSTEM_UNIT";
    },
    isSystemForUnitTypeGetter:state=>{
        return state.userLoadConfigJson.unitType == "SYSTEM";
    },
    //是否是前四级
    isUnitAndSystemForUnitTypeGetter:state=>{
        var type = state.userLoadConfigJson.unitType
        return type == "UNIT" || type == "SYSTEM";
    },
    //是否是第四五级
    isSystemAndSystemUnitForUnitTypeGetter:state=>{
        var type = state.userLoadConfigJson.unitType
        return type == "SYSTEM_UNIT" || type == "SYSTEM";
    },
}