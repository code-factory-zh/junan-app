// pages/index/index.js
import CourseList from '../../api/courseList/courseList'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerUrl: '',
        list: []
    },
    onLoad: function () {
        this.getCourseList()
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 跳转章节
    **/
    goChapter:function (event) {
        let item = event.currentTarget.dataset['item']
        wx.navigateTo({
            url: '/pages/chapterList/chapterList?id='+item.id
        })
    },
    /**
     * 请求课程
    **/
    getCourseList:function() {
        CourseList.getCourseList().then(result => {
            let res = result.data
            console.log(res)
            this.setData({
                bannerUrl: res.data.banner
            })
            this.setData({
                list: res.data.list
            })
        })
    },
    /**
     *  验证是否可以考试，不可考试就打开弹窗提示
    **/
    goExam: function (event) {
        let item = event.currentTarget.dataset['item']
        if (parseInt(item.finished) === 1) {
            // wx.setStorageSync('course_id', {'key':'value'})
            wx.navigateTo({
              url: '/pages/selectQuestion/selectQuestion'
            })
        } else {
            this.selectComponent("#cantExam")._show()
        }
    }
})