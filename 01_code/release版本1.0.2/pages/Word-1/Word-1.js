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
    showContent: true,  //内容页面默认为展示
    showHideBtnPanel: false,  //展开全部、反选全部、合拢全部三个按钮默认不展示
    clicks: 0,  //设置点击次数默认为0
    //锁定搜索右文字
    countyName: "上海全境",
    townName:"",
    shanghaiValueAll: true,  //上海全境的值
    //锁定地区对应的按钮值
    shanghaiShiValue: false,
    songjiangValue: false,
    jinshanValue: false,
    qingpuValue: false,
    fengxianValue: false,
    chuanshaValue: false,
    nanhuiValue: false,
    jiadingValue: false,
    baoshanValue: false,
    chongmingValue: false,
    //对应的单选框按钮的值 
    shanghaiShiRadio:"shanghaishi_nanshi",
    songjiangRadio:"songjiang_songjiangzhen",
    jinshanRadio:"jinshan_zhujing",
    qingpuRadio:"qingpu_qingpuzhen",
    fengxianRadio:"fengxian_nanqiao",
    chuanshaRadio:"chuansha_chuanshazhen",
    nanhuiRadio:"nanhui_zhoupu",
    jiadingRadio:"jiading_zhenru",
    baoshanRadio:"baoshan_luojing",
    chongmingRadio:"chongming_chenqiao",
    //单选框是否为选中状态
    shanghaishi_nanshi_checked: true,
    shanghaishi_nanshi_xin_checked: false,
    songjiang_songjiangzhen_checked: true,
    jinshan_zhujing_checked: true,
    qingpu_qingpuzhen_checked: true,
    fengxian_nanqiao_checked: true,
    chuansha_chuanshazhen_checked: true,
    nanhui_zhoupu_checked: true,
    jiading_zhenru_checked: true,
    jiading_jiadingzhen_checked: false,
    baoshan_luojing_checked: true,
    chongming_chenqiao_checked: true
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
      list: "",
      noData: [],
      reachBottom: "",
      clicks: 0,
      page:0,
      showHideBtnPanel: false,
      isClear: false
    })
  },

  /**
   * 若输入内容有英文则认为是字音反查
   */
  enterInput:function(e){   //搜索键开
    var val = this.data.val   //输入值
    if(val != ''){  //若值不为空
      if(this.data.clicks == 0){
        if(this.data.type == "onDictionary"){  //若radio为查字表
          var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")  //正则表达式，判断是不是汉字
          if(reg.test(val)){  //若为汉字，则
            if(this.data.shanghaiValueAll == true){
              var val = this.data.val
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
                    noData: ["找到结果"+oldList.length+"条"],  //将无数据的消失
                    showHideBtnPanel: true
                  })   
                })
              }
            }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){
              this.onCharacterTown("上海·南市(老派)")
            }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi_xin"){
              this.onCharacterTown("上海·市区(中新派)")
            }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
              this.onCharacterTown("松江")
            }else if(this.data.jinshanRadio == "jinshan_zhujing"){
              this.setData({
                noData:["金山朱泾缺席"],
                showHideBtnPanel: false
              })
            }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
              this.onCharacterTown("青浦")
            }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
              this.onCharacterTown("奉贤")
            }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
              this.onCharacterTown("浦东·川沙")
            }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
              this.onCharacterTown("南汇·周浦")
            }else if(this.data.jiadingRadio == "jiading_zhenru"){
              this.onCharacterTown("嘉定·真如(南)")
            }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
              this.onCharacterTown("嘉定")
            }else if(this.data.baoshanRadio == "baoshan_luojing"){
              this.onCharacterTown("宝山·罗泾")
            }else{
              this.onCharacterTown("崇明")
            }
            this.setData({
              clicks: 1
            })
          }else{  //若不为汉字，则
            this.setData({
              noData: ["请输入汉字"],
              showHideBtnPanel: false
            })
          }
        }else{  //若radio为查拼音
          var regPinYin = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/  //该正则表达式为输入的必须为数字和字母组合
          if(regPinYin.test(val)){  //若为数字和字母组合，则
            if(this.data.shanghaiValueAll == true){
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
                      noData:["找到结果"+res.total+"条"],
                      showHideBtnPanel: true
                    })
                  })
                  var meanList = res.result.data
                  this.setData({
                    list: meanList
                  })
    
                }else{  //没有请求到
                  this.setData({
                    list:[],
                    noData:["没有查询到结果"],
                    showHideBtnPanel: false
                  })
                }
              })
            }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){
              this.onPinYinTown("上海·南市(老派)")
            }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi_xin"){
              this.onPinYinTown("上海·市区(中新派)")
            }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
              this.onPinYinTown("松江")
            }else if(this.data.jinshanRadio == "jinshan_zhujing"){
              this.setData({
                noData:["金山朱泾缺席"],
                showHideBtnPanel: false
              })
            }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
              this.onPinYinTown("青浦")
            }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
              this.onPinYinTown("奉贤")
            }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
              this.onPinYinTown("浦东·川沙")
            }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
              this.onPinYinTown("南汇·周浦")
            }else if(this.data.jiadingRadio == "jiading_zhenru"){
              this.onPinYinTown("嘉定·真如(南)")
            }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
              this.onPinYinTown("嘉定")
            }else if(this.data.baoshanRadio == "baoshan_luojing"){
              this.onPinYinTown("宝山·罗泾")
            }else{
              this.onPinYinTown("崇明")
            }
            this.setData({
              clicks: 1
            })
          }else{  //若为其他字符
            this.setData({
              noData:["输入无效,请输入字母和数字组合"],
              showHideBtnPanel: false
            })
          }
        }
      }else{
        this.setData({
          noData:["你多次点击按钮,请清空搜索框再搜索"],
          list:"",
          showContent: false,
          showHideBtnPanel: false,
          reachBottom:""
        })
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
        val: '',    //让数据呒啥啥
        isClear: false,    //搭揿钮话再会
        list: [],
        noData: [],
        reachBottom: "",
        showHideBtnPanel: false,
        clicks: 0,
        onReachBottom:""
      })
    }
  },

  onReachBottom: function(e){  //触底函数
    if(this.data.type == "onPinYin"){  //只有当查拼音的时候执行
      if(this.data.shanghaiValueAll == true){
        let pageList = this.data.page
        pageList = pageList + 20
        this.setData({  //把获取页的数据链接过去
          page: pageList
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
          }
        })
      }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){
        this.onPinYinReachTown("上海·南市(老派)")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi_xin"){
        this.onPinYinReachTown("上海·市区(中新派)")
      }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
        this.onPinYinReachTown("松江")
      }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
        this.onPinYinReachTown("青浦")
      }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
        this.onPinYinReachTown("奉贤")
      }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
        this.onPinYinReachTown("浦东·川沙")
      }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
        this.onPinYinReachTown("南汇·周浦")
      }else if(this.data.jiadingRadio == "jiading_zhenru"){
        this.onPinYinReachTown("嘉定·真如(南)")
      }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
        this.onPinYinReachTown("嘉定")
      }else if(this.data.baoshanRadio == "baoshan_luojing"){
        this.onPinYinReachTown("宝山·罗泾")
      }else{
        this.onPinYinReachTown("崇明")
      }
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
      reachBottom: "",
      showHideBtnPanel: false,
      clicks: 0,
      onReachBottom:""
    })
  },

  //统一控制各按钮函数
  advanceBtnUniversal: function(townValue){
    this.setData({
      //重置所有县的值
      shanghaiShiRadio: townValue,
      songjiangRadio: townValue,
      jinshanRadio: townValue,
      qingpuRadio: townValue,
      fengxianRadio: townValue,
      chuanshaRadio: townValue,
      nanhuiRadio: townValue,
      jiadingRadio: townValue,
      baoshanRadio: townValue,
      chongmingRadio: townValue,
      page:0,
      noData:[],  //状态栏
      reachBottom:"",  //到底了
      onReachBottom: "",
      list:[],  //列表
      showHideBtnPanel: false,  //三个按钮
      clicks: 0,
      isClear: false
    })
  },

  shanghaiAllBtn: function(e){  //上海全境
    this.setData({
      shanghaiShiRadio:"shanghaishi_nanshi",
      songjiangRadio:"songjiang_songjiangzhen",
      jinshanRadio:"jinshan_zhujing",
      qingpuRadio:"qingpu_qingpuzhen",
      fengxianRadio:"fengxian_nanqiao",
      chuanshaRadio:"chuansha_chuanshazhen",
      nanhuiRadio:"nanhui_zhoupu",
      jiadingRadio:"jiading_zhenru",
      baoshanRadio:"baoshan_luojing",
      chongmingRadio:"chongming_chenqiao",
      countyName:"上海全境",
      townName:"",
      shanghaiValueAll:true,
      noData:[],
      reachBottom:"",
      onReachBottom:"",
      list:[], 
      page:0,
      showHideBtnPanel:false,
      shanghaiShiValue:false,
      songjiangValue:false,
      jinshanValue:false,
      qingpuValue:false,
      fengxianValue:false,
      chuanshaValue:false,
      nanhuiValue:false,
      jiadingValue:false,
      baoshanValue:false,
      chongmingValue:false,
      clicks:0,
      isClear: false
    })
  },

  shanghaiShiBtn: function(e){
    this.advanceBtnUniversal("shanghaishi_nanshi")
    this.setData({
      shanghaishi_nanshi_checked:true,
      shanghaishi_nanshi_xin_checked:false,
      countyName:"上海市",
      townName:"南市",
      shanghaiValueAll:false,
      shanghaiShiValue: true, 
      songjiangValue: false, 
      jinshanValue: false,
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false,
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  songjiangBtn: function(e){  //松江
    this.advanceBtnUniversal("songjiang_songjiangzhen")
    this.setData({
      countyName:"松江",
      townName:"松江镇",
      shanghaiValueAll:false,
      shanghaiShiValue: false, 
      songjiangValue: true, 
      jinshanValue: false,
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false,
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  jinshanBtn:function(e){  //金山
    this.advanceBtnUniversal("jinshan_zhujing")
    this.setData({
      countyName:"金山",
      townName:"朱泾",
      shanghaiValueAll:false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: true,
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false,
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  qingpuBtn: function(e){
    this.advanceBtnUniversal("qingpu_qingpuzhen")
    this.setData({
      countyName:"青浦",
      townName:"青浦镇",
      shanghaiValueAll: false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: false, 
      qingpuValue: true,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false,
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  fengxianBtn: function(e){
    this.advanceBtnUniversal("fengxian_nanqiao")
    this.setData({
      countyName:"奉贤",
      townName:"南桥", 
      shanghaiValueAll: false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: false, 
      qingpuValue: false,
      fengxianValue: true,
      chuanshaValue: false,
      nanhuiValue: false,
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  chuanshaBtn: function(e){
    this.advanceBtnUniversal("chuansha_chuanshazhen")
    this.setData({
      countyName:"川沙",
      townName:"川沙镇", 
      shanghaiValueAll: false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: false, 
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: true,
      nanhuiValue: false,
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  nanhuiBtn: function(e){
    this.advanceBtnUniversal("nanhui_zhoupu")
    this.setData({
      countyName:"南汇",
      townName:"周浦",
      shanghaiValueAll: false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: false, 
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: true, 
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  jiadingBtn: function(e){
    this.advanceBtnUniversal("jiading_zhenru")
    this.setData({
      jiading_zhenru_checked: true,
      jiading_jiadingzhen_checked: false,
      countyName:"嘉定",
      townName:"真如",
      shanghaiValueAll: false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: false, 
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false, 
      jiadingValue: true,
      baoshanValue: false,
      chongmingValue: false
    })
  },

  baoshanBtn: function(e){
    this.advanceBtnUniversal("baoshan_luojing")
    this.setData({
      countyName:"宝山",
      townName:"罗泾",
      shanghaiValueAll: false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: false, 
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false, 
      jiadingValue: false,
      baoshanValue: true,
      chongmingValue: false
    })
  },

  chongmingBtn: function(e){
    this.advanceBtnUniversal("chongming_chenqiao")
    this.setData({
      countyName:"崇明",
      townName:"城桥",
      shanghaiValueAll: false,
      shanghaiShiValue: false, 
      songjiangValue: false, 
      jinshanValue: false, 
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false, 
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: true
    })
  },

  //统一bindchange函数
  advanceChangeUniversal: function(townName){
    this.setData({
      townName: townName,
      noData:[],
      page: 0,
      reachBottom:"",
      onReachBottom:"",
      list:[],
      showHideBtnPanel:false,
      clicks:0,
      isClear: false
    })
  },

  //bindchange函数
  shanghaiShiChange:function(e){
    if(e.detail.value == "shanghaishi_nanshi"){
      this.advanceChangeUniversal("南市")
      this.setData({
        shanghaiShiRadio:"shanghaishi_nanshi"
      })
    }else{
      this.advanceChangeUniversal("中新派")
      this.setData({
        shanghaiShiRadio:"shanghaishi_nanshi_xin"
      })
    }
  },
  songjiangChange:function(e){},
  jinshanChange: function(e){},
  qingpuChange: function(e){},
  fengxianChange: function(e){},
  chuanshaChange:function(e){},
  nanhuiChange:function(e){},
  jiadingChange:function(e){
    if(e.detail.value == "jiading_zhenru"){
      this.advanceChangeUniversal("真如")
      this.setData({
        jiadingRadio:"jiading_zhenru"
      })
    }else{
      this.advanceChangeUniversal("嘉定镇")
      this.setData({
        jiadingRadio:"jiading_jiadingzhen"
      })
    }
  },
  baoshanChange:function(e){},
  chongmingChange:function(e){},

  onCharacterTown:function(whichTownInput){  //统一的镇搜索函数(查汉字)
    let val = this.data.val
    let text = val.split("")
    let len = text.length
    var character = ""
    for (var step = 0; step<len; step++){
      character = text[step]
      db.collection("dictionary")
      .where(_.and([
        {
          where: whichTownInput
        },
        {
          word: new db.RegExp({
            regexp: character,
            options:"i"
          })
        }
      ]))
      .get()
      .then(res=>{
        let newList = res.data
        let oldList = this.data.list
        oldList = oldList.concat(newList)
        this.setData({
          list: oldList,  //将列表设置为数据
          noData: ["找到结果"+oldList.length+"条"],  //将无数据的消失
          showHideBtnPanel: true
        })
      })
    }
    this.setData({
      clicks: 1
    })
  },

  onPinYinTown:function(whichTownInput){  //统一的镇搜索函数(查吴拼)
    let val = this.data.val
    db.collection("dictionary")
    .where(_.and([
      {
        where: whichTownInput
      },
      {
        pinYinSearch: val
      }
    ])).get().then(res=>{
      if(res.data != ""){  //再请求一次以获取数量
        db.collection("dictionary")
        .where(_.and([
          {
            where: whichTownInput
          },
          {
            pinYinSearch: val
          }
        ])).count().then(res=>{
          this.setData({
            noData:["找到结果"+res.total+"条"],
            showHideBtnPanel: true
          })
        })
        let meanList = res.data
        this.setData({
          list: meanList
        })
      }else{
        this.setData({
          list:[],
          noData:["没有查询到结果"],
          showHideBtnPanel: false
        })
      }
    })
    this.setData({
      clicks: 1
    })
  },

  onPinYinReachTown: function(whichTownInput){  //触底函数只有查吴拼时
    let val = this.data.val
    let pageList = this.data.page
    pageList = pageList + 20
    this.setData({  //把获取页的数据链接过去
      page: pageList
    })
    db.collection("dictionary")
    .where(_.and([
      {
        where: whichTownInput
      },
      {
        pinYinSearch: val
      }
    ])).skip(this.data.page).get().then(res=>{
      let oldList = this.data.list
      let newList = res.data
      oldList = oldList.concat(newList)
      if(newList != ""){
        this.setData({
          list: oldList
        })
      }else{
        this.setData({
          reachBottom:"我也是有底线的~"
        })
      }
    })
  },

  showAll: function(){  //显示全部按钮
    let toggleShow = this.data.list
    let len = toggleShow.length  //获取list长度
    for(var step = 0; step<len; step++){
      toggleShow[step].toggle = true  //有多少条就开多少个
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
      toggleHide[step].toggle = false  //有多少条就关多少个
    }
    this.setData({
      list: toggleHide
    })
  },

  onShareAppMessage: function(){  //分享给好友
    return {
      title: '沪郊乡音辞典查字音',
      path: '/index/index?id=123'
    }
  },

  onShareTimeline: function(){  //分享到朋友圈
    return {
      title: '沪郊乡音辞典查字音'
    }
  }
})