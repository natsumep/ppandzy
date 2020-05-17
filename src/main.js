import Vue from 'vue'
GLOBAL.vbus = new Vue()

// import 'Components'// 全局组件注册
import 'Directives' // 指令
import './assets/style/index.scss';


// 引入插件
import router from 'Plugins/router'
import inject from 'Plugins/inject'
import store from 'Plugins/store'

// 引入根组件
import App from './App'


import coms from "Components/injectComponents.js";
for (var i in coms) {
    Vue.component(coms[i]['name'], coms[i]['component']);
}

import commons from "Commons/injectCommons.js";
for (var i in commons) {
    Vue.component(commons[i]['name'], commons[i]['common']);
}


import { Tabbar, TabbarItem ,Button ,Field,Toast } from 'vant';

import 'vant/lib/index.css';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);


//引入element
// import {  Image,ButtonGroup,Button,Input,Card} from 'element-ui'

// Vue.use(Image)
// Vue.use(ButtonGroup)
// Vue.use(Button)
// Vue.use(Input)
// Vue.use(Card)

Vue.use(inject);
new Vue({
    el: '#app',
    render: h => h(App),
    data(){
        return{
            myEvent:new Vue()
        }
    },
    router,
    store,
    template: '<App/>',
    components: { App },
    created: function () {
        try {
        } catch (error) {
        }
    }
})