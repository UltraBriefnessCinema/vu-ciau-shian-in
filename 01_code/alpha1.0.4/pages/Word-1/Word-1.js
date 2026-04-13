// Word-1.js
Page({
  //页面初始数据
  data: {
    isClear:false,
    val:"",
  },

  getInput:function(e){
    this.setData({
      val: e.detail.value
    })
    if(this.data.val.length>0){
      this.setData({
        isClear: true,
      })
    }else{
      this.setData({
        isClear: false,
      })
    }
  },
  //
  clearTap:function(){
    this.setData({
      val: '',
      isClear: false,
    })
  }
})