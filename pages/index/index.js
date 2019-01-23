// pages/index/index.js
import Login from '../../api/login/login'
const app = getApp()
const { compareVersion } = require('../../utils/util.js'); // 判断微信sdk的版本号
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navHeight: app.globalData.navHeight,
        backImgTop: app.globalData.backImgTop,
        titleTop: app.globalData.titleTop,
        limitSDKVersion: '1.9.0' // 版本兼容
    },
    onLoad: function () {
        this.checkVersion()
    },
    // 微信sdk版本限制功能
    checkVersion: function () {
        let flagNumber = this.is_suitable_version()
        if (flagNumber < 0) {
            // 版本过低
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，请升级到最新微信版本后重试。',
                complete: () => {
                    this.checkToken()
                }
            })
        } else {
            this.checkToken()
        }
    },
    // 验证用户使用的微信版本号是否合适
    is_suitable_version: function () {
        let datas = wx.getSystemInfoSync()
        let flag = null
        flag = compareVersion(datas.SDKVersion, this.data.limitSDKVersion)
        return flag
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