// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            {
                name: '钳工基础',
                score: 90,
                date: '12月12日',
                useTime: '25分20秒'
            },
            {
                name: '钳工基础',
                score: 90,
                date: '12月12日',
                useTime: '25分20秒'
            },
            {
                name: '钳工基础',
                score: 90,
                date: '12月12日',
                useTime: '25分20秒'
            },
            {
                name: '钳工基础',
                score: 90,
                date: '12月12日',
                useTime: '25分20秒'
            }
        ]
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1
        })
    }
})