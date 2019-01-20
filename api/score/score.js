import _fetch from '../../utils/fetch.js'
export default {
    //  得到公司列表
    _getScoreList (obj) {
        return _fetch('/wechat/exam/score_list', obj, 'GET')
    }
}