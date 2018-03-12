import axios from 'axios'
import Qs from 'qs'
import { GetRequest } from './utils/utils.js'

//设置全局axios默认值
axios.defaults.timeout = 5000; //5000的超时验证
axios.defaults.withCredentials = true;//跨域带cookie
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
function http(type, url, params, contentType) {
    let contentTypeUse = contentType == 'json' ? 'application/json' : 'application/x-www-form-urlencoded';
    let paramsUse = contentType == 'json' ? params : Qs.stringify(params);
    let appVersion = GetRequest(location.search).appVersion;
    let appMarket = GetRequest(location.search).app_market;
    if (type == 'get') {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                params: params
            }).then((res) => {
                resolve(res.data)
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                 url: url + '?appVersion=' + appVersion + '&appMarket=' + appMarket,
                //url: url + '?clientType=android&appVersion=2.5.5-preview-11&deviceId=866822038308540&deviceName=MI6&osVersion=7.1.1&appMarket=xybt&packname=xybt',
                headers: { 'Content-Type': contentTypeUse },
                data: paramsUse
            }).then((res) => {
                resolve(res.data)
            })
        })
    }
}

export default http
