// pages/login/login.js
import Login from '../../api/login/login.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        index: '',
        phone: '',
        code: ''
    },
    onLoad: function () {
        this.getCompanys()
    },
    /**
     * 得到公司列表
    **/
    getCompanys () {
        Login._getCompanys().then(result => {
            let res = result.data
            if (res.code == 0) {
                this.setData({
                    array: res.data
                })
            } else {
                this.setData({
                    array: []
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
        console.log(userInfo)
        if (userInfo.detail.errMsg === 'getUserInfo:ok') {
            this.getLoginCode(userInfo)
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
                    console.log(this.data.code)
                    console.log(this.data.phone)
                    console.log(this.data.array, this.data.index)
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
                        let login_res = result.data
                         if (login_res.code == 0) {
                             wx.setStorageSync('token', login_res.data.token)
                                 setTimeout(() => {
                                      wx.navigateTo({
                                      url: '/pages/index/index'
                                  })
                             },1000)
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