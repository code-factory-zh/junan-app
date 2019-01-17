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
    },
    /**
     * 跳转章节
    **/
    goChapter () {
        wx.navigateTo({
            url: '/pages/chapterList/chapterList'
        })
    }
})