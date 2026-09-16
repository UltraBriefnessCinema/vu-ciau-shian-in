// Vocabulary.js
const db = wx.cloud.database()
const _ = db.command

Page({
    data:{
        list:[]
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
    }
})