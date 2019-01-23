//app.js
App({
  onLaunch: function () {
     wx.getSystemInfo({
        success: res => {
          //导航高度
          this.globalData.backImgTop = res.statusBarHeight + 12;
          this.globalData.titleTop = res.statusBarHeight + 8;
          if (res.system.includes('iOS')) {
            this.globalData.navHeight = res.statusBarHeight + 44;
          } else if (res.system.includes('Android')) {
            this.globalData.navHeight = res.statusBarHeight + 48;
          }
        }, fail(err) {
          console.log(err);
        }
      })
  },
  globalData: {
    backImgTop: 0, // 返回按钮图片的top值
    navHeight: 0, // 头部高度
    titleTop: 0 // 标题top值
  }
})