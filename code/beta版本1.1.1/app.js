// app.js
App({
  //初始化云开发环境
  onLaunch(){
    console.log('小程序启动')
    wx.cloud.init({
      env: "hujiaodictionary-4f8kvxn93beeb58"  //云开发环境ID
    })
  }
})
