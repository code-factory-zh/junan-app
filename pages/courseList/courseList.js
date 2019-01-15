// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    }
})