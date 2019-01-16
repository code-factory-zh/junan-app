import _fetch from '../../utils/fetch.js'
export default {
    //  得到地块列表
    _getCompanys (obj) {
        return _fetch('/wechat/index/get_companys', obj, 'get')
    },
}