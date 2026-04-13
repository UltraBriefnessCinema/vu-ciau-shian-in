// AboutUs.js
//初始化数据库
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {  //初始數據
    inputSortList:[],   //录入整理
    pronuncationList:[],   //字表发音
    programMakerList:[],   //程序制作人员
    ChronicleList:[],  //参考文献
    UiDesignList:[],  //UI设计人员
    introduceList:[],
    inputArea: true,  //录入整理人员界面
    pronunciationArea: true,  //发音人员界面
    uiDesignArea: true,  //UI设计界面
    programMakerArea: true,   //程序制作人员界面
    AcknowledgeArea: true,  // 特别感谢人员界面
    ChronicleArea: true,  //参考文献界面
    introduceArea: true
  },

  onLoad(){
    wx.showLoading({  //跳出来一个提示框
      title: '数据加载中...',
    })
    db.collection('aboutUsPage')
    .get()
    .then(res=>{
      this.setData({
        inputSortList: res.data,
        pronuncationList: res.data,
        programMakerList: res.data,
        ChronicleList: res.data,
        UiDesignList: res.data,
        introduceList: res.data
      })
    })
    wx.hideLoading()  //把该提示框隐藏
  },

  inputButton: function(e){  //录入人员显示或隐藏单个
    var that = this;
    var inputArea = that.data.inputArea 
    that.setData({
      inputArea: !inputArea
    })
  },

  pronunciationButton: function(e){  //发音人员显示或隐藏单个
    var that = this;
    var pronunciationArea = that.data.pronunciationArea
    that.setData({
      pronunciationArea: !pronunciationArea
    })
  },

  uiDesignButton: function(e){  //UI设计人员显示或隐藏单个
    var that = this;
    var uiDesignArea = that.data.uiDesignArea
    that.setData({
      uiDesignArea: !uiDesignArea
    })
  },

  programMakerButton: function(e){  //程序制作人员显示或隐藏单个
    var that = this;
    var programMakerArea = that.data.programMakerArea
    that.setData({
      programMakerArea: !programMakerArea
    })
  },

  AcknowledgeButton: function(e){  //特别感谢人员显示或隐藏单个
    var that = this;
    var AcknowledgeArea = that.data.AcknowledgeArea
    that.setData({
      AcknowledgeArea: !AcknowledgeArea
    })
  },

  ChronicleButton: function(e){  //参考文献显示或隐藏单个
    var that = this;
    var ChronicleArea = that.data.ChronicleArea
    that.setData({
      ChronicleArea: !ChronicleArea
    })
  },

  introduceButton: function(e){
    var that = this;
    var introduceArea = that.data.introduceArea
    that.setData({
      introduceArea:!introduceArea
    })
  },

  ReverseAll: function(e){  //反选所有卡片
    this.setData({
      introduceArea:!this.data.introduceArea,
      inputArea: !this.data.inputArea,
      pronunciationArea: !this.data.pronunciationArea,
      uiDesignArea: !this.data.uiDesignArea,
      programMakerArea: !this.data.programMakerArea,
      AcknowledgeArea: !this.data.AcknowledgeArea,
      ChronicleArea: !this.data.ChronicleArea
    })
  },

  showAll: function(e){  //展开所有卡片
    this.setData({
      introduceArea:true,
      inputArea: true,
      pronunciationArea: true,
      uiDesignArea: true,
      programMakerArea: true,
      AcknowledgeArea: true,
      ChronicleArea: true
    })
  },

  hideAll: function(e){  //隐藏所有卡片
    this.setData({
      introduceArea:false,
      inputArea: false,
      pronunciationArea: false,
      uiDesignArea: false,
      programMakerArea: false,
      AcknowledgeArea: false,
      ChronicleArea: false
    })
  },

  onShareAppMessage: function(){  //分享给好友
    return {
      title: '沪郊乡音辞典关于沪郊乡音',
      path: '/index/index?id=123'
    }
  },

  onShareTimeline: function(){  //分享到朋友圈
    return {
      title: '沪郊乡音辞典关于沪郊乡音'
    }
  }
})