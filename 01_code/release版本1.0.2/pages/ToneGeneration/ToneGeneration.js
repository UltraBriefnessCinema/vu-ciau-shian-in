// pages/ToneGeneration/ToneGeneration.js

//初始化数据库
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    isClear:false,   //搜索框箇叉着角
    val:"",  //搜索框里向的值
    noData:[],  //解决数据查询成功失败的一串文字
    
    multiToneList:[],  //变调list
    multiToneFirstlist:[],  //变调生成的第1个字的list
    multiToneSecondList: [],  //变调生成的第2个字的list
    multiToneThirdList: [],  //变调生成的第3个字的list

    firstLen: 0,  //第1个字长度
    secondLen: 0,  //第2个字长度
    thirdLen: 0,  //第3个字长度

    mainPanel: false,
    
    //锁定地区右边交互选中的文字
    countyName:"松江全境",    //县
    townName:"",    //镇

    //以下是所有radio的check值
    songjiang_all_checked: true,
    songjiang_songjiangzhen_checked: false,

    //以下为锁定地区radio按钮的值
    songjiangRadio:"songjiang_all",

    //以下为锁定地区中的按钮对应的radio值
    songjiangValue: true,  //松江按钮对应的radio值

    //以下为锁定地区中的radio按钮的值
    songjiangRadio: "songjiang_all"
  },

  getInput: function(e){  //连接搜索框里向的数值
    this.setData({
      val: e.detail.value  //获取输入的数据
    })
    if(this.data.val.length>0){  //假使输入长度比零大
      this.setData({
        isClear: true,  //取消按钮揿仔
      })
    }else{
      this.setData({  //取消按钮阴脱
        isClear: false,
        val: "",
        multiToneList: [],
        multiToneFirstlist:[],
        multiToneSecondList:[],
        multiToneThirdList:[],
        mainPanel: false,
        noData:[],  //清空出错的数据提示
      })
    }
  },

  //揩脱函数
  clearTap: function(){  //连接搜索框塰边头揿钮
    this.setData({
      val:"",
      isClear: false,
      multiToneList: [],
      multiToneFirstlist:[],
      multiToneSecondList:[],
      multiToneThirdList:[],
      mainPanel: false,
      noData:[],  //清空出错的数据提示
    })
  },

  //radio中bindchange函数总控
  radioChangeUniversal: function(townName){
    this.setData({
      val:'',
      townName: townName,
      isClear: false,
      multiToneList: [],
      multiToneFirstlist:[],
      multiToneSecondList:[],
      multiToneThirdList:[],
      noData:"",
      mainPanel: false,
    })
  },

  //以下中radio中的所有bindchange函数 
  songjiangChange: function(e){
    if(e.detail.value == "songjiang_all"){  //松江全境
      this.radioChangeUniversal("全境")
      this.setData({
        countyName:"松江",
        songjiangRadio: "songjiang_all"
      })
    }else{  //松江镇
      this.radioChangeUniversal("松江镇")
      this.setData({
        countyName:"松江",
        songjiangRadio: "songjiang_songjiangzhen"
      })
    }
  },

  enterInput: function(e){  //搜索函数
    var val = this.data.val  //定义输入的值 
    if(val != ''){  //若输入值不为空，且没点过按钮
      var regCha = new RegExp("[\\u4E00-\\u9FFF]+", "g")  //判断是不是汉字
        if(regCha.test(val)){  //若输入的是汉字
          if(val.length == 2){  //若长度为2个字符
            if(this.data.songjiangRadio == "songjiang_all"){
              this.generateTonesTwo("松江")
            }else{
              this.generateTonesTwo("松江")
            }
          }else if(val.length == 3){
            if(this.data.songjiangRadio == "songjiang_all"){
              this.generateTonesThree("松江")
            }else{
              this.generateTonesThree("松江")
            }
          }else{  //若长度不为2
            this.setData({
              noData:["请输入二字或三字词汇"]
            })
          }
        }else{  //若输入的不全是汉字
          this.setData({
            noData:["请输入全汉字"]
          })
        }
    }else{  //若输入值是空的
      this.setData({
        noData:["输入为空"]
      })
    }
  },
  
  //变调生成核心函数(2个字)
  generateTonesTwo: function(where){
    var val = this.data.val
    var twCha = val.split("")
    //连接数据库获取第一个字
    db.collection("dictionary")
    .where(_.and([
      {
        where:where
      },
      {
        word: new db.RegExp({
          regexp: twCha[0],  //第一个字
          option:"i"
        })
      }
    ])).get().then(res=>{
      if(res.data != ""){
        this.setData({
          firstLen: res.data.length,  //第一个字的list长度
          multiToneFirstlist: res.data,  //储存第一个字的list
        })
      }else{
        this.setData({
          noData:["库中没有"+"'"+ val[0] + "'"+"字"]
        })
      }   
    })

    //连接数据库获取第二个字
    db.collection("dictionary")
    .where(_.and([
      {
        where:where
      },
      {
        word: new db.RegExp({
          regexp:twCha[1],  //第二个字
          option:"i"
        })
      }
    ])).get().then(res=>{
      if(res.data != ""){
        this.setData({
          secondLen: res.data.length,  //第二个字的list长度
          multiToneSecondList: res.data,  //储存第二个字的list
        })

        for(var firstStep = 0; firstStep < this.data.firstLen; firstStep++){
          var multiToneFirst = this.data.multiToneFirstlist[firstStep].tone  //第1个列表里的第firstStep个字
          for(var secondStep = 0; secondStep < this.data.secondLen; secondStep++){
            var multiToneSecond = this.data.multiToneSecondList[secondStep].tone   //第2个列表里的第secondStep个字
            //公式
            var str = multiToneFirst +","+multiToneSecond
            switch (str){
              case "53,53":this.toneNewTwoList("³⁵","⁵³",firstStep,secondStep); break;
              case "53,31":this.toneNewTwoList("³⁵","⁵³",firstStep,secondStep); break;
              case "53,44":this.toneNewTwoList("³⁵","⁵³",firstStep,secondStep); break;
              case "53,22":this.toneNewTwoList("³⁵","⁵³",firstStep,secondStep); break;
              case "53,35":this.toneNewTwoList("⁵⁵","²¹",firstStep,secondStep); break;
              case "53,13":this.toneNewTwoList("⁵⁵","²¹",firstStep,secondStep); break;
              case "35,53":this.toneNewTwoList("⁵³","²¹",firstStep,secondStep); break;
              case "35,31":this.toneNewTwoList("⁵³","²¹",firstStep,secondStep); break;
              case "35,44":this.toneNewTwoList("⁵³","²¹",firstStep,secondStep); break;
              case "35,22":this.toneNewTwoList("⁵³","²¹",firstStep,secondStep); break;
              case "53,4":this.toneNewTwoList("⁵³","²¹",firstStep,secondStep); break;
              case "53,2":this.toneNewTwoList("⁵³","²¹",firstStep,secondStep); break;
              case "44,53":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "44,31":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "44,44":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "44,22":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "44,4":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "44,2":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "35,4":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "35,2":this.toneNewTwoList("³⁵","²¹",firstStep,secondStep); break;
              case "44,35":this.toneNewTwoList("⁴⁴","⁴⁴",firstStep,secondStep); break;
              case "44,13":this.toneNewTwoList("⁴⁴","⁴⁴",firstStep,secondStep); break;
              case "35,35":this.toneNewTwoList("⁴⁴","⁴⁴",firstStep,secondStep); break;
              case "35,13":this.toneNewTwoList("⁴⁴","⁴⁴",firstStep,secondStep); break;
              case "4,44":this.toneNewTwoList("⁴","⁴⁴",firstStep,secondStep); break;
              case "4,22":this.toneNewTwoList("⁴","⁴⁴",firstStep,secondStep); break;
              case "4,4":this.toneNewTwoList("⁴","⁴",firstStep,secondStep); break;
              case "4,2":this.toneNewTwoList("⁴","⁴",firstStep,secondStep); break;
              case "4,53":this.toneNewTwoList("⁴","⁵³",firstStep,secondStep); break;
              case "4,31":this.toneNewTwoList("⁴","⁵³",firstStep,secondStep); break;
              case "4,35":this.toneNewTwoList("⁴","³⁵",firstStep,secondStep); break;
              case "4,13":this.toneNewTwoList("⁴","³⁵",firstStep,secondStep); break;
              case "31,53":this.toneNewTwoList("¹³","⁵³",firstStep,secondStep); break;
              case "31,31":this.toneNewTwoList("¹³","⁵³",firstStep,secondStep); break;
              case "31,44":this.toneNewTwoList("¹³","⁵³",firstStep,secondStep); break;
              case "31,22":this.toneNewTwoList("¹³","⁵³",firstStep,secondStep); break;
              case "31,35":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "31,13":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "22,53":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "22,31":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "22,44":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "22,22":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "22,4":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "22,2":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "13,4":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "13,2":this.toneNewTwoList("²⁴","²¹",firstStep,secondStep); break;
              case "13,53":this.toneNewTwoList("²²","²²",firstStep,secondStep); break;
              case "13,31":this.toneNewTwoList("²²","²²",firstStep,secondStep); break;
              case "13,44":this.toneNewTwoList("²²","²²",firstStep,secondStep); break;
              case "13,22":this.toneNewTwoList("²²","²²",firstStep,secondStep); break;
              case "31,4":this.toneNewTwoList("²²","²",firstStep,secondStep); break;
              case "31,2":this.toneNewTwoList("²²","²",firstStep,secondStep); break;
              case "2,44":this.toneNewTwoList("²","²²",firstStep,secondStep); break;
              case "2,22":this.toneNewTwoList("²","²²",firstStep,secondStep); break;
              case "2,4":this.toneNewTwoList("²","²",firstStep,secondStep); break;
              case "2,2":this.toneNewTwoList("²","²",firstStep,secondStep); break;
              case "22,35":this.toneNewTwoList("²²","³⁵",firstStep,secondStep); break;
              case "22,13":this.toneNewTwoList("²²","³⁵",firstStep,secondStep); break;
              case "13,35":this.toneNewTwoList("²²","³⁵",firstStep,secondStep); break;
              case "13,13":this.toneNewTwoList("²²","³⁵",firstStep,secondStep); break;
              case "2,35":this.toneNewTwoList("²","³⁵",firstStep,secondStep); break;
              case "2,13":this.toneNewTwoList("²","³⁵",firstStep,secondStep); break;
              case "2,53":this.toneNewTwoList("²","⁵³",firstStep,secondStep); break;
              case "2,31":this.toneNewTwoList("²","⁵³",firstStep,secondStep); break;
            }
          }
        }
      }else{
        this.setData({
          noData:["库中没有"+"'"+ val[1] + "'"+"字"]
        })
      } 
    })
    this.setData({
      mainPanel: true,
    })
  },

  //变调生成核心函数(3个字)
  generateTonesThree: function(where){
    var val = this.data.val
    var thCha = val.split("")
    //连接数据库获取第一个字
    db.collection("dictionary")
    .where(_.and([
      {
        where:where
      },
      {
        word: new db.RegExp({
          regexp: thCha[0],  //第一个字
          option:"i"
        })
      }
    ])).get().then(res=>{
      if(res.data != ""){
        this.setData({
          firstLen: res.data.length,  //第一个字的list长度
          multiToneFirstlist: res.data,  //储存第一个字的list
        })
      }else{
        this.setData({
          noData:["库中没有"+"'"+ val[0] + "'"+"字"]
        })
      }   
    })

    //连接数据库获取第二个字
    db.collection("dictionary")
    .where(_.and([
      {
        where:where
      },
      {
        word: new db.RegExp({
          regexp:thCha[1],  //第二个字
          option:"i"
        })
      }
    ])).get().then(res=>{
      if(res.data != ""){
        this.setData({
          secondLen: res.data.length,  //第二个字的list长度
          multiToneSecondList: res.data,  //储存第二个字的list
        })        
      }else{
        this.setData({
          noData:["库中没有"+"'"+ val[1] + "'"+"字"]
        })
      } 
    })

    //连接数据库获取第三个字
    db.collection("dictionary")
    .where(_.and([
      {
        where:where
      },
      {
        word: new db.RegExp({
          regexp:thCha[2],  //第三个字
          option:"i"
        })
      }
    ])).get().then(res=>{
      if(res.data != ""){
        this.setData({
          thirdLen: res.data.length,  //第三个字的list长度
          multiToneThirdList: res.data,  //储存第三个字的list
        })

        for(var firstStep = 0; firstStep < this.data.firstLen; firstStep++){
          var multiToneFirst = this.data.multiToneFirstlist[firstStep].tone  //获取第1个列表里的第firstStep个字的调
          for(var secondStep = 0; secondStep < this.data.secondLen; secondStep++){
            var multiToneSecond = this.data.multiToneSecondList[secondStep].tone  //获取第2个列表里的第secondStep个字的调
            for(var thirdStep = 0; thirdStep < this.data.thirdLen; thirdStep++){
              var multiToneThird = this.data.multiToneThirdList[thirdStep].tone  //获取第3个列表里的第thirdStep个字的调
              //选择结构
              var str = multiToneFirst + ","+ multiToneSecond + "," + multiToneThird
              switch(str){
                case "53,53,53": this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,53,31":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,53,44":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,53,22":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,53,35":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,53,13":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,53":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,31":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,44":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,22":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,35":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,13":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,35":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,13":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,35":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,13":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,53":this.toneNewThreeList("³⁵","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,31":this.toneNewThreeList("³⁵","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,53":this.toneNewThreeList("³⁵","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,31":this.toneNewThreeList("³⁵","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,35,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,13,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,13,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,13,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,35,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,35,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,13,35":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,13,13":this.toneNewThreeList("³⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,4,35":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,4,13":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,2,35":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,2,13":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,4,35":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,4,13":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,2,35":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,2,13":this.toneNewThreeList("³⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,53":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,31":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,44":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,22":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,53":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,31":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,44":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,22":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,53":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,53":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,44":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,22":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,35":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,13":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,53":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,31":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,44":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,22":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,35":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,13":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,53":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,31":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,44":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,22":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,35":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,13":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,53":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,31":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,44":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,22":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,35":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,13":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,44,13":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,22,13":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,22,35":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,22,13":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,53,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,53,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,31,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,44,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,22,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,35,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,13,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,53,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,4":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "35,31,2":this.toneNewThreeList("⁵⁵","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,44":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,22":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,35":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,13":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,44":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,22":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,35":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,13":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,4":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,4,2":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,4":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "53,2,2":this.toneNewThreeList("⁵⁵","³","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,35,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,35,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,35,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,35,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,13,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,13,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,13,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,13,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,22,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,22,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,22,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,22,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,35,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,35,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,35,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,35,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,13,53":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,13,31":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,13,44":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,13,22":this.toneNewThreeList("³³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,4":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,53,2":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,4":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,31,2":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,4":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,44,2":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,4":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,22,2":this.toneNewThreeList("³⁵","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,4,44":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,4,22":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,2,44":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,2,22":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,4,44":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,4,22":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,2,44":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,2,22":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,4,4":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,4,2":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,2,4":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,2,2":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,4,4":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,4,2":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,2,4":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "35,2,2":this.toneNewThreeList("³³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,53,35":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,53,13":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,31,35":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,31,13":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,35,53":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,35,31":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,35,44":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,35,22":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,13,53":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,13,31":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,13,44":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,13,22":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,53,4":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,53,2":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,31,4":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "4,31,2":this.toneNewThreeList("³","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,4,53":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,4,31":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,2,53":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,2,31":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,4,53":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,4,31":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,2,53":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,2,31":this.toneNewThreeList("³³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,53,53":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,53,31":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,53,44":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,53,22":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,31,53":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,31,31":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,31,44":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,31,22":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,44,53":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,44,31":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,44,44":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,44,22":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,22,53":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,22,31":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,22,44":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,22,22":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,44,4":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,44,2":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,22,4":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,22,2":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,35,4":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,35,2":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,13,4":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,13,2":this.toneNewThreeList("³","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,4,53":this.toneNewThreeList("³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,4,31":this.toneNewThreeList("³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,2,53":this.toneNewThreeList("³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,2,31":this.toneNewThreeList("³","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,44,53":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,44,31":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,44,44":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,44,22":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,22,53":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,22,31":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,22,44":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,22,22":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,35,4":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,35,2":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,13,4":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "44,13,2":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,44,4":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,44,2":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,22,4":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,22,2":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,35,4":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,35,2":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,13,4":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "35,13,2":this.toneNewThreeList("⁴⁴","⁴⁴","⁵³",firstStep,secondStep,thirdStep); break;
                case "4,44,35":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,44,13":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,22,35":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,22,13":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,35,35":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,35,13":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,13,35":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,13,13":this.toneNewThreeList("⁴","⁴⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,4,44":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,4,22":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,4,35":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,4,13":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,2,44":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,2,22":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,2,35":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,2,13":this.toneNewThreeList("⁴","⁴","⁴⁴",firstStep,secondStep,thirdStep); break;
                case "4,4,4":this.toneNewThreeList("⁴","⁴","⁴",firstStep,secondStep,thirdStep); break;
                case "4,4,2":this.toneNewThreeList("⁴","⁴","⁴",firstStep,secondStep,thirdStep); break;
                case "4,2,4":this.toneNewThreeList("⁴","⁴","⁴",firstStep,secondStep,thirdStep); break;
                case "4,2,2":this.toneNewThreeList("⁴","⁴","⁴",firstStep,secondStep,thirdStep); break;
                case "31,53,53":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,53,31":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,53,44":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,53,22":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,53,35":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,53,13":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,31,53":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,31,31":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,31,44":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,31,22":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,31,35":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,35":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,13":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,35":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,13":this.toneNewThreeList("¹³","³⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,4,53":this.toneNewThreeList("¹³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,4,31":this.toneNewThreeList("¹³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,2,53":this.toneNewThreeList("¹³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,2,31":this.toneNewThreeList("¹³","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,53":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,31":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,44":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,22":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,53":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,31":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,44":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,22":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,13,35":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,13,13":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,4":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,44,2":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,4":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,22,2":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,35,4":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "31,35,2":this.toneNewThreeList("²⁴","³³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,4,35":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,4,13":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,2,35":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,2,13":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,4,35":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,4,13":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,2,35":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "13,2,13":this.toneNewThreeList("²⁴","³","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,13,53":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,13,31":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,13,44":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,13,22":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,4":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,53,2":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,4":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,31,2":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,4":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,44,2":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,4":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,22,2":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,4":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,35,2":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,4":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,13,2":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,4":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,35,2":this.toneNewThreeList("²²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,4,44":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,4,22":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,2,44":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,2,22":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,4,44":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,4,22":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,2,44":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,2,22":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,4,4":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,4,2":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "44,2,4":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "22,2,2":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,4,4":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,4,2":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,2,4":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,2,2":this.toneNewThreeList("²²","⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,53,35":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,53,13":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,31,35":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,31,13":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,35,53":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,35,44":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,35,22":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,13,53":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,13,31":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,13,44":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,13,22":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,53,4":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,53,2":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,31,4":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "2,31,2":this.toneNewThreeList("²","⁵⁵","²¹",firstStep,secondStep,thirdStep); break;
                case "13,44,53":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,44,31":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,44,44":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,44,22":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,22,53":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,22,31":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,22,44":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,22,22":this.toneNewThreeList("²²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,44,4":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,44,2":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,22,4":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,22,2":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,35,4":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,35,2":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,13,4":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,13,2":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "22,4,53":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "22,4,31":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "22,2,53":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "22,2,31":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,4,53":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,4,31":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,2,53":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "13,2,31":this.toneNewThreeList("²²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,53,53":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,53,31":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,53,44":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,53,22":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,31,53":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,31,31":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,31,44":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,31,22":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,44,53":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,44,31":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,44,44":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,44,22":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,22,53":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,22,31":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,22,44":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,22,22":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,44,4":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,44,2":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,22,4":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,22,2":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,35,4":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,35,2":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,13,4":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,13,2":this.toneNewThreeList("²","⁵⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,4,53":this.toneNewThreeList("²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,4,31":this.toneNewThreeList("²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,2,53":this.toneNewThreeList("²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "2,2,31":this.toneNewThreeList("²","⁵","⁵³",firstStep,secondStep,thirdStep); break;
                case "31,35,53":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,35,31":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,35,44":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,35,22":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,35,35":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,35,13":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,13,53":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,13,31":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,13,44":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,13,22":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,13,35":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,13,13":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,53,53":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,53,31":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,53,44":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,53,22":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,53,35":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,53,13":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,31,53":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,31,31":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,31,44":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,31,22":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,31,35":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,31,13":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,44,44":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,44,22":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,44,35":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,44,13":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,22,44":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,22,22":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,22,35":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "13,22,13":this.toneNewThreeList("²²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "31,53,4":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,53,2":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,31,4":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,31,2":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,35,4":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,35,2":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,13,4":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,13,2":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "13,53,4":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "13,53,2":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "13,31,4":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "13,31,2":this.toneNewThreeList("²²","²²","²",firstStep,secondStep,thirdStep); break;
                case "31,4,44":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,4,22":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,4,35":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,4,13":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,2,44":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,2,22":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,2,35":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,2,13":this.toneNewThreeList("²²","²","²²",firstStep,secondStep,thirdStep); break;
                case "31,4,4":this.toneNewThreeList("²²","²","²",firstStep,secondStep,thirdStep); break;
                case "31,4,2":this.toneNewThreeList("²²","²","²",firstStep,secondStep,thirdStep); break;
                case "31,2,4":this.toneNewThreeList("²²","²","²",firstStep,secondStep,thirdStep); break;
                case "31,2,2":this.toneNewThreeList("²²","²","²",firstStep,secondStep,thirdStep); break;
                case "2,44,35":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,44,13":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,22,35":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,22,13":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,35,35":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,35,13":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,13,35":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,13,13":this.toneNewThreeList("²","²²","²²",firstStep,secondStep,thirdStep); break;
                case "2,4,44":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,4,22":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,4,35":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,4,13":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,2,44":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,2,22":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,2,35":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,2,13":this.toneNewThreeList("²","²","²²",firstStep,secondStep,thirdStep); break;
                case "2,4,4":this.toneNewThreeList("²","²","²",firstStep,secondStep,thirdStep); break;
                case "2,4,2":this.toneNewThreeList("²","²","²",firstStep,secondStep,thirdStep); break;
                case "2,2,4":this.toneNewThreeList("²","²","²",firstStep,secondStep,thirdStep); break;
                case "2,2,2":this.toneNewThreeList("²","²","²",firstStep,secondStep,thirdStep); break;
              }
            }
          }
        }
      }else{
        this.setData({
          noData:["库中没有"+"'"+ val[2] + "'"+"字"]
        })
      } 
    })

    this.setData({
      mainPanel: true,
    })
  },
  

  //生成的调值总控(不带IF)
  toneNewTwoList: function(firstNum, secondNum, firstStep, secondStep){
    var val = this.data.val
    var oldList = this.data.multiToneList
    var newList = {
      title: val,
      address: "松江镇",
      tone: this.data.multiToneFirstlist[firstStep].pinYinRadical + firstNum + "-" + this.data.multiToneSecondList[secondStep].pinYinRadical + secondNum
    }
    oldList = oldList.concat(newList)
    this.setData({
      multiToneList: oldList
    })
  },

  toneNewThreeList: function(firstNum, secondNum, thirdNum, firstStep, secondStep, thirdStep){
    var val = this.data.val
    var oldList = this.data.multiToneList
    var newList = {
      title: val,
      address: "松江镇",
      tone: this.data.multiToneFirstlist[firstStep].pinYinRadical + firstNum + "-" + this.data.multiToneSecondList[secondStep].pinYinRadical + secondNum + "-" + this.data.multiToneThirdList[thirdStep].pinYinRadical + thirdNum
    }
    oldList = oldList.concat(newList)
    this.setData({
      multiToneList: oldList
    })
  },

  onShareAppMessage: function(){  //分享给好友
    return {
      title: '沪郊乡音辞典变调生成',
      path: '/index/index?id=123'
    }
  },

  onShareTimeline: function(){  //分享到朋友圈
    return {
      title: '沪郊乡音辞典变调生成'
    }
  }
})