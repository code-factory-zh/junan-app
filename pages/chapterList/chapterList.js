// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: 2, // 1简介 2章节，默认章节
        isShowVideo: true,
        videoUrl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
    },
    onLoad: function(data){
        console.log(data)
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 切换显示tab
    **/
    toggleTab:function (e) {
        this.setData({
            tab: parseInt(e.target.dataset.num)
        })
    }
})