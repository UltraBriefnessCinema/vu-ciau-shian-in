// Word-1.js
//初始化数据库
const db = wx.cloud.database()
const _ = db.command

Page({
  //页面初始数据
  data: {
    isClear:false,    //搜索框箇叉着角
    val:"",   //搜索框里向箇值
    type:"onDictionary",  //radio中的默认值为onDictionary
    list:[],
    noData:[]
  },

  changeType(e){  //设置radio的函数
    this.setData({
      type: e.detail.value,
      list: [],
      noData: [],
      val: []
    })
    
    if(e.detail.value != ''){  //输入时
      this.enterInput()  //执行搜索框函数
    }  
  },

  getDictionaryFromPinYin: function(){  //拼音获取 
    wx.cloud.callFunction({
      name: "getDictionaryDataFromPinYin",
      data:{
        value: val,
      }
    })
    .then(res=>{
      if(res.result.data != ""){  //做判断，若请求到了
        this.setData({
          list: res.result.data,
          noData: ["共有结果"+ res.result.data.length +"条"]
        })
      }else{  //没有请求到
        this.setData({
          list:[],
          noData:["没有查询到结果"]
        })
      }
    })
    wx.hideLoading()
  },

  /**
   * 若输入内容有英文则认为是字音反查
   */
  enterInput:function(e){   //搜索键开
    var val = e.detail.value   //输入值
    if(val != ''){  //若值不为空
      if(this.data.type == "onDictionary"){  //若radio为查字表
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")  //正则表达式，判断是不是汉字
        if(reg.test(val)){  //若为汉字，则
          wx.showLoading({  //执行一个加载中提示
            title: '正在搜索...',
          })
          var text = val.split("")  //将每个字分割
          var len = text.length  //获取字的长度
          var character = ""  //预定义汉字为空
          //执行一个遍历
          for (var step = 0; step<len ; step++){  //让step等于0，若步数比长度小，步数加1
            character = text[step]  //分割出的第1个字即为一个汉字
            //下面链接数据库
            wx.cloud.callFunction({
              name:"getDictionaryDataFromWord",
              data: {
                val: character  //将字放进去
              }
            }).then(res=>{
              var newList = res.result.data
              var oldList = this.data.list
              oldList = oldList.concat(newList)
              this.setData({
                list: oldList,  //将列表设置为数据
                noData: ["共有结果"+oldList.length+"条"]  //将无数据的消失
              })
            })
          }
          wx.hideLoading()  //关闭loading
        }else{  //若不为汉字，则
          this.setData({
            noData: ["请输入汉字"]
          })
        }
      }else{  //若radio为查拼音
        var regPinYin = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/  //该正则表达式为输入的必须为数字和字母组合
        if(regPinYin.test(val)){  //若为数字和字母组合，则
          wx.showLoading({  //执行一个加载中提示
            title: '正在搜索...',
          })
          this.getDictionaryFromPinYin()  //调用函数
        }else{  //若为其他字符
          this.setData({
            noData:["输入无效,请输入字母和数字组合"]
          })
        }
      }
    }else{  //若值为空
      this.setData({
        noData:["输入为空"],
        list:[]
      })
    }
  },

  //输入函数
  getInput:function(e){    //连接搜索框里向数值
    this.setData({
      val: e.detail.value   //获得输入箇数据
    })
    if(this.data.val.length>0){    //假使输入长度比零大
      this.setData({
        isClear: true,    //取消揿钮揿仔
      })
    }else{
      this.setData({
        isClear: false,    //取消揿钮阴脱
      })
    }
  },
  
  //触底函数
  onReachBottom: function(){
    if(this.data.type == "onPinYin"){  //若value为查吴拼对可执行
    }  
  },

  //揩脱函数
  clearTap:function(){    //连接搜索框塰边头揿钮
    this.setData({
      val: '',    //让数据呒啥啥
      isClear: false,    //搭揿钮话再会
      list: [],
      noData: []
    })
  }
})