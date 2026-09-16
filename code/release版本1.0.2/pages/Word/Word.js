// Word.js
// written by Mr.Gao in Xiaokunshan, Songjiang, Shanghai, China

Page({
  onShareAppMessage: function(){  //分享给好友
    return {
      title: '沪郊乡音辞典查字音',
      path: '/index/index?id=123'
    }
  },

  onShareTimeline: function(){  //分享到朋友圈
    return {
      title: '沪郊乡音辞典查字音'
    }
  }
})