// pages/index/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    goBack: function () {
        wx.removeStorageSync('token')
        wx.reLaunch({
            url: '/pages/login/login'
        })
    },
    goScore: function () {
        wx.navigateTo({
            url: '/pages/score/score'
        })
    },
    goCourseList: function () {
        wx.navigateTo({
            url: '/pages/courseList/courseList'
        })
    }
})