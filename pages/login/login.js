// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['腾讯', '百度', '阿里', '网易'],
        index: ''
    },
    /**
     * 切换公司
     **/
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    /**
     * 登录
     **/
    login: function () {
        wx.navigateTo({
            url: '/pages/index/index'
        })
    }
})