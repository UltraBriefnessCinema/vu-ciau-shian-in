//Vocabulary-1.js
const db = wx.cloud.database()
const _ = db.command

Page({
  //页面初始数据
  data: {
    isClear:false,  //搜索框的叉叉
    val:"",  //搜索框里向的值
    type:"onVocabularyKnown",  //radio中的默认值为onVocabularyKnown
    list:[],  //要返回数据的列表
    noData:[],  //普通的要set的列表 
    isShowAll:true,   //展开
    isCloseAll: false
  },

  changeType(e){  //设置radio的函数
    this.setData({
      type: e.detail.value,
      list:[],
      noData:[],
      val:[]
    })

    if(e.detail.value != ''){  //输入时
      this.enterInput()  //执行搜索框函数
    }  
  },

  enterInput:function(e){  //要搜索额物事
    var val = e.detail.value  //定义输入额值
    if(val != ''){  //假使值不等于空额能介
      if(this.data.type == "onVocabularyKnown"){  //假使是查查词条知其字能介
      wx.showLoading({
        title: '搜索中...',
      })
        wx.cloud.callFunction({  //链接数据库
          name:"getVocabularyDataFromVocabularyKnown",
          data:{
            value: val,  //链接value
            limit: 100  //额度暂时设为100
          }
        }).then(res=>{
          if(res.result.data != ""){  //做一个判断，假使数据拿到了能介
            let VocabularyKnownList = res.result.data
            this.setData({
              list: VocabularyKnownList,
              noData:["共有结果"+ VocabularyKnownList.length + "条"]
            })
          }else{  //没有请求到能介
            this.setData({
              list:[],
              noData:["没有查询到结果"]
            })
          }
        })
      wx.hideLoading()
      }else if(this.data.type == "onVocabularyUnKnown"){  //假使是查查词条不知其字能介
        wx.showLoading({
          title: '搜索中...',
        })
        wx.cloud.callFunction({  //请求数据库
          name: "getVocabularyDataFromVocabularyUnKnown",
          data: {
            value: val,
            limit: 100
          }
        }).then(res=>{  //返回数据
          if(res.result.data != ""){  //假使请求到了能介
            let VocabularyUnKnownList = res.result.data
            this.setData({
              list: VocabularyUnKnownList,
              noData:["共有结果"+ VocabularyUnKnownList.length + "条"]
            })
          }else{  //没有请求到能介
            this.setData({
              list:[],
              noData:["没有查询到结果"]
            })
          }
        })
      wx.hideLoading()
      }else{  //假使是查释义能介
        wx.showLoading({
          title: '搜索中...',
        })
        wx.cloud.callFunction({
          name: "getVocabularyDataFromMean",
          data:{
            value: val,
            limit: 100
          }
        }).then(res=>{
          if(res.result.data != ""){  //假使请求着
            let meanList = res.result.data
            this.setData({
              list: meanList,
              noData:["共有结果"+ meanList.length + "条"]
            })
          }else{  //假使请求勿着
            this.setData({
              list:[],
              noData:["没有查询到结果"]
            })
          }
        })
      }
      wx.hideLoading()
    }else{   //假使值是空额
      this.setData({
        noData:["输入为空"],
        list:[]
      })
    }
  },

  getInput:function(e){  //连接搜索框里向的数值 
    this.setData({
      val: e.detail.value  //获取输入的数据
    })
    if(this.data.val.length>0){  //假使输入长度比零大
      this.setData({
        isClear: true,  //取消揿钮揿仔
      })
    }else{
      this.setData({  //取消揿钮阴脱
        isClear: false,
      })
    }
  },

  //揩脱函数
  clearTap:function(){  //连接搜索框塰边头揿钮
    this.setData({
      val: '',  //让数据呒啥啥
      isClear: false,  //kheq揿钮话再会
      list: [],
      noData: []
    })
  },
})