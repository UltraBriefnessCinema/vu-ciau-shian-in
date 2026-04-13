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
    showContent: true,  //内容页面默认为展示
    showHideBtnPanel: false,

    //高级搜索>锁定地区右边交互选中的文字
    countyName:"上海全境",    //县
    townName:"",    //镇

    //上海全境的value
    shanghaiValueAll: true,

    //以下为高级搜索>锁定地区中的按钮对应的radio值
    shanghaiShiValue: false,  //上海市区按钮对应的radio值
    shanghaiXianValue: false,  //上海县按钮对应的radio值
    songjiangValue: false,  //松江按钮对应的radio值
    jinshanValue: false,  //金山按钮对应的radio值
    qingpuValue: false,  //青浦按钮对应的radio值
    fengxianValue: false,  //奉贤按钮对应的radio值
    chuanshaValue: false,  //川沙按钮对应的radio值
    nanhuiValue: false,  //南汇按钮对应的radio值
    jiadingValue: false,  //嘉定按钮对应的radio值
    baoshanValue: false,  //宝山按钮对应的radio值
    chongmingValue: false,  //崇明按钮对应的radio值
    comprehensiveValue: false,  //综合按钮对应的radio值

    //以下为高级搜索>锁定地区中的radio按钮的值
    shanghaiShiRadio:"shanghaishi_all",
    shanghaiXianRadio:"shanghaixian_all",
    songjiangRadio:"songjiang_all",
    jinshanRadio:"jinshan_all",
    qingpuRadio:"qingpu_all",
    fengxianRadio:"fengxian_all",
    chuanshaRadio:"chuansha_all",
    nanhuiRadio:"nanhui_all",
    jiadingRadio:"jiading_all",
    baoshanRadio:"baoshan_all",
    chongmingRadio:"chongming_all",

    //以下为高级搜索>锁定地区中的radio按钮的check的值(很多请折叠)
    shanghaishi_all_checked: true,
    shanghaishi_nanshi_checked: false,
    shanghaishi_xujiahui_checked: false,
    shanghaishi_fahua_checked: false,

    shanghaixian_all_checked: true,
    shanghaixian_beiqiao_checked: false,
    shanghaixian_chenhang_checked: false,
    shanghaixian_duhang_checked: false,
    shanghaixian_hongqiao_checked: false,
    shanghaixian_huacao_checked: false,
    shanghaixian_huajing_checked: false,
    shanghaixian_jiwang_checked: false,
    shanghaixian_longhua_checked: false,
    shanghaixian_luhui_checked : false,
    shanghaixian_meilong_checked: false,
    shanghaixian_qibao_checked: false,
    shanghaixian_sanlin_checked: false,
    shanghaixian_xinzhuang_checked: false,
    shanghaixian_tangwan_checked: false,
    shanghaixian_wujing_checked: false,
    shanghaixian_xinjing_checked: false,
    shanghaixian_zhudi_checked: false,
    shanghaixian_zhuanqiao_checked: false,
    shanghaixian_beixinjing_checked: false,

    songjiang_all_checked: true,
    songjiang_cangqiao_checked: false,
    songjiang_chedun_checked: false,
    songjiang_dongjing_checked: false,
    songjiang_jiuting_checked: false,
    songjiang_sheshan_checked: false,
    songjiang_sijing_checked: false,
    songjiang_xinbang_checked: false,
    songjiang_xinqiao_checked: false,
    songjiang_yexie_checked: false,
    songjiang_zhangze_checked: false,
    songjiang_shihudang_checked: false,
    songjiang_tianmashan_checked: false,
    songjiang_wilitang_checked: false,
    songjiang_xiaokunshan_checked: false,
    songjiang_songjiangzhen_checked: false,

    jinshan_all_checked: true,
    jinshan_caojing_checked: false,
    jinshan_fengjing_checked: false,
    jinshan_ganxiang_checked: false,
    jinshan_langxia_checked: false,
    jinshan_lvxiang_checked: false,
    jinshan_qianyu_checked: false,
    jinshan_shanyang_checked: false,
    jinshan_tinglin_checked: false,
    jinshan_xinnong_checked: false,
    jinshan_xingta_checked: false,
    jinshan_zhuhang_checked: false,
    jinshan_zhujing_checked: false,
    jinshan_jinshanwei_checked: false,

    qingpu_all_checked: true,
    qingpu_baihe_checked: false,
    qingpu_daying_checked: false,
    qingpu_fengxi_checked: false,
    qingpu_huancheng_checked: false,
    qingpu_jinze_checked:false,
    qingpu_liansheng_checked:false,
    qingpu_liantang_checked:false,
    qingpu_shangta_checked:false,
    qingpu_shenxiang_checked:false,
    qingpu_xiceng_checked:false,
    qingpu_xiaozheng_checked:false,
    qingpu_xujing_checked:false,
    qingpu_huaxin_checked:false,
    qingpu_yingzhong_checked:false,
    qingpu_zhaotun_checked:false,
    qingpu_zhaoxiang_checked:false,
    qingpu_zhengdian_checked:false,
    qingpu_chonggu_checked:false,
    qingpu_zhujiajiao_checked:false,
    qingpu_xianghuaqiao_checked:false,
    qingpu_qingpuzhen_checked:false,

    fengxian_all_checked: true,
    fengxian_fengcheng_checked:false,
    fengxian_fengxin_checked:false,
    fengxian_guangming_checked:false,
    fengxian_hongmiao_checked:false,
    fengxian_huqiao_checked:false,
    fengxian_jianghai_checked:false,
    fengxian_jinhui_checked:false,
    fengxian_nanqiao_checked:false,
    fengxian_pingan_checked:false,
    fengxian_qianqiao_checked:false,
    fengxian_qingcun_checked:false,
    fengxian_shaochang_checked:false,
    fengxian_situan_checked:false,
    fengxian_tairi_checked:false,
    fengxian_tangwai_checked:false,
    fengxian_touqiao_checked:false,
    fengxian_wuqiao_checked:false,
    fengxian_xidu_checked:false,
    fengxian_xiaotang_checked:false,
    fengxian_xinsi_checked:false,
    fengxian_zhelin_checked:false,
    fengxian_zhuanghang_checked:false,
    fengxian_zhelin_nanshanhua_checked:false,

    chuansha_all_checked: true,
    chuansha_beicai_checked:false,
    chuansha_caolu_checked:false,
    chuansha_gaodong_checked:false,
    chuansha_gaohang_checked:false,
    chuansha_gaonan_checked:false,
    chuansha_gaoqiao_checked:false,
    chuansha_heqing_checked:false,
    chuansha_huamu_checked:false,
    chuansha_jiangzhen_checked:false,
    chuansha_shiwan_checked:false,
    chuansha_jinqiao_checked:false,
    chuansha_lingqiao_checked:false,
    chuansha_liuli_checked:false,
    chuansha_tangzhen_checked:false,
    chuansha_wanggang_checked:false,
    chuansha_yanqiao_checked:false,
    chuansha_yangsi_checked:false,
    chuansha_yangyuan_checked:false,
    chuansha_yangjing_checked:false,
    chuansha_zhangjiang_checked:false,
    chuansha_zhangqiao_checked:false,
    chuansha_chuanshazhen_checked:false,

    nanhui_all_checked: true,
    nanhui_binhai_checked:false,
    nanhui_datuan_checked:false,
    nanhui_donghai_checked:false,
    nanhui_hangtou_checked:false,
    nanhui_hengmian_checked:false,
    nanhui_huanglu_checked:false,
    nanhui_kangqiao_checked:false,
    nanhui_laogang_checked:false,
    nanhui_liuzao_checked:false,
    nanhui_nicheng_checked:false,
    nanhui_pengzhen_checked:false,
    nanhui_sandun_checked:false,
    nanhui_sanzao_checked:false,
    nanhui_shuyuan_checked:false,
    nanhui_tanzhi_checked:false,
    nanhui_waxie_checked:false,
    nanhui_wanxiang_checked:false,
    nanhui_xiasha_checked:false,
    nanhui_xinchang_checked:false,
    nanhui_xingang_checked:false,
    nanhui_xuanqiao_checked:false,
    nanhui_yancang_checked:false,
    nanhui_zhoupu_checked:false,
    nanhui_zhuqiao_checked:false,
    nanhui_luchaogang_checked:false,

    jiading_all_checked: true,
    jiading_anting_checked: false,
    jiading_fengbang_checked:false,
    jiading_huating_checked:false,
    jiading_jiangqiao_checked:false,
    jiading_loutang_checked:false,
    jiading_malu_checked:false,
    jiading_nanxiang_checked:false,
    jiading_tanghang_checked:false,
    jiading_taopu_checked:false,
    jiading_waigang_checked:false,
    jiading_wangxin_checked:false,
    jiading_zhenru_checked:false,
    jiading_jiadingzhen_checked:false,

    baoshan_all_checked: true,
    baoshan_dachang_checked:false,
    baoshan_fengtang_checked:false,
    baoshan_gucun_checked:false,
    baoshan_liuhang_checked:false,
    baoshan_jiangwan_checked:false,
    baoshan_luodian_checked:false,
    baoshan_luojing_checked:false,
    baoshan_luonan_checked:false,
    baoshan_miaohang_checked:false,
    baoshan_pengpu_checked:false,
    baoshan_shengqiao_checked:false,
    baoshan_songnan_checked:false,
    baoshan_wusong_checked:false,
    baoshan_wujiaochang_checked:false,
    baoshan_shuangcaodun_checked:false,

    chongming_all_checked:true,
    chongming_chenjia_checked:false,
    chongming_gangyan_checked:false
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
      showHideBtnPanel: false
    })
  },

  enterInput:function(e){  //搜索函数
    var val = this.data.val  //定义输入额值
    if(val != ''){  //假使值不等于空额能介
      if(this.data.type == "onVocabularyUnKnown"){  //假使是查查词条不知其字能介
        if(this.data.shanghaiValueAll == true){
           wx.cloud.callFunction({  //请求数据库
             name: "getVocabularyDataFromVocabularyUnKnown",
             data: {
               value: val,
               limit: 20,
               page: this.data.page  //skip的page暂时为第0页开始
             }
           }).then(res=>{  //返回数据
             console.log(res.result.data)
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
                   noData:["找到结果"+res.total+"条"],
                   showHideBtnPanel: true
                 })
               })
               var VocabularyUnKnownList = res.result.data
               this.setData({
                 list: VocabularyUnKnownList
               })
             }else{  //没有请求到能介
               this.setData({
                 list:[],
                 noData:["没有查询到结果"],
                 showHideBtnPanel: false
               })
             }
           })
        }else if(this.data.comprehensiveValue == true){
          this.onVocabularyUnKnownInputCounty("comprehensive_search")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_all"){  //当上海市区>全境为真
          this.onVocabularyUnKnownInputCounty("shanghaishi")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){  //当上海市区>南市为真
          this.onVocabularyUnKnownInputTown("shanghaishi_nanshi")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){  //当上海市区>徐家汇为真
          this.onVocabularyUnKnownInputTown("shanghaishi_xujiahui")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_fahua"){
          this.onVocabularyUnKnownInputTown("shanghaishi_fahua")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
          this.onVocabularyUnKnownInputCounty( "shanghaixian")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_beiqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_chenhang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_duhang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_hongqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_huacao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_huajing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_jiwang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_longhua")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_luhui")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_meilong")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_qibao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_sanlin")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
          this.onVocabularyUnKnownInputTown( "shanghaixian_xinzhuang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_tangwan")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_wujing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_xinjing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_zhudi")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_zhuanqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
          this.onVocabularyUnKnownInputTown( "shanghaixian_beixinjing")
        }else if(this.data.songjiangRadio == "songjiang_all"){
          this.onVocabularyUnKnownInputCounty( "songjiang")
        }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
          this.onVocabularyUnKnownInputTown( "songjiang_cangqiao")
        }else if(this.data.songjiangRadio == "songjiang_chedun"){
          this.onVocabularyUnKnownInputTown( "songjiang_chedun")
        }else if(this.data.songjiangRadio == "songjiang_dongjing"){
          this.onVocabularyUnKnownInputTown( "songjiang_dongjing")
        }else if(this.data.songjiangRadio == "songjiang_jiuting"){
          this.onVocabularyUnKnownInputTown( "songjiang_jiuting")
        }else if(this.data.songjiangRadio == "songjiang_sheshan"){
          this.onVocabularyUnKnownInputTown( "songjiang_sheshan")
        }else if(this.data.songjiangRadio == "songjiang_sijing"){
          this.onVocabularyUnKnownInputTown( "songjiang_sijing")
        }else if(this.data.songjiangRadio == "songjiang_xinbang"){
          this.onVocabularyUnKnownInputTown( "songjiang_xinbang")
        }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
          this.onVocabularyUnKnownInputTown( "songjiang_xinqiao")
        }else if(this.data.songjiangRadio == "songjiang_yexie"){
          this.onVocabularyUnKnownInputTown( "songjiang_yexie")
        }else if(this.data.songjiangRadio == "songjiang_zhangze"){
          this.onVocabularyUnKnownInputTown( "songjiang_zhangze")
        }else if(this.data.songjiangRadio == "songjiang_shihudang"){
          this.onVocabularyUnKnownInputTown( "songjiang_shihudang")
        }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
          this.onVocabularyUnKnownInputTown( "songjiang_tianmashan")  
        }else if(this.data.songjiangRadio == "songjiang_wulitang"){
          this.onVocabularyUnKnownInputTown( "songjiang_wulitang")   
        }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
          this.onVocabularyUnKnownInputTown( "songjiang_xiaokunshan")   
        }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
          this.onVocabularyUnKnownInputTown( "songjiang_songjiangzhen")
        }else if(this.data.jinshanRadio == "jinshan_all"){
          this.onVocabularyUnKnownInputCounty( "jinshan")
        }else if(this.data.jinshanRadio == "jinshan_caojing"){
          this.onVocabularyUnKnownInputTown( "jinshan_caojing")
        }else if(this.data.jinshanRadio == "jinshan_fengjing"){
          this.onVocabularyUnKnownInputTown( "jinshan_fengjing")
        }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
          this.onVocabularyUnKnownInputTown( "jinshan_ganxiang")
        }else if(this.data.jinshanRadio == "jinshan_langxia"){
          this.onVocabularyUnKnownInputTown( "jinshan_langxia")
        }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
          this.onVocabularyUnKnownInputTown( "jinshan_lvxiang")
        }else if(this.data.jinshanRadio == "jinshan_qianyu"){
          this.onVocabularyUnKnownInputTown( "jinshan_qianyu")
        }else if(this.data.jinshanRadio == "jinshan_shanyang"){
          this.onVocabularyUnKnownInputTown( "jinshan_shanyang")
        }else if(this.data.jinshanRadio == "jinshan_tinglin"){
          this.onVocabularyUnKnownInputTown( "jinshan_tinglin")
        }else if(this.data.jinshanRadio == "jinshan_xinnong"){
          this.onVocabularyUnKnownInputTown( "jinshan_xinnong")
        }else if(this.data.jinshanRadio == "jinshan_xingta"){
          this.onVocabularyUnKnownInputTown( "jinshan_xingta")
        }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
          this.onVocabularyUnKnownInputTown( "jinshan_zhuhang")
        }else if(this.data.jinshanRadio == "jinshan_zhujing"){
          this.onVocabularyUnKnownInputTown( "jinshan_zhujing")
        }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
          this.onVocabularyUnKnownInputTown( "jinshan_jinshanwei")
        }else if(this.data.qingpuRadio == "qingpu_all"){
          this.onVocabularyUnKnownInputCounty( "qingpu")
        }else if(this.data.qingpuRadio == "qingpu_baihe"){
            this.onVocabularyUnKnownInputTown( "qingpu_baihe")
        }else if(this.data.qingpuRadio == "qingpu_daying"){
            this.onVocabularyUnKnownInputTown( "qingpu_daying")
        }else if(this.data.qingpuRadio == "qingpu_fengxi"){
            this.onVocabularyUnKnownInputTown( "qingpu_fengxi")
        }else if(this.data.qingpuRadio == "qingpu_huancheng"){
            this.onVocabularyUnKnownInputTown( "qingpu_huancheng")
        }else if(this.data.qingpuRadio == "qingpu_jinze"){
            this.onVocabularyUnKnownInputTown( "qingpu_jinze")
        }else if(this.data.qingpuRadio == "qingpu_liansheng"){
            this.onVocabularyUnKnownInputTown( "qingpu_liansheng")
        }else if(this.data.qingpuRadio == "qingpu_liantang"){
            this.onVocabularyUnKnownInputTown( "qingpu_liantang")
        }else if(this.data.qingpuRadio == "qingpu_shangta"){
            this.onVocabularyUnKnownInputTown( "qingpu_shangta")
        }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
            this.onVocabularyUnKnownInputTown( "qingpu_shenxiang")
        }else if(this.data.qingpuRadio == "qingpu_xiceng"){
            this.onVocabularyUnKnownInputTown( "qingpu_xiceng")
        }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
            this.onVocabularyUnKnownInputTown( "qingpu_xiaozheng")
        }else if(this.data.qingpuRadio == "qingpu_xujing"){
            this.onVocabularyUnKnownInputTown( "qingpu_xujing")
        }else if(this.data.qingpuRadio == "qingpu_huaxin"){
          this.onVocabularyUnKnownInputTown("qingpu_huaxin")
        }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
            this.onVocabularyUnKnownInputTown( "qingpu_yingzhong")
        }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
            this.onVocabularyUnKnownInputTown( "qingpu_zhaotun")
        }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
            this.onVocabularyUnKnownInputTown( "qingpu_zhaoxiang")
        }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
            this.onVocabularyUnKnownInputTown( "qingpu_zhengdian")
        }else if(this.data.qingpuRadio == "qingpu_chonggu"){
            this.onVocabularyUnKnownInputTown( "qingpu_chonggu")
        }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
            this.onVocabularyUnKnownInputTown( "qingpu_zhujiajiao")
        }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
            this.onVocabularyUnKnownInputTown( "qingpu_xianghuaqiao")
        }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
            this.onVocabularyUnKnownInputTown( "qingpu_qingpuzhen")
        }else if(this.data.fengxianRadio == "fengxian_all"){
            this.onVocabularyUnKnownInputCounty( "fengxian")
        }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
            this.onVocabularyUnKnownInputTown( "fengxian_fengcheng")
        }else if(this.data.fengxianRadio == "fengxian_fengxin"){
            this.onVocabularyUnKnownInputTown( "fengxian_fengxin")
        }else if(this.data.fengxianRadio == "fengxian_guangming"){
            this.onVocabularyUnKnownInputTown( "fengxian_guangming")
        }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
            this.onVocabularyUnKnownInputTown( "fengxian_hongmiao")
        }else if(this.data.fengxianRadio == "fengxian_huqiao"){
            this.onVocabularyUnKnownInputTown( "fengxian_huqiao")
        }else if(this.data.fengxianRadio == "fengxian_jianghai"){
            this.onVocabularyUnKnownInputTown( "fengxian_jianghai")
        }else if(this.data.fengxianRadio == "fengxian_jinhui"){
            this.onVocabularyUnKnownInputTown( "fengxian_jinhui")
        }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
            this.onVocabularyUnKnownInputTown( "fengxian_nanqiao")
        }else if(this.data.fengxianRadio == "fengxian_pingan"){
            this.onVocabularyUnKnownInputTown( "fengxian_pingan")
        }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
            this.onVocabularyUnKnownInputTown( "fengxian_qianqiao")
        }else if(this.data.fengxianRadio == "fengxian_qingcun"){
            this.onVocabularyUnKnownInputTown( "fengxian_qingcun")
        }else if(this.data.fengxianRadio == "fengxian_shaochang"){
            this.onVocabularyUnKnownInputTown( "fengxian_shaochang")
        }else if(this.data.fengxianRadio == "fengxian_situan"){
            this.onVocabularyUnKnownInputTown( "fengxian_situan")
        }else if(this.data.fengxianRadio == "fengxian_tairi"){
            this.onVocabularyUnKnownInputTown( "fengxian_tairi")
        }else if(this.data.fengxianRadio == "fengxian_tangwai"){
            this.onVocabularyUnKnownInputTown( "fengxian_tangwai")
        }else if(this.data.fengxianRadio == "fengxian_touqiao"){
            this.onVocabularyUnKnownInputTown( "fengxian_touqiao")
        }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
            this.onVocabularyUnKnownInputTown( "fengxian_wuqiao")
        }else if(this.data.fengxianRadio == "fengxian_xidu"){
            this.onVocabularyUnKnownInputTown( "fengxian_xidu")
        }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
            this.onVocabularyUnKnownInputTown( "fengxian_xiaotang")
        }else if(this.data.fengxianRadio == "fengxian_xinsi"){
            this.onVocabularyUnKnownInputTown( "fengxian_xinsi")
        }else if(this.data.fengxianRadio == "fengxian_zhelin"){
            this.onVocabularyUnKnownInputTown( "fengxian_zhelin")
        }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
            this.onVocabularyUnKnownInputTown( "fengxian_zhuanghang")
        }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshanhua"){
            this.onVocabularyUnKnownInputTown( "fengxian_zhelin_nanshanhua")
        }else if(this.data.chuanshaRadio == "chuansha_all"){
            this.onVocabularyUnKnownInputCounty( "chuansha")
        }else if(this.data.chuanshaRadio == "chuansha_beicai"){
            this.onVocabularyUnKnownInputTown( "chuansha_beicai")
        }else if(this.data.chuanshaRadio == "chuansha_caolu"){
            this.onVocabularyUnKnownInputTown( "chuansha_caolu")
        }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
            this.onVocabularyUnKnownInputTown( "chuansha_gaodong")
        }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
            this.onVocabularyUnKnownInputTown( "chuansha_gaohang")
        }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
            this.onVocabularyUnKnownInputTown( "chuansha_gaonan")
        }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
            this.onVocabularyUnKnownInputTown( "chuansha_gaoqiao")
        }else if(this.data.chuanshaRadio == "chuansha_heqing"){
            this.onVocabularyUnKnownInputTown( "chuansha_heqing")
        }else if(this.data.chuanshaRadio == "chuansha_huamu"){
            this.onVocabularyUnKnownInputTown( "chuansha_huamu")
        }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
            this.onVocabularyUnKnownInputTown( "chuansha_jiangzhen")
        }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
            this.onVocabularyUnKnownInputTown( "chuansha_shiwan")
        }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
            this.onVocabularyUnKnownInputTown( "chuansha_jinqiao")
        }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
            this.onVocabularyUnKnownInputTown( "chuansha_lingqiao")
        }else if(this.data.chuanshaRadio == "chuansha_liuli"){
            this.onVocabularyUnKnownInputTown( "chuansha_liuli")
        }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
            this.onVocabularyUnKnownInputTown( "chuansha_tangzhen")
        }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
            this.onVocabularyUnKnownInputTown( "chuansha_wanggang")
        }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
            this.onVocabularyUnKnownInputTown( "chuansha_wanggang")
        }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
            this.onVocabularyUnKnownInputTown( "chuansha_yangsi")
        }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
            this.onVocabularyUnKnownInputTown( "chuansha_yangyuan")
        }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
            this.onVocabularyUnKnownInputTown( "chuansha_yangjing")
        }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
            this.onVocabularyUnKnownInputTown( "chuangsha_zhangjiang")
        }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
            this.onVocabularyUnKnownInputTown( "chuansha_zhangqiao")
        }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
            this.onVocabularyUnKnownInputTown( "chuansha_chuanshazhen")
        }else if(this.data.nanhuiRadio == "nanhui_all"){
            this.onVocabularyUnKnownInputCounty( "nanhui")
        }else if(this.data.nanhuiRadio == "nanhui_binhai"){
            this.onVocabularyUnKnownInputTown( "nanhui_binhai")
        }else if(this.data.nanhuiRadio == "nanhui_datuan"){
            this.onVocabularyUnKnownInputTown( "nanhui_datuan")
        }else if(this.data.nanhuiRadio == "nanhui_donghai"){
            this.onVocabularyUnKnownInputTown( "nanhui_donghai")
        }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
            this.onVocabularyUnKnownInputTown( "nanhui_hangtou")
        }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
            this.onVocabularyUnKnownInputTown( "nanhui_hengmian")
        }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
            this.onVocabularyUnKnownInputTown( "nanhui_huanglu")
        }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
            this.onVocabularyUnKnownInputTown( "nanhui_kangqiao")
        }else if(this.data.nanhuiRadio == "nanhui_laogang"){
            this.onVocabularyUnKnownInputTown( "nanhui_laogang")
        }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
            this.onVocabularyUnKnownInputTown( "nanhui_liuzao")
        }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
            this.onVocabularyUnKnownInputTown( "nanhui_nicheng")
        }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
            this.onVocabularyUnKnownInputTown( "nanhui_pengzhen")
        }else if(this.data.nanhuiRadio == "nanhui_sandun"){
            this.onVocabularyUnKnownInputTown( "nanhui_sandun")
        }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
            this.onVocabularyUnKnownInputTown( "nanhui_sanzao")
        }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
            this.onVocabularyUnKnownInputTown( "nanhui_shuyuan")
        }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
            this.onVocabularyUnKnownInputTown( "nanhui_tanzhi")
        }else if(this.data.nanhuiRadio == "nanhui_waxie"){
            this.onVocabularyUnKnownInputTown( "nanhui_waxie")
        }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
            this.onVocabularyUnKnownInputTown( "nanhui_wanxiang")
        }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
            this.onVocabularyUnKnownInputTown( "nanhui_xiasha")
        }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
            this.onVocabularyUnKnownInputTown( "nanhui_xinchang")
        }else if(this.data.nanhuiRadio == "nanhui_xingang"){
            this.onVocabularyUnKnownInputTown( "nanhui_xingang")
        }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
            this.onVocabularyUnKnownInputTown( "nanhui_xuanqiao")
        }else if(this.data.nanhuiRadio == "nanhui_yancang"){
            this.onVocabularyUnKnownInputTown( "nanhui_yancang")
        }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
            this.onVocabularyUnKnownInputTown( "nanhui_zhoupu")
        }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
            this.onVocabularyUnKnownInputTown( "nanhui_zhuqiao")
        }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
            this.onVocabularyUnKnownInputTown( "nanhui_luchaogang")
        }else if(this.data.jiadingRadio == "jiading_all"){
            this.onVocabularyUnKnownInputCounty( "jiading")
        }else if(this.data.jiadingRadio == "jiading_anting"){
            this.onVocabularyUnKnownInputTown( "jiading_anting")
        }else if(this.data.jiadingRadio == "jiading_fengbang"){
            this.onVocabularyUnKnownInputTown( "jiading_fengbang")
        }else if(this.data.jiadingRadio == "jiading_huating"){
            this.onVocabularyUnKnownInputTown( "jiading_huating")
        }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
            this.onVocabularyUnKnownInputTown( "jiading_jiangqiao")
        }else if(this.data.jiadingRadio == "jiading_loutang"){
            this.onVocabularyUnKnownInputTown( "jiading_loutang")
        }else if(this.data.jiadingRadio == "jiading_malu"){
            this.onVocabularyUnKnownInputTown( "jiading_malu")
        }else if(this.data.jiadingRadio == "jiading_nanxiang"){
            this.onVocabularyUnKnownInputTown( "jiading_nanxiang")
        }else if(this.data.jiadingRadio == "jiading_tanghang"){
            this.onVocabularyUnKnownInputTown( "jiading_tanghang")
        }else if(this.data.jiadingRadio == "jiading_taopu"){
            this.onVocabularyUnKnownInputTown( "jiading_taopu")
        }else if(this.data.jiadingRadio == "jiading_waigang"){
            this.onVocabularyUnKnownInputTown( "jiading_waigang")
        }else if(this.data.jiadingRadio == "jiading_wangxin"){
            this.onVocabularyUnKnownInputTown( "jiading_wangxin")
        }else if(this.data.jiadingRadio == "jiading_zhenru"){
            this.onVocabularyUnKnownInputTown( "jiading_zhenru")
        }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
            this.onVocabularyUnKnownInputTown( "jiading_jiadingzhen")
        }else if(this.data.baoshanRadio == "baoshan_all"){
            this.onVocabularyUnKnownInputCounty( "baoshan")
        }else if(this.data.baoshanRadio == "baoshan_dachang"){
            this.onVocabularyUnKnownInputTown( "baoshan_dachang")
        }else if(this.data.baoshanRadio == "baoshan_fengtang"){
            this.onVocabularyUnKnownInputTown( "baoshan_fengtang")
        }else if(this.data.baoshanRadio == "baoshan_gucun"){
            this.onVocabularyUnKnownInputTown( "baoshan_gucun")
        }else if(this.data.baoshanRadio == "baoshan_liuhang"){
            this.onVocabularyUnKnownInputTown( "baoshan_liuhang")
        }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
            this.onVocabularyUnKnownInputTown( "baoshan_jiangwan")
        }else if(this.data.baoshanRadio == "baoshan_luodian"){
            this.onVocabularyUnKnownInputTown( "baoshan_luodian")
        }else if(this.data.baoshanRadio == "baoshan_luojing"){
            this.onVocabularyUnKnownInputTown( "baoshan_luojing")
        }else if(this.data.baoshanRadio == "baoshan_luonan"){
            this.onVocabularyUnKnownInputTown( "baoshan_luonan")
        }else if(this.data.baoshanRadio == "baoshan_miaohang"){
            this.onVocabularyUnKnownInputTown( "baoshan_miaohang")
        }else if(this.data.baoshanRadio == "baoshan_pengpu"){
            this.onVocabularyUnKnownInputTown( "baoshan_pengpu")
        }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
            this.onVocabularyUnKnownInputTown( "baoshan_shengqiao")
        }else if(this.data.baoshanRadio == "baoshan_songnan"){
            this.onVocabularyUnKnownInputTown( "baoshan_songnan")
        }else if(this.data.baoshanRadio == "baoshan_wusong"){
            this.onVocabularyUnKnownInputTown( "baoshan_wusong")
        }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
            this.onVocabularyUnKnownInputTown( "baoshan_wujiaochang")
        }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
            this.onVocabularyUnKnownInputTown( "baoshan_shuangcaodun")
        }else if(this.data.chongmingRadio == "chongming_all"){
            this.onVocabularyUnKnownInputCounty( "chongming")
        }else if(this.data.chongmingRadio == "chongming_chenjia"){
            this.onVocabularyUnKnownInputTown( "chongming_chenjia")
        }else if(this.data.chongmingRadio == "chongming_gangyan"){
          this.onVocabularyUnKnownInputTown("chongming_gangyan")
        }
      }else if(this.data.type == "onVocabularyKnown"){  //假使是查查词条知其字能介
        if(this.data.shanghaiValueAll == true){
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
                  noData:["找到结果"+res.total+"条"],
                  showHideBtnPanel: true                  
                })
              })
  
              var VocabularyKnownList = res.result.data
              this.setData({  //原先的20条数据
                list: VocabularyKnownList
              }) 
          }else{  //没有请求到能介
            this.setData({
              list:[],
              noData:["没有查询到结果"],
              showHideBtnPanel: false
            })
          }
        })
        }else if(this.data.comprehensiveValue == true){
          this.onVocabularyKnownInputCounty("comprehensive_search")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_all"){
          this.onVocabularyKnownInputCounty("shanghaishi")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){
          this.onVocabularyKnownInputTown("shanghaishi_nanshi")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){
          this.onVocabularyKnownInputTown("shanghaishi_xujiahui")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_fahua"){
          this.onVocabularyKnownInputTown("shanghaishi_fahua")
        }
        else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
            this.onVocabularyKnownInputCounty( "shanghaixian")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
            this.onVocabularyKnownInputTown( "shanghaixian_beiqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
            this.onVocabularyKnownInputTown( "shanghaixian_chenhang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
            this.onVocabularyKnownInputTown( "shanghaixian_duhang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
            this.onVocabularyKnownInputTown( "shanghaixian_hongqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
            this.onVocabularyKnownInputTown( "shanghaixian_huacao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
            this.onVocabularyKnownInputTown( "shanghaixian_huajing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
            this.onVocabularyKnownInputTown( "shanghaixian_jiwang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
            this.onVocabularyKnownInputTown( "shanghaixian_longhua")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
            this.onVocabularyKnownInputTown( "shanghaixian_luhui")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
            this.onVocabularyKnownInputTown( "shanghaixian_meilong")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
            this.onVocabularyKnownInputTown( "shanghaixian_qibao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
            this.onVocabularyKnownInputTown( "shanghaixian_sanlin")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
            this.onVocabularyKnownInputTown( "shanghaixian_xinzhuang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
            this.onVocabularyKnownInputTown( "shanghaixian_tangwan")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
            this.onVocabularyKnownInputTown( "shanghaixian_wujing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
            this.onVocabularyKnownInputTown( "shanghaixian_xinjing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
            this.onVocabularyKnownInputTown( "shanghaixian_zhudi")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
            this.onVocabularyKnownInputTown( "shanghaixian_zhuanqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
            this.onVocabularyKnownInputTown( "shanghaixian_beixinjing")
        }else if(this.data.songjiangRadio == "songjiang_all"){
            this.onVocabularyKnownInputCounty( "songjiang")
        }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
            this.onVocabularyKnownInputTown( "songjiang_cangqiao")
        }else if(this.data.songjiangRadio == "songjiang_chedun"){
            this.onVocabularyKnownInputTown( "songjiang_chedun")
        }else if(this.data.songjiangRadio == "songjiang_dongjing"){
            this.onVocabularyKnownInputTown( "songjiang_dongjing")
        }else if(this.data.songjiangRadio == "songjiang_jiuting"){
            this.onVocabularyKnownInputTown( "songjiang_jiuting")
        }else if(this.data.songjiangRadio == "songjiang_sheshan"){
            this.onVocabularyKnownInputTown( "songjiang_sheshan")
        }else if(this.data.songjiangRadio == "songjiang_sijing"){
            this.onVocabularyKnownInputTown( "songjiang_sijing")
        }else if(this.data.songjiangRadio == "songjiang_xinbang"){
            this.onVocabularyKnownInputTown( "songjiang_xinbang")
        }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
            this.onVocabularyKnownInputTown( "songjiang_xinqiao")
        }else if(this.data.songjiangRadio == "songjiang_yexie"){
            this.onVocabularyKnownInputTown( "songjiang_yexie")
        }else if(this.data.songjiangRadio == "songjiang_zhangze"){
            this.onVocabularyKnownInputTown( "songjiang_zhangze")
        }else if(this.data.songjiangRadio == "songjiang_shihudang"){
            this.onVocabularyKnownInputTown( "songjiang_shihudang")
        }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
            this.onVocabularyKnownInputTown( "songjiang_tianmashan")  
        }else if(this.data.songjiangRadio == "songjiang_wulitang"){
            this.onVocabularyKnownInputTown( "songjiang_wulitang")   
        }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
            this.onVocabularyKnownInputTown( "songjiang_xiaokunshan")   
        }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
            this.onVocabularyKnownInputTown( "songjiang_songjiangzhen")
        }else if(this.data.jinshanRadio == "jinshan_all"){
            this.onVocabularyKnownInputCounty( "jinshan")
        }else if(this.data.jinshanRadio == "jinshan_caojing"){
            this.onVocabularyKnownInputTown( "jinshan_caojing")
        }else if(this.data.jinshanRadio == "jinshan_fengjing"){
            this.onVocabularyKnownInputTown( "jinshan_fengjing")
        }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
            this.onVocabularyKnownInputTown( "jinshan_ganxiang")
        }else if(this.data.jinshanRadio == "jinshan_langxia"){
            this.onVocabularyKnownInputTown( "jinshan_langxia")
        }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
            this.onVocabularyKnownInputTown( "jinshan_lvxiang")
        }else if(this.data.jinshanRadio == "jinshan_qianyu"){
            this.onVocabularyKnownInputTown( "jinshan_qianyu")
        }else if(this.data.jinshanRadio == "jinshan_shanyang"){
            this.onVocabularyKnownInputTown( "jinshan_shanyang")
        }else if(this.data.jinshanRadio == "jinshan_tinglin"){
            this.onVocabularyKnownInputTown( "jinshan_tinglin")
        }else if(this.data.jinshanRadio == "jinshan_xinnong"){
            this.onVocabularyKnownInputTown( "jinshan_xinnong")
        }else if(this.data.jinshanRadio == "jinshan_xingta"){
            this.onVocabularyKnownInputTown( "jinshan_xingta")
        }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
            this.onVocabularyKnownInputTown( "jinshan_zhuhang")
        }else if(this.data.jinshanRadio == "jinshan_zhujing"){
            this.onVocabularyKnownInputTown( "jinshan_zhujing")
        }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
            this.onVocabularyKnownInputTown( "jinshan_jinshanwei")
        }else if(this.data.qingpuRadio == "qingpu_all"){
            this.onVocabularyKnownInputCounty( "qingpu")
        }else if(this.data.qingpuRadio == "qingpu_baihe"){
            this.onVocabularyKnownInputTown( "qingpu_baihe")
        }else if(this.data.qingpuRadio == "qingpu_daying"){
            this.onVocabularyKnownInputTown( "qingpu_daying")
        }else if(this.data.qingpuRadio == "qingpu_fengxi"){
            this.onVocabularyKnownInputTown( "qingpu_fengxi")
        }else if(this.data.qingpuRadio == "qingpu_huancheng"){
            this.onVocabularyKnownInputTown( "qingpu_huancheng")
        }else if(this.data.qingpuRadio == "qingpu_jinze"){
            this.onVocabularyKnownInputTown( "qingpu_jinze")
        }else if(this.data.qingpuRadio == "qingpu_liansheng"){
            this.onVocabularyKnownInputTown( "qingpu_liansheng")
        }else if(this.data.qingpuRadio == "qingpu_liantang"){
            this.onVocabularyKnownInputTown( "qingpu_liantang")
        }else if(this.data.qingpuRadio == "qingpu_shangta"){
            this.onVocabularyKnownInputTown( "qingpu_shangta")
        }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
            this.onVocabularyKnownInputTown( "qingpu_shenxiang")
        }else if(this.data.qingpuRadio == "qingpu_xiceng"){
            this.onVocabularyKnownInputTown( "qingpu_xiceng")
        }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
            this.onVocabularyKnownInputTown( "qingpu_xiaozheng")
        }else if(this.data.qingpuRadio == "qingpu_xujing"){
          this.onVocabularyKnownInputTown( "qingpu_xujing")
        }else if(this.data.qingpuRadio == "qingpu_huaxin"){
          this.onVocabularyKnownInputTown("qingpu_huaxin")
        }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
          this.onVocabularyKnownInputTown( "qingpu_yingzhong")
        }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
            this.onVocabularyKnownInputTown( "qingpu_zhaotun")
        }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
            this.onVocabularyKnownInputTown( "qingpu_zhaoxiang")
        }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
            this.onVocabularyKnownInputTown( "qingpu_zhengdian")
        }else if(this.data.qingpuRadio == "qingpu_chonggu"){
            this.onVocabularyKnownInputTown( "qingpu_chonggu")
        }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
            this.onVocabularyKnownInputTown( "qingpu_zhujiajiao")
        }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
            this.onVocabularyKnownInputTown( "qingpu_xianghuaqiao")
        }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
            this.onVocabularyKnownInputTown( "qingpu_qingpuzhen")
        }else if(this.data.fengxianRadio == "fengxian_all"){
            this.onVocabularyKnownInputCounty( "fengxian")
        }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
            this.onVocabularyKnownInputTown( "fengxian_fengcheng")
        }else if(this.data.fengxianRadio == "fengxian_fengxin"){
            this.onVocabularyKnownInputTown( "fengxian_fengxin")
        }else if(this.data.fengxianRadio == "fengxian_guangming"){
            this.onVocabularyKnownInputTown( "fengxian_guangming")
        }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
            this.onVocabularyKnownInputTown( "fengxian_hongmiao")
        }else if(this.data.fengxianRadio == "fengxian_huqiao"){
            this.onVocabularyKnownInputTown( "fengxian_huqiao")
        }else if(this.data.fengxianRadio == "fengxian_jianghai"){
            this.onVocabularyKnownInputTown( "fengxian_jianghai")
        }else if(this.data.fengxianRadio == "fengxian_jinhui"){
            this.onVocabularyKnownInputTown( "fengxian_jinhui")
        }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
            this.onVocabularyKnownInputTown( "fengxian_nanqiao")
        }else if(this.data.fengxianRadio == "fengxian_pingan"){
            this.onVocabularyKnownInputTown( "fengxian_pingan")
        }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
            this.onVocabularyKnownInputTown( "fengxian_qianqiao")
        }else if(this.data.fengxianRadio == "fengxian_qingcun"){
            this.onVocabularyKnownInputTown( "fengxian_qingcun")
        }else if(this.data.fengxianRadio == "fengxian_shaochang"){
            this.onVocabularyKnownInputTown( "fengxian_shaochang")
        }else if(this.data.fengxianRadio == "fengxian_situan"){
            this.onVocabularyKnownInputTown( "fengxian_situan")
        }else if(this.data.fengxianRadio == "fengxian_tairi"){
            this.onVocabularyKnownInputTown( "fengxian_tairi")
        }else if(this.data.fengxianRadio == "fengxian_tangwai"){
            this.onVocabularyKnownInputTown( "fengxian_tangwai")
        }else if(this.data.fengxianRadio == "fengxian_touqiao"){
            this.onVocabularyKnownInputTown( "fengxian_touqiao")
        }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
            this.onVocabularyKnownInputTown( "fengxian_wuqiao")
        }else if(this.data.fengxianRadio == "fengxian_xidu"){
            this.onVocabularyKnownInputTown( "fengxian_xidu")
        }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
            this.onVocabularyKnownInputTown( "fengxian_xiaotang")
        }else if(this.data.fengxianRadio == "fengxian_xinsi"){
            this.onVocabularyKnownInputTown( "fengxian_xinsi")
        }else if(this.data.fengxianRadio == "fengxian_zhelin"){
            this.onVocabularyKnownInputTown( "fengxian_zhelin")
        }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
            this.onVocabularyKnownInputTown( "fengxian_zhuanghang")
        }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshanhua"){
            this.onVocabularyKnownInputTown( "fengxian_zhelin_nanshanhua")
        }else if(this.data.chuanshaRadio == "chuansha_all"){
            this.onVocabularyKnownInputCounty( "chuansha")
        }else if(this.data.chuanshaRadio == "chuansha_beicai"){
            this.onVocabularyKnownInputTown( "chuansha_beicai")
        }else if(this.data.chuanshaRadio == "chuansha_caolu"){
            this.onVocabularyKnownInputTown( "chuansha_caolu")
        }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
            this.onVocabularyKnownInputTown( "chuansha_gaodong")
        }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
            this.onVocabularyKnownInputTown( "chuansha_gaohang")
        }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
            this.onVocabularyKnownInputTown( "chuansha_gaonan")
        }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
            this.onVocabularyKnownInputTown( "chuansha_gaoqiao")
        }else if(this.data.chuanshaRadio == "chuansha_heqing"){
            this.onVocabularyKnownInputTown( "chuansha_heqing")
        }else if(this.data.chuanshaRadio == "chuansha_huamu"){
            this.onVocabularyKnownInputTown( "chuansha_huamu")
        }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
            this.onVocabularyKnownInputTown( "chuansha_jiangzhen")
        }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
            this.onVocabularyKnownInputTown( "chuansha_shiwan")
        }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
            this.onVocabularyKnownInputTown( "chuansha_jinqiao")
        }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
            this.onVocabularyKnownInputTown( "chuansha_lingqiao")
        }else if(this.data.chuanshaRadio == "chuansha_liuli"){
            this.onVocabularyKnownInputTown( "chuansha_liuli")
        }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
            this.onVocabularyKnownInputTown( "chuansha_tangzhen")
        }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
            this.onVocabularyKnownInputTown( "chuansha_wanggang")
        }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
            this.onVocabularyKnownInputTown( "chuansha_wanggang")
        }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
            this.onVocabularyKnownInputTown( "chuansha_yangsi")
        }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
            this.onVocabularyKnownInputTown( "chuansha_yangyuan")
        }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
            this.onVocabularyKnownInputTown( "chuansha_yangjing")
        }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
            this.onVocabularyKnownInputTown( "chuangsha_zhangjiang")
        }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
            this.onVocabularyKnownInputTown( "chuansha_zhangqiao")
        }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
            this.onVocabularyKnownInputTown( "chuansha_chuanshazhen")
        }else if(this.data.nanhuiRadio == "nanhui_all"){
            this.onVocabularyKnownInputCounty( "nanhui")
        }else if(this.data.nanhuiRadio == "nanhui_binhai"){
            this.onVocabularyKnownInputTown( "nanhui_binhai")
        }else if(this.data.nanhuiRadio == "nanhui_datuan"){
            this.onVocabularyKnownInputTown( "nanhui_datuan")
        }else if(this.data.nanhuiRadio == "nanhui_donghai"){
            this.onVocabularyKnownInputTown( "nanhui_donghai")
        }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
            this.onVocabularyKnownInputTown( "nanhui_hangtou")
        }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
            this.onVocabularyKnownInputTown( "nanhui_hengmian")
        }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
            this.onVocabularyKnownInputTown( "nanhui_huanglu")
        }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
            this.onVocabularyKnownInputTown( "nanhui_kangqiao")
        }else if(this.data.nanhuiRadio == "nanhui_laogang"){
            this.onVocabularyKnownInputTown( "nanhui_laogang")
        }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
            this.onVocabularyKnownInputTown( "nanhui_liuzao")
        }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
            this.onVocabularyKnownInputTown( "nanhui_nicheng")
        }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
            this.onVocabularyKnownInputTown( "nanhui_pengzhen")
        }else if(this.data.nanhuiRadio == "nanhui_sandun"){
            this.onVocabularyKnownInputTown( "nanhui_sandun")
        }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
            this.onVocabularyKnownInputTown( "nanhui_sanzao")
        }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
            this.onVocabularyKnownInputTown( "nanhui_shuyuan")
        }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
            this.onVocabularyKnownInputTown( "nanhui_tanzhi")
        }else if(this.data.nanhuiRadio == "nanhui_waxie"){
            this.onVocabularyKnownInputTown( "nanhui_waxie")
        }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
            this.onVocabularyKnownInputTown( "nanhui_wanxiang")
        }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
            this.onVocabularyKnownInputTown( "nanhui_xiasha")
        }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
            this.onVocabularyKnownInputTown( "nanhui_xinchang")
        }else if(this.data.nanhuiRadio == "nanhui_xingang"){
            this.onVocabularyKnownInputTown( "nanhui_xingang")
        }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
            this.onVocabularyKnownInputTown( "nanhui_xuanqiao")
        }else if(this.data.nanhuiRadio == "nanhui_yancang"){
            this.onVocabularyKnownInputTown( "nanhui_yancang")
        }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
            this.onVocabularyKnownInputTown( "nanhui_zhoupu")
        }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
            this.onVocabularyKnownInputTown( "nanhui_zhuqiao")
        }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
            this.onVocabularyKnownInputTown( "nanhui_luchaogang")
        }else if(this.data.jiadingRadio == "jiading_all"){
            this.onVocabularyKnownInputCounty( "jiading")
        }else if(this.data.jiadingRadio == "jiading_anting"){
            this.onVocabularyKnownInputTown( "jiading_anting")
        }else if(this.data.jiadingRadio == "jiading_fengbang"){
            this.onVocabularyKnownInputTown( "jiading_fengbang")
        }else if(this.data.jiadingRadio == "jiading_huating"){
            this.onVocabularyKnownInputTown( "jiading_huating")
        }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
            this.onVocabularyKnownInputTown( "jiading_jiangqiao")
        }else if(this.data.jiadingRadio == "jiading_loutang"){
            this.onVocabularyKnownInputTown( "jiading_loutang")
        }else if(this.data.jiadingRadio == "jiading_malu"){
            this.onVocabularyKnownInputTown( "jiading_malu")
        }else if(this.data.jiadingRadio == "jiading_nanxiang"){
            this.onVocabularyKnownInputTown( "jiading_nanxiang")
        }else if(this.data.jiadingRadio == "jiading_tanghang"){
            this.onVocabularyKnownInputTown( "jiading_tanghang")
        }else if(this.data.jiadingRadio == "jiading_taopu"){
            this.onVocabularyKnownInputTown( "jiading_taopu")
        }else if(this.data.jiadingRadio == "jiading_waigang"){
            this.onVocabularyKnownInputTown( "jiading_waigang")
        }else if(this.data.jiadingRadio == "jiading_wangxin"){
            this.onVocabularyKnownInputTown( "jiading_wangxin")
        }else if(this.data.jiadingRadio == "jiading_zhenru"){
            this.onVocabularyKnownInputTown( "jiading_zhenru")
        }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
            this.onVocabularyKnownInputTown( "jiading_jiadingzhen")
        }else if(this.data.baoshanRadio == "baoshan_all"){
            this.onVocabularyKnownInputCounty( "baoshan")
        }else if(this.data.baoshanRadio == "baoshan_dachang"){
            this.onVocabularyKnownInputTown( "baoshan_dachang")
        }else if(this.data.baoshanRadio == "baoshan_fengtang"){
            this.onVocabularyKnownInputTown( "baoshan_fengtang")
        }else if(this.data.baoshanRadio == "baoshan_gucun"){
            this.onVocabularyKnownInputTown( "baoshan_gucun")
        }else if(this.data.baoshanRadio == "baoshan_liuhang"){
            this.onVocabularyKnownInputTown( "baoshan_liuhang")
        }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
            this.onVocabularyKnownInputTown( "baoshan_jiangwan")
        }else if(this.data.baoshanRadio == "baoshan_luodian"){
            this.onVocabularyKnownInputTown( "baoshan_luodian")
        }else if(this.data.baoshanRadio == "baoshan_luojing"){
            this.onVocabularyKnownInputTown( "baoshan_luojing")
        }else if(this.data.baoshanRadio == "baoshan_luonan"){
            this.onVocabularyKnownInputTown( "baoshan_luonan")
        }else if(this.data.baoshanRadio == "baoshan_miaohang"){
            this.onVocabularyKnownInputTown( "baoshan_miaohang")
        }else if(this.data.baoshanRadio == "baoshan_pengpu"){
            this.onVocabularyKnownInputTown( "baoshan_pengpu")
        }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
            this.onVocabularyKnownInputTown( "baoshan_shengqiao")
        }else if(this.data.baoshanRadio == "baoshan_songnan"){
            this.onVocabularyKnownInputTown( "baoshan_songnan")
        }else if(this.data.baoshanRadio == "baoshan_wusong"){
            this.onVocabularyKnownInputTown( "baoshan_wusong")
        }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
            this.onVocabularyKnownInputTown( "baoshan_wujiaochang")
        }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
            this.onVocabularyKnownInputTown( "baoshan_shuangcaodun")
        }else if(this.data.chongmingRadio == "chongming_all"){
            this.onVocabularyKnownInputCounty( "chongming")
        }else if(this.data.chongmingRadio == "chongming_chenjia"){
            this.onVocabularyKnownInputTown( "chongming_chenjia")
        }else if(this.data.chongmingRadio == "chongming_gangyan"){
            this.onVocabularyKnownInputTown( "chongming_gangyan")
        }
      }else{  //假使是查释义能介
        if(this.data.shanghaiValueAll == true){
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
                      noData:["找到结果"+res.total+"条"],
                      showHideBtnPanel: true
                    })
                  })
      
                  var meanList = res.result.data
                  this.setData({
                    list: meanList
                  })
                }else{  //假使请求勿着
                  this.setData({
                    list:[],
                    noData:["没有查询到结果"],
                    showHideBtnPanel:false
                  })
                }
              })
        }else if(this.data.comprehensiveValue == true){
          this.onVocabularyMeanInputCounty("comprehensive_search")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_all"){  //当上海市区>全境为真
          this.onVocabularyMeanInputCounty("shanghaishi")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){  //当上海市区>南市为真
            this.onVocabularyMeanInputTown("shanghaishi_nanshi")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){  //当上海市区>徐家汇为真
            this.onVocabularyMeanInputTown("shanghaishi_xujiahui")
        }else if(this.data.shanghaiShiRadio == "shanghaishi_fahua"){
          this.onVocabularyMeanInputTown("shanghaishi_fahua")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
            this.onVocabularyMeanInputCounty( "shanghaixian")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
            this.onVocabularyMeanInputTown( "shanghaixian_beiqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
            this.onVocabularyMeanInputTown( "shanghaixian_chenhang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
            this.onVocabularyMeanInputTown( "shanghaixian_duhang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
            this.onVocabularyMeanInputTown( "shanghaixian_hongqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
            this.onVocabularyMeanInputTown( "shanghaixian_huacao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
            this.onVocabularyMeanInputTown( "shanghaixian_huajing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
            this.onVocabularyMeanInputTown( "shanghaixian_jiwang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
            this.onVocabularyMeanInputTown( "shanghaixian_longhua")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
            this.onVocabularyMeanInputTown( "shanghaixian_luhui")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
            this.onVocabularyMeanInputTown( "shanghaixian_meilong")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
            this.onVocabularyMeanInputTown( "shanghaixian_qibao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
            this.onVocabularyMeanInputTown( "shanghaixian_sanlin")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
            this.onVocabularyMeanInputTown( "shanghaixian_xinzhuang")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
            this.onVocabularyMeanInputTown( "shanghaixian_tangwan")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
            this.onVocabularyMeanInputTown( "shanghaixian_wujing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
            this.onVocabularyMeanInputTown( "shanghaixian_xinjing")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
            this.onVocabularyMeanInputTown( "shanghaixian_zhudi")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
            this.onVocabularyMeanInputTown( "shanghaixian_zhuanqiao")
        }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
            this.onVocabularyMeanInputTown( "shanghaixian_beixinjing")
        }else if(this.data.songjiangRadio == "songjiang_all"){
            this.onVocabularyMeanInputCounty( "songjiang")
        }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
            this.onVocabularyMeanInputTown( "songjiang_cangqiao")
        }else if(this.data.songjiangRadio == "songjiang_chedun"){
            this.onVocabularyMeanInputTown( "songjiang_chedun")
        }else if(this.data.songjiangRadio == "songjiang_dongjing"){
            this.onVocabularyMeanInputTown( "songjiang_dongjing")
        }else if(this.data.songjiangRadio == "songjiang_jiuting"){
            this.onVocabularyMeanInputTown( "songjiang_jiuting")
        }else if(this.data.songjiangRadio == "songjiang_sheshan"){
            this.onVocabularyMeanInputTown( "songjiang_sheshan")
        }else if(this.data.songjiangRadio == "songjiang_sijing"){
            this.onVocabularyMeanInputTown( "songjiang_sijing")
        }else if(this.data.songjiangRadio == "songjiang_xinbang"){
            this.onVocabularyMeanInputTown( "songjiang_xinbang")
        }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
            this.onVocabularyMeanInputTown( "songjiang_xinqiao")
        }else if(this.data.songjiangRadio == "songjiang_yexie"){
            this.onVocabularyMeanInputTown( "songjiang_yexie")
        }else if(this.data.songjiangRadio == "songjiang_zhangze"){
            this.onVocabularyMeanInputTown( "songjiang_zhangze")
        }else if(this.data.songjiangRadio == "songjiang_shihudang"){
            this.onVocabularyMeanInputTown( "songjiang_shihudang")
        }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
            this.onVocabularyMeanInputTown( "songjiang_tianmashan")  
        }else if(this.data.songjiangRadio == "songjiang_wulitang"){
            this.onVocabularyMeanInputTown( "songjiang_wulitang")   
        }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
            this.onVocabularyMeanInputTown( "songjiang_xiaokunshan")   
        }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
            this.onVocabularyMeanInputTown( "songjiang_songjiangzhen")
        }else if(this.data.jinshanRadio == "jinshan_all"){
            this.onVocabularyMeanInputCounty( "jinshan")
        }else if(this.data.jinshanRadio == "jinshan_caojing"){
            this.onVocabularyMeanInputTown( "jinshan_caojing")
        }else if(this.data.jinshanRadio == "jinshan_fengjing"){
            this.onVocabularyMeanInputTown( "jinshan_fengjing")
        }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
            this.onVocabularyMeanInputTown( "jinshan_ganxiang")
        }else if(this.data.jinshanRadio == "jinshan_langxia"){
            this.onVocabularyMeanInputTown( "jinshan_langxia")
        }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
            this.onVocabularyMeanInputTown( "jinshan_lvxiang")
        }else if(this.data.jinshanRadio == "jinshan_qianyu"){
            this.onVocabularyMeanInputTown( "jinshan_qianyu")
        }else if(this.data.jinshanRadio == "jinshan_shanyang"){
            this.onVocabularyMeanInputTown( "jinshan_shanyang")
        }else if(this.data.jinshanRadio == "jinshan_tinglin"){
            this.onVocabularyMeanInputTown( "jinshan_tinglin")
        }else if(this.data.jinshanRadio == "jinshan_xinnong"){
            this.onVocabularyMeanInputTown( "jinshan_xinnong")
        }else if(this.data.jinshanRadio == "jinshan_xingta"){
            this.onVocabularyMeanInputTown( "jinshan_xingta")
        }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
            this.onVocabularyMeanInputTown( "jinshan_zhuhang")
        }else if(this.data.jinshanRadio == "jinshan_zhujing"){
            this.onVocabularyMeanInputTown( "jinshan_zhujing")
        }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
            this.onVocabularyMeanInputTown( "jinshan_jinshanwei")
        }else if(this.data.qingpuRadio == "qingpu_all"){
            this.onVocabularyMeanInputCounty( "qingpu")
        }else if(this.data.qingpuRadio == "qingpu_baihe"){
            this.onVocabularyMeanInputTown( "qingpu_baihe")
        }else if(this.data.qingpuRadio == "qingpu_daying"){
            this.onVocabularyMeanInputTown( "qingpu_daying")
        }else if(this.data.qingpuRadio == "qingpu_fengxi"){
            this.onVocabularyMeanInputTown( "qingpu_fengxi")
        }else if(this.data.qingpuRadio == "qingpu_huancheng"){
            this.onVocabularyMeanInputTown( "qingpu_huancheng")
        }else if(this.data.qingpuRadio == "qingpu_jinze"){
            this.onVocabularyMeanInputTown( "qingpu_jinze")
        }else if(this.data.qingpuRadio == "qingpu_liansheng"){
            this.onVocabularyMeanInputTown( "qingpu_liansheng")
        }else if(this.data.qingpuRadio == "qingpu_liantang"){
            this.onVocabularyMeanInputTown( "qingpu_liantang")
        }else if(this.data.qingpuRadio == "qingpu_shangta"){
            this.onVocabularyMeanInputTown( "qingpu_shangta")
        }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
            this.onVocabularyMeanInputTown( "qingpu_shenxiang")
        }else if(this.data.qingpuRadio == "qingpu_xiceng"){
            this.onVocabularyMeanInputTown( "qingpu_xiceng")
        }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
            this.onVocabularyMeanInputTown( "qingpu_xiaozheng")
        }else if(this.data.qingpuRadio == "qingpu_xujing"){
            this.onVocabularyMeanInputTown( "qingpu_xujing")
        }else if(this.data.qingpuRadio == "qingpu_huaxin"){
          this.onVocabularyMeanInputTown("qingpu_huaxin")
        }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
            this.onVocabularyMeanInputTown( "qingpu_yingzhong")
        }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
            this.onVocabularyMeanInputTown( "qingpu_zhaotun")
        }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
            this.onVocabularyMeanInputTown( "qingpu_zhaoxiang")
        }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
            this.onVocabularyMeanInputTown( "qingpu_zhengdian")
        }else if(this.data.qingpuRadio == "qingpu_chonggu"){
            this.onVocabularyMeanInputTown( "qingpu_chonggu")
        }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
            this.onVocabularyMeanInputTown( "qingpu_zhujiajiao")
        }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
            this.onVocabularyMeanInputTown( "qingpu_xianghuaqiao")
        }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
            this.onVocabularyMeanInputTown( "qingpu_qingpuzhen")
        }else if(this.data.fengxianRadio == "fengxian_all"){
            this.onVocabularyMeanInputCounty( "fengxian")
        }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
            this.onVocabularyMeanInputTown( "fengxian_fengcheng")
        }else if(this.data.fengxianRadio == "fengxian_fengxin"){
            this.onVocabularyMeanInputTown( "fengxian_fengxin")
        }else if(this.data.fengxianRadio == "fengxian_guangming"){
            this.onVocabularyMeanInputTown( "fengxian_guangming")
        }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
            this.onVocabularyMeanInputTown( "fengxian_hongmiao")
        }else if(this.data.fengxianRadio == "fengxian_huqiao"){
            this.onVocabularyMeanInputTown( "fengxian_huqiao")
        }else if(this.data.fengxianRadio == "fengxian_jianghai"){
            this.onVocabularyMeanInputTown( "fengxian_jianghai")
        }else if(this.data.fengxianRadio == "fengxian_jinhui"){
            this.onVocabularyMeanInputTown( "fengxian_jinhui")
        }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
            this.onVocabularyMeanInputTown( "fengxian_nanqiao")
        }else if(this.data.fengxianRadio == "fengxian_pingan"){
            this.onVocabularyMeanInputTown( "fengxian_pingan")
        }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
            this.onVocabularyMeanInputTown( "fengxian_qianqiao")
        }else if(this.data.fengxianRadio == "fengxian_qingcun"){
            this.onVocabularyMeanInputTown( "fengxian_qingcun")
        }else if(this.data.fengxianRadio == "fengxian_shaochang"){
            this.onVocabularyMeanInputTown( "fengxian_shaochang")
        }else if(this.data.fengxianRadio == "fengxian_situan"){
            this.onVocabularyMeanInputTown( "fengxian_situan")
        }else if(this.data.fengxianRadio == "fengxian_tairi"){
            this.onVocabularyMeanInputTown( "fengxian_tairi")
        }else if(this.data.fengxianRadio == "fengxian_tangwai"){
            this.onVocabularyMeanInputTown( "fengxian_tangwai")
        }else if(this.data.fengxianRadio == "fengxian_touqiao"){
            this.onVocabularyMeanInputTown( "fengxian_touqiao")
        }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
            this.onVocabularyMeanInputTown( "fengxian_wuqiao")
        }else if(this.data.fengxianRadio == "fengxian_xidu"){
            this.onVocabularyMeanInputTown( "fengxian_xidu")
        }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
            this.onVocabularyMeanInputTown( "fengxian_xiaotang")
        }else if(this.data.fengxianRadio == "fengxian_xinsi"){
            this.onVocabularyMeanInputTown( "fengxian_xinsi")
        }else if(this.data.fengxianRadio == "fengxian_zhelin"){
            this.onVocabularyMeanInputTown( "fengxian_zhelin")
        }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
            this.onVocabularyMeanInputTown( "fengxian_zhuanghang")
        }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshanhua"){
            this.onVocabularyMeanInputTown( "fengxian_zhelin_nanshanhua")
        }else if(this.data.chuanshaRadio == "chuansha_all"){
            this.onVocabularyMeanInputCounty( "chuansha")
        }else if(this.data.chuanshaRadio == "chuansha_beicai"){
            this.onVocabularyMeanInputTown( "chuansha_beicai")
        }else if(this.data.chuanshaRadio == "chuansha_caolu"){
            this.onVocabularyMeanInputTown( "chuansha_caolu")
        }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
            this.onVocabularyMeanInputTown( "chuansha_gaodong")
        }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
            this.onVocabularyMeanInputTown( "chuansha_gaohang")
        }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
            this.onVocabularyMeanInputTown( "chuansha_gaonan")
        }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
            this.onVocabularyMeanInputTown( "chuansha_gaoqiao")
        }else if(this.data.chuanshaRadio == "chuansha_heqing"){
            this.onVocabularyMeanInputTown( "chuansha_heqing")
        }else if(this.data.chuanshaRadio == "chuansha_huamu"){
            this.onVocabularyMeanInputTown( "chuansha_huamu")
        }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
            this.onVocabularyMeanInputTown( "chuansha_jiangzhen")
        }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
            this.onVocabularyMeanInputTown( "chuansha_shiwan")
        }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
            this.onVocabularyMeanInputTown( "chuansha_jinqiao")
        }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
            this.onVocabularyMeanInputTown( "chuansha_lingqiao")
        }else if(this.data.chuanshaRadio == "chuansha_liuli"){
            this.onVocabularyMeanInputTown( "chuansha_liuli")
        }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
            this.onVocabularyMeanInputTown( "chuansha_tangzhen")
        }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
            this.onVocabularyMeanInputTown( "chuansha_wanggang")
        }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
            this.onVocabularyMeanInputTown( "chuansha_wanggang")
        }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
            this.onVocabularyMeanInputTown( "chuansha_yangsi")
        }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
            this.onVocabularyMeanInputTown( "chuansha_yangyuan")
        }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
            this.onVocabularyMeanInputTown( "chuansha_yangjing")
        }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
            this.onVocabularyMeanInputTown( "chuangsha_zhangjiang")
        }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
            this.onVocabularyMeanInputTown( "chuansha_zhangqiao")
        }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
            this.onVocabularyMeanInputTown( "chuansha_chuanshazhen")
        }else if(this.data.nanhuiRadio == "nanhui_all"){
            this.onVocabularyMeanInputCounty( "nanhui")
        }else if(this.data.nanhuiRadio == "nanhui_binhai"){
            this.onVocabularyMeanInputTown( "nanhui_binhai")
        }else if(this.data.nanhuiRadio == "nanhui_datuan"){
            this.onVocabularyMeanInputTown( "nanhui_datuan")
        }else if(this.data.nanhuiRadio == "nanhui_donghai"){
            this.onVocabularyMeanInputTown( "nanhui_donghai")
        }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
            this.onVocabularyMeanInputTown( "nanhui_hangtou")
        }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
            this.onVocabularyMeanInputTown( "nanhui_hengmian")
        }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
            this.onVocabularyMeanInputTown( "nanhui_huanglu")
        }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
            this.onVocabularyMeanInputTown( "nanhui_kangqiao")
        }else if(this.data.nanhuiRadio == "nanhui_laogang"){
            this.onVocabularyMeanInputTown( "nanhui_laogang")
        }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
            this.onVocabularyMeanInputTown( "nanhui_liuzao")
        }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
            this.onVocabularyMeanInputTown( "nanhui_nicheng")
        }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
            this.onVocabularyMeanInputTown( "nanhui_pengzhen")
        }else if(this.data.nanhuiRadio == "nanhui_sandun"){
            this.onVocabularyMeanInputTown( "nanhui_sandun")
        }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
            this.onVocabularyMeanInputTown( "nanhui_sanzao")
        }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
            this.onVocabularyMeanInputTown( "nanhui_shuyuan")
        }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
            this.onVocabularyMeanInputTown( "nanhui_tanzhi")
        }else if(this.data.nanhuiRadio == "nanhui_waxie"){
            this.onVocabularyMeanInputTown( "nanhui_waxie")
        }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
            this.onVocabularyMeanInputTown( "nanhui_wanxiang")
        }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
            this.onVocabularyMeanInputTown( "nanhui_xiasha")
        }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
            this.onVocabularyMeanInputTown( "nanhui_xinchang")
        }else if(this.data.nanhuiRadio == "nanhui_xingang"){
            this.onVocabularyMeanInputTown( "nanhui_xingang")
        }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
            this.onVocabularyMeanInputTown( "nanhui_xuanqiao")
        }else if(this.data.nanhuiRadio == "nanhui_yancang"){
            this.onVocabularyMeanInputTown( "nanhui_yancang")
        }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
            this.onVocabularyMeanInputTown( "nanhui_zhoupu")
        }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
            this.onVocabularyMeanInputTown( "nanhui_zhuqiao")
        }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
            this.onVocabularyMeanInputTown( "nanhui_luchaogang")
        }else if(this.data.jiadingRadio == "jiading_all"){
            this.onVocabularyMeanInputCounty( "jiading")
        }else if(this.data.jiadingRadio == "jiading_anting"){
            this.onVocabularyMeanInputTown( "jiading_anting")
        }else if(this.data.jiadingRadio == "jiading_fengbang"){
            this.onVocabularyMeanInputTown( "jiading_fengbang")
        }else if(this.data.jiadingRadio == "jiading_huating"){
            this.onVocabularyMeanInputTown( "jiading_huating")
        }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
            this.onVocabularyMeanInputTown( "jiading_jiangqiao")
        }else if(this.data.jiadingRadio == "jiading_loutang"){
            this.onVocabularyMeanInputTown( "jiading_loutang")
        }else if(this.data.jiadingRadio == "jiading_malu"){
            this.onVocabularyMeanInputTown( "jiading_malu")
        }else if(this.data.jiadingRadio == "jiading_nanxiang"){
            this.onVocabularyMeanInputTown( "jiading_nanxiang")
        }else if(this.data.jiadingRadio == "jiading_tanghang"){
            this.onVocabularyMeanInputTown( "jiading_tanghang")
        }else if(this.data.jiadingRadio == "jiading_taopu"){
            this.onVocabularyMeanInputTown( "jiading_taopu")
        }else if(this.data.jiadingRadio == "jiading_waigang"){
            this.onVocabularyMeanInputTown( "jiading_waigang")
        }else if(this.data.jiadingRadio == "jiading_wangxin"){
            this.onVocabularyMeanInputTown( "jiading_wangxin")
        }else if(this.data.jiadingRadio == "jiading_zhenru"){
            this.onVocabularyMeanInputTown( "jiading_zhenru")
        }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
            this.onVocabularyMeanInputTown( "jiading_jiadingzhen")
        }else if(this.data.baoshanRadio == "baoshan_all"){
            this.onVocabularyMeanInputCounty( "baoshan")
        }else if(this.data.baoshanRadio == "baoshan_dachang"){
            this.onVocabularyMeanInputTown( "baoshan_dachang")
        }else if(this.data.baoshanRadio == "baoshan_fengtang"){
            this.onVocabularyMeanInputTown( "baoshan_fengtang")
        }else if(this.data.baoshanRadio == "baoshan_gucun"){
            this.onVocabularyMeanInputTown( "baoshan_gucun")
        }else if(this.data.baoshanRadio == "baoshan_liuhang"){
            this.onVocabularyMeanInputTown( "baoshan_liuhang")
        }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
            this.onVocabularyMeanInputTown( "baoshan_jiangwan")
        }else if(this.data.baoshanRadio == "baoshan_luodian"){
            this.onVocabularyMeanInputTown( "baoshan_luodian")
        }else if(this.data.baoshanRadio == "baoshan_luojing"){
            this.onVocabularyMeanInputTown( "baoshan_luojing")
        }else if(this.data.baoshanRadio == "baoshan_luonan"){
            this.onVocabularyMeanInputTown( "baoshan_luonan")
        }else if(this.data.baoshanRadio == "baoshan_miaohang"){
            this.onVocabularyMeanInputTown( "baoshan_miaohang")
        }else if(this.data.baoshanRadio == "baoshan_pengpu"){
            this.onVocabularyMeanInputTown( "baoshan_pengpu")
        }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
            this.onVocabularyMeanInputTown( "baoshan_shengqiao")
        }else if(this.data.baoshanRadio == "baoshan_songnan"){
            this.onVocabularyMeanInputTown( "baoshan_songnan")
        }else if(this.data.baoshanRadio == "baoshan_wusong"){
            this.onVocabularyMeanInputTown( "baoshan_wusong")
        }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
            this.onVocabularyMeanInputTown( "baoshan_wujiaochang")
        }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
            this.onVocabularyMeanInputTown( "baoshan_shuangcaodun")
        }else if(this.data.chongmingRadio == "chongming_all"){
            this.onVocabularyMeanInputCounty( "chongming")
        }else if(this.data.chongmingRadio == "chongming_chenjia"){
            this.onVocabularyMeanInputTown( "chongming_chenjia")
        }else if(this.data.chongmingRadio == "chongming_gangyan"){
          this.onVocabularyMeanInputTown( "chongming_gangyan")
        }
      }
    }else{   //假使值是空额
      this.setData({
        noData:["输入为空"],
        list:[],
        showHideBtnPanel: false
      })
    }
  },

  onReachBottom: function(e){  //触底函数
    var val = this.data.val  //定义输入额值
    if(this.data.type == "onVocabularyKnown"){  //如果选中的是知其字的情况下
      if(this.data.shanghaiValueAll == true){
        let pageList = this.data.page
        pageList = pageList + 20
        this.setData({  //把获取页的数据链接过去
          page: pageList
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
          }
        })  
      }else if(this.data.comprehensiveValue == true){
        this.onVocabularyKnownReachCounty("comprehensive_search")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_all"){  //当上海市区>全境为真
        this.onVocabularyKnownReachCounty("shanghaishi")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){  //当上海市区>南市为真
        this.onVocabularyKnownReachTown("shanghaishi_nanshi")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){  //当上海市区>徐家汇为真
        this.onVocabularyKnownReachTown("shanghaishi_xujiahui")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_fahua"){
        this.onVocabularyKnownReachTown("shanghaishi_fahua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
        this.onVocabularyKnownReachCounty( "shanghaixian")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
        this.onVocabularyKnownReachTown( "shanghaixian_beiqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
        this.onVocabularyKnownReachTown( "shanghaixian_chenhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
        this.onVocabularyKnownReachTown( "shanghaixian_duhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
        this.onVocabularyKnownReachTown( "shanghaixian_hongqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
        this.onVocabularyKnownReachTown( "shanghaixian_huacao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
        this.onVocabularyKnownReachTown( "shanghaixian_huajing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
        this.onVocabularyKnownReachTown( "shanghaixian_jiwang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
        this.onVocabularyKnownReachTown( "shanghaixian_longhua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
        this.onVocabularyKnownReachTown( "shanghaixian_luhui")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
        this.onVocabularyKnownReachTown( "shanghaixian_meilong")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
        this.onVocabularyKnownReachTown( "shanghaixian_qibao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
        this.onVocabularyKnownReachTown( "shanghaixian_sanlin")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
        this.onVocabularyKnownReachTown( "shanghaixian_xinzhuang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
        this.onVocabularyKnownReachTown( "shanghaixian_tangwan")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
        this.onVocabularyKnownReachTown( "shanghaixian_wujing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
        this.onVocabularyKnownReachTown( "shanghaixian_xinjing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
        this.onVocabularyKnownReachTown( "shanghaixian_zhudi")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
        this.onVocabularyKnownReachTown( "shanghaixian_zhuanqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
        this.onVocabularyKnownReachTown( "shanghaixian_beixinjing")
      }else if(this.data.songjiangRadio == "songjiang_all"){
        this.onVocabularyKnownReachCounty( "songjiang")
      }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
        this.onVocabularyKnownReachTown( "songjiang_cangqiao")
      }else if(this.data.songjiangRadio == "songjiang_chedun"){
        this.onVocabularyKnownReachTown( "songjiang_chedun")
      }else if(this.data.songjiangRadio == "songjiang_dongjing"){
        this.onVocabularyKnownReachTown( "songjiang_dongjing")
      }else if(this.data.songjiangRadio == "songjiang_jiuting"){
        this.onVocabularyKnownReachTown( "songjiang_jiuting")
      }else if(this.data.songjiangRadio == "songjiang_sheshan"){
        this.onVocabularyKnownReachTown( "songjiang_sheshan")
      }else if(this.data.songjiangRadio == "songjiang_sijing"){
        this.onVocabularyKnownReachTown( "songjiang_sijing")
      }else if(this.data.songjiangRadio == "songjiang_xinbang"){
        this.onVocabularyKnownReachTown( "songjiang_xinbang")
      }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
        this.onVocabularyKnownReachTown( "songjiang_xinqiao")
      }else if(this.data.songjiangRadio == "songjiang_yexie"){
        this.onVocabularyKnownReachTown( "songjiang_yexie")
      }else if(this.data.songjiangRadio == "songjiang_zhangze"){
        this.onVocabularyKnownReachTown( "songjiang_zhangze")
      }else if(this.data.songjiangRadio == "songjiang_shihudang"){
        this.onVocabularyKnownReachTown( "songjiang_shihudang")
      }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
        this.onVocabularyKnownReachTown( "songjiang_tianmashan")  
      }else if(this.data.songjiangRadio == "songjiang_wulitang"){
        this.onVocabularyKnownReachTown( "songjiang_wulitang")   
      }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
        this.onVocabularyKnownReachTown( "songjiang_xiaokunshan")   
      }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
        this.onVocabularyKnownReachTown( "songjiang_songjiangzhen")
      }else if(this.data.jinshanRadio == "jinshan_all"){
        this.onVocabularyKnownReachCounty( "jinshan")
      }else if(this.data.jinshanRadio == "jinshan_caojing"){
        this.onVocabularyKnownReachTown( "jinshan_caojing")
      }else if(this.data.jinshanRadio == "jinshan_fengjing"){
        this.onVocabularyKnownReachTown( "jinshan_fengjing")
      }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
        this.onVocabularyKnownReachTown( "jinshan_ganxiang")
      }else if(this.data.jinshanRadio == "jinshan_langxia"){
        this.onVocabularyKnownReachTown( "jinshan_langxia")
      }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
        this.onVocabularyKnownReachTown( "jinshan_lvxiang")
      }else if(this.data.jinshanRadio == "jinshan_qianyu"){
        this.onVocabularyKnownReachTown( "jinshan_qianyu")
      }else if(this.data.jinshanRadio == "jinshan_shanyang"){
        this.onVocabularyKnownReachTown( "jinshan_shanyang")
      }else if(this.data.jinshanRadio == "jinshan_tinglin"){
        this.onVocabularyKnownReachTown( "jinshan_tinglin")
      }else if(this.data.jinshanRadio == "jinshan_xinnong"){
        this.onVocabularyKnownReachTown( "jinshan_xinnong")
      }else if(this.data.jinshanRadio == "jinshan_xingta"){
        this.onVocabularyKnownReachTown( "jinshan_xingta")
      }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
        this.onVocabularyKnownReachTown( "jinshan_zhuhang")
      }else if(this.data.jinshanRadio == "jinshan_zhujing"){
        this.onVocabularyKnownReachTown( "jinshan_zhujing")
      }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
        this.onVocabularyKnownReachTown( "jinshan_jinshanwei")
      }else if(this.data.qingpuRadio == "qingpu_all"){
        this.onVocabularyKnownReachCounty( "qingpu")
      }else if(this.data.qingpuRadio == "qingpu_baihe"){
          this.onVocabularyKnownReachTown( "qingpu_baihe")
      }else if(this.data.qingpuRadio == "qingpu_daying"){
          this.onVocabularyKnownReachTown( "qingpu_daying")
      }else if(this.data.qingpuRadio == "qingpu_fengxi"){
          this.onVocabularyKnownReachTown( "qingpu_fengxi")
      }else if(this.data.qingpuRadio == "qingpu_huancheng"){
          this.onVocabularyKnownReachTown( "qingpu_huancheng")
      }else if(this.data.qingpuRadio == "qingpu_jinze"){
          this.onVocabularyKnownReachTown( "qingpu_jinze")
      }else if(this.data.qingpuRadio == "qingpu_liansheng"){
          this.onVocabularyKnownReachTown( "qingpu_liansheng")
      }else if(this.data.qingpuRadio == "qingpu_liantang"){
          this.onVocabularyKnownReachTown( "qingpu_liantang")
      }else if(this.data.qingpuRadio == "qingpu_shangta"){
          this.onVocabularyKnownReachTown( "qingpu_shangta")
      }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
          this.onVocabularyKnownReachTown( "qingpu_shenxiang")
      }else if(this.data.qingpuRadio == "qingpu_xiceng"){
          this.onVocabularyKnownReachTown( "qingpu_xiceng")
      }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
          this.onVocabularyKnownReachTown( "qingpu_xiaozheng")
      }else if(this.data.qingpuRadio == "qingpu_xujing"){
          this.onVocabularyKnownReachTown( "qingpu_xujing")
      }else if(this.data.qingpuRadio == "qingpu_huaxin"){
        this.onVocabularyKnownReachTown("qingpu_huaxin")
      }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
          this.onVocabularyKnownReachTown( "qingpu_yingzhong")
      }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
          this.onVocabularyKnownReachTown( "qingpu_zhaotun")
      }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
          this.onVocabularyKnownReachTown( "qingpu_zhaoxiang")
      }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
          this.onVocabularyKnownReachTown( "qingpu_zhengdian")
      }else if(this.data.qingpuRadio == "qingpu_chonggu"){
          this.onVocabularyKnownReachTown( "qingpu_chonggu")
      }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
          this.onVocabularyKnownReachTown( "qingpu_zhujiajiao")
      }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
          this.onVocabularyKnownReachTown( "qingpu_xianghuaqiao")
      }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
          this.onVocabularyKnownReachTown( "qingpu_qingpuzhen")
      }else if(this.data.fengxianRadio == "fengxian_all"){
          this.onVocabularyKnownReachCounty( "fengxian")
      }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
          this.onVocabularyKnownReachTown( "fengxian_fengcheng")
      }else if(this.data.fengxianRadio == "fengxian_fengxin"){
          this.onVocabularyKnownReachTown( "fengxian_fengxin")
      }else if(this.data.fengxianRadio == "fengxian_guangming"){
          this.onVocabularyKnownReachTown( "fengxian_guangming")
      }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
          this.onVocabularyKnownReachTown( "fengxian_hongmiao")
      }else if(this.data.fengxianRadio == "fengxian_huqiao"){
          this.onVocabularyKnownReachTown( "fengxian_huqiao")
      }else if(this.data.fengxianRadio == "fengxian_jianghai"){
          this.onVocabularyKnownReachTown( "fengxian_jianghai")
      }else if(this.data.fengxianRadio == "fengxian_jinhui"){
          this.onVocabularyKnownReachTown( "fengxian_jinhui")
      }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
          this.onVocabularyKnownReachTown( "fengxian_nanqiao")
      }else if(this.data.fengxianRadio == "fengxian_pingan"){
          this.onVocabularyKnownReachTown( "fengxian_pingan")
      }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
          this.onVocabularyKnownReachTown( "fengxian_qianqiao")
      }else if(this.data.fengxianRadio == "fengxian_qingcun"){
          this.onVocabularyKnownReachTown( "fengxian_qingcun")
      }else if(this.data.fengxianRadio == "fengxian_shaochang"){
          this.onVocabularyKnownReachTown( "fengxian_shaochang")
      }else if(this.data.fengxianRadio == "fengxian_situan"){
          this.onVocabularyKnownReachTown( "fengxian_situan")
      }else if(this.data.fengxianRadio == "fengxian_tairi"){
          this.onVocabularyKnownReachTown( "fengxian_tairi")
      }else if(this.data.fengxianRadio == "fengxian_tangwai"){
          this.onVocabularyKnownReachTown( "fengxian_tangwai")
      }else if(this.data.fengxianRadio == "fengxian_touqiao"){
          this.onVocabularyKnownReachTown( "fengxian_touqiao")
      }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
          this.onVocabularyKnownReachTown( "fengxian_wuqiao")
      }else if(this.data.fengxianRadio == "fengxian_xidu"){
          this.onVocabularyKnownReachTown( "fengxian_xidu")
      }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
          this.onVocabularyKnownReachTown( "fengxian_xiaotang")
      }else if(this.data.fengxianRadio == "fengxian_xinsi"){
          this.onVocabularyKnownReachTown( "fengxian_xinsi")
      }else if(this.data.fengxianRadio == "fengxian_zhelin"){
          this.onVocabularyKnownReachTown( "fengxian_zhelin")
      }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
          this.onVocabularyKnownReachTown( "fengxian_zhuanghang")
      }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshahua"){
          this.onVocabularyKnownReachTown( "fengxian_zhelin_nanshahua")
      }else if(this.data.chuanshaRadio == "chuansha_all"){
          this.onVocabularyKnownReachCounty( "chuansha")
      }else if(this.data.chuanshaRadio == "chuansha_beicai"){
          this.onVocabularyKnownReachTown( "chuansha_beicai")
      }else if(this.data.chuanshaRadio == "chuansha_caolu"){
          this.onVocabularyKnownReachTown( "chuansha_caolu")
      }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
          this.onVocabularyKnownReachTown( "chuansha_gaodong")
      }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
          this.onVocabularyKnownReachTown( "chuansha_gaohang")
      }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
          this.onVocabularyKnownReachTown( "chuansha_gaonan")
      }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
          this.onVocabularyKnownReachTown( "chuansha_gaoqiao")
      }else if(this.data.chuanshaRadio == "chuansha_heqing"){
          this.onVocabularyKnownReachTown( "chuansha_heqing")
      }else if(this.data.chuanshaRadio == "chuansha_huamu"){
          this.onVocabularyKnownReachTown( "chuansha_huamu")
      }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
          this.onVocabularyKnownReachTown( "chuansha_jiangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
          this.onVocabularyKnownReachTown( "chuansha_shiwan")
      }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
          this.onVocabularyKnownReachTown( "chuansha_jinqiao")
      }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
          this.onVocabularyKnownReachTown( "chuansha_lingqiao")
      }else if(this.data.chuanshaRadio == "chuansha_liuli"){
          this.onVocabularyKnownReachTown( "chuansha_liuli")
      }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
          this.onVocabularyKnownReachTown( "chuansha_tangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
          this.onVocabularyKnownReachTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
          this.onVocabularyKnownReachTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
          this.onVocabularyKnownReachTown( "chuansha_yangsi")
      }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
          this.onVocabularyKnownReachTown( "chuansha_yangyuan")
      }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
          this.onVocabularyKnownReachTown( "chuansha_yangjing")
      }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
          this.onVocabularyKnownReachTown( "chuangsha_zhangjiang")
      }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
          this.onVocabularyKnownReachTown( "chuansha_zhangqiao")
      }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
          this.onVocabularyKnownReachTown( "chuansha_chuanshazhen")
      }else if(this.data.nanhuiRadio == "nanhui_all"){
          this.onVocabularyKnownReachCounty( "nanhui")
      }else if(this.data.nanhuiRadio == "nanhui_binhai"){
          this.onVocabularyKnownReachTown( "nanhui_binhai")
      }else if(this.data.nanhuiRadio == "nanhui_datuan"){
          this.onVocabularyKnownReachTown( "nanhui_datuan")
      }else if(this.data.nanhuiRadio == "nanhui_donghai"){
          this.onVocabularyKnownReachTown( "nanhui_donghai")
      }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
          this.onVocabularyKnownReachTown( "nanhui_hangtou")
      }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
          this.onVocabularyKnownReachTown( "nanhui_hengmian")
      }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
          this.onVocabularyKnownReachTown( "nanhui_huanglu")
      }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
          this.onVocabularyKnownReachTown( "nanhui_kangqiao")
      }else if(this.data.nanhuiRadio == "nanhui_laogang"){
          this.onVocabularyKnownReachTown( "nanhui_laogang")
      }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
          this.onVocabularyKnownReachTown( "nanhui_liuzao")
      }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
          this.onVocabularyKnownReachTown( "nanhui_nicheng")
      }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
          this.onVocabularyKnownReachTown( "nanhui_pengzhen")
      }else if(this.data.nanhuiRadio == "nanhui_sandun"){
          this.onVocabularyKnownReachTown( "nanhui_sandun")
      }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
          this.onVocabularyKnownReachTown( "nanhui_sanzao")
      }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
          this.onVocabularyKnownReachTown( "nanhui_shuyuan")
      }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
          this.onVocabularyKnownReachTown( "nanhui_tanzhi")
      }else if(this.data.nanhuiRadio == "nanhui_waxie"){
          this.onVocabularyKnownReachTown( "nanhui_waxie")
      }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
          this.onVocabularyKnownReachTown( "nanhui_wanxiang")
      }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
          this.onVocabularyKnownReachTown( "nanhui_xiasha")
      }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
          this.onVocabularyKnownReachTown( "nanhui_xinchang")
      }else if(this.data.nanhuiRadio == "nanhui_xingang"){
          this.onVocabularyKnownReachTown( "nanhui_xingang")
      }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
          this.onVocabularyKnownReachTown( "nanhui_xuanqiao")
      }else if(this.data.nanhuiRadio == "nanhui_yancang"){
          this.onVocabularyKnownReachTown( "nanhui_yancang")
      }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
          this.onVocabularyKnownReachTown( "nanhui_zhoupu")
      }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
          this.onVocabularyKnownReachTown( "nanhui_zhuqiao")
      }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
          this.onVocabularyKnownReachTown( "nanhui_luchaogang")
      }else if(this.data.jiadingRadio == "jiading_all"){
          this.onVocabularyKnownReachCounty( "jiading")
      }else if(this.data.jiadingRadio == "jiading_anting"){
          this.onVocabularyKnownReachTown( "jiading_anting")
      }else if(this.data.jiadingRadio == "jiading_fengbang"){
          this.onVocabularyKnownReachTown( "jiading_fengbang")
      }else if(this.data.jiadingRadio == "jiading_huating"){
          this.onVocabularyKnownReachTown( "jiading_huating")
      }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
          this.onVocabularyKnownReachTown( "jiading_jiangqiao")
      }else if(this.data.jiadingRadio == "jiading_loutang"){
          this.onVocabularyKnownReachTown( "jiading_loutang")
      }else if(this.data.jiadingRadio == "jiading_malu"){
          this.onVocabularyKnownReachTown( "jiading_malu")
      }else if(this.data.jiadingRadio == "jiading_nanxiang"){
          this.onVocabularyKnownReachTown( "jiading_nanxiang")
      }else if(this.data.jiadingRadio == "jiading_tanghang"){
          this.onVocabularyKnownReachTown( "jiading_tanghang")
      }else if(this.data.jiadingRadio == "jiading_taopu"){
          this.onVocabularyKnownReachTown( "jiading_taopu")
      }else if(this.data.jiadingRadio == "jiading_waigang"){
          this.onVocabularyKnownReachTown( "jiading_waigang")
      }else if(this.data.jiadingRadio == "jiading_wangxin"){
          this.onVocabularyKnownReachTown( "jiading_wangxin")
      }else if(this.data.jiadingRadio == "jiading_zhenru"){
          this.onVocabularyKnownReachTown( "jiading_zhenru")
      }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
          this.onVocabularyKnownReachTown( "jiading_jiadingzhen")
      }else if(this.data.baoshanRadio == "baoshan_all"){
          this.onVocabularyKnownReachCounty( "baoshan")
      }else if(this.data.baoshanRadio == "baoshan_dachang"){
          this.onVocabularyKnownReachTown( "baoshan_dachang")
      }else if(this.data.baoshanRadio == "baoshan_fengtang"){
          this.onVocabularyKnownReachTown( "baoshan_fengtang")
      }else if(this.data.baoshanRadio == "baoshan_gucun"){
          this.onVocabularyKnownReachTown( "baoshan_gucun")
      }else if(this.data.baoshanRadio == "baoshan_liuhang"){
          this.onVocabularyKnownReachTown( "baoshan_liuhang")
      }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
          this.onVocabularyKnownReachTown( "baoshan_jiangwan")
      }else if(this.data.baoshanRadio == "baoshan_luodian"){
          this.onVocabularyKnownReachTown( "baoshan_luodian")
      }else if(this.data.baoshanRadio == "baoshan_luojing"){
          this.onVocabularyKnownReachTown( "baoshan_luojing")
      }else if(this.data.baoshanRadio == "baoshan_luonan"){
          this.onVocabularyKnownReachTown( "baoshan_luonan")
      }else if(this.data.baoshanRadio == "baoshan_miaohang"){
          this.onVocabularyKnownReachTown( "baoshan_miaohang")
      }else if(this.data.baoshanRadio == "baoshan_pengpu"){
          this.onVocabularyKnownReachTown( "baoshan_pengpu")
      }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
          this.onVocabularyKnownReachTown( "baoshan_shengqiao")
      }else if(this.data.baoshanRadio == "baoshan_songnan"){
          this.onVocabularyKnownReachTown( "baoshan_songnan")
      }else if(this.data.baoshanRadio == "baoshan_wusong"){
          this.onVocabularyKnownReachTown( "baoshan_wusong")
      }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
          this.onVocabularyKnownReachTown( "baoshan_wujiaochang")
      }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
          this.onVocabularyKnownReachTown( "baoshan_shuangcaodun")
      }else if(this.data.chongmingRadio == "chongming_all"){
          this.onVocabularyKnownReachCounty( "chongming")
      }else if(this.data.chongmingRadio == "chongming_chenjia"){
          this.onVocabularyKnownReachTown( "chongming_chenjia")
      }else if(this.data.chongmingRadio == "chongming_gangyan"){
          this.onVocabularyKnownReachTown( "chongming_gangyan")
      }
    }else if(this.data.type == "onVocabularyUnKnown"){  //若选中的是不知其字的情况下
      if(this.data.shanghaiValueAll == true){
            let pageList = this.data.page
            pageList = pageList + 20
            this.setData({  //把获取页的数据链接过去
              page: pageList
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
              }
            })
      }else if(this.data.comprehensiveValue == true){
        this.onVocabularyUnKnownReachCounty("comprehensive_search")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_all"){  //当上海市区>全境为真
        this.onVocabularyUnKnownReachCounty("shanghaishi")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){  //当上海市区>南市为真
        this.onVocabularyUnKnownReachTown("shanghaishi_nanshi")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){  //当上海市区>徐家汇为真
        this.onVocabularyUnKnownReachTown("shanghaishi_xujiahui")
      }else if(this.data.shanghaiXianRadio == "shanghaishi_fahua"){  //当上海县>法华为真
        this.onVocabularyUnKnownReachTown( "shanghaishi_fahua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
        this.onVocabularyUnKnownReachCounty( "shanghaixian")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_beiqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_chenhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_duhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_hongqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_huacao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_huajing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_jiwang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_longhua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_luhui")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_meilong")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_qibao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_sanlin")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
        this.onVocabularyUnKnownReachTown( "shanghaixian_xinzhuang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_tangwan")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_wujing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_xinjing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_zhudi")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_zhuanqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
        this.onVocabularyUnKnownReachTown( "shanghaixian_beixinjing")
      }else if(this.data.songjiangRadio == "songjiang_all"){
        this.onVocabularyUnKnownReachCounty( "songjiang")
      }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
        this.onVocabularyUnKnownReachTown( "songjiang_cangqiao")
      }else if(this.data.songjiangRadio == "songjiang_chedun"){
        this.onVocabularyUnKnownReachTown( "songjiang_chedun")
      }else if(this.data.songjiangRadio == "songjiang_dongjing"){
        this.onVocabularyUnKnownReachTown( "songjiang_dongjing")
      }else if(this.data.songjiangRadio == "songjiang_jiuting"){
        this.onVocabularyUnKnownReachTown( "songjiang_jiuting")
      }else if(this.data.songjiangRadio == "songjiang_sheshan"){
        this.onVocabularyUnKnownReachTown( "songjiang_sheshan")
      }else if(this.data.songjiangRadio == "songjiang_sijing"){
        this.onVocabularyUnKnownReachTown( "songjiang_sijing")
      }else if(this.data.songjiangRadio == "songjiang_xinbang"){
        this.onVocabularyUnKnownReachTown( "songjiang_xinbang")
      }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
        this.onVocabularyUnKnownReachTown( "songjiang_xinqiao")
      }else if(this.data.songjiangRadio == "songjiang_yexie"){
        this.onVocabularyUnKnownReachTown( "songjiang_yexie")
      }else if(this.data.songjiangRadio == "songjiang_zhangze"){
        this.onVocabularyUnKnownReachTown( "songjiang_zhangze")
      }else if(this.data.songjiangRadio == "songjiang_shihudang"){
        this.onVocabularyUnKnownReachTown( "songjiang_shihudang")
      }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
        this.onVocabularyUnKnownReachTown( "songjiang_tianmashan")  
      }else if(this.data.songjiangRadio == "songjiang_wulitang"){
        this.onVocabularyUnKnownReachTown( "songjiang_wulitang")   
      }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
        this.onVocabularyUnKnownReachTown( "songjiang_xiaokunshan")   
      }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
        this.onVocabularyUnKnownReachTown( "songjiang_songjiangzhen")
      }else if(this.data.jinshanRadio == "jinshan_all"){
        this.onVocabularyUnKnownReachCounty( "jinshan")
      }else if(this.data.jinshanRadio == "jinshan_caojing"){
        this.onVocabularyUnKnownReachTown( "jinshan_caojing")
      }else if(this.data.jinshanRadio == "jinshan_fengjing"){
        this.onVocabularyUnKnownReachTown( "jinshan_fengjing")
      }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
        this.onVocabularyUnKnownReachTown( "jinshan_ganxiang")
      }else if(this.data.jinshanRadio == "jinshan_langxia"){
        this.onVocabularyUnKnownReachTown( "jinshan_langxia")
      }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
        this.onVocabularyUnKnownReachTown( "jinshan_lvxiang")
      }else if(this.data.jinshanRadio == "jinshan_qianyu"){
        this.onVocabularyUnKnownReachTown( "jinshan_qianyu")
      }else if(this.data.jinshanRadio == "jinshan_shanyang"){
        this.onVocabularyUnKnownReachTown( "jinshan_shanyang")
      }else if(this.data.jinshanRadio == "jinshan_tinglin"){
        this.onVocabularyUnKnownReachTown( "jinshan_tinglin")
      }else if(this.data.jinshanRadio == "jinshan_xinnong"){
        this.onVocabularyUnKnownReachTown( "jinshan_xinnong")
      }else if(this.data.jinshanRadio == "jinshan_xingta"){
        this.onVocabularyUnKnownReachTown( "jinshan_xingta")
      }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
        this.onVocabularyUnKnownReachTown( "jinshan_zhuhang")
      }else if(this.data.jinshanRadio == "jinshan_zhujing"){
        this.onVocabularyUnKnownReachTown( "jinshan_zhujing")
      }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
        this.onVocabularyUnKnownReachTown( "jinshan_jinshanwei")
      }else if(this.data.qingpuRadio == "qingpu_all"){
        this.onVocabularyUnKnownReachCounty( "qingpu")
      }else if(this.data.qingpuRadio == "qingpu_baihe"){
          this.onVocabularyUnKnownReachTown( "qingpu_baihe")
      }else if(this.data.qingpuRadio == "qingpu_daying"){
          this.onVocabularyUnKnownReachTown( "qingpu_daying")
      }else if(this.data.qingpuRadio == "qingpu_fengxi"){
          this.onVocabularyUnKnownReachTown( "qingpu_fengxi")
      }else if(this.data.qingpuRadio == "qingpu_huancheng"){
          this.onVocabularyUnKnownReachTown( "qingpu_huancheng")
      }else if(this.data.qingpuRadio == "qingpu_jinze"){
          this.onVocabularyUnKnownReachTown( "qingpu_jinze")
      }else if(this.data.qingpuRadio == "qingpu_liansheng"){
          this.onVocabularyUnKnownReachTown( "qingpu_liansheng")
      }else if(this.data.qingpuRadio == "qingpu_liantang"){
          this.onVocabularyUnKnownReachTown( "qingpu_liantang")
      }else if(this.data.qingpuRadio == "qingpu_shangta"){
          this.onVocabularyUnKnownReachTown( "qingpu_shangta")
      }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
          this.onVocabularyUnKnownReachTown( "qingpu_shenxiang")
      }else if(this.data.qingpuRadio == "qingpu_xiceng"){
          this.onVocabularyUnKnownReachTown( "qingpu_xiceng")
      }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
          this.onVocabularyUnKnownReachTown( "qingpu_xiaozheng")
      }else if(this.data.qingpuRadio == "qingpu_xujing"){
          this.onVocabularyUnKnownReachTown( "qingpu_xujing")
      }else if(this.data.qingpuRadio = "qingpu_huaxin"){
        this.onVocabularyUnKnownReachTown("qingpu_huaxin")
      }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
          this.onVocabularyUnKnownReachTown( "qingpu_yingzhong")
      }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
          this.onVocabularyUnKnownReachTown( "qingpu_zhaotun")
      }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
          this.onVocabularyUnKnownReachTown( "qingpu_zhaoxiang")
      }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
          this.onVocabularyUnKnownReachTown( "qingpu_zhengdian")
      }else if(this.data.qingpuRadio == "qingpu_chonggu"){
          this.onVocabularyUnKnownReachTown( "qingpu_chonggu")
      }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
          this.onVocabularyUnKnownReachTown( "qingpu_zhujiajiao")
      }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
          this.onVocabularyUnKnownReachTown( "qingpu_xianghuaqiao")
      }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
          this.onVocabularyUnKnownReachTown( "qingpu_qingpuzhen")
      }else if(this.data.fengxianRadio == "fengxian_all"){
          this.onVocabularyUnKnownReachCounty( "fengxian")
      }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
          this.onVocabularyUnKnownReachTown( "fengxian_fengcheng")
      }else if(this.data.fengxianRadio == "fengxian_fengxin"){
          this.onVocabularyUnKnownReachTown( "fengxian_fengxin")
      }else if(this.data.fengxianRadio == "fengxian_guangming"){
          this.onVocabularyUnKnownReachTown( "fengxian_guangming")
      }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
          this.onVocabularyUnKnownReachTown( "fengxian_hongmiao")
      }else if(this.data.fengxianRadio == "fengxian_huqiao"){
          this.onVocabularyUnKnownReachTown( "fengxian_huqiao")
      }else if(this.data.fengxianRadio == "fengxian_jianghai"){
          this.onVocabularyUnKnownReachTown( "fengxian_jianghai")
      }else if(this.data.fengxianRadio == "fengxian_jinhui"){
          this.onVocabularyUnKnownReachTown( "fengxian_jinhui")
      }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
          this.onVocabularyUnKnownReachTown( "fengxian_nanqiao")
      }else if(this.data.fengxianRadio == "fengxian_pingan"){
          this.onVocabularyUnKnownReachTown( "fengxian_pingan")
      }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
          this.onVocabularyUnKnownReachTown( "fengxian_qianqiao")
      }else if(this.data.fengxianRadio == "fengxian_qingcun"){
          this.onVocabularyUnKnownReachTown( "fengxian_qingcun")
      }else if(this.data.fengxianRadio == "fengxian_shaochang"){
          this.onVocabularyUnKnownReachTown( "fengxian_shaochang")
      }else if(this.data.fengxianRadio == "fengxian_situan"){
          this.onVocabularyUnKnownReachTown( "fengxian_situan")
      }else if(this.data.fengxianRadio == "fengxian_tairi"){
          this.onVocabularyUnKnownReachTown( "fengxian_tairi")
      }else if(this.data.fengxianRadio == "fengxian_tangwai"){
          this.onVocabularyUnKnownReachTown( "fengxian_tangwai")
      }else if(this.data.fengxianRadio == "fengxian_touqiao"){
          this.onVocabularyUnKnownReachTown( "fengxian_touqiao")
      }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
          this.onVocabularyUnKnownReachTown( "fengxian_wuqiao")
      }else if(this.data.fengxianRadio == "fengxian_xidu"){
          this.onVocabularyUnKnownReachTown( "fengxian_xidu")
      }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
          this.onVocabularyUnKnownReachTown( "fengxian_xiaotang")
      }else if(this.data.fengxianRadio == "fengxian_xinsi"){
          this.onVocabularyUnKnownReachTown( "fengxian_xinsi")
      }else if(this.data.fengxianRadio == "fengxian_zhelin"){
          this.onVocabularyUnKnownReachTown( "fengxian_zhelin")
      }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
          this.onVocabularyUnKnownReachTown( "fengxian_zhuanghang")
      }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshahua"){
          this.onVocabularyUnKnownReachTown( "fengxian_zhelin_nanshahua")
      }else if(this.data.chuanshaRadio == "chuansha_all"){
          this.onVocabularyUnKnownReachCounty( "chuansha")
      }else if(this.data.chuanshaRadio == "chuansha_beicai"){
          this.onVocabularyUnKnownReachTown( "chuansha_beicai")
      }else if(this.data.chuanshaRadio == "chuansha_caolu"){
          this.onVocabularyUnKnownReachTown( "chuansha_caolu")
      }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
          this.onVocabularyUnKnownReachTown( "chuansha_gaodong")
      }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
          this.onVocabularyUnKnownReachTown( "chuansha_gaohang")
      }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
          this.onVocabularyUnKnownReachTown( "chuansha_gaonan")
      }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
          this.onVocabularyUnKnownReachTown( "chuansha_gaoqiao")
      }else if(this.data.chuanshaRadio == "chuansha_heqing"){
          this.onVocabularyUnKnownReachTown( "chuansha_heqing")
      }else if(this.data.chuanshaRadio == "chuansha_huamu"){
          this.onVocabularyUnKnownReachTown( "chuansha_huamu")
      }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
          this.onVocabularyUnKnownReachTown( "chuansha_jiangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
          this.onVocabularyUnKnownReachTown( "chuansha_shiwan")
      }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
          this.onVocabularyUnKnownReachTown( "chuansha_jinqiao")
      }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
          this.onVocabularyUnKnownReachTown( "chuansha_lingqiao")
      }else if(this.data.chuanshaRadio == "chuansha_liuli"){
          this.onVocabularyUnKnownReachTown( "chuansha_liuli")
      }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
          this.onVocabularyUnKnownReachTown( "chuansha_tangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
          this.onVocabularyUnKnownReachTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
          this.onVocabularyUnKnownReachTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
          this.onVocabularyUnKnownReachTown( "chuansha_yangsi")
      }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
          this.onVocabularyUnKnownReachTown( "chuansha_yangyuan")
      }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
          this.onVocabularyUnKnownReachTown( "chuansha_yangjing")
      }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
          this.onVocabularyUnKnownReachTown( "chuangsha_zhangjiang")
      }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
          this.onVocabularyUnKnownReachTown( "chuansha_zhangqiao")
      }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
          this.onVocabularyUnKnownReachTown( "chuansha_chuanshazhen")
      }else if(this.data.nanhuiRadio == "nanhui_all"){
          this.onVocabularyUnKnownReachCounty( "nanhui")
      }else if(this.data.nanhuiRadio == "nanhui_binhai"){
          this.onVocabularyUnKnownReachTown( "nanhui_binhai")
      }else if(this.data.nanhuiRadio == "nanhui_datuan"){
          this.onVocabularyUnKnownReachTown( "nanhui_datuan")
      }else if(this.data.nanhuiRadio == "nanhui_donghai"){
          this.onVocabularyUnKnownReachTown( "nanhui_donghai")
      }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
          this.onVocabularyUnKnownReachTown( "nanhui_hangtou")
      }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
          this.onVocabularyUnKnownReachTown( "nanhui_hengmian")
      }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
          this.onVocabularyUnKnownReachTown( "nanhui_huanglu")
      }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
          this.onVocabularyUnKnownReachTown( "nanhui_kangqiao")
      }else if(this.data.nanhuiRadio == "nanhui_laogang"){
          this.onVocabularyUnKnownReachTown( "nanhui_laogang")
      }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
          this.onVocabularyUnKnownReachTown( "nanhui_liuzao")
      }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
          this.onVocabularyUnKnownReachTown( "nanhui_nicheng")
      }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
          this.onVocabularyUnKnownReachTown( "nanhui_pengzhen")
      }else if(this.data.nanhuiRadio == "nanhui_sandun"){
          this.onVocabularyUnKnownReachTown( "nanhui_sandun")
      }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
          this.onVocabularyUnKnownReachTown( "nanhui_sanzao")
      }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
          this.onVocabularyUnKnownReachTown( "nanhui_shuyuan")
      }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
          this.onVocabularyUnKnownReachTown( "nanhui_tanzhi")
      }else if(this.data.nanhuiRadio == "nanhui_waxie"){
          this.onVocabularyUnKnownReachTown( "nanhui_waxie")
      }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
          this.onVocabularyUnKnownReachTown( "nanhui_wanxiang")
      }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
          this.onVocabularyUnKnownReachTown( "nanhui_xiasha")
      }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
          this.onVocabularyUnKnownReachTown( "nanhui_xinchang")
      }else if(this.data.nanhuiRadio == "nanhui_xingang"){
          this.onVocabularyUnKnownReachTown( "nanhui_xingang")
      }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
          this.onVocabularyUnKnownReachTown( "nanhui_xuanqiao")
      }else if(this.data.nanhuiRadio == "nanhui_yancang"){
          this.onVocabularyUnKnownReachTown( "nanhui_yancang")
      }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
          this.onVocabularyUnKnownReachTown( "nanhui_zhoupu")
      }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
          this.onVocabularyUnKnownReachTown( "nanhui_zhuqiao")
      }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
          this.onVocabularyUnKnownReachTown( "nanhui_luchaogang")
      }else if(this.data.jiadingRadio == "jiading_all"){
          this.onVocabularyUnKnownReachCounty( "jiading")
      }else if(this.data.jiadingRadio == "jiading_anting"){
          this.onVocabularyUnKnownReachTown( "jiading_anting")
      }else if(this.data.jiadingRadio == "jiading_fengbang"){
          this.onVocabularyUnKnownReachTown( "jiading_fengbang")
      }else if(this.data.jiadingRadio == "jiading_huating"){
          this.onVocabularyUnKnownReachTown( "jiading_huating")
      }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
          this.onVocabularyUnKnownReachTown( "jiading_jiangqiao")
      }else if(this.data.jiadingRadio == "jiading_loutang"){
          this.onVocabularyUnKnownReachTown( "jiading_loutang")
      }else if(this.data.jiadingRadio == "jiading_malu"){
          this.onVocabularyUnKnownReachTown( "jiading_malu")
      }else if(this.data.jiadingRadio == "jiading_nanxiang"){
          this.onVocabularyUnKnownReachTown( "jiading_nanxiang")
      }else if(this.data.jiadingRadio == "jiading_tanghang"){
          this.onVocabularyUnKnownReachTown( "jiading_tanghang")
      }else if(this.data.jiadingRadio == "jiading_taopu"){
          this.onVocabularyUnKnownReachTown( "jiading_taopu")
      }else if(this.data.jiadingRadio == "jiading_waigang"){
          this.onVocabularyUnKnownReachTown( "jiading_waigang")
      }else if(this.data.jiadingRadio == "jiading_wangxin"){
          this.onVocabularyUnKnownReachTown( "jiading_wangxin")
      }else if(this.data.jiadingRadio == "jiading_zhenru"){
          this.onVocabularyUnKnownReachTown( "jiading_zhenru")
      }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
          this.onVocabularyUnKnownReachTown( "jiading_jiadingzhen")
      }else if(this.data.baoshanRadio == "baoshan_all"){
          this.onVocabularyUnKnownReachCounty( "baoshan")
      }else if(this.data.baoshanRadio == "baoshan_dachang"){
          this.onVocabularyUnKnownReachTown( "baoshan_dachang")
      }else if(this.data.baoshanRadio == "baoshan_fengtang"){
          this.onVocabularyUnKnownReachTown( "baoshan_fengtang")
      }else if(this.data.baoshanRadio == "baoshan_gucun"){
          this.onVocabularyUnKnownReachTown( "baoshan_gucun")
      }else if(this.data.baoshanRadio == "baoshan_liuhang"){
          this.onVocabularyUnKnownReachTown( "baoshan_liuhang")
      }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
          this.onVocabularyUnKnownReachTown( "baoshan_jiangwan")
      }else if(this.data.baoshanRadio == "baoshan_luodian"){
          this.onVocabularyUnKnownReachTown( "baoshan_luodian")
      }else if(this.data.baoshanRadio == "baoshan_luojing"){
          this.onVocabularyUnKnownReachTown( "baoshan_luojing")
      }else if(this.data.baoshanRadio == "baoshan_luonan"){
          this.onVocabularyUnKnownReachTown( "baoshan_luonan")
      }else if(this.data.baoshanRadio == "baoshan_miaohang"){
          this.onVocabularyUnKnownReachTown( "baoshan_miaohang")
      }else if(this.data.baoshanRadio == "baoshan_pengpu"){
          this.onVocabularyUnKnownReachTown( "baoshan_pengpu")
      }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
          this.onVocabularyUnKnownReachTown( "baoshan_shengqiao")
      }else if(this.data.baoshanRadio == "baoshan_songnan"){
          this.onVocabularyUnKnownReachTown( "baoshan_songnan")
      }else if(this.data.baoshanRadio == "baoshan_wusong"){
          this.onVocabularyUnKnownReachTown( "baoshan_wusong")
      }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
          this.onVocabularyUnKnownReachTown( "baoshan_wujiaochang")
      }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
          this.onVocabularyUnKnownReachTown( "baoshan_shuangcaodun")
      }else if(this.data.chongmingRadio == "chongming_all"){
          this.onVocabularyUnKnownReachCounty( "chongming")
      }else if(this.data.chongmingRadio == "chongming_chenjia"){
          this.onVocabularyUnKnownReachTown( "chongming_chenjia")
      }else if(this.data.chongmingRadio == "chongming_gangyan"){
          this.onVocabularyUnKnownReachTown( "chongming_gangyan")
      }
    }else{  //若选中的是查释义的情况下
      if(this.data.shanghaiValueAll == true){
            let pageList = this.data.page
            pageList = pageList + 20
            this.setData({  //把获取页的数据链接过去
                page: pageList
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
                }
            })
      }else if(this.data.comprehensiveValue == true){
        this.onVocabularyKnownReachCounty("comprehensive_search")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){  //当上海市区>南市为真
            this.onVocabularyKnownReachTown("shanghaishi_nanshi")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){  //当上海市区>徐家汇为真
            this.onVocabularyKnownReachTown("shanghaishi_xujiahui")
      }else if(this.data.shanghaiXianRadio == "shanghaishi_fahua"){  //当上海县>法华为真
        this.onVocabularyKnownReachTown( "shanghaishi_fahua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
            this.onVocabularyMeanReachCounty( "shanghaixian")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
            this.onVocabularyKnownReachTown( "shanghaixian_beiqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
            this.onVocabularyKnownReachTown( "shanghaixian_chenhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
            this.onVocabularyKnownReachTown( "shanghaixian_duhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
            this.onVocabularyKnownReachTown( "shanghaixian_hongqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
            this.onVocabularyKnownReachTown( "shanghaixian_huacao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
            this.onVocabularyKnownReachTown( "shanghaixian_huajing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
            this.onVocabularyKnownReachTown( "shanghaixian_jiwang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
            this.onVocabularyKnownReachTown( "shanghaixian_longhua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
            this.onVocabularyKnownReachTown( "shanghaixian_luhui")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
            this.onVocabularyKnownReachTown( "shanghaixian_meilong")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
            this.onVocabularyKnownReachTown( "shanghaixian_qibao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
            this.onVocabularyKnownReachTown( "shanghaixian_sanlin")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
            this.onVocabularyKnownReachTown( "shanghaixian_xinzhuang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
            this.onVocabularyKnownReachTown( "shanghaixian_tangwan")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
            this.onVocabularyKnownReachTown( "shanghaixian_wujing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
            this.onVocabularyKnownReachTown( "shanghaixian_xinjing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
            this.onVocabularyKnownReachTown( "shanghaixian_zhudi")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
            this.onVocabularyKnownReachTown( "shanghaixian_zhuanqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
            this.onVocabularyKnownReachTown( "shanghaixian_beixinjing")
      }else if(this.data.songjiangRadio == "songjiang_all"){
            this.onVocabularyMeanReachCounty( "songjiang")
      }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
            this.onVocabularyKnownReachTown( "songjiang_cangqiao")
      }else if(this.data.songjiangRadio == "songjiang_chedun"){
            this.onVocabularyKnownReachTown( "songjiang_chedun")
      }else if(this.data.songjiangRadio == "songjiang_dongjing"){
            this.onVocabularyKnownReachTown( "songjiang_dongjing")
      }else if(this.data.songjiangRadio == "songjiang_jiuting"){
            this.onVocabularyKnownReachTown( "songjiang_jiuting")
      }else if(this.data.songjiangRadio == "songjiang_sheshan"){
            this.onVocabularyKnownReachTown( "songjiang_sheshan")
      }else if(this.data.songjiangRadio == "songjiang_sijing"){
            this.onVocabularyKnownReachTown( "songjiang_sijing")
      }else if(this.data.songjiangRadio == "songjiang_xinbang"){
            this.onVocabularyKnownReachTown( "songjiang_xinbang")
      }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
            this.onVocabularyKnownReachTown( "songjiang_xinqiao")
      }else if(this.data.songjiangRadio == "songjiang_yexie"){
            this.onVocabularyKnownReachTown( "songjiang_yexie")
      }else if(this.data.songjiangRadio == "songjiang_zhangze"){
            this.onVocabularyKnownReachTown( "songjiang_zhangze")
      }else if(this.data.songjiangRadio == "songjiang_shihudang"){
            this.onVocabularyKnownReachTown( "songjiang_shihudang")
      }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
            this.onVocabularyKnownReachTown( "songjiang_tianmashan")  
      }else if(this.data.songjiangRadio == "songjiang_wulitang"){
            this.onVocabularyKnownReachTown( "songjiang_wulitang")   
      }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
            this.onVocabularyKnownReachTown( "songjiang_xiaokunshan")   
      }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
            this.onVocabularyKnownReachTown( "songjiang_songjiangzhen")
      }else if(this.data.jinshanRadio == "jinshan_all"){
            this.onVocabularyMeanReachCounty( "jinshan")
      }else if(this.data.jinshanRadio == "jinshan_caojing"){
            this.onVocabularyKnownReachTown( "jinshan_caojing")
      }else if(this.data.jinshanRadio == "jinshan_fengjing"){
            this.onVocabularyKnownReachTown( "jinshan_fengjing")
      }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
            this.onVocabularyKnownReachTown( "jinshan_ganxiang")
      }else if(this.data.jinshanRadio == "jinshan_langxia"){
            this.onVocabularyKnownReachTown( "jinshan_langxia")
      }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
            this.onVocabularyKnownReachTown( "jinshan_lvxiang")
      }else if(this.data.jinshanRadio == "jinshan_qianyu"){
            this.onVocabularyKnownReachTown( "jinshan_qianyu")
      }else if(this.data.jinshanRadio == "jinshan_shanyang"){
            this.onVocabularyKnownReachTown( "jinshan_shanyang")
      }else if(this.data.jinshanRadio == "jinshan_tinglin"){
            this.onVocabularyKnownReachTown( "jinshan_tinglin")
      }else if(this.data.jinshanRadio == "jinshan_xinnong"){
            this.onVocabularyKnownReachTown( "jinshan_xinnong")
      }else if(this.data.jinshanRadio == "jinshan_xingta"){
            this.onVocabularyKnownReachTown( "jinshan_xingta")
      }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
            this.onVocabularyKnownReachTown( "jinshan_zhuhang")
      }else if(this.data.jinshanRadio == "jinshan_zhujing"){
            this.onVocabularyKnownReachTown( "jinshan_zhujing")
      }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
            this.onVocabularyKnownReachTown( "jinshan_jinshanwei")
      }else if(this.data.qingpuRadio == "qingpu_all"){
            this.onVocabularyMeanReachCounty( "qingpu")
      }else if(this.data.qingpuRadio == "qingpu_baihe"){
              this.onVocabularyKnownReachTown( "qingpu_baihe")
      }else if(this.data.qingpuRadio == "qingpu_daying"){
              this.onVocabularyKnownReachTown( "qingpu_daying")
      }else if(this.data.qingpuRadio == "qingpu_fengxi"){
              this.onVocabularyKnownReachTown( "qingpu_fengxi")
      }else if(this.data.qingpuRadio == "qingpu_huancheng"){
              this.onVocabularyKnownReachTown( "qingpu_huancheng")
      }else if(this.data.qingpuRadio == "qingpu_jinze"){
              this.onVocabularyKnownReachTown( "qingpu_jinze")
      }else if(this.data.qingpuRadio == "qingpu_liansheng"){
              this.onVocabularyKnownReachTown( "qingpu_liansheng")
      }else if(this.data.qingpuRadio == "qingpu_liantang"){
              this.onVocabularyKnownReachTown( "qingpu_liantang")
      }else if(this.data.qingpuRadio == "qingpu_shangta"){
              this.onVocabularyKnownReachTown( "qingpu_shangta")
      }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
              this.onVocabularyKnownReachTown( "qingpu_shenxiang")
      }else if(this.data.qingpuRadio == "qingpu_xiceng"){
              this.onVocabularyKnownReachTown( "qingpu_xiceng")
      }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
              this.onVocabularyKnownReachTown( "qingpu_xiaozheng")
      }else if(this.data.qingpuRadio == "qingpu_xujing"){
              this.onVocabularyKnownReachTown( "qingpu_xujing")
      }else if(this.data.qingpuRadio == "qingpu_huaxin"){
        this.onVocabularyKnownReachTown("qingpu_huaxin")
      }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
              this.onVocabularyKnownReachTown( "qingpu_yingzhong")
      }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
              this.onVocabularyKnownReachTown( "qingpu_zhaotun")
      }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
              this.onVocabularyKnownReachTown( "qingpu_zhaoxiang")
      }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
              this.onVocabularyKnownReachTown( "qingpu_zhengdian")
      }else if(this.data.qingpuRadio == "qingpu_chonggu"){
              this.onVocabularyKnownReachTown( "qingpu_chonggu")
      }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
              this.onVocabularyKnownReachTown( "qingpu_zhujiajiao")
      }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
              this.onVocabularyKnownReachTown( "qingpu_xianghuaqiao")
      }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
              this.onVocabularyKnownReachTown( "qingpu_qingpuzhen")
      }else if(this.data.fengxianRadio == "fengxian_all"){
              this.onVocabularyMeanReachCounty( "fengxian")
      }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
              this.onVocabularyKnownReachTown( "fengxian_fengcheng")
      }else if(this.data.fengxianRadio == "fengxian_fengxin"){
              this.onVocabularyKnownReachTown( "fengxian_fengxin")
      }else if(this.data.fengxianRadio == "fengxian_guangming"){
              this.onVocabularyKnownReachTown( "fengxian_guangming")
      }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
              this.onVocabularyKnownReachTown( "fengxian_hongmiao")
      }else if(this.data.fengxianRadio == "fengxian_huqiao"){
              this.onVocabularyKnownReachTown( "fengxian_huqiao")
      }else if(this.data.fengxianRadio == "fengxian_jianghai"){
              this.onVocabularyKnownReachTown( "fengxian_jianghai")
      }else if(this.data.fengxianRadio == "fengxian_jinhui"){
              this.onVocabularyKnownReachTown( "fengxian_jinhui")
      }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
              this.onVocabularyKnownReachTown( "fengxian_nanqiao")
      }else if(this.data.fengxianRadio == "fengxian_pingan"){
              this.onVocabularyKnownReachTown( "fengxian_pingan")
      }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
              this.onVocabularyKnownReachTown( "fengxian_qianqiao")
      }else if(this.data.fengxianRadio == "fengxian_qingcun"){
              this.onVocabularyKnownReachTown( "fengxian_qingcun")
      }else if(this.data.fengxianRadio == "fengxian_shaochang"){
              this.onVocabularyKnownReachTown( "fengxian_shaochang")
      }else if(this.data.fengxianRadio == "fengxian_situan"){
              this.onVocabularyKnownReachTown( "fengxian_situan")
      }else if(this.data.fengxianRadio == "fengxian_tairi"){
              this.onVocabularyKnownReachTown( "fengxian_tairi")
      }else if(this.data.fengxianRadio == "fengxian_tangwai"){
              this.onVocabularyKnownReachTown( "fengxian_tangwai")
      }else if(this.data.fengxianRadio == "fengxian_touqiao"){
              this.onVocabularyKnownReachTown( "fengxian_touqiao")
      }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
              this.onVocabularyKnownReachTown( "fengxian_wuqiao")
      }else if(this.data.fengxianRadio == "fengxian_xidu"){
              this.onVocabularyKnownReachTown( "fengxian_xidu")
      }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
              this.onVocabularyKnownReachTown( "fengxian_xiaotang")
      }else if(this.data.fengxianRadio == "fengxian_xinsi"){
              this.onVocabularyKnownReachTown( "fengxian_xinsi")
      }else if(this.data.fengxianRadio == "fengxian_zhelin"){
              this.onVocabularyKnownReachTown( "fengxian_zhelin")
      }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
              this.onVocabularyKnownReachTown( "fengxian_zhuanghang")
      }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshahua"){
              this.onVocabularyKnownReachTown( "fengxian_zhelin_nanshahua")
      }else if(this.data.chuanshaRadio == "chuansha_all"){
              this.onVocabularyMeanReachCounty( "chuansha")
      }else if(this.data.chuanshaRadio == "chuansha_beicai"){
              this.onVocabularyKnownReachTown( "chuansha_beicai")
      }else if(this.data.chuanshaRadio == "chuansha_caolu"){
              this.onVocabularyKnownReachTown( "chuansha_caolu")
      }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
              this.onVocabularyKnownReachTown( "chuansha_gaodong")
      }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
              this.onVocabularyKnownReachTown( "chuansha_gaohang")
      }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
              this.onVocabularyKnownReachTown( "chuansha_gaonan")
      }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
              this.onVocabularyKnownReachTown( "chuansha_gaoqiao")
      }else if(this.data.chuanshaRadio == "chuansha_heqing"){
              this.onVocabularyKnownReachTown( "chuansha_heqing")
      }else if(this.data.chuanshaRadio == "chuansha_huamu"){
              this.onVocabularyKnownReachTown( "chuansha_huamu")
      }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
              this.onVocabularyKnownReachTown( "chuansha_jiangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
              this.onVocabularyKnownReachTown( "chuansha_shiwan")
      }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
              this.onVocabularyKnownReachTown( "chuansha_jinqiao")
      }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
              this.onVocabularyKnownReachTown( "chuansha_lingqiao")
      }else if(this.data.chuanshaRadio == "chuansha_liuli"){
              this.onVocabularyKnownReachTown( "chuansha_liuli")
      }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
              this.onVocabularyKnownReachTown( "chuansha_tangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
              this.onVocabularyKnownReachTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
              this.onVocabularyKnownReachTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
              this.onVocabularyKnownReachTown( "chuansha_yangsi")
      }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
              this.onVocabularyKnownReachTown( "chuansha_yangyuan")
      }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
              this.onVocabularyKnownReachTown( "chuansha_yangjing")
      }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
              this.onVocabularyKnownReachTown( "chuangsha_zhangjiang")
      }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
              this.onVocabularyKnownReachTown( "chuansha_zhangqiao")
      }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
              this.onVocabularyKnownReachTown( "chuansha_chuanshazhen")
      }else if(this.data.nanhuiRadio == "nanhui_all"){
              this.onVocabularyMeanReachCounty( "nanhui")
      }else if(this.data.nanhuiRadio == "nanhui_binhai"){
              this.onVocabularyKnownReachTown( "nanhui_binhai")
      }else if(this.data.nanhuiRadio == "nanhui_datuan"){
              this.onVocabularyKnownReachTown( "nanhui_datuan")
      }else if(this.data.nanhuiRadio == "nanhui_donghai"){
              this.onVocabularyKnownReachTown( "nanhui_donghai")
      }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
              this.onVocabularyKnownReachTown( "nanhui_hangtou")
      }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
              this.onVocabularyKnownReachTown( "nanhui_hengmian")
      }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
              this.onVocabularyKnownReachTown( "nanhui_huanglu")
      }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
              this.onVocabularyKnownReachTown( "nanhui_kangqiao")
      }else if(this.data.nanhuiRadio == "nanhui_laogang"){
              this.onVocabularyKnownReachTown( "nanhui_laogang")
      }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
              this.onVocabularyKnownReachTown( "nanhui_liuzao")
      }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
              this.onVocabularyKnownReachTown( "nanhui_nicheng")
      }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
              this.onVocabularyKnownReachTown( "nanhui_pengzhen")
      }else if(this.data.nanhuiRadio == "nanhui_sandun"){
              this.onVocabularyKnownReachTown( "nanhui_sandun")
      }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
              this.onVocabularyKnownReachTown( "nanhui_sanzao")
      }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
              this.onVocabularyKnownReachTown( "nanhui_shuyuan")
      }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
              this.onVocabularyKnownReachTown( "nanhui_tanzhi")
      }else if(this.data.nanhuiRadio == "nanhui_waxie"){
              this.onVocabularyKnownReachTown( "nanhui_waxie")
      }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
              this.onVocabularyKnownReachTown( "nanhui_wanxiang")
      }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
              this.onVocabularyKnownReachTown( "nanhui_xiasha")
      }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
              this.onVocabularyKnownReachTown( "nanhui_xinchang")
      }else if(this.data.nanhuiRadio == "nanhui_xingang"){
              this.onVocabularyKnownReachTown( "nanhui_xingang")
      }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
              this.onVocabularyKnownReachTown( "nanhui_xuanqiao")
      }else if(this.data.nanhuiRadio == "nanhui_yancang"){
              this.onVocabularyKnownReachTown( "nanhui_yancang")
      }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
              this.onVocabularyKnownReachTown( "nanhui_zhoupu")
      }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
              this.onVocabularyKnownReachTown( "nanhui_zhuqiao")
      }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
              this.onVocabularyKnownReachTown( "nanhui_luchaogang")
      }else if(this.data.jiadingRadio == "jiading_all"){
              this.onVocabularyMeanReachCounty( "jiading")
      }else if(this.data.jiadingRadio == "jiading_anting"){
              this.onVocabularyKnownReachTown( "jiading_anting")
      }else if(this.data.jiadingRadio == "jiading_fengbang"){
              this.onVocabularyKnownReachTown( "jiading_fengbang")
      }else if(this.data.jiadingRadio == "jiading_huating"){
              this.onVocabularyKnownReachTown( "jiading_huating")
      }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
              this.onVocabularyKnownReachTown( "jiading_jiangqiao")
      }else if(this.data.jiadingRadio == "jiading_loutang"){
              this.onVocabularyKnownReachTown( "jiading_loutang")
      }else if(this.data.jiadingRadio == "jiading_malu"){
              this.onVocabularyKnownReachTown( "jiading_malu")
      }else if(this.data.jiadingRadio == "jiading_nanxiang"){
              this.onVocabularyKnownReachTown( "jiading_nanxiang")
      }else if(this.data.jiadingRadio == "jiading_tanghang"){
              this.onVocabularyKnownReachTown( "jiading_tanghang")
      }else if(this.data.jiadingRadio == "jiading_taopu"){
              this.onVocabularyKnownReachTown( "jiading_taopu")
      }else if(this.data.jiadingRadio == "jiading_waigang"){
              this.onVocabularyKnownReachTown( "jiading_waigang")
      }else if(this.data.jiadingRadio == "jiading_wangxin"){
              this.onVocabularyKnownReachTown( "jiading_wangxin")
      }else if(this.data.jiadingRadio == "jiading_zhenru"){
              this.onVocabularyKnownReachTown( "jiading_zhenru")
      }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
              this.onVocabularyKnownReachTown( "jiading_jiadingzhen")
      }else if(this.data.baoshanRadio == "baoshan_all"){
              this.onVocabularyMeanReachCounty( "baoshan")
      }else if(this.data.baoshanRadio == "baoshan_dachang"){
              this.onVocabularyKnownReachTown( "baoshan_dachang")
      }else if(this.data.baoshanRadio == "baoshan_fengtang"){
              this.onVocabularyKnownReachTown( "baoshan_fengtang")
      }else if(this.data.baoshanRadio == "baoshan_gucun"){
              this.onVocabularyKnownReachTown( "baoshan_gucun")
      }else if(this.data.baoshanRadio == "baoshan_liuhang"){
              this.onVocabularyKnownReachTown( "baoshan_liuhang")
      }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
              this.onVocabularyKnownReachTown( "baoshan_jiangwan")
      }else if(this.data.baoshanRadio == "baoshan_luodian"){
              this.onVocabularyKnownReachTown( "baoshan_luodian")
      }else if(this.data.baoshanRadio == "baoshan_luojing"){
              this.onVocabularyKnownReachTown( "baoshan_luojing")
      }else if(this.data.baoshanRadio == "baoshan_luonan"){
              this.onVocabularyKnownReachTown( "baoshan_luonan")
      }else if(this.data.baoshanRadio == "baoshan_miaohang"){
              this.onVocabularyKnownReachTown( "baoshan_miaohang")
      }else if(this.data.baoshanRadio == "baoshan_pengpu"){
              this.onVocabularyKnownReachTown( "baoshan_pengpu")
      }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
              this.onVocabularyKnownReachTown( "baoshan_shengqiao")
      }else if(this.data.baoshanRadio == "baoshan_songnan"){
              this.onVocabularyKnownReachTown( "baoshan_songnan")
      }else if(this.data.baoshanRadio == "baoshan_wusong"){
              this.onVocabularyKnownReachTown( "baoshan_wusong")
      }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
              this.onVocabularyKnownReachTown( "baoshan_wujiaochang")
      }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
              this.onVocabularyKnownReachTown( "baoshan_shuangcaodun")
      }else if(this.data.chongmingRadio == "chongming_all"){
              this.onVocabularyMeanReachCounty( "chongming")
      }else if(this.data.chongmingRadio == "chongming_chenjia"){
              this.onVocabularyKnownReachTown( "chongming_chenjia")
      }else if(this.data.chongmingRadio == "chongming_gangyan"){
            this.onVocabularyKnownReachTown( "chongming_gangyan")
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
  advanceBtnUniversal: function(townValue){
    this.setData({
      //重置所有镇的value为全部
      shanghaiShiRadio: townValue,
      shanghaiXianRadio: townValue,
      songjiangRadio: townValue,
      jinshanRadio: townValue,
      qingpuRadio: townValue,
      fengxianRadio: townValue,
      chuanshaRadio: townValue,
      nanhuiRadio: townValue,
      jiadingRadio: townValue,
      baoshanRadio: townValue,
      chongmingRadio: townValue,

      comprehensiveValue:false,

      noData:[],  //将状态栏设置为空
      page: 0,  //将将来要数据库中的页码也设置为0
      reachBottom:"",  //将“到底了”设置为空
      list:"",  //将“list“设置为空
      showHideBtnPanel: false
    })
  },

  shanghaiAllBtn: function(e){
    this.setData({
      //重置所有镇的value为全部
      shanghaiShiRadio:"shanghaishi_all",
      shanghaiXianRadio:"shanghaixian_all",
      songjiangRadio:"songjiang_all",
      jinshanRadio:"jinshan_all",
      qingpuRadio:"qingpu_all",
      fengxianRadio:"fengxian_all",
      chuanshaRadio:"chuansha_all",
      nanhuiRadio:"nanhui_all",
      jiadingRadio:"jiading_all",
      baoshanRadio:"baoshan_all",
      chongmingRadio:"chongming_all",
      //set交互选中的县与镇
      countyName:"上海全境",  //县
      townName:"",  //镇
      shanghaiValueAll: true,
      //关于数据的
      noData:[],  //将状态栏设置为空
      page: 0,  //将将来要数据库中的页码也设置为0
      reachBottom:"",  //将“到底了”设置为空
      list:"",  //将“list“设置为空
      showHideBtnPanel: false,
      //set锁为开而非关
      LockOffValue: true,
      LockOnValue: false,
      //set所有radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
      songjiangValue: false,
      jinshanValue: false,
      qingpuValue: false,
      fengxianValue: false,
      chuanshaValue: false,
      nanhuiValue: false,
      jiadingValue: false,
      baoshanValue: false,
      chongmingValue: false,
      comprehensiveValue: false
    })
  },

  shanghaiShiBtn: function(e){
    this.advanceBtnUniversal("shanghaishi_all")
    this.setData({
      //重置所有镇的radio的checked的值
      shanghaishi_all_checked: true,
      shanghaishi_nanshi_checked: false,
      shanghaishi_xujiahui_checked: false,
      shanghaishi_fahua_checked: false,
      //set交互选中的县与镇
      countyName:"上海市区",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      shanghaiShiRadio:"shanghaishi_all",
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: true,
      shanghaiXianValue: false,
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

  shanghaiXianBtn: function(e){
    this.advanceBtnUniversal("shanghaixian_all")
    this.setData({
      //重置所有镇的radio的checked的值
      shanghaixian_all_checked: true,
      shanghaixian_beiqiao_checked: false,
      shanghaixian_chenhang_checked: false,
      shanghaixian_duhang_checked: false,
      shanghaixian_hongqiao_checked: false,
      shanghaixian_huacao_checked: false,
      shanghaixian_huajing_checked: false,
      shanghaixian_jiwang_checked: false,
      shanghaixian_longhua_checked: false,
      shanghaixian_luhui_checked : false,
      shanghaixian_meilong_checked: false,
      shanghaixian_qibao_checked: false,
      shanghaixian_sanlin_checked: false,
      shanghaixian_xinzhuang_checked: false,
      shanghaixian_tangwan_checked: false,
      shanghaixian_wujing_checked: false,
      shanghaixian_xinjing_checked: false,
      shanghaixian_zhudi_checked: false,
      shanghaixian_zhuanqiao_checked: false,
      shanghaixian_beixinjing_checked: false,
      //set交互选中的县与镇
      countyName:"上海县",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: true,
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

  songjiangBtn: function(e){
    this.advanceBtnUniversal("songjiang_all")
    this.setData({
      //重置所有镇的radio的checked的值
      songjiang_all_checked: true,
      songjiang_cangqiao_checked: false,
      songjiang_chedun_checked: false,
      songjiang_dongjing_checked: false,
      songjiang_jiuting_checked: false,
      songjiang_sheshan_checked: false,
      songjiang_sijing_checked: false,
      songjiang_xinbang_checked: false,
      songjiang_xinqiao_checked: false,
      songjiang_yexie_checked: false,
      songjiang_zhangze_checked: false,
      songjiang_shihudang_checked: false,
      songjiang_tianmashan_checked: false,
      songjiang_wilitang_checked: false,
      songjiang_xiaokunshan_checked: false,
      songjiang_songjiangzhen_checked: false,
      //set交互选中的县与镇
      countyName:"松江",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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

  jinshanBtn: function(e){
    this.advanceBtnUniversal("jinshan_all")
    this.setData({
      //重置所有镇的radio的checked的值
      jinshan_all_checked: true,
      jinshan_caojing_checked: false,
      jinshan_fengjing_checked: false,
      jinshan_ganxiang_checked: false,
      jinshan_langxia_checked: false,
      jinshan_lvxiang_checked: false,
      jinshan_qianyu_checked: false,
      jinshan_shanyang_checked: false,
      jinshan_tinglin_checked: false,
      jinshan_xinnong_checked: false,
      jinshan_xingta_checked: false,
      jinshan_zhuhang_checked: false,
      jinshan_zhujing_checked: false,
      jinshan_jinshanwei_checked: false,
      //set交互选中的县与镇
      countyName:"金山",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
    this.advanceBtnUniversal("qingpu_all")
    this.setData({
      //重置所有镇的radio的checked的值
      qingpu_all_checked: true,
      qingpu_baihe_checked: false,
      qingpu_daying_checked: false,
      qingpu_fengxi_checked: false,
      qingpu_huancheng_checked: false,
      qingpu_jinze_checked:false,
      qingpu_liansheng_checked:false,
      qingpu_liantang_checked:false,
      qingpu_shangta_checked:false,
      qingpu_shenxiang_checked:false,
      qingpu_xiceng_checked:false,
      qingpu_xiaozheng_checked:false,
      qingpu_xujing_checked:false,
      qingpu_huaxin_checked: false,
      qingpu_yingzhong_checked:false,
      qingpu_zhaotun_checked:false,
      qingpu_zhaoxiang_checked:false,
      qingpu_zhengdian_checked:false,
      qingpu_chonggu_checked:false,
      qingpu_zhujiajiao_checked:false,
      qingpu_xianghuaqiao_checked:false,
      qingpu_qingpuzhen_checked:false,
      //set交互选中的县与镇
      countyName:"青浦",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
    this.advanceBtnUniversal("fengxian_all")
    this.setData({
      //重置所有镇的radio的checked的值
      fengxian_all_checked: true,
      fengxian_fengcheng_checked:false,
      fengxian_fengxin_checked:false,
      fengxian_guangming_checked:false,
      fengxian_hongmiao_checked:false,
      fengxian_huqiao_checked:false,
      fengxian_jianghai_checked:false,
      fengxian_jinhui_checked:false,
      fengxian_nanqiao_checked:false,
      fengxian_pingan_checked:false,
      fengxian_qianqiao_checked:false,
      fengxian_qingcun_checked:false,
      fengxian_shaochang_checked:false,
      fengxian_situan_checked:false,
      fengxian_tairi_checked:false,
      fengxian_tangwai_checked:false,
      fengxian_touqiao_checked:false,
      fengxian_wuqiao_checked:false,
      fengxian_xidu_checked:false,
      fengxian_xiaotang_checked:false,
      fengxian_xinsi_checked:false,
      fengxian_zhelin_checked:false,
      fengxian_zhuanghang_checked:false,
      fengxian_zhelin_nanshanhua_checked:false,
      //set交互选中的县与镇
      countyName:"奉贤",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
    this.advanceBtnUniversal("chuansha_all")
    this.setData({
      //重置所有镇的radio的checked的值
      chuansha_all_checked: true,
      chuansha_beicai_checked:false,
      chuansha_caolu_checked:false,
      chuansha_gaodong_checked:false,
      chuansha_gaohang_checked:false,
      chuansha_gaonan_checked:false,
      chuansha_gaoqiao_checked:false,
      chuansha_heqing_checked:false,
      chuansha_huamu_checked:false,
      chuansha_jiangzhen_checked:false,
      chuansha_shiwan_checked:false,
      chuansha_jinqiao_checked:false,
      chuansha_lingqiao_checked:false,
      chuansha_liuli_checked:false,
      chuansha_tangzhen_checked:false,
      chuansha_wanggang_checked:false,
      chuansha_yanqiao_checked:false,
      chuansha_yangsi_checked:false,
      chuansha_yangyuan_checked:false,
      chuansha_yangjing_checked:false,
      chuansha_zhangjiang_checked:false,
      chuansha_zhangqiao_checked:false,
      chuansha_chuanshazhen_checked:false,
      //set交互选中的县与镇
      countyName:"川沙",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
    this.advanceBtnUniversal("nanhui_all")
    this.setData({
      //重置所有镇的radio的checked的值
      nanhui_all_checked: true,
      nanhui_binhai_checked:false,
      nanhui_datuan_checked:false,
      nanhui_donghai_checked:false,
      nanhui_hangtou_checked:false,
      nanhui_hengmian_checked:false,
      nanhui_huanglu_checked:false,
      nanhui_kangqiao_checked:false,
      nanhui_laogang_checked:false,
      nanhui_liuzao_checked:false,
      nanhui_nicheng_checked:false,
      nanhui_pengzhen_checked:false,
      nanhui_sandun_checked:false,
      nanhui_sanzao_checked:false,
      nanhui_shuyuan_checked:false,
      nanhui_tanzhi_checked:false,
      nanhui_waxie_checked:false,
      nanhui_wanxiang_checked:false,
      nanhui_xiasha_checked:false,
      nanhui_xinchang_checked:false,
      nanhui_xingang_checked:false,
      nanhui_xuanqiao_checked:false,
      nanhui_yancang_checked:false,
      nanhui_zhoupu_checked:false,
      nanhui_zhuqiao_checked:false,
      nanhui_luchaogang_checked:false,
      //set交互选中的县与镇
      countyName:"南汇",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
    this.advanceBtnUniversal("jiading_all")
    this.setData({
      //重置所有镇的radio的checked的值
      jiading_all_checked: true,
      jiading_anting_checked: false,
      jiading_fengbang_checked:false,
      jiading_huating_checked:false,
      jiading_jiangqiao_checked:false,
      jiading_loutang_checked:false,
      jiading_malu_checked:false,
      jiading_nanxiang_checked:false,
      jiading_tanghang_checked:false,
      jiading_taopu_checked:false,
      jiading_waigang_checked:false,
      jiading_wangxin_checked:false,
      jiading_zhenru_checked:false,
      jiading_jiadingzhen_checked:false,
      //set交互选中的县与镇
      countyName:"嘉定",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
    this.advanceBtnUniversal("baoshan_all")
    this.setData({
      //重置所有镇的radio的checked的值
      baoshan_all_checked: true,
      baoshan_dachang_checked:false,
      baoshan_fengtang_checked:false,
      baoshan_gucun_checked:false,
      baoshan_liuhang_checked:false,
      baoshan_jiangwan_checked:false,
      baoshan_luodian_checked:false,
      baoshan_luojing_checked:false,
      baoshan_luonan_checked:false,
      baoshan_miaohang_checked:false,
      baoshan_pengpu_checked:false,
      baoshan_shengqiao_checked:false,
      baoshan_songnan_checked:false,
      baoshan_wusong_checked:false,
      baoshan_wujiaochang_checked:false,
      baoshan_shuangcaodun_checked:false,
      //set交互选中的县与镇
      countyName:"宝山",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
    this.advanceBtnUniversal("chongming_all")
    this.setData({
      //重置所有镇的radio的checked的值
      chongming_all_checked:true,
      chongming_chenjia_checked:false,
      chongming_gangyan_checked:false,  
      //set交互选中的县与镇
      countyName:"崇明",  //县
      townName:"全境",  //镇
      shanghaiValueAll: false,
      //set锁为关而非开
      LockOffValue: false,
      LockOnValue: true,
      //set对应radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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

  comprehensiveBtn: function(e){
    this.setData({
      //重置所有镇的value为全部
      shanghaiShiRadio:"shanghaishi_all",
      shanghaiXianRadio:"shanghaixian_all",
      songjiangRadio:"songjiang_all",
      jinshanRadio:"jinshan_all",
      qingpuRadio:"qingpu_all",
      fengxianRadio:"fengxian_all",
      chuanshaRadio:"chuansha_all",
      nanhuiRadio:"nanhui_all",
      jiadingRadio:"jiading_all",
      baoshanRadio:"baoshan_all",
      chongmingRadio:"chongming_all",
      //set交互选中的县与镇
      countyName:"综合整理",  //县
      townName:"",  //镇
      shanghaiValueAll:false,
      comprehensiveValue: true,
      //关于数据的
      noData:[],  //将状态栏设置为空
      page: 0,  //将将来要数据库中的页码也设置为0
      reachBottom:"",  //将“到底了”设置为空
      list:"",  //将“list“设置为空
      showHideBtnPanel: false,
      //set锁为开而非关
      LockOffValue: true,
      LockOnValue: false,
      //set所有radio的值为否
      shanghaiShiValue: false,
      shanghaiXianValue: false,
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
  shanghaiShiChange: function(e){
    if(e.detail.value == "shanghaishi_all"){  //上海全境
      this.advanceChangeUniversal("全境")
      this.setData({
        shanghaiShiRadio: "shanghaishi_all"
      })
    }else if(e.detail.value == "shanghaishi_nanshi"){  //上海南市
      this.advanceChangeUniversal("南市")
      this.setData({
        shanghaiShiRadio: "shanghaishi_nanshi"
      })
    }else if(e.detail.value == "shanghaishi_xujiahui"){  //上海徐家汇
      this.advanceChangeUniversal("徐家汇")
      this.setData({
        shanghaiShiRadio: "shanghaishi_xujiahui"
      })
    }else{
      this.advanceChangeUniversal("法华")
      this.setData({
        shanghaiShiRadio: "shanghaishi_fahua"
      })
    }
  },
  shanghaiXianChange: function(e){
    if(e.detail.value == "shanghaixian_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        shanghaiXianRadio: "shanghaixian_all"
      })
    }else if(e.detail.value == "shanghaixian_beiqiao"){  //当上海县>北桥为真
      this.advanceChangeUniversal("北桥")
      this.setData({
        shanghaiXianRadio: "shanghaixian_beiqiao"
      })
    }else if(e.detail.value == "shanghaixian_chenhang"){  //当上海县>陈行为真
      this.advanceChangeUniversal("陈行")
      this.setData({
        shanghaiXianRadio: "shanghaixian_chenhang"
      })
    }else if(e.detail.value == "shanghaixian_duhang"){  //当上海县>杜行为真
      this.advanceChangeUniversal("杜行")
      this.setData({
        townName: "杜行",
        shanghaiXianRadio: "shanghaixian_duhang"
      })
    }else if(e.detail.value == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
      this.advanceChangeUniversal("虹桥")
      this.setData({
        shanghaiXianRadio: "shanghaixian_hongqiao"
      })
    }else if(e.detail.value == "shanghaixian_huacao"){  //当上海县>华漕为真
      this.advanceChangeUniversal("华漕")
      this.setData({     
        shanghaiXianRadio: "shanghaixian_huacao"
      })
    }else if(e.detail.value == "shanghaixian_huajing"){  //当上海县>华泾为真
      this.advanceChangeUniversal("华泾")
      this.setData({
        shanghaiXianRadio: "shanghaixian_huajing"
      })
    }else if(e.detail.value == "shanghaixian_jiwang"){  //当上海县>纪王为真
      this.advanceChangeUniversal("纪王")
      this.setData({      
        shanghaiXianRadio: "shanghaixian_jiwang"
      })
    }else if(e.detail.value == "shanghaixian_longhua"){  //当上海县>龙华为真
      this.advanceChangeUniversal("龙华")
      this.setData({
        shanghaiXianRadio: "shanghaixian_longhua"
      })
    }else if(e.detail.value == "shanghaixian_luhui"){  //当上海县>鲁汇为真
      this.advanceChangeUniversal("鲁汇")
      this.setData({
        shanghaiXianRadio: "shanghaixian_luhui"
      })
    }else if(e.detail.value == "shanghaixian_meilong"){  //当上海县>梅陇为真
      this.advanceChangeUniversal("梅陇")
      this.setData({
        shanghaiXianRadio: "shanghaixian_meilong"
      })
    }else if(e.detail.value == "shanghaixian_qibao"){  //当上海县>七宝为真
      this.advanceChangeUniversal("七宝")
      this.setData({
        shanghaiXianRadio: "shanghaixian_qibao"
      })
    }else if(e.detail.value == "shanghaixian_sanlin"){  //当上海县>三林为真
      this.advanceChangeUniversal("三林")
      this.setData({
        shanghaiXianRadio: "shanghaixian_sanlin"
      })
    }else if(e.detail.value == "shanghaixian_xinzhuang"){  //当上海县>莘庄
      this.advanceChangeUniversal("莘庄")
      this.setData({
        shanghaiXianRadio: "shanghaixian_xinzhuang"
      })
    }else if(e.detail.value == "shanghaixian_tangwan"){  //当上海县>塘湾为真
      this.advanceChangeUniversal("塘湾")
      this.setData({
        shanghaiXianRadio: "shanghaixian_tangwan"
      })
    }else if(e.detail.value == "shanghaixian_wujing"){  //当上海县>吴泾为真
      this.advanceChangeUniversal("吴泾")
      this.setData({
        shanghaiXianRadio: "shanghaixian_wujing"
      })
    }else if(e.detail.value == "shanghaixian_xinjing"){  //当上海县>新泾为真
      this.advanceChangeUniversal("新泾")
      this.setData({
        shanghaiXianRadio: "shanghaixian_xinjing"
      })
    }else if(e.detail.value == "shanghaixian_zhudi"){  //当上海县>诸翟为真
      this.advanceChangeUniversal("诸翟")
      this.setData({
        shanghaiXianRadio: "shanghaixian_zhudi"
      })
    }else if(e.detail.value == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
      this.advanceChangeUniversal("颛桥")
      this.setData({  
        shanghaiXianRadio: "shanghaixian_zhuanqiao"
      })
    }else{  //当上海县>北新泾为真
      this.advanceChangeUniversal("北新泾")
      this.setData({
        shanghaiXianRadio: "shanghaixian_beixinjing"
      })
    }
  },
  songjiangChange: function(e){
    if(e.detail.value == "songjiang_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        townName: "全境",
        songjiangRadio: "songjiang_all"
      })
    }else if(e.detail.value == "songjiang_cangqiao"){
      this.advanceChangeUniversal("仓桥")
      this.setData({
        songjiangRadio: "songjiang_cangqiao"
      })
    }else if(e.detail.value == "songjiang_chedun"){
      this.advanceChangeUniversal("车墩")
      this.setData({   
        songjiangRadio: "songjiang_chedun"
      })
    }else if(e.detail.value == "songjiang_dongjing"){
      this.advanceChangeUniversal("洞泾")
      this.setData({
        songjiangRadio: "songjiang_dongjing"
      })
    }else if(e.detail.value == "songjiang_jiuting"){
      this.advanceChangeUniversal("九亭")
      this.setData({
        songjiangRadio: "songjiang_jiuting"
      })
    }else if(e.detail.value == "songjiang_sheshan"){
      this.advanceChangeUniversal("佘山")
      this.setData({
        songjiangRadio: "songjiang_sheshan"
      })
    }else if(e.detail.value == "songjiang_sijing"){
      this.advanceChangeUniversal("泗泾")
      this.setData({
        songjiangRadio: "songjiang_sijing"
      })
    }else if(e.detail.value == "songjiang_xinbang"){
      this.advanceChangeUniversal("新浜")
      this.setData({
        songjiangRadio: "songjiang_xinbang"
      })
    }else if(e.detail.value == "songjiang_xinqiao"){
      this.advanceChangeUniversal("新桥")
      this.setData({
        songjiangRadio: "songjiang_xinqiao"
      })
    }else if(e.detail.value == "songjiang_yexie"){
      this.advanceChangeUniversal("叶榭")
      this.setData({
        songjiangRadio: "songjiang_yexie"
      })
    }else if(e.detail.value == "songjiang_zhangze"){
      this.advanceChangeUniversal("张泽")
      this.setData({
        songjiangRadio: "songjiang_zhangze"
      })
    }else if(e.detail.value == "songjiang_shihudang"){
      this.advanceChangeUniversal("石湖荡")
      this.setData({
        songjiangRadio: "songjiang_shihudang"
      })
    }else if(e.detail.value == "songjiang_tianmashan"){
      this.advanceChangeUniversal("天马山")
      this.setData({
        songjiangRadio: "songjiang_tianmashan"
      })
    }else if(e.detail.value == "songjiang_wulitang"){
      this.advanceChangeUniversal("五里塘")
      this.setData({
        songjiangRadio: "songjiang_wulitang"
      })
    }else if(e.detail.value == "songjiang_xiaokunshan"){
      this.advanceChangeUniversal("小昆山")
      this.setData({
        songjiangRadio: "songjiang_xiaokunshan"
      })
    }else{
      this.advanceChangeUniversal("松江镇")
      this.setData({
        songjiangRadio: "songjiang_songjiangzhen"
      })
    }
  },
  jinshanChange: function(e){
    if(e.detail.value == "jinshan_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        jinshanRadio: "jinshan_all"
      })
    }else if(e.detail.value == "jinshan_caojing"){
      this.advanceChangeUniversal("漕泾")
      this.setData({
        jinshanRadio: "jinshan_caojing"
      })
    }else if(e.detail.value == "jinshan_fengjing"){
      this.advanceChangeUniversal("枫泾")
      this.setData({ 
        jinshanRadio: "jinshan_fengjing"
      })
    }else if(e.detail.value == "jinshan_ganxiang"){
      this.advanceChangeUniversal("干巷")
      this.setData({ 
        jinshanRadio: "jinshan_ganxiang"
      })
    }else if(e.detail.value == "jinshan_langxia"){
      this.advanceChangeUniversal("廊下")
      this.setData({  
        jinshanRadio: "jinshan_langxia"
      })
    }else if(e.detail.value == "jinshan_lvxiang"){
      this.advanceChangeUniversal("吕巷")
      this.setData({
        jinshanRadio: "jinshan_lvxiang"
      })
    }else if(e.detail.value == "jinshan_qianyu"){
      this.advanceChangeUniversal("钱圩")
      this.setData({
        jinshanRadio: "jinshan_qianyu"
      })
    }else if(e.detail.value == "jinshan_shanyang"){
      this.advanceChangeUniversal("山阳")
      this.setData({
        jinshanRadio: "jinshan_shanyang"
      })
    }else if(e.detail.value == "jinshan_tinglin"){
      this.advanceChangeUniversal("亭林")
      this.setData({
        jinshanRadio: "jinshan_tinglin"
      })
    }else if(e.detail.value == "jinshan_xinnong"){
      this.advanceChangeUniversal("新农")
      this.setData({ 
        jinshanRadio: "jinshan_xinnong"
      })
    }else if(e.detail.value == "jinshan_xingta"){
      this.advanceChangeUniversal("兴塔")
      this.setData({
        jinshanRadio: "jinshan_xingta"
      })
    }else if(e.detail.value == "jinshan_zhuhang"){
      this.advanceChangeUniversal("朱行")
      this.setData({
        jinshanRadio: "jinshan_zhuhang"
      })
    }else if(e.detail.value == "jinshan_zhujing"){
      this.advanceChangeUniversal("朱泾")
      this.setData({
        jinshanRadio: "jinshan_zhujing"
      })
    }else{
      this.advanceChangeUniversal("金山卫")
      this.setData({
        jinshanRadio: "jinshan_jinshanwei"
      })
    }
  },
  qingpuChange: function(e){
    if(e.detail.value == "qingpu_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        qingpuRadio: "qingpu_all"
      })
    }else if(e.detail.value == "qingpu_baihe"){
      this.advanceChangeUniversal("白鹤")
      this.setData({ 
        qingpuRadio: "qingpu_baihe"
      })
    }else if(e.detail.value == "qingpu_daying"){
      this.advanceChangeUniversal("大盈")
      this.setData({
        qingpuRadio: "qingpu_daying"
      })
    }else if(e.detail.value == "qingpu_fengxi"){
      this.advanceChangeUniversal("凤溪")
      this.setData({
        qingpuRadio: "qingpu_fengxi"
      })
    }else if(e.detail.value == "qingpu_huancheng"){
      this.advanceChangeUniversal("环城")
      this.setData({
        qingpuRadio: "qingpu_huancheng"
      })
    }else if(e.detail.value == "qingpu_jinze"){
      this.advanceChangeUniversal("金泽")
      this.setData({
        qingpuRadio: "qingpu_jinze"
      })
    }else if(e.detail.value == "qingpu_liansheng"){
      this.advanceChangeUniversal("莲盛")
      this.setData({
        qingpuRadio: "qingpu_liansheng"
      })
    }else if(e.detail.value == "qingpu_liantang"){
      this.advanceChangeUniversal("练塘")
      this.setData({
        qingpuRadio: "qingpu_liantang"
      })
    }else if(e.detail.value == "qingpu_shangta"){
      this.advanceChangeUniversal("商榻")
      this.setData({
        qingpuRadio: "qingpu_shangta"
      })
    }else if(e.detail.value == "qingpu_shenxiang"){
      this.advanceChangeUniversal("沈巷")
      this.setData({  
        qingpuRadio: "qingpu_shenxiang"
      })
    }else if(e.detail.value == "qingpu_xiceng"){
      this.advanceChangeUniversal("西岑")
      this.setData({   
        qingpuRadio: "qingpu_xiceng"
      })
    }else if(e.detail.value == "qingpu_xiaozheng"){
      this.advanceChangeUniversal("小蒸")
      this.setData({     
        qingpuRadio: "qingpu_xiaozheng"
      })
    }else if(e.detail.value == "qingpu_xujing"){
      this.advanceChangeUniversal("徐泾")
      this.setData({ 
        qingpuRadio: "qingpu_xujing"
      })
    }else if(e.detail.value == "qingpu_huaxin"){
      this.advanceChangeUniversal("华新")
      this.setData({
        qingpuRadio: "qingpu_huaxin"
      })
    }else if(e.detail.value == "qingpu_yingzhong"){
      this.advanceChangeUniversal("盈中")
      this.setData({    
        qingpuRadio: "qingpu_yingzhong"
      })
    }else if(e.detail.value == "qingpu_zhaotun"){
      this.advanceChangeUniversal("赵屯")
      this.setData({
        qingpuRadio: "qingpu_zhaotun"
      })
    }else if(e.detail.value == "qingpu_zhaoxiang"){
      this.advanceChangeUniversal("赵巷")
      this.setData({
        qingpuRadio: "qingpu_zhaoxiang"
      })
    }else if(e.detail.value == "qingpu_zhengdian"){
      this.advanceChangeUniversal("蒸淀")
      this.setData({
        qingpuRadio: "qingpu_zhengdian"
      })
    }else if(e.detail.value == "qingpu_chonggu"){
      this.advanceChangeUniversal("重固")
      this.setData({  
        qingpuRadio: "qingpu_chonggu"
      })
    }else if(e.detail.value == "qingpu_zhujiajiao"){
      this.advanceChangeUniversal("朱家角")
      this.setData({
        qingpuRadio: "qingpu_zhujiajiao"
      })
    }else if(e.detail.value == "qingpu_xianghuaqiao"){
      this.advanceChangeUniversal("香花桥")
      this.setData({
        qingpuRadio: "qingpu_xianghuaqiao"
      })
    }else{
      this.advanceChangeUniversal("青浦镇")
      this.setData({
        qingpuRadio: "qingpu_qingpuzhen"
      })
    }
  },
  fengxianChange: function(e){
    if(e.detail.value == "fengxian_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        fengxianRadio: "fengxian_all"
      })
    }else if(e.detail.value == "fengxian_fengcheng"){
      this.advanceChangeUniversal("奉城")
      this.setData({
        fengxianRadio: "fengxian_fengcheng"
      })
    }else if(e.detail.value == "fengxian_fengxin"){
      this.advanceChangeUniversal("奉新")
      this.setData({
        fengxianRadio: "fengxian_fengxin"
      })
    }else if(e.detail.value == "fengxian_guangming"){
      this.advanceChangeUniversal("光明")
      this.setData({
        fengxianRadio: "fengxian_guangming"
      })
    }else if(e.detail.value == "fengxian_hongmiao"){
      this.advanceChangeUniversal("洪庙")
      this.setData({
        fengxianRadio: "fengxian_hongmiao"
      })
    }else if(e.detail.value == "fengxian_huqiao"){
      this.advanceChangeUniversal("胡桥")
      this.setData({
        fengxianRadio: "fengxian_huqiao"
      })
    }else if(e.detail.value == "fengxian_jianghai"){
      this.advanceChangeUniversal("江海")
      this.setData({
        fengxianRadio: "fengxian_jianghai"
      })
    }else if(e.detail.value == "fengxian_jinhui"){
      this.advanceChangeUniversal("金汇")
      this.setData({
        fengxianRadio: "fengxian_jinhui"
      })
    }else if(e.detail.value == "fengxian_nanqiao"){
      this.advanceChangeUniversal("南桥")
      this.setData({  
        fengxianRadio: "fengxian_nanqiao"
      })
    }else if(e.detail.value == "fengxian_pingan"){
      this.advanceChangeUniversal("平安")
      this.setData({
        fengxianRadio: "fengxian_pingan"
      })
    }else if(e.detail.value == "fengxian_qianqiao"){
      this.advanceChangeUniversal("钱桥")
      this.setData({ 
        fengxianRadio: "fengxian_qianqiao"
      })
    }else if(e.detail.value == "fengxian_qingcun"){
      this.advanceChangeUniversal("青村")
      this.setData({
        fengxianRadio: "fengxian_qingcun"
      })
    }else if(e.detail.value == "fengxian_shaochang"){
      this.advanceChangeUniversal("邵厂")
      this.setData({
        fengxianRadio: "fengxian_shaochang"
      })
    }else if(e.detail.value == "fengxian_situan"){
      this.advanceChangeUniversal("四团")
      this.setData({
        fengxianRadio: "fengxian_situan"
      })
    }else if(e.detail.value == "fengxian_tairi"){
      this.advanceChangeUniversal("泰日")
      this.setData({
        fengxianRadio: "fengxian_tairi"
      })
    }else if(e.detail.value == "fengxian_tangwai"){
      this.advanceChangeUniversal("塘外")
      this.setData({    
        fengxianRadio: "fengxian_tangwai"
      })
    }else if(e.detail.value == "fengxian_touqiao"){
      this.advanceChangeUniversal("头桥")
      this.setData({
        fengxianRadio: "fengxian_touqiao"
      })
    }else if(e.detail.value == "fengxian_wuqiao"){
      this.advanceChangeUniversal("邬桥")
      this.setData({  
        fengxianRadio: "fengxian_wuqiao"
      })
    }else if(e.detail.value == "fengxian_xidu"){
      this.advanceChangeUniversal("西渡")
      this.setData({
        fengxianRadio: "fengxian_xidu"
      })
    }else if(e.detail.value == "fengxian_xiaotang"){
      this.advanceChangeUniversal("萧塘")
      this.setData({
        fengxianRadio: "fengxian_xiaotang"
      })
    }else if(e.detail.value == "fengxian_xinsi"){
      this.advanceChangeUniversal("新寺")
      this.setData({
        fengxianRadio: "fengxian_xinsi"
      })
    }else if(e.detail.value == "fengxian_zhelin"){
      this.advanceChangeUniversal("柘林")
      this.setData({  
        fengxianRadio: "fengxian_zhelin"
      })
    }else if(e.detail.value == "fengxian_zhuanghang"){
      this.advanceChangeUniversal("庄行")
      this.setData({
        fengxianRadio: "fengxian_zhuanghang"
      })
    }else{
      this.advanceChangeUniversal("柘林(南山话)")
      this.setData({
        fengxianRadio: "fengxian_zhelin_nanshanhua"
      })
    }
  },
  chuanshaChange: function(e){
    if(e.detail.value == "chuansha_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        chuanshaRadio: "chuansha_all"
      })
    }else if(e.detail.value == "chuansha_beicai"){
      this.advanceChangeUniversal("北蔡")
      this.setData({
        chuanshaRadio: "chuansha_beicai"
      })
    }else if(e.detail.value == "chuansha_caolu"){
      this.advanceChangeUniversal("曹路")
      this.setData({
        chuanshaRadio: "chuansha_caolu"
      })
    }else if(e.detail.value == "chuansha_gaodong"){
      this.advanceChangeUniversal("高东")
      this.setData({
        chuanshaRadio: "chuansha_gaodong"
      })
    }else if(e.detail.value == "chuansha_gaohang"){
      this.advanceChangeUniversal("高行")
      this.setData({
        chuanshaRadio: "chuansha_gaohang"
      })
    }else if(e.detail.value == "chuansha_gaonan"){
      this.advanceChangeUniversal("高南")
      this.setData({
        chuanshaRadio: "chuansha_gaonan"
      })
    }else if(e.detail.value == "chuansha_gaoqiao"){
      this.advanceChangeUniversal("高桥")
      this.setData({
        chuanshaRadio: "chuansha_gaoqiao"
      })
    }else if(e.detail.value == "chuansha_heqing"){
      this.advanceChangeUniversal("合庆")
      this.setData({
        chuanshaRadio: "chuansha_heqing"
      })
    }else if(e.detail.value == "chuansha_huamu"){
      this.advanceChangeUniversal("花木")
      this.setData({
        chuanshaRadio: "chuansha_huamu"
      })
    }else if(e.detail.value == "chuansha_jiangzhen"){
      this.advanceChangeUniversal("江镇")
      this.setData({
        chuanshaRadio: "chuansha_jiangzhen"
      })
    }else if(e.detail.value == "chuansha_shiwan"){
      this.advanceChangeUniversal("施湾")
      this.setData({ 
        chuanshaRadio: "chuansha_shiwan"
      })
    }else if(e.detail.value == "chuansha_jinqiao"){
      this.advanceChangeUniversal("金桥")
      this.setData({
        chuanshaRadio: "chuansha_jinqiao"
      })
    }else if(e.detail.value == "chuansha_lingqiao"){
      this.advanceChangeUniversal("凌桥")
      this.setData({
        chuanshaRadio: "chuansha_lingqiao"
      })
    }else if(e.detail.value == "chuansha_liuli"){
      this.advanceChangeUniversal("六里")
      this.setData({    
        chuanshaRadio: "chuansha_liuli"
      })
    }else if(e.detail.value == "chuansha_tangzhen"){
      this.advanceChangeUniversal("唐镇")
      this.setData({
        chuanshaRadio: "chuansha_tangzhen"
      })
    }else if(e.detail.value == "chuansha_wanggang"){
      this.advanceChangeUniversal("王港")
      this.setData({
        chuanshaRadio: "chuansha_wanggang"
      })
    }else if(e.detail.value == "chuansha_yanqiao"){
      this.advanceChangeUniversal("严桥")
      this.setData({
        chuanshaRadio: "chuansha_yanqiao"
      })
    }else if(e.detail.value == "chuansha_yangsi"){
      this.advanceChangeUniversal("杨思")
      this.setData({   
        chuanshaRadio: "chuansha_yangsi"
      })
    }else if(e.detail.value == "chuansha_yangyuan"){
      this.advanceChangeUniversal("杨园")
      this.setData({
        chuanshaRadio: "chuansha_yangyuan"
      })
    }else if(e.detail.value == "chuansha_yangjing"){
      this.advanceChangeUniversal("洋泾")
      this.setData({
        chuanshaRadio: "chuansha_yangjing"
      })
    }else if(e.detail.value == "chuansha_zhangjiang"){
      this.advanceChangeUniversal("张江")
      this.setData({
        chuanshaRadio: "chuansha_zhangjiang"
      })
    }else if(e.detail.value == "chuansha_zhangqiao"){
      this.advanceChangeUniversal("张桥")
      this.setData({ 
        chuanshaRadio: "chuansha_zhangqiao"
      })
    }else{
      this.advanceChangeUniversal("川沙镇")
      this.setData({
        fengxianRadio: "chuansha_chuanshazhen"
      })
    }
  },
  nanhuiChange: function(e){
    if(e.detail.value == "nanhui_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        nanhuiRadio: "nanhui_all"
      })
    }else if(e.detail.value == "nanhui_binhai"){
      this.advanceChangeUniversal("滨海")
      this.setData({
        nanhuiRadio: "nanhui_binhai"
      })
    }else if(e.detail.value == "nanhui_datuan"){
      this.advanceChangeUniversal("大团")
      this.setData({
        nanhuiRadio: "nanhui_datuan"
      })
    }else if(e.detail.value == "nanhui_donghai"){
      this.advanceChangeUniversal("东海")
      this.setData({
        nanhuiRadio: "nanhui_donghai"
      })
    }else if(e.detail.value == "nanhui_hangtou"){
      this.advanceChangeUniversal("航头")
      this.setData({
        nanhuiRadio: "nanhui_hangtou"
      })
    }else if(e.detail.value == "nanhui_hengmian"){
      this.advanceChangeUniversal("横沔")
      this.setData({
        nanhuiRadio: "nanhui_hengmian"
      })
    }else if(e.detail.value == "nanhui_huanglu"){
      this.advanceChangeUniversal("黄路")
      this.setData({
        nanhuiRadio: "nanhui_huanglu"
      })
    }else if(e.detail.value == "nanhui_kangqiao"){
      this.advanceChangeUniversal("康桥")
      this.setData({
        nanhuiRadio: "nanhui_kangqiao"
      })
    }else if(e.detail.value == "nanhui_laogang"){
      this.advanceChangeUniversal("老港")
      this.setData({
        nanhuiRadio: "nanhui_laogang"
      })
    }else if(e.detail.value == "nanhui_liuzao"){
      this.advanceChangeUniversal("六灶")
      this.setData({
        nanhuiRadio: "nanhui_liuzao"
      })
    }else if(e.detail.value == "nanhui_nicheng"){
      this.advanceChangeUniversal("泥城")
      this.setData({
        nanhuiRadio: "nanhui_nicheng"
      })
    }else if(e.detail.value == "nanhui_pengzhen"){
      this.advanceChangeUniversal("彭镇")
      this.setData({
        nanhuiRadio: "nanhui_pengzhen"
      })
    }else if(e.detail.value == "nanhui_sandun"){
      this.advanceChangeUniversal("三墩")
      this.setData({
        nanhuiRadio: "nanhui_sandun"
      })
    }else if(e.detail.value == "nanhui_sanzao"){
      this.advanceChangeUniversal("三灶")
      this.setData({
        nanhuiRadio: "nanhui_sanzao"
      })
    }else if(e.detail.value == "nanhui_shuyuan"){
      this.advanceChangeUniversal("书院")
      this.setData({
        nanhuiRadio: "nanhui_shuyuan"
      })
    }else if(e.detail.value == "nanhui_tanzhi"){
      this.advanceChangeUniversal("坦直")
      this.setData({
        nanhuiRadio: "nanhui_tanzhi"
      })
    }else if(e.detail.value == "nanhui_waxie"){
      this.advanceChangeUniversal("瓦屑")
      this.setData({ 
        nanhuiRadio: "nanhui_waxie"
      })
    }else if(e.detail.value == "nanhui_wanxiang"){
      this.advanceChangeUniversal("万祥")
      this.setData({
        nanhuiRadio: "nanhui_wanxiang"
      })
    }else if(e.detail.value == "nanhui_xiasha"){
      this.advanceChangeUniversal("下沙")
      this.setData({
        nanhuiRadio: "nanhui_xiasha"
      })
    }else if(e.detail.value == "nanhui_xinchang"){
      this.advanceChangeUniversal("新场")
      this.setData({
        nanhuiRadio: "nanhui_xinchang"
      })
    }else if(e.detail.value == "nanhui_xingang"){
      this.advanceChangeUniversal("新港")
      this.setData({
        nanhuiRadio: "nanhui_xingang"
      })
    }else if(e.detail.value == "nanhui_xuanqiao"){
      this.advanceChangeUniversal("宣桥")
      this.setData({
        nanhuiRadio: "nanhui_xuanqiao"
      })
    }else if(e.detail.value == "nanhui_yancang"){
      this.advanceChangeUniversal("盐仓")
      this.setData({
        nanhuiRadio: "nanhui_yancang"
      })
    }else if(e.detail.value == "nanhui_zhoupu"){
      this.advanceChangeUniversal("周浦")
      this.setData({
        nanhuiRadio: "nanhui_zhoupu"
      })
    }else if(e.detail.value == "nanhui_zhuqiao"){
      this.advanceChangeUniversal("祝桥")
      this.setData({
        nanhuiRadio: "nanhui_zhuqiao"
      })
    }else{
      this.advanceChangeUniversal("芦潮港")
      this.setData({
        nanhuiRadio: "nanhui_luchaogang"
      })
    }
  },
  jiadingChange: function(e){
    if(e.detail.value == "jiading_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        jiadingRadio: "jiading_all"
      })
    }else if(e.detail.value == "jiading_anting"){
      this.advanceChangeUniversal("安亭")
      this.setData({
        jiadingRadio: "jiading_anting"
      })
    }else if(e.detail.value == "jiading_fengbang"){
      this.advanceChangeUniversal("封浜")
      this.setData({
        jiadingRadio: "jiading_fengbang"
      })
    }else if(e.detail.value == "jiading_huating"){
      this.advanceChangeUniversal("华亭")
      this.setData({
        jiadingRadio: "jiading_huating"
      })
    }else if(e.detail.value == "jiading_jiangqiao"){
      this.advanceChangeUniversal("江桥")
      this.setData({
        jiadingRadio: "jiading_jiangqiao"
      })
    }else if(e.detail.value == "jiading_loutang"){
      this.advanceChangeUniversal("娄塘")
      this.setData({
        jiadingRadio: "jiading_loutang"
      })
    }else if(e.detail.value == "jiading_malu"){
      this.advanceChangeUniversal("马陆")
      this.setData({
        jiadingRadio: "jiading_malu"
      })
    }else if(e.detail.value == "jiading_nanxiang"){
      this.advanceChangeUniversal("南翔")
      this.setData({
        jiadingRadio: "jiading_nanxiang"
      })
    }else if(e.detail.value == "jiading_tanghang"){
      this.advanceChangeUniversal("唐行")
      this.setData({
        jiadingRadio: "jiading_tanghang"
      })
    }else if(e.detail.value == "jiading_taopu"){
      this.advanceChangeUniversal("桃浦")
      this.setData({
        jiadingRadio: "jiading_taopu"
      })
    }else if(e.detail.value == "jiading_waigang"){
      this.advanceChangeUniversal("外冈")
      this.setData({
        jiadingRadio: "jiading_waigang"
      })
    }else if(e.detail.value == "jiading_wangxin"){
      this.advanceChangeUniversal("望新")
      this.setData({
        jiadingRadio: "jiading_wangxin"
      })
    }else if(e.detail.value == "jiading_zhenru"){
      this.advanceChangeUniversal("真如")
      this.setData({
        jiadingRadio: "jiading_zhenru"
      })
    }else{
      this.advanceChangeUniversal("嘉定镇")
      this.setData({
        jiadingRadio: "jiading_jiadingzhen"
      })
    }
  },
  baoshanChange: function(e){
    if(e.detail.value == "baoshan_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        baoshanRadio: "baoshan_all"
      })
    }else if(e.detail.value == "baoshan_dachang"){
      this.advanceChangeUniversal("大场")
      this.setData({
        baoshanRadio: "baoshan_dachang"
      })
    }else if(e.detail.value == "baoshan_fengtang"){
      this.advanceChangeUniversal("葑塘")
      this.setData({
        baoshanRadio: "baoshan_fengtang"
      })
    }else if(e.detail.value == "baoshan_gucun"){
      this.advanceChangeUniversal("顾村")
      this.setData({
        baoshanRadio: "baoshan_gucun"
      })
    }else if(e.detail.value == "baoshan_liuhang"){
      this.advanceChangeUniversal("刘行")
      this.setData({
        baoshanRadio: "baoshan_liuhang"
      })
    }else if(e.detail.value == "baoshan_jiangwan"){
      this.advanceChangeUniversal("江湾")
      this.setData({
        baoshanRadio: "baoshan_jiangwan"
      })
    }else if(e.detail.value == "baoshan_luodian"){
      this.advanceChangeUniversal("罗店")
      this.setData({
        baoshanRadio: "baoshan_luodian"
      })
    }else if(e.detail.value == "baoshan_luojing"){
      this.advanceChangeUniversal("罗泾")
      this.setData({
        baoshanRadio: "baoshan_luojing"
      })
    }else if(e.detail.value == "baoshan_luonan"){
      this.advanceChangeUniversal("罗南")
      this.setData({
        baoshanRadio: "baoshan_luonan"
      })
    }else if(e.detail.value == "baoshan_miaohang"){
      this.advanceChangeUniversal("庙行")
      this.setData({
        baoshanRadio: "baoshan_miaohang"
      })
    }else if(e.detail.value == "baoshan_pengpu"){
      this.advanceChangeUniversal("彭浦")
      this.setData({
        baoshanRadio: "baoshan_pengpu"
      })
    }else if(e.detail.value == "baoshan_shengqiao"){
      this.advanceChangeUniversal("盛桥")
      this.setData({
        baoshanRadio: "baoshan_shengqiao"
      })
    }else if(e.detail.value == "baoshan_songnan"){
      this.advanceChangeUniversal("淞南")
      this.setData({
        baoshanRadio: "baoshan_songnan"
      })
    }else if(e.detail.value == "baoshan_wusong"){
      this.advanceChangeUniversal("吴淞")
      this.setData({
        baoshanRadio: "baoshan_wusong"
      })
    }else if(e.detail.value == "baoshan_wujiaochang"){
      this.advanceChangeUniversal("五角场")
      this.setData({
        baoshanRadio: "baoshan_wujiaochang"
      })
    }else{
      this.advanceChangeUniversal("箱草墩")
      this.setData({
        baoshanRadio: "baoshan_shuangcaodun"
      })
    }
  },
  chongmingChange: function(e){
    if(e.detail.value == "chongming_all"){
      this.advanceChangeUniversal("全境")
      this.setData({
        chongmingRadio: "chongming_all"
      })
    }else if(e.detail.value == "chongming_chenjia"){
      this.advanceChangeUniversal("陈家")
      this.setData({
        chongmingRadio: "chongming_chenjia"
      })
    }else{
      this.advanceChangeUniversal("港沿")
      this.setData({
        list:"",  //将“list“设置为空
        chongmingRadio: "chongming_gangyan"
      })
    }
  },

  //以下几个是知其字的批量搜索函数
  onVocabularyKnownInputCounty(whichCountyInput){  //搜县名的
    this.setData({
        page: 0  //先把page页设置为零
      })
      db.collection("vocabulary")
      .where(_.and([
        {
          whichCounty: whichCountyInput
        },
        {
            vocabulary: new db.RegExp({
            regexp: this.data.val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{
        if(res.data != ""){  //做一个判断，假使数据拿到了能介
          db.collection("vocabulary")　　//再请求一次数据库以获取数量
          .where(_.and([
            {
              whichCounty: whichCountyInput
            },
            {
                vocabulary: new db.RegExp({
                regexp: this.data.val,
                options:"i"
              })
            }
          ]))
        .count()
        .then(res=>{
          this.setData({
            noData:["找到结果"+res.total+"条"],
            showHideBtnPanel:true
          })
        })

        var VocabularyKnownList = res.data
        this.setData({  //原先的20条数据
          list: VocabularyKnownList
        })
      }else{  //没有请求到能介
        this.setData({
          list:[],
          noData:["没有查询到结果"],
          showHideBtnPanel:false
        })
      }
    })
  },
  onVocabularyKnownInputTown(whichTownInput){  //搜镇名的
    this.setData({
        page: 0  //先把page页设置为零
      })
      db.collection("vocabulary")
      .where(_.and([
        {
          whichTown: whichTownInput
        },
        {
            vocabulary: new db.RegExp({
            regexp: this.data.val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{
        if(res.data != ""){  //做一个判断，假使数据拿到了能介
          db.collection("vocabulary")　　//再请求一次数据库以获取数量
          .where(_.and([
            {
              whichTown: whichTownInput
            },
            {
                vocabulary: new db.RegExp({
                regexp: this.data.val,
                options:"i"
              })
            }
          ]))
        .count()
        .then(res=>{
          this.setData({
            noData:["找到结果"+res.total+"条"],
            showHideBtnPanel:true
          })
        })

        var VocabularyKnownList = res.data
        this.setData({  //原先的20条数据
          list: VocabularyKnownList
        })
      }else{  //没有请求到能介
        this.setData({
          list:[],
          noData:["没有查询到结果"],
          showHideBtnPanel:false
        })
      }
    })
  },
  //以下是几个不知其字的批量搜索函数
  onVocabularyUnKnownInputCounty(whichCountyInput){  //搜县名的
    this.setData({
        page: 0  //先把page页设置为零
      })
      db.collection("vocabulary")
      .where(_.and([
        {
          whichCounty: whichCountyInput
        },
        {
          originalEntry: new db.RegExp({
            regexp: this.data.val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{
        if(res.data != ""){  //做一个判断，假使数据拿到了能介
          db.collection("vocabulary")　　//再请求一次数据库以获取数量
          .where(_.and([
            {
              whichCounty: whichCountyInput
            },
            {
              originalEntry: new db.RegExp({
                regexp: this.data.val,
                options:"i"
              })
            }
          ]))
        .count()
        .then(res=>{
          this.setData({
            noData:["找到结果"+res.total+"条"],
            showHideBtnPanel:true
          })
        })

        var VocabularyKnownList = res.data
        this.setData({  //原先的20条数据
          list: VocabularyKnownList
        })
      }else{  //没有请求到能介
        this.setData({
          list:[],
          noData:["没有查询到结果"],
          showHideBtnPanel:false
        })
      }
    })
  },
  onVocabularyUnKnownInputTown(whichTownInput){  //搜镇名的
    this.setData({
        page: 0  //先把page页设置为零
      })
      db.collection("vocabulary")
      .where(_.and([
        {
          whichTown: whichTownInput
        },
        {
          originalEntry: new db.RegExp({
            regexp: this.data.val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{
        if(res.data != ""){  //做一个判断，假使数据拿到了能介
          db.collection("vocabulary")　　//再请求一次数据库以获取数量
          .where(_.and([
            {
              whichTown: whichTownInput
            },
            {
              originalEntry: new db.RegExp({
                regexp: this.data.val,
                options:"i"
              })
            }
          ]))
        .count()
        .then(res=>{
          this.setData({
            noData:["找到结果"+res.total+"条"],
            showHideBtnPanel:true
          })
        })

        var VocabularyKnownList = res.data
        this.setData({  //原先的20条数据
          list: VocabularyKnownList
        })
      }else{  //没有请求到能介
        this.setData({
          list:[],
          noData:["没有查询到结果"],
          showHideBtnPanel:false
        })
      }
    })
  },
  //以下是几个查释义的批量搜索函数
  onVocabularyMeanInputCounty(whichCountyInput){
    this.setData({
        page: 0  //先把page页设置为零
      })
      db.collection("vocabulary")
      .where(_.and([
        {
          whichCounty: whichCountyInput
        },
        {
            explanation: new db.RegExp({
            regexp: this.data.val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{
        if(res.data != ""){  //做一个判断，假使数据拿到了能介
          db.collection("vocabulary")　　//再请求一次数据库以获取数量
          .where(_.and([
            {
              whichCounty: whichCountyInput
            },
            {
                explanation: new db.RegExp({
                regexp: this.data.val,
                options:"i"
              })
            }
          ]))
        .count()
        .then(res=>{
          this.setData({
            noData:["找到结果"+res.total+"条"],
            showHideBtnPanel:true
          })
        })

        var VocabularyKnownList = res.data
        this.setData({  //原先的20条数据
          list: VocabularyKnownList
        })
      }else{  //没有请求到能介
        this.setData({
          list:[],
          noData:["没有查询到结果"],
          showHideBtnPanel:false
        })
      }
    })
  },
  onVocabularyMeanInputTown(whichTownInput){
    this.setData({
        page: 0  //先把page页设置为零
      })
      db.collection("vocabulary")
      .where(_.and([
        {
          whichTown: whichTownInput
        },
        {
          explanation: new db.RegExp({
            regexp: this.data.val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{
        if(res.data != ""){  //做一个判断，假使数据拿到了能介
          db.collection("vocabulary")　　//再请求一次数据库以获取数量
          .where(_.and([
            {
              whichTown: whichTownInput
            },
            {
              explanation: new db.RegExp({
                regexp: this.data.val,
                options:"i"
              })
            }
          ]))
        .count()
        .then(res=>{
          this.setData({
            noData:["找到结果"+res.total+"条"],
            showHideBtnPanel:true
          })
        })

        var VocabularyKnownList = res.data
        this.setData({  //原先的20条数据
          list: VocabularyKnownList
        })
      }else{  //没有请求到能介
        this.setData({
          list:[],
          noData:["没有查询到结果"],
          showHideBtnPanel:false
        })
      }
    })
  },

  //同样地，以下是6个触底时用的函数
  onVocabularyKnownReachCounty(whichCountyInput){
    var val = this.data.val
    let pageList = this.data.page
    pageList = pageList + 20
    this.setData({  //把获取页的数据链接过去
      page: pageList
    })
    db.collection("vocabulary")
      .where(_.and([
        {
          whichCounty: whichCountyInput
        },
        {
          vocabulary: new db.RegExp({
            regexp: val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{  //获取到数据后
        let oldList = this.data.list  //定义一个旧数组为本页面的预置
        let newList = res.data  //定义一个新数组为获取到的data
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
  },
  onVocabularyKnownReachTown(whichTownInput){
    var val = this.data.val
    let pageList = this.data.page
        pageList = pageList + 20
        this.setData({  //把获取页的数据链接过去
          page: pageList
        })
        db.collection("vocabulary")
          .where(_.and([
            {
              whichTown: whichTownInput
            },
            {
              vocabulary: new db.RegExp({
                regexp: val,
                options:"i"
              })
            }
          ]))
          .limit(20)
          .skip(this.data.page)
          .get()
          .then(res=>{  //获取到数据后
            let oldList = this.data.list  //定义一个旧数组为本页面的预置
            let newList = res.data  //定义一个新数组为获取到的data
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
  },
  onVocabularyUnKnownReachCounty(whichCountyInput){
    var val = this.data.val
    let pageList = this.data.page
    pageList = pageList + 20
    this.setData({  //把获取页的数据链接过去
      page: pageList
    })
    db.collection("vocabulary")
      .where(_.and([
        {
          whichCounty: whichCountyInput
        },
        {
          originalEntry: new db.RegExp({
            regexp: val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{  //获取到数据后
        let oldList = this.data.list  //定义一个旧数组为本页面的预置
        let newList = res.data  //定义一个新数组为获取到的data
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
  },
  onVocabularyUnKnownReachTown(whichTownInput){
    var val = this.data.val
    let pageList = this.data.page
    pageList = pageList + 20
    this.setData({  //把获取页的数据链接过去
      page: pageList
    })
    db.collection("vocabulary")
      .where(_.and([
        {
          whichTown: whichTownInput
        },
        {
          originalEntry: new db.RegExp({
            regexp: val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{  //获取到数据后
        let oldList = this.data.list  //定义一个旧数组为本页面的预置
        let newList = res.data  //定义一个新数组为获取到的data
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
  },
  onVocabularyMeanReachCounty(whichCountyInput){
    var val = this.data.val
    let pageList = this.data.page
    pageList = pageList + 20
    this.setData({  //把获取页的数据链接过去
      page: pageList
    })
    db.collection("vocabulary")
      .where(_.and([
        {
          whichCounty: whichCountyInput
        },
        {
          explanation: new db.RegExp({
            regexp: val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{  //获取到数据后
        let oldList = this.data.list  //定义一个旧数组为本页面的预置
        let newList = res.data  //定义一个新数组为获取到的data
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
  },
  onVocabularyMeanReachTown(whichTownInput){
    var val = this.data.val
    let pageList = this.data.page
    pageList = pageList + 20
    this.setData({  //把获取页的数据链接过去
      page: pageList
    })
    db.collection("vocabulary")
      .where(_.and([
        {
          whichTown: whichTownInput
        },
        {
          explanation: new db.RegExp({
            regexp: val,
            options:"i"
          })
        }
      ]))
      .limit(20)
      .skip(this.data.page)
      .get()
      .then(res=>{  //获取到数据后
        let oldList = this.data.list  //定义一个旧数组为本页面的预置
        let newList = res.data  //定义一个新数组为获取到的data
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