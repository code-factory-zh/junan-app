// pages/index/index.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        headerTop: app.globalData.headerTop
    },
    onLoad: function () {
        console.log(app.globalData.headerTop)
    },
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