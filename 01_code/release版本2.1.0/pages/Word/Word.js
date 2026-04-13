// Word.js
// written by Mr.Gao in Xiaokunshan, Songjiang, Shanghai, China
const db = wx.cloud.database()
const _ = db.command

Page({
  data:{
    eyeOn: true,  //眼睛默认为开
    eyeOff: false,  //眼睛默认为关
    mainList: [],  //需要for的list
    showHidePanel: true,  //三个按钮界面
    refresh: true,  //换一换按钮
    randomWord: true  //随机跳字界面开
  },
  
  turnEyeOn: function(){  //眼睛睁的时候，我们现在所做的是关闭后的事
    this.setData({
      eyeOn: false,  //开着的那个眼睛，变成关的
      eyeOff: true,  //关闭的那个眼睛，变成开的
      refresh: false,  //换一换这个标志，隐藏掉
      showHidePanel: false,  //由三个按钮组成的按钮阵，隐藏掉
      randomWord: false  //随机跳字总界面，隐藏掉
    })
  },

  turnEyeOff: function(){  //眼睛闭的时候，我们现在所做的打开后的事
    this.setData({
      eyeOn: true,  //开着的那个眼睛，开着
      eyeOff: false,  //关着的那个眼睛，关掉
      refresh: true,  //换一换这个标志，显示
      showHidePanel: true,  //由三个按钮组成的按钮库，显示
      randomWord: true  //随机跳字总界面，显示
    })
  },

  simpleShow: function(e){  //显示或隐藏单个
    let id = e.currentTarget.dataset.index  //获取到元素的id值
    let items = this.data.mainList
    items[id].toggle = !items[id].toggle
    this.setData({
      mainList: items
    })
  },

  onLoad(){  //页面监听函数
    db.collection('dictionary')
    .aggregate()
    .sample({
      size: 6
    })
    .end()
    .then(res=>{
      this.setData({
        mainList: res.list,
        
      })
    })
  },

  refresh: function(e){   //换一换函数
    wx.showLoading({
      title: '数据加载中...',
    })
    db.collection('dictionary')
    .aggregate()
    .sample({
      size: 6
    })
    .end()
    .then(res=>{
      this.setData({
        mainList: res.list
      })
    })
    wx.hideLoading()  //关闭提示框
  },

  showAll: function(){  //显示全部
    let toggleHide = this.data.mainList
    let len = toggleHide.length
    for (var step=0; step<len; step++){
      toggleHide[step].toggle = true  //有几条关几个
    }
    this.setData({
      mainList: toggleHide
    })
  },

  reverseAll: function(){  //反选全部
    let toggleReverse = this.data.mainList
    let len = toggleReverse.length
    for (var step=0; step<len; step++){
      toggleReverse[step].toggle = !toggleReverse[step].toggle  //有几条相反几个
    }
    this.setData({
      mainList: toggleReverse
    })
  },

  hideAll: function(){  //隐藏全部
    let toggleShow = this.data.mainList
    let len = toggleShow.length  //获取list长度
    for (var step=0; step<len; step++){
      toggleShow[step].toggle = false  //有几条开几个
    }
    this.setData({
      mainList: toggleShow
    })
  },

  onShareAppMessage: function(){  //分享给好友
    return {
      title: '沪郊乡音辞典查字音',
      path: '/pages/Word/Word'
    }
  },

  onShareTimeline: function(){  //分享到朋友圈
    return {
      title: '沪郊乡音辞典查字音'
    }
  }
})