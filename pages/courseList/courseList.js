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
        wx.setStorageSync('course_id', item.course_id)
        // 如果是第一次来到课程，isFirstComeCourse为true
        wx.setStorageSync('isFirstComeCourse', true)
        wx.navigateTo({
            url: '/pages/chapterList/chapterList'
        })
    },
    /**
     * 请求课程
    **/
    getCourseList:function() {
        CourseList._getCourseList().then(result => {
            let res = result.data
            if (parseInt(res.code) === 0) {
                console.log(res)
                this.setData({
                    bannerUrl: res.data.banner,
                    list: res.data.list
                })
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
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