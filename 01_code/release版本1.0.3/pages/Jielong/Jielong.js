//Written by Mr.Gao in Xiaokunshan, Songjiang, Shanghai, China, Asia, Earth, Universe

const db = wx.cloud.database()
const _ = db.command

Page({
  /**
   * Page initial data
   */
  data: {
    isClear: false,  //input栏右边的叉叉
    val: "",  //输入的值
    focusUI: false,  //模糊搜索的值
    focusList:[],  //模糊搜索的列表
    list:[],  
    tsiqLonList: [],
    multiView: false,
    tsiqLonBtn: false,
    reachText:"",
    jieLongTitle: false,
    threeBtns: false,
    step: 0  //接龙的数组序
  },

  getInput: function(e){  //focus函数
    this.setData({
      val: e.detail.value,
      isClear: true,
      focusUI: true
    })
    if(this.data.val.length>0){
      db.collection("vocabulary")
      .where({
        originalEntry: new db.RegExp({  //正则表达式模糊搜索
          regexp: this.data.val,
          options:"i"
        })
      })
      .get()
      .then(res=>{
        if(res.data != ""){
          this.setData({
            focusList: res.data,
          })
        }else{
          this.setData({
            focusList:[{vocabulary:"没有找到结果"}],
          })
        }
      })
    }else{
      this.setData({
        isClear: false,
        val: "",
        focusUI: false,
        mainList: [],
        tsiqLonBtn: false,
        reachText: "",
        tsiqLonList: [],
        focusList: [],
        list: [],
        threeBtns: false,
        reachText:"",
        jieLongTitle: false
      })
    }
  },

  simpleShow: function(e){  //focus栏中点击的值
    var id = e.currentTarget.dataset.index  //获取到元素的id值
    let focusList = this.data.focusList
    let indexId = focusList[id]
    this.setData({
      list: indexId,
      jieLongTitle: true,
      threeBtns: true,
      tsiqLonBtn: true,
      reachText:""
    })

    db.collection("vocabulary")
    .where({
      originalEntry: this.data.list.originalEntry,
      vocabulary: this.data.list.vocabulary,
      place: this.data.list.place,
      example: this.data.list.example,
      explanation: this.data.list.explanation,
      location: this.data.list.location,
      pinYin: this.data.list.pinYin,
      source: this.data.list.source,
      whichCounty: this.data.list.whichCounty,
      whichTown: this.data.list.whichTown
    })
    .get()
    .then(res=>{
      this.setData({
        tsiqLonList: res.data
      })
    })
  },

  tsiqLon: function(e){
    try {
      var laIndex = this.data.tsiqLonList[this.data.step].originalEntry  //第几个数组的原条目
      var laIndexStr = laIndex.charAt(laIndex.length - 1)  //第几个数组的原条目的最后一个字

      db.collection("vocabulary")
      .where({
        originalEntry: new RegExp("^"+laIndexStr+".{1,10000}$")  //仅匹配第一个字为laindexstr的条目
      })
      .limit(1)
      .get()
      .then(res=>{
        if (res.data != ""){
          var oldList = this.data.tsiqLonList
          var newList = res.data
          oldList = oldList.concat(newList)
          this.setData({
            tsiqLonList: oldList,
            step: this.data.step + 1
          })
        }else(
          this.setData({
            tsiqLonBtn: false,
            reachText: "库中没有可供生成的成语了~"
          })
        )  
      })
    } catch (e) {
      this.setData({
        tsiqLonBtn: false,
        reachText: "库中没有可供生成的成语了~"
      })
    }
    
  },

  multiSimpleView: function(e){  //控制单个显示隐藏
    let id = e.currentTarget.dataset.index  //获取到元素的id值
    let items = this.data.tsiqLonList
    items[id].toggle = !items[id].toggle
    this.setData({
      tsiqLonList: items
    })
  },

  clearTap: function(e){  //清空搜索框和叉叉号
    this.setData({
      isClear: false,
      val: "",
      focusUI: false,
      tsiqLonBtn: false,
      reachText: "",
      threeBtns: false,
      jieLongTitle: false,
      tsiqLonList: []
    })
  },

  showAll: function(){  //显示全部按钮
    let toggleShow = this.data.tsiqLonList
    let len = toggleShow.length  //获取list长度
    for(var step = 0; step<len; step++){
      toggleShow[step].toggle = false  //有多少条就开多少个
    }
    this.setData({
      tsiqLonList: toggleShow
    })
  },
  
  ReverseAll: function(){  //反选全部按钮
    let toggleReverse = this.data.tsiqLonList
    let len = toggleReverse.length
    for(var step = 0; step<len; step++){
      toggleReverse[step].toggle = !toggleReverse[step].toggle  //使其等于相反的布尔值
    }
    this.setData({
      tsiqLonList: toggleReverse
    })
  },
  
  hideAll: function(){  //合拢全部按钮
    let toggleHide = this.data.tsiqLonList
    let len = toggleHide.length
    for(var step = 0; step<len; step++){
      toggleHide[step].toggle = true  //有多少条就关多少个
    }
    this.setData({
      tsiqLonList: toggleHide
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {
    return {
      title: '沪郊乡音辞典词语接龙(beta版)',
      path: 'pagses/Jielong/Jielong'
    }
  },

  onShareTimeline(){
    return {
      title: '沪郊乡音辞典词语接龙(beta版)',
      path: 'pages/Jielong/Jielong'
    }
  }
})