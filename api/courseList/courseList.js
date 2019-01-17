import _fetch from '../../utils/fetch.js'
export default {
    //  得到公司列表
    getCourseList (obj) {
        return _fetch('/wechat/index/course_list', obj, 'GET')
    }
}