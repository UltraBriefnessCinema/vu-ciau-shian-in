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
    UiDesignList:[]  //UI设计人员
  },

  onLoad(){
    db.collection('aboutUsPage')
    .get()
    .then(res=>{
      this.setData({
        inputSortList: res.data,
        pronuncationList: res.data,
        programMakerList: res.data,
        ChronicleList: res.data,
        UiDesignList: res.data
      })
    })
  }
})