// 全局state 存放所有模块，业务线都有可能调用的状态
// 把state放入mutations是为了方便开发，观察状态 ，和状态对应的相关方法

export const state = {
    //toLoginPath: '',
    unitinfoObj: null,     //用户站点信息
    userinfoObj: null,      //用户信息
    userLoadConfigJson: null, //用户详细信息
    token: null,
    routeScroll: {},  //记录路由位置 用于切换路由时候修改滚动位置  ps:如果用了viwebox 那个这个滚动位置需要保存viwebox的！！！！ 
}

//全局mutations
export const mutations = {
    /* ['SET_TO_LOGIN'](state, boolean) {
            state.toLogin = boolean
        } */
    set_unitinfo(state, obj) {
        state.unitinfoObj = obj
    },
    set_userinfo(state, obj) {   //登录后的一些信息
        state.userinfoObj = obj
    },
    set_loadConfigJson(state, obj) {
        state.userLoadConfigJson = obj
    },

    set_user_token(state, obj) {
        state.token = obj;
    },
    set_route_scroll(state, obj) {
        state.routeScroll[obj.name] = obj.scroll || 0;
    },
}
