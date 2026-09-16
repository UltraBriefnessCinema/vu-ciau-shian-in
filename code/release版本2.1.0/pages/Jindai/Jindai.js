//Jindai.js
const db = wx.cloud.database()
const _ = db.command

Page({
  //页面初始数据
  data: {
    isClear:false,  //搜索框的叉叉
    val:"",  //搜索框里向的值
    list:[],  //要返回数据的列表
    noData:[], //普通的要set的列表 
    page: 0,  //触底时的默认页码
    reachBottom: "",  //触到底时的底部文字
    showContent: true,  //内容页面默认为展示
    showHideBtnPanel: false,
    type: "onFawen",

    //高级搜索>锁定地区右边交互选中的文字
    BookName: "法华字汇",

    //上海全境的value

    //以下为高级搜索>锁定地区中的按钮对应的radio值

    //以下为高级搜索>锁定地区中的radio按钮的值

    //以下为高级搜索>锁定地区中的radio按钮的check的值(很多请折叠)
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
      list:[],  //将“list“设置为空
      showHideBtnPanel: false,
      isClear: false
    })
  },

  enterInput:function(e){  //搜索函数
    var val = this.data.val  //定义输入额值
    if(val != ''){  //输入时
      if(this.data.type == "onFawen"){
        wx.cloud.callFunction({
          name: "getFawen",
          data:{
            value: val,
            limit:20,
            page: this.data.page   //page从0开始
          }
        }).then(res=>{    //返回数据
          if(res.result.data != ""){
            db.collection("Jindai")  //请求为数量
            .where({
              text: new db.RegExp({
                regexp: val,
                options: "i"
              })
            })
            .count()
            .then(res=>{
              this.setData({
                noData:["找到结果"+res.total+"条"],
                showHideBtnPanel: true
              })
            })
            var newList = res.result.data
            this.setData({
              list: newList
            })
          }else{    //没请求到的话
            this.setData({
              list:[],
              noData:["没有查询到结果"],
              showHideBtnPanel: false
            })
          }
        })
      }else if(this.data.type == "onWuyu"){
        wx.cloud.callFunction({
          name:"getWuyu",
          data:{
            value: val,
            limit: 20,
            page: this.data.page
          }
        }).then(res=>{
          if(res.result.data != ""){
            db.collection("Jindai")
            .where({
              hanzi: new db.RegExp({
                regexp: val,
                options :"i"
              })
            })
            .count()
            .then(res=>{
              this.setData({
                noData:["找到结果"+res.total+"条"],
                showHideBtnPanel: true
              })
            })
            this.setData({
              list: res.result.data
            })
          }else{
            this.setData({
              list:[],
              noData:["没有查询到结果"],
              showHideBtnPanel: false
            })
          }
        })
      }else if(this.data.type == "onGuanhua"){
        wx.cloud.callFunction({
          name:"getMan",
          data:{
            value: val,
            limit: 20,
            page: this.data.page
          }
        }).then(res=>{
          if(res.result.data != ""){
            db.collection("Jindai")
            .where({
              madarian: new db.RegExp({
                regexp: val,
                options :"i"
              })
            })
            .count()
            .then(res=>{
              this.setData({
                noData:["找到结果"+res.total+"条"],
                showHideBtnPanel: true
              })
            })
            this.setData({
              list: res.result.data
            })
          }else{
            this.setData({
              list:[],
              noData:["没有查询到结果"],
              showHideBtnPanel: false
            })
          }
        })
      }
    }
  },

  onReachBottom: function(e){  //触底函数
    var val = this.data.val  //定义输入额值
    if(this.data.val != ""){
      if(this.data.type == "onFawen"){  //如果选中的是法文的情况下
          let pageList = this.data.page
          pageList = pageList + 20
          this.setData({  //把获取页的数据链接过去
            page: pageList
          })
          wx.cloud.callFunction({  //链接数据库
            name:"getFawen",
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
            }
          })  
      }else if(this.data.type == "onWuyu"){  //若选中的是沪文的情况下
        let pageList = this.data.page
        pageList = pageList + 20
        this.setData({  //把获取页的数据链接过去
          page: pageList
        })
        wx.cloud.callFunction({  //链接数据库
          name:"getWuyu",
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
          }
        })
      }else{  //若选中的是查国文的情况下
        let pageList = this.data.page
        pageList = pageList + 20
        this.setData({  //把获取页的数据链接过去
            page: pageList
        })
        wx.cloud.callFunction({  //链接数据库
            name:"getMan",
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
            }
        })
      }
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
        showHideBtnPanel: false,
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
      showHideBtnPanel: false,
      list: [],
      noData: [],
      page: 0,  //把page也设置为0
      reachBottom:"",  //将“到底了”设置为空
    })
  },

  //统一控制的各按钮函数
  
  //统一控制的bindchange函数
  advanceChangeUniversal: function(townName){
    this.setData({
      townName: townName,
      noData:[],  //将状态栏设置为空
      page: 0,  //将将来要数据库中的页码也设置为0
      reachBottom:"",  //将“到底了”设置为空
      list:"",  //将“list“设置为空
      showHideBtnPanel: false
    })
  },

  //以下是高级搜索>锁定地区的所有bingchange函数

  showAll: function(){  //显示全部按钮
    let toggleShow = this.data.list
    let len = toggleShow.length  //获取list长度
    for(var step = 0; step<len; step++){
      toggleShow[step].toggle = false  //有多少条就开多少个
    }
    this.setData({
      list: toggleShow
    })
  },

  ReverseAll: function(){  //反选全部按钮
    let toggleReverse = this.data.list
    let len = toggleReverse.length
    for(var step = 0; step<len; step++){
      toggleReverse[step].toggle = !toggleReverse[step].toggle  //使其等于相反的布尔值
    }
    this.setData({
      list: toggleReverse
    })
  },

  hideAll: function(){  //合拢全部按钮
    let toggleHide = this.data.list
    let len = toggleHide.length
    for(var step = 0; step<len; step++){
      toggleHide[step].toggle = true  //有多少条就关多少个
    }
    this.setData({
      list: toggleHide
    })
  },

  onShareAppMessage: function(){  //分享给好友
    return {
      title: '沪郊乡音辞典查词条',
      path: '/pages/Vocabulary-1/Vocabulary-1'
    }
  },

  onShareTimeline: function(){  //分享到朋友圈
    return {
      title: '沪郊乡音辞典查词条'
    }
  }
})