// index.js
Page({
  //页面初始数据
  data:{
    isShow: false,  //设置其眼睛是打开的
    featuresArea: true  //设置功能集区域默认为开
  },

  advanceSearchBtn: function(){  //高级搜索眼睛显示/隐藏
    this.setData({
      isShow: false,
      featuresArea: true
    })
  },

  advanceOnSearchBtn: function(){  //高级搜索眼睛显示/隐藏
    this.setData({
      isShow: true,
      featuresArea: false
    })
  }
})