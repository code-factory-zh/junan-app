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
            // console.log(this.data.array[this.data.index])
            // console.log(this.data.phone)
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
                })
                wx.navigateTo({
                    url: '/pages/index/index'
                })
            }
        })
    }
})