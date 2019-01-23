//app.js
const { compareVersion } = require('./utils/util.js');
App({
    onLaunch: function () {
        wx.getSystemInfo({
            success: res => {
                // navHeight导航高度 backImgTop图片top titleTop是title的top
                this.globalData.backImgTop = res.statusBarHeight + 12;
                this.globalData.titleTop = res.statusBarHeight + 8;
                if (res.system.includes('iOS')) {
                    this.globalData.navHeight = res.statusBarHeight + 44;
                } else if (res.system.includes('Android')) {
                    this.globalData.navHeight = res.statusBarHeight + 48;
                }

                let flagNumber = this.is_suitable_version()
                if (flagNumber < 0) {
                    // 版本过低
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
                    })
                }
            }, fail(err) {
                console.log(err);
            }
        })
    },
    // 验证用户使用的微信版本号是否合适
    is_suitable_version () {
        let datas = wx.getSystemInfoSync()
        let flag = null
        this.SDKVersion = datas.SDKVersion
        flag = compareVersion(datas.SDKVersion, this.globalData.limitSDKVersion)
        return flag
    },
    globalData: {
        limitSDKVersion: '1.9.0', // 版本兼容
        backImgTop: 0, // 返回按钮图片的top值
        navHeight: 0, // 头部高度
        titleTop: 0 // 标题top值
    }
})