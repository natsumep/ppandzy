import axios from './axios'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import {
  assert
} from 'Utils/tools'
import {
  API_DEFAULT_CONFIG
} from 'Config'
import API_CONFIG from 'Service/api'
import qs from "qs"
class MakeApi {
  constructor(options) {
    this.api = {}
    this.apiBuilder(options)
  }
  apiBuilder({
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = '',
    serverPath = ""
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        serverPath,
        config: config[namespace]
      })
    })
  }
  _apiSingleBuilder({
    namespace,
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = '',
    serverPath = "",
  }) {
    config.forEach(api => {
      const {
        name,
        desc,
        params,
        method,
        path,
        mockPath,
        serverPath,
        showErrorText,
        hasLoading
      } = api
      let apiName = `${namespace}${sep}${name}`,
        url = mock ? mockPath : path,
        baseURL = GLOBAL.changePath ? GLOBAL.url : (mock && mockBaseURL || serverPath);
      debug && assert(name, `${url} :接口name属性不能为空`)
      debug && assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`)
      Object.defineProperty(this.api, apiName, {
        value(outerParams, outerOptions) {
          let _data = _isEmpty(outerParams) ? params : _assign({}, params, outerParams);
          baseURL = GLOBAL.changePath || baseURL;
          return axios(_normoalize(_assign({
            url,
            desc,
            apiName,
            baseURL,
            hasLoading,
            showErrorText,
            method,
            path
          }, outerOptions), _data))
        }
      })
    })
  }
}

function _normoalize(options, data) {
  if (options.method === 'POST' || options.method === 'PUT') {
    options.data = data;
    options.headers = {
      ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    options.transformRequest = [function (data) {
      let ret = []
      for (let it in data) {
        ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
      }
      return ret.join("&")
    }];
  } else if (options.method === 'GET') {
    //data = qs.stringify(data, {arrayFormat: 'brackets'})
    options.headers = {
      ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8',
      ['Access-Control-Allow-Origin']:'*'
    };
    options.params = data;
    options.paramsSerializer = function (params) {
      return qs.stringify(params, {
        arrayFormat: 'brackets'
      })
    }
  }
  return options
}

const _def = new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
export default _def
