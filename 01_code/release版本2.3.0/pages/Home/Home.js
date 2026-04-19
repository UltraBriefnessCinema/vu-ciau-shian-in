// pages/Home/Home.js
Page({
  data: { fontReady: false },
  onLoad() {
    const app = getApp();
    if (app.fontReady) {
      this.setData({ fontReady: true });
    } else {
      // 等待 App 通知
      app.fontReadyCallback = () => this.setData({ fontReady: true });
    }
  },
  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function(){  //分享给好友
    return {
      title: '沪郊乡音辞典主页',
      path: '/pages/Home/Home'
    }
  },

  onShareTimeline: function(){  //分享到朋友圈
    return {
      title: '沪郊乡音辞典查字音'
    }
  }
})