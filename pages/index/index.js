// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},
    goBack: function () {
        wx.reLaunch({
            url: '/pages/login/login'
        })
    },
    goScore: function () {
        wx.navigateTo({
            url: '/pages/score/score'
        })
    }
})