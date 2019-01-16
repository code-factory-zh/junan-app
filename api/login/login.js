import _fetch from '../../utils/fetch.js'
export default {
    //  得到公司列表
    _getCompanys (obj) {
        return _fetch('/wechat/index/get_companys', obj, 'get')
    },
     //  得到公司列表
    _login (obj) {
        return _fetch('/wechat/login/dologin', obj, 'post')
    }
}