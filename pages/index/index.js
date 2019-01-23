// pages/index/index.js
import Login from '../../api/login/login'
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navHeight: app.globalData.navHeight,
        backImgTop: app.globalData.backImgTop,
        titleTop: app.globalData.titleTop
    },
    onLoad: function () {
        this.checkToken()
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
    },
    // 检查token
    checkToken: function () {
      let signal = false
      if (wx.getStorageSync('token')) {
        Login._checkToken().then(result => {
          let res = result.data
          if (res.code == 0) {
          } else {
            signal = true
          }
        })
      } else {
        signal = true
      }
      if (signal) {
        wx.removeStorageSync('token')
        wx.showToast({
          title: '登录过期！',
          icon: 'none',
          duration: 2000,
          complete: function () {
                setTimeout(() => {
                    wx.reLaunch({
                        url: '/pages/login/login'
                    })
                }, 2000)
            }
        })
      }
    },
})