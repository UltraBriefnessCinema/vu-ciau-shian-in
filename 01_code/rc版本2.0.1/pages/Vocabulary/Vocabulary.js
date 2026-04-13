// Vocabulary.js
const db = wx.cloud.database()
const _ = db.command

Page({
    data:{
        isShow: false,  //随机跳词左边的眼睛默认为开
        resultArea: true,  //随机跳词界面开
        onChangeIF: true,  //换一换按钮打开
        list:[],
        showHideBtnPanel: true
    },

    simpleShow: function(e){  //显示或隐藏单个
        let id = e.currentTarget.dataset.index  //获取到元素的id值
        let items = this.data.list
        items[id].toggle = !items[id].toggle
        this.setData({
          list: items
        })
    },

    onLoad(){  //页面监听函数
        db.collection('vocabulary')
        .aggregate()
        .sample({
            size: 5
        })
        .end()
        .then(res=>{
            this.setData({
                list: res.list
            })
        })
    },

    onChange: function(e){
        wx.showLoading({  //跳出来一个提示框
            title: '数据加载中...',
          })
        db.collection('vocabulary')
        .aggregate()
        .sample({
          size: 5
        })
        .end()
        .then(res=>{
            this.setData({
                list: res.list
            })
        })
        wx.hideLoading()  //把该提示框隐藏
    },

    advanceSearchBtn: function(){  //高级搜索眼睛显示/隐藏
      this.setData({
        isShow: false,
        resultArea: true,
        onChangeIF: true,
        showHideBtnPanel: true
      })
    },
    
    advanceOnSearchBtn: function(){  //高级搜索眼睛显示/隐藏
      this.setData({
        isShow: true,
        resultArea: false,
        onChangeIF: false,
        showHideBtnPanel: false
      })
    },

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
        path: '/index/index?id=123'
      }
    },
  
    onShareTimeline: function(){  //分享到朋友圈
      return {
        title: '沪郊乡音辞典查词条'
      }
    }
})