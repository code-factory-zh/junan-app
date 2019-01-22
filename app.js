//app.js
App({
  onLaunch: function () {
      let systemDatas = wx.getSystemInfoSync()
      let statusBarHeight = systemDatas.statusBarHeight
      let height = 48
      if (systemDatas.system.includes('IOS')) {
          height = 44
      } else if (systemDatas.system.includes('Android')) {
          height = 48
      }
      this.globalData.headerTop = parseInt(statusBarHeight) + height
      console.log(this.globalData.headerTop)
  },
  globalData: {
      headerTop: 0
  }
})