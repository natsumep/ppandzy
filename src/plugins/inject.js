import axios from './axios'
import api from './api'
import consts from './const'
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
GLOBAL.ajax = axios
 
export default {
    install: (Vue, options) => {
        Vue.prototype.$api = api;
        Vue.prototype.$ajax = axios;
        Vue.prototype.$const = consts;
        Vue.prototype.$message = Message;
        Vue.prototype.$loading = Loading;
        // 需要挂载的都放在这里
    }
}
