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
    noData:[], 　//普通的要set的列表 
    page: 0,  //触底时的默认页码
    reachBottom: "",  //触到底时的底部文字
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

  changeType(e){  //切换radio用的函数
    this.setData({
      type: e.detail.value,  //将类型设置为获取
      noData:[],  //将状态栏设置为空
      page: 0,  //将将来要数据库中的页码也设置为0
      reachBottom:"",  //将“到底了”设置为空
      list:"",  //将“list“设置为空
      reachBottom: ""
    })

    if(e.detail.value != ''){  //输入时
      this.enterInput()  //执行搜索框函数
    }  
  },

  enterInput:function(e){  //搜索函数
    var val = e.detail.value  //定义输入额值
    if(val != ''){  //假使值不等于空额能介
      if(this.data.type == "onVocabularyKnown"){  //假使是查查词条知其字能介
        this.setData({
          page: 0  //先把page页设置为零
        })
        wx.cloud.callFunction({  //链接数据库
          name:"getVocabularyDataFromVocabularyKnown",
          data:{
            value: val,  //链接value
            limit: 20,  //额度暂时设为20
            page: this.data.page  //skip的page暂时为第0页开始
          }
        }).then(res=>{
          if(res.result.data != ""){  //做一个判断，假使数据拿到了能介
            db.collection("vocabulary")　　//再请求一次数据库以获取数量
            .where({
              vocabulary: new db.RegExp({  //正则表达式模糊搜索
                regexp: val,
                options:"i"
              })
            })
            .count()
            .then(res=>{
              this.setData({
                noData:["共有结果"+res.total+"条"]
              })
            })

            var VocabularyKnownList = res.result.data
            this.setData({  //原先的20条数据
              list: VocabularyKnownList
            }) 
        }else{  //没有请求到能介
          this.setData({
            list:[],
            noData:["没有查询到结果"]
          })
        }
      })    

      }else if(this.data.type == "onVocabularyUnKnown"){  //假使是查查词条不知其字能介
        wx.showLoading({
          title: '搜索中...',
        })
        wx.cloud.callFunction({  //请求数据库
          name: "getVocabularyDataFromVocabularyUnKnown",
          data: {
            value: val,
            limit: 20,
            page: this.data.page  //skip的page暂时为第0页开始
          }
        }).then(res=>{  //返回数据
          if(res.result.data != ""){  //假使请求到了能介
            db.collection("vocabulary")　　//再请求一次数据库以获取数量
            .where({
              originalEntry: new db.RegExp({  //正则表达式模糊搜索
                regexp: val,
                options:"i"
              })
            })
            .count()
            .then(res=>{
              this.setData({
                noData:["共有结果"+res.total+"条"]
              })
            })
            var VocabularyUnKnownList = res.result.data
            this.setData({
              list: VocabularyUnKnownList
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
            limit: 20,
            page: this.data.page  //skip的page暂时为第0页开始
          }
        }).then(res=>{
          if(res.result.data != ""){  //假使请求着
            db.collection("vocabulary")　　//再请求一次数据库以获取数量
            .where({
              explanation: new db.RegExp({  //正则表达式模糊搜索
                regexp: val,
                options:"i"
              })
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

  onReachBottom: function(e){  //触底函数
    if(this.data.type == "onVocabularyKnown"){  //如果选中的是知其字的情况下
      let pageList = this.data.page
      pageList = pageList + 20
      this.setData({  //把获取页的数据链接过去
        page: pageList
      })
      wx.showLoading({  //做一个加载数据的窗口
        title: '数据加载中',
      })
      wx.cloud.callFunction({  //链接数据库
        name:"getVocabularyDataFromVocabularyKnown",
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
    }else if(this.data.type == "onVocabularyUnKnown"){  //若选中的是不知其字的情况下
      let pageList = this.data.page
      pageList = pageList + 20
      this.setData({  //把获取页的数据链接过去
        page: pageList
      })
      wx.showLoading({  //做一个加载数据的窗口
        title: '数据加载中',
      })
      wx.cloud.callFunction({  //链接数据库
        name:"getVocabularyDataFromVocabularyUnKnown",
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
    }else{  //若选中的是查释义的情况下
      let pageList = this.data.page
      pageList = pageList + 20
      this.setData({  //把获取页的数据链接过去
        page: pageList
      })
      wx.showLoading({  //做一个加载数据的窗口
        title: '数据加载中',
      })
      wx.cloud.callFunction({  //链接数据库
        name:"getVocabularyDataFromMean",
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
    }
  },

  // simpleShow: function(e){  //个别的展开与收拢
  //   if(this.data.type == "onVocabularyKnown"){  //若选中了查词条知其字的情况下
  //     var id = e.
  //     console.log(id)
  //   }else if(this.data.type == "onVocabularyUnKnown"){  //若选中了查词条不知其字的情况下

  //   }else{  //若选中了查释义的情况下

  //   }
  // },

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
        val: '',  //让数据呒啥啥
        isClear: false,  //kheq揿钮话再会
        list: [],
        noData: [],
        page: 0,  //把page也设置为0
        reachBottom:""  //将“到底了”设置为空
      })
    }
  },

  //揩脱函数
  clearTap:function(){  //连接搜索框塰边头揿钮
    this.setData({
      val: '',  //让数据呒啥啥
      isClear: false,  //kheq揿钮话再会
      list: [],
      noData: [],
      page: 0,  //把page也设置为0
      reachBottom:""  //将“到底了”设置为空
    })
  },
})