// pages/selectQuestion/selectQuestion.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: ''
    },
    onLoad (data) {
        this.setData({
            id: data.id
        }, () => {
            this.getQuestionList()
        })
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    getQuestionList () {}
})