// pages/selectQuestion/selectQuestion.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: ''
    },
    onLoad (data) {
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    getQuestionList () {}
})