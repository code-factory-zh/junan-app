// pages/login/login.js
import Login from '../../api/login/login.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        appName: '君安',
        array: [],
        index: '',
        phone: '',
        code: '',
    },
    onLoad: function () {
        this.checkToken()
        this.getCompanys()
    },
    // 检查token
    checkToken: function () {
      if (wx.getStorageSync('token')) {
        Login._checkToken().then(result => {
          let res = result.data
          console.log(res)
          if (res.code == 0) {
            wx.navigateTo({
              url: '/pages/index/index'
            })
          } else {
            wx.removeStorageSync('token')
          }
        })
      }
    },
    /**
     * 得到公司列表
    **/
    getCompanys () {
        Login._getCompanys().then(result => {
            let res = result.data
            if (res.code == 0) {
                this.setData({
                    appName: res.data.company_name,
                    array: res.data.list
                })
            } else {
                this.setData({
                    array: []
                })
                wx.showToast({
                    title: '获取企业列表失败！',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    /**
     * 切换公司
     **/
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    /**
     * input输入改变手机号的值
    **/
    bindKeyInput: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    /**
     * 点击登录的回调
     **/
    getUserInfoCallback: function (userInfo) {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        if (userInfo.detail.errMsg === 'getUserInfo:ok') {
            this.getLoginCode(userInfo)
        } else {
            console.log(userInfo)
        }
    },
    /**
     * 得到登录用的code
    **/
    getLoginCode (userInfo) {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res)
                this.setData({
                    code: res.code
                },() => {
                    if (this.data.index === '') {
                        wx.showToast({
                          title: '请选择企业',
                          icon: 'none',
                          duration: 2000
                        })
                        return false
                    }else if (this.data.phone === '') {
                       wx.showToast({
                          title: '请输入手机号',
                          icon: 'none',
                          duration: 2000
                        })
                        return false
                    }
                    Login._login({
                        code: this.data.code,
                        company_id: this.data.array[this.data.index].id,
                        mobile: this.data.phone
                    }).then(result => {
                        wx.hideLoading()
                        let login_res = result.data
                         if (login_res.code == 0) {
                             wx.setStorageSync('token', login_res.data.token)
                             wx.navigateTo({
                                 url: '/pages/index/index'
                             })
                        } else {
                            wx.showToast({
                              title: login_res.msg,
                              icon: 'none',
                              duration: 2000
                            })
                        }
                    })
                })
            }
        })
    }
})