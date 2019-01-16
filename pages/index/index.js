// pages/index/index.js
import Login from '../../api/login/login.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    onLoad: function () {
        this.aaa()
    },
    aaa: function(){
        Login._getUserInfo().then(res => {
            console.log(res)
        })
    },
    goBack: function () {
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