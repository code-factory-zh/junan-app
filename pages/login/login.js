// pages/login/login.js
import Login from '../../api/login/login.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        index: '',
        phone: ''
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
     * 登录
     **/
    login: function () {
        console.log(this.data.array[this.data.index])
        console.log(this.data.phone)
        // wx.navigateTo({
        //     url: '/pages/index/index'
        // })
    }
})