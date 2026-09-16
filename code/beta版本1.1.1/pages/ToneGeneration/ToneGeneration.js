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
              this.generateTones()
            }else{
              this.generateTones()
            }
          }else{  //若长度不为2
            this.setData({
              noData:["请输入二字词汇"]
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
  
  //变调生成核心函数
  generateTones: function(){
    var val = this.data.val
    var twCha = val.split("")
    //连接数据库获取第一个字
    db.collection("dictionary")
    .where(_.and([
      {
        where:"松江"
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
        where:"松江"
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
              case "53,53": this.toneNewTwoList("35","53",firstStep,secondStep); break;
              case "53,31": this.toneNewTwoList("35","53",firstStep,secondStep); break;
              case "53,44": this.toneNewTwoList("35","53",firstStep,secondStep); break;
              case "53,22": this.toneNewTwoList("35","53",firstStep,secondStep); break;
              case "53,35": this.toneNewTwoList("55","31",firstStep,secondStep); break;
              case "53,13": this.toneNewTwoList("55","31",firstStep,secondStep); break;
              case "35,53": this.toneNewTwoList("53","31",firstStep,secondStep); break;
              case "35,31": this.toneNewTwoList("53","31",firstStep,secondStep); break;
              case "35,44": this.toneNewTwoList("53","31",firstStep,secondStep); break;
              case "35,22": this.toneNewTwoList("53","31",firstStep,secondStep); break;
              case "53,4": this.toneNewTwoList("53","ʔ31",firstStep,secondStep); break;
              case "53,2": this.toneNewTwoList("53","ʔ31",firstStep,secondStep); break;
              case "44,53": this.toneNewTwoList("35","31",firstStep,secondStep); break;
              case "44,31": this.toneNewTwoList("35","31",firstStep,secondStep); break;
              case "44,44": this.toneNewTwoList("35","31",firstStep,secondStep); break;
              case "44,22": this.toneNewTwoList("35","31",firstStep,secondStep); break;
              case "44,4": this.toneNewTwoList("35","ʔ31",firstStep,secondStep); break;
              case "44,2": this.toneNewTwoList("35","ʔ31",firstStep,secondStep); break;
              case "35,4": this.toneNewTwoList("35","ʔ31",firstStep,secondStep); break;
              case "35,2": this.toneNewTwoList("35","ʔ31",firstStep,secondStep); break;
              case "44,35":this.toneNewTwoList("44","44",firstStep,secondStep); break;
              case "44,13": this.toneNewTwoList("44","44",firstStep,secondStep); break;
              case "35,35": this.toneNewTwoList("44","44",firstStep,secondStep); break;
              case "35,13": this.toneNewTwoList("44","44",firstStep,secondStep); break;
              case "4,44": this.toneNewTwoList("4","44",firstStep,secondStep); break;
              case "4,22": this.toneNewTwoList("4","44",firstStep,secondStep); break;
              case "4,4": this.toneNewTwoList("4","4",firstStep,secondStep); break;
              case "4,2": this.toneNewTwoList("4","4",firstStep,secondStep); break;
              case "4,53": this.toneNewTwoList("4","53",firstStep,secondStep); break;
              case "4,31": this.toneNewTwoList("4","53",firstStep,secondStep); break;
              case "4,35": this.toneNewTwoList("4","35",firstStep,secondStep); break;
              case "4,13": this.toneNewTwoList("4","35",firstStep,secondStep); break;
              case "31,53": this.toneNewTwoList("13","53",firstStep,secondStep); break;
              case "31,31": this.toneNewTwoList("13","53",firstStep,secondStep); break;
              case "31,44": this.toneNewTwoList("13","53",firstStep,secondStep); break;
              case "31,22": this.toneNewTwoList("13","53",firstStep,secondStep); break;
              case "31,35": this.toneNewTwoList("24","31",firstStep,secondStep); break;
              case "31,13": this.toneNewTwoList("24","31",firstStep,secondStep); break;
              case "22,53": this.toneNewTwoList("24","31",firstStep,secondStep); break;
              case "22,31": this.toneNewTwoList("24","31",firstStep,secondStep); break;
              case "22,44": this.toneNewTwoList("24","31",firstStep,secondStep); break;
              case "22,22": this.toneNewTwoList("24","31",firstStep,secondStep); break;
              case "22,4": this.toneNewTwoList("24","ʔ31",firstStep,secondStep); break;
              case "22,2": this.toneNewTwoList("24","ʔ31",firstStep,secondStep); break;
              case "13,4": this.toneNewTwoList("24","ʔ31",firstStep,secondStep); break;
              case "13,2": this.toneNewTwoList("24","ʔ31",firstStep,secondStep); break;
              case "13,53": this.toneNewTwoList("22","22",firstStep,secondStep); break;
              case "13,31": this.toneNewTwoList("22","22",firstStep,secondStep); break;
              case "13,44": this.toneNewTwoList("22","22",firstStep,secondStep); break;
              case "13,22": this.toneNewTwoList("22","22",firstStep,secondStep); break;
              case "31,4": this.toneNewTwoList("22","2",firstStep,secondStep); break;
              case "31,2": this.toneNewTwoList("22","2",firstStep,secondStep); break;
              case "2,44": this.toneNewTwoList("2","22",firstStep,secondStep); break;
              case "2,22": this.toneNewTwoList("2","22",firstStep,secondStep); break;
              case "2,4": this.toneNewTwoList("2","2",firstStep,secondStep); break;
              case "2,2": this.toneNewTwoList("2","2",firstStep,secondStep); break;
              case "22,35": this.toneNewTwoList("22","35",firstStep,secondStep); break;
              case "22,13": this.toneNewTwoList("22","35",firstStep,secondStep); break;
              case "13,35": this.toneNewTwoList("22","35",firstStep,secondStep); break;
              case "13,13": this.toneNewTwoList("22","35",firstStep,secondStep); break;
              case "2,35": this.toneNewTwoList("2","35",firstStep,secondStep); break;
              case "2,13": this.toneNewTwoList("2","35",firstStep,secondStep); break;
              case "2,53": this.toneNewTwoList("2","53",firstStep,secondStep); break;
              case "2,31": this.toneNewTwoList("2","53",firstStep,secondStep); break;
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
  }
})