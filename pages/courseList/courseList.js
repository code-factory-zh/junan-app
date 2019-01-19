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
            console.log(CourseList)
            CourseList._getFirstQuestionType({
                course_id: item.course_id
            }).then(result => {
                let res = result.data
                if (parseInt(res.code) === 0) {
                    console.log(res)
                    // 已经有分数了，跳转提示分数的页面
                    if (res.data.hasOwnProperty('score')) {
                        wx.navigateTo({
                          url: '/pages/scoreInfo/scoreInfo?score=' + res.data.score
                        })
                    } else {
                        this.getFirstQuestionType(item)
                    }
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
            // wx.navigateTo({
            //   url: '/pages/selectQuestion/selectQuestion'
            // })
        } else {
            this.selectComponent("#cantExam")._show()
        }
    },
    // 请求第一个题目的类型，以跳转不同的页面,题目类型 1=单选 2=多选 3=判断
    getFirstQuestionType:function (item) {
        wx.setStorageSync('exam_course_id', item.course_id)
        CourseList._getFirstQuestionType({
            course_id: item.course_id
        }).then(result => {
            let res = result.data
            if (res.code == 0) {
                console.log(res)
                let type = res.data.first_question_info.type 
                if (type == 1) {
                    console.log('单选')
                } else if (type == 2) {
                    console.log('多选')
                } else if (type == 3) {
                    console.log('判断')
                }
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }
})