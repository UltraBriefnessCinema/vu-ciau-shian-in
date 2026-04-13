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
    list:[],  //list在初始状态下是空的
    noData:[],  //radio下面一栏在默认状态下也是空的
    page:0,  //默认的page是0
    reachBottom:"",  //底部默认无
    showContent: true  //内容页面默认为展示
  },

  simpleShow: function(e){  //显示或隐藏单个
    let id = e.currentTarget.dataset.index  //获取到元素的id值
    let items = this.data.list
    items[id].toggle = !items[id].toggle
    this.setData({
      list: items
    })
  },

  changeType(e){  //设置radio的函数
    this.setData({
      type: e.detail.value,
      val: "",
      list: [],
      noData: [],
      reachBottom: ""
    })
    
    if(e.detail.value != ''){  //输入时
      this.enterInput()  //执行搜索框函数
    }  
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
                val: character,  //将字放进去
                limit: 100
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
          wx.cloud.callFunction({
            name: "getDictionaryDataFromPinYin",
            data:{
              value: val,
              limit:20,
              page: this.data.page
            }
          })
          .then(res=>{
            if(res.result.data != ""){  //做判断，若请求到了
              db.collection("dictionary")　　//再请求一次数据库以获取数量
              .where({
                pinYinSearch: val
              })
              .count()
              .then(res=>{
                this.setData({
                  noData:["共有结果"+res.total+"条"]
                })
              })
              var meanList = res.result.data
              this.setData({
                list: meanList
              })

            }else{  //没有请求到
              this.setData({
                list:[],
                noData:["没有查询到结果"]
              })
            }
          })
          wx.hideLoading()
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
        val: '',  //让数据呒啥啥
        isClear: false,  //kheq揿钮话再会
        list: [],
        noData: [],
        page: 0,  //把page也设置为0
        reachBottom:""  //将“到底了”设置为空
      })
    }
  },

  onReachBottom: function(e){  //触底函数
    if(this.data.type == "onPinYin"){  //只有当查拼音的时候执行
      let pageList = this.data.page
      pageList = pageList + 20
      this.setData({  //把获取页的数据链接过去
        page: pageList
      })
      wx.showLoading({  //做一个加载数据的窗口
        title: '数据加载中',
      })
      wx.cloud.callFunction({  //链接数据库
        name:"getDictionaryDataFromPinYin",
        data:{
          value: this.data.val,  //链接value
          limit: 20,  //额度暂时设为20
          page: pageList  //skip的page第0页开始
        }
      }).then(res=>{  //获取到数据后
        let oldList = this.data.list  //定义一个旧数组为本页面的预置
        let newList = res.result.data  //定义一个新数组为获取到的data
        oldList = oldList.concat(newList)  //将新数组加到旧数组里
        if(newList != ""){  //若新数组(获取到的data)不为空的话
          this.setData({
            list: oldList  //就设置为旧加新的数组
          })
        }else{  //若新数组(获取到的data)为空时
          this.setData({
            reachBottom: "我也是有底线的～"  //触底提示
          })
          wx.hideLoading()  //把Showloading的弹窗关掉
        }
      wx.hideLoading()  //把Showloading的弹窗关掉
      })
    }else{  //选中查单字的时候
      this.setData({  
        reachBottom: "我也是有底线的～"  //触底提示
      })
    }
  },

  //揩脱函数
  clearTap:function(){    //连接搜索框塰边头揿钮
    this.setData({
      val: '',    //让数据呒啥啥
      isClear: false,    //搭揿钮话再会
      list: [],
      noData: [],
      reachBottom: ""
    })
  }
})