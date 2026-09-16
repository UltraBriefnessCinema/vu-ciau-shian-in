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
    threeBtns: false,
    step: 0,  //接龙的数组序

    countyName: "上海全境",  //县名称为空
    townName: "",  //镇名称为空

    //所有对应的radio的值
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

    //所有的县级镇的画板
    shanghaiValueAll: true,
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

    //所有县级镇的默认勾勾
    shanghaishi_all_checked: true,
    shanghaixian_all_checked: true,
    songjiang_all_checked: true,
    jinshan_all_checked: true,
    qingpu_all_checked: true,
    fengxian_all_checked: true,
    chuansha_all_checked: true,
    nanhui_all_checked: true,
    jiading_all_checked: true,
    baoshan_all_checked: true,
    chongming_all_checked: true,

    //所有县级镇的默认的不打勾勾
    shanghaishi_nanshi_checked: false,
    shanghaishi_xujiahui_checked: false,
    shanghaishi_fahua_checked: false,
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
    chongming_chenjia_checked:false,
    chongming_gangyan_checked:false
  },

  getInput: function(e){  //focus函数
    var val = e.detail.value
    this.setData({
      val: val,
      isClear: true
    })
    if(val.length>0){
      if(this.data.shanghaiValueAll == true){
        db.collection("vocabulary")
        .aggregate()
        .match({
          vocabulary: new RegExp("^"+val+".{1,10000}$")  //仅匹配第一个字为val的条目
        })
        .sample({
          size: 20
        })
        .limit(20)
        .end()
        .then(res=>{
          if(res.list != ""){
            this.setData({
              focusList: res.list,
              isClear: true,
              focusUI: true
            })
          }else{
            this.setData({
              focusList: [{originalEntry:"没有找到结果"}],
              focusUI: true
            })
          }
        })
      }else if(this.data.comprehensiveValue == true){
        this.focusCounty("comprehensive_search")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_all"){  //当上海市区>全境为真
        this.focusCounty("shanghaishi")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){  //当上海市区>南市为真
        this.focusTown("shanghaishi_nanshi")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){  //当上海市区>徐家汇为真
        this.focusTown("shanghaishi_xujiahui")
      }else if(this.data.shanghaiShiRadio == "shanghaishi_fahua"){
        this.focusTown("shanghaishi_fahua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
        this.focusCounty( "shanghaixian")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
        this.focusTown( "shanghaixian_beiqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
        this.focusTown( "shanghaixian_chenhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
        this.focusTown( "shanghaixian_duhang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
        this.focusTown( "shanghaixian_hongqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
        this.focusTown( "shanghaixian_huacao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
        this.focusTown( "shanghaixian_huajing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
        this.focusTown( "shanghaixian_jiwang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
        this.focusTown( "shanghaixian_longhua")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
        this.focusTown( "shanghaixian_luhui")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
        this.focusTown( "shanghaixian_meilong")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
        this.focusTown( "shanghaixian_qibao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
        this.focusTown( "shanghaixian_sanlin")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
        this.focusTown( "shanghaixian_xinzhuang")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
        this.focusTown( "shanghaixian_tangwan")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
        this.focusTown( "shanghaixian_wujing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
        this.focusTown( "shanghaixian_xinjing")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
        this.focusTown( "shanghaixian_zhudi")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
        this.focusTown( "shanghaixian_zhuanqiao")
      }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
        this.focusTown( "shanghaixian_beixinjing")
      }else if(this.data.songjiangRadio == "songjiang_all"){
        this.focusCounty( "songjiang")
      }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
        this.focusTown( "songjiang_cangqiao")
      }else if(this.data.songjiangRadio == "songjiang_chedun"){
        this.focusTown( "songjiang_chedun")
      }else if(this.data.songjiangRadio == "songjiang_dongjing"){
        this.focusTown( "songjiang_dongjing")
      }else if(this.data.songjiangRadio == "songjiang_jiuting"){
        this.focusTown( "songjiang_jiuting")
      }else if(this.data.songjiangRadio == "songjiang_sheshan"){
        this.focusTown( "songjiang_sheshan")
      }else if(this.data.songjiangRadio == "songjiang_sijing"){
        this.focusTown( "songjiang_sijing")
      }else if(this.data.songjiangRadio == "songjiang_xinbang"){
        this.focusTown( "songjiang_xinbang")
      }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
        this.focusTown( "songjiang_xinqiao")
      }else if(this.data.songjiangRadio == "songjiang_yexie"){
        this.focusTown( "songjiang_yexie")
      }else if(this.data.songjiangRadio == "songjiang_zhangze"){
        this.focusTown( "songjiang_zhangze")
      }else if(this.data.songjiangRadio == "songjiang_shihudang"){
        this.focusTown( "songjiang_shihudang")
      }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
        this.focusTown( "songjiang_tianmashan")  
      }else if(this.data.songjiangRadio == "songjiang_wulitang"){
        this.focusTown( "songjiang_wulitang")   
      }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
        this.focusTown( "songjiang_xiaokunshan")   
      }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
        this.focusTown( "songjiang_songjiangzhen")
      }else if(this.data.jinshanRadio == "jinshan_all"){
        this.focusCounty( "jinshan")
      }else if(this.data.jinshanRadio == "jinshan_caojing"){
        this.focusTown( "jinshan_caojing")
      }else if(this.data.jinshanRadio == "jinshan_fengjing"){
        this.focusTown( "jinshan_fengjing")
      }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
        this.focusTown( "jinshan_ganxiang")
      }else if(this.data.jinshanRadio == "jinshan_langxia"){
        this.focusTown( "jinshan_langxia")
      }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
        this.focusTown( "jinshan_lvxiang")
      }else if(this.data.jinshanRadio == "jinshan_qianyu"){
        this.focusTown( "jinshan_qianyu")
      }else if(this.data.jinshanRadio == "jinshan_shanyang"){
        this.focusTown( "jinshan_shanyang")
      }else if(this.data.jinshanRadio == "jinshan_tinglin"){
        this.focusTown( "jinshan_tinglin")
      }else if(this.data.jinshanRadio == "jinshan_xinnong"){
        this.focusTown( "jinshan_xinnong")
      }else if(this.data.jinshanRadio == "jinshan_xingta"){
        this.focusTown( "jinshan_xingta")
      }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
        this.focusTown( "jinshan_zhuhang")
      }else if(this.data.jinshanRadio == "jinshan_zhujing"){
        this.focusTown( "jinshan_zhujing")
      }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
        this.focusTown( "jinshan_jinshanwei")
      }else if(this.data.qingpuRadio == "qingpu_all"){
        this.focusCounty( "qingpu")
      }else if(this.data.qingpuRadio == "qingpu_baihe"){
          this.focusTown( "qingpu_baihe")
      }else if(this.data.qingpuRadio == "qingpu_daying"){
          this.focusTown( "qingpu_daying")
      }else if(this.data.qingpuRadio == "qingpu_fengxi"){
          this.focusTown( "qingpu_fengxi")
      }else if(this.data.qingpuRadio == "qingpu_huancheng"){
          this.focusTown( "qingpu_huancheng")
      }else if(this.data.qingpuRadio == "qingpu_jinze"){
          this.focusTown( "qingpu_jinze")
      }else if(this.data.qingpuRadio == "qingpu_liansheng"){
          this.focusTown( "qingpu_liansheng")
      }else if(this.data.qingpuRadio == "qingpu_liantang"){
          this.focusTown( "qingpu_liantang")
      }else if(this.data.qingpuRadio == "qingpu_shangta"){
          this.focusTown( "qingpu_shangta")
      }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
          this.focusTown( "qingpu_shenxiang")
      }else if(this.data.qingpuRadio == "qingpu_xiceng"){
          this.focusTown( "qingpu_xiceng")
      }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
          this.focusTown( "qingpu_xiaozheng")
      }else if(this.data.qingpuRadio == "qingpu_xujing"){
          this.focusTown( "qingpu_xujing")
      }else if(this.data.qingpuRadio == "qingpu_huaxin"){
        this.focusTown("qingpu_huaxin")
      }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
          this.focusTown( "qingpu_yingzhong")
      }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
          this.focusTown( "qingpu_zhaotun")
      }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
          this.focusTown( "qingpu_zhaoxiang")
      }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
          this.focusTown( "qingpu_zhengdian")
      }else if(this.data.qingpuRadio == "qingpu_chonggu"){
          this.focusTown( "qingpu_chonggu")
      }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
          this.focusTown( "qingpu_zhujiajiao")
      }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
          this.focusTown( "qingpu_xianghuaqiao")
      }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
          this.focusTown( "qingpu_qingpuzhen")
      }else if(this.data.fengxianRadio == "fengxian_all"){
          this.focusCounty( "fengxian")
      }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
          this.focusTown( "fengxian_fengcheng")
      }else if(this.data.fengxianRadio == "fengxian_fengxin"){
          this.focusTown( "fengxian_fengxin")
      }else if(this.data.fengxianRadio == "fengxian_guangming"){
          this.focusTown( "fengxian_guangming")
      }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
          this.focusTown( "fengxian_hongmiao")
      }else if(this.data.fengxianRadio == "fengxian_huqiao"){
          this.focusTown( "fengxian_huqiao")
      }else if(this.data.fengxianRadio == "fengxian_jianghai"){
          this.focusTown( "fengxian_jianghai")
      }else if(this.data.fengxianRadio == "fengxian_jinhui"){
          this.focusTown( "fengxian_jinhui")
      }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
          this.focusTown( "fengxian_nanqiao")
      }else if(this.data.fengxianRadio == "fengxian_pingan"){
          this.focusTown( "fengxian_pingan")
      }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
          this.focusTown( "fengxian_qianqiao")
      }else if(this.data.fengxianRadio == "fengxian_qingcun"){
          this.focusTown( "fengxian_qingcun")
      }else if(this.data.fengxianRadio == "fengxian_shaochang"){
          this.focusTown( "fengxian_shaochang")
      }else if(this.data.fengxianRadio == "fengxian_situan"){
          this.focusTown( "fengxian_situan")
      }else if(this.data.fengxianRadio == "fengxian_tairi"){
          this.focusTown( "fengxian_tairi")
      }else if(this.data.fengxianRadio == "fengxian_tangwai"){
          this.focusTown( "fengxian_tangwai")
      }else if(this.data.fengxianRadio == "fengxian_touqiao"){
          this.focusTown( "fengxian_touqiao")
      }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
          this.focusTown( "fengxian_wuqiao")
      }else if(this.data.fengxianRadio == "fengxian_xidu"){
          this.focusTown( "fengxian_xidu")
      }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
          this.focusTown( "fengxian_xiaotang")
      }else if(this.data.fengxianRadio == "fengxian_xinsi"){
          this.focusTown( "fengxian_xinsi")
      }else if(this.data.fengxianRadio == "fengxian_zhelin"){
          this.focusTown( "fengxian_zhelin")
      }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
          this.focusTown( "fengxian_zhuanghang")
      }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshanhua"){
          this.focusTown( "fengxian_zhelin_nanshanhua")
      }else if(this.data.chuanshaRadio == "chuansha_all"){
          this.focusCounty( "chuansha")
      }else if(this.data.chuanshaRadio == "chuansha_beicai"){
          this.focusTown( "chuansha_beicai")
      }else if(this.data.chuanshaRadio == "chuansha_caolu"){
          this.focusTown( "chuansha_caolu")
      }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
          this.focusTown( "chuansha_gaodong")
      }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
          this.focusTown( "chuansha_gaohang")
      }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
          this.focusTown( "chuansha_gaonan")
      }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
          this.focusTown( "chuansha_gaoqiao")
      }else if(this.data.chuanshaRadio == "chuansha_heqing"){
          this.focusTown( "chuansha_heqing")
      }else if(this.data.chuanshaRadio == "chuansha_huamu"){
          this.focusTown( "chuansha_huamu")
      }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
          this.focusTown( "chuansha_jiangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
          this.focusTown( "chuansha_shiwan")
      }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
          this.focusTown( "chuansha_jinqiao")
      }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
          this.focusTown( "chuansha_lingqiao")
      }else if(this.data.chuanshaRadio == "chuansha_liuli"){
          this.focusTown( "chuansha_liuli")
      }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
          this.focusTown( "chuansha_tangzhen")
      }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
          this.focusTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
          this.focusTown( "chuansha_wanggang")
      }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
          this.focusTown( "chuansha_yangsi")
      }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
          this.focusTown( "chuansha_yangyuan")
      }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
          this.focusTown( "chuansha_yangjing")
      }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
          this.focusTown( "chuangsha_zhangjiang")
      }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
          this.focusTown( "chuansha_zhangqiao")
      }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
          this.focusTown( "chuansha_chuanshazhen")
      }else if(this.data.nanhuiRadio == "nanhui_all"){
          this.focusCounty( "nanhui")
      }else if(this.data.nanhuiRadio == "nanhui_binhai"){
          this.focusTown( "nanhui_binhai")
      }else if(this.data.nanhuiRadio == "nanhui_datuan"){
          this.focusTown( "nanhui_datuan")
      }else if(this.data.nanhuiRadio == "nanhui_donghai"){
          this.focusTown( "nanhui_donghai")
      }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
          this.focusTown( "nanhui_hangtou")
      }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
          this.focusTown( "nanhui_hengmian")
      }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
          this.focusTown( "nanhui_huanglu")
      }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
          this.focusTown( "nanhui_kangqiao")
      }else if(this.data.nanhuiRadio == "nanhui_laogang"){
          this.focusTown( "nanhui_laogang")
      }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
          this.focusTown( "nanhui_liuzao")
      }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
          this.focusTown( "nanhui_nicheng")
      }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
          this.focusTown( "nanhui_pengzhen")
      }else if(this.data.nanhuiRadio == "nanhui_sandun"){
          this.focusTown( "nanhui_sandun")
      }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
          this.focusTown( "nanhui_sanzao")
      }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
          this.focusTown( "nanhui_shuyuan")
      }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
          this.focusTown( "nanhui_tanzhi")
      }else if(this.data.nanhuiRadio == "nanhui_waxie"){
          this.focusTown( "nanhui_waxie")
      }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
          this.focusTown( "nanhui_wanxiang")
      }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
          this.focusTown( "nanhui_xiasha")
      }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
          this.focusTown( "nanhui_xinchang")
      }else if(this.data.nanhuiRadio == "nanhui_xingang"){
          this.focusTown( "nanhui_xingang")
      }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
          this.focusTown( "nanhui_xuanqiao")
      }else if(this.data.nanhuiRadio == "nanhui_yancang"){
          this.focusTown( "nanhui_yancang")
      }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
          this.focusTown( "nanhui_zhoupu")
      }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
          this.focusTown( "nanhui_zhuqiao")
      }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
          this.focusTown( "nanhui_luchaogang")
      }else if(this.data.jiadingRadio == "jiading_all"){
          this.focusCounty( "jiading")
      }else if(this.data.jiadingRadio == "jiading_anting"){
          this.focusTown( "jiading_anting")
      }else if(this.data.jiadingRadio == "jiading_fengbang"){
          this.focusTown( "jiading_fengbang")
      }else if(this.data.jiadingRadio == "jiading_huating"){
          this.focusTown( "jiading_huating")
      }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
          this.focusTown( "jiading_jiangqiao")
      }else if(this.data.jiadingRadio == "jiading_loutang"){
          this.focusTown( "jiading_loutang")
      }else if(this.data.jiadingRadio == "jiading_malu"){
          this.focusTown( "jiading_malu")
      }else if(this.data.jiadingRadio == "jiading_nanxiang"){
          this.focusTown( "jiading_nanxiang")
      }else if(this.data.jiadingRadio == "jiading_tanghang"){
          this.focusTown( "jiading_tanghang")
      }else if(this.data.jiadingRadio == "jiading_taopu"){
          this.focusTown( "jiading_taopu")
      }else if(this.data.jiadingRadio == "jiading_waigang"){
          this.focusTown( "jiading_waigang")
      }else if(this.data.jiadingRadio == "jiading_wangxin"){
          this.focusTown( "jiading_wangxin")
      }else if(this.data.jiadingRadio == "jiading_zhenru"){
          this.focusTown( "jiading_zhenru")
      }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
          this.focusTown( "jiading_jiadingzhen")
      }else if(this.data.baoshanRadio == "baoshan_all"){
          this.focusCounty( "baoshan")
      }else if(this.data.baoshanRadio == "baoshan_dachang"){
          this.focusTown( "baoshan_dachang")
      }else if(this.data.baoshanRadio == "baoshan_fengtang"){
          this.focusTown( "baoshan_fengtang")
      }else if(this.data.baoshanRadio == "baoshan_gucun"){
          this.focusTown( "baoshan_gucun")
      }else if(this.data.baoshanRadio == "baoshan_liuhang"){
          this.focusTown( "baoshan_liuhang")
      }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
          this.focusTown( "baoshan_jiangwan")
      }else if(this.data.baoshanRadio == "baoshan_luodian"){
          this.focusTown( "baoshan_luodian")
      }else if(this.data.baoshanRadio == "baoshan_luojing"){
          this.focusTown( "baoshan_luojing")
      }else if(this.data.baoshanRadio == "baoshan_luonan"){
          this.focusTown( "baoshan_luonan")
      }else if(this.data.baoshanRadio == "baoshan_miaohang"){
          this.focusTown( "baoshan_miaohang")
      }else if(this.data.baoshanRadio == "baoshan_pengpu"){
          this.focusTown( "baoshan_pengpu")
      }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
          this.focusTown( "baoshan_shengqiao")
      }else if(this.data.baoshanRadio == "baoshan_songnan"){
          this.focusTown( "baoshan_songnan")
      }else if(this.data.baoshanRadio == "baoshan_wusong"){
          this.focusTown( "baoshan_wusong")
      }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
          this.focusTown( "baoshan_wujiaochang")
      }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
          this.focusTown( "baoshan_shuangcaodun")
      }else if(this.data.chongmingRadio == "chongming_all"){
          this.focusCounty( "chongming")
      }else if(this.data.chongmingRadio == "chongming_chenjia"){
          this.focusTown( "chongming_chenjia")
      }else if(this.data.chongmingRadio == "chongming_gangyan"){
        this.focusTown("chongming_gangyan")
      }
    }else{
      this.setData({  //清空的时候
        focusUI: false,
        focusList: [],
        step: 0,
        isClear: false
      })
    }
  },

  focusCounty: function(whichCountyInput){   //按县分类
    this.setData({
      step: 0
    })
    db.collection("vocabulary")
      .aggregate()
      .match(_.and([
        {
          vocabulary: new RegExp("^"+this.data.val+".{1,10000}$")  //仅匹配第一个字为val的条目
        },
        {
          whichCounty: whichCountyInput
        }
      ]))
      .sample({
        size: 20
      })
      .limit(20)
      .end()
      .then(res=>{
        if(res.list != ""){
          this.setData({
            focusList: res.list,
            focusUI: true
          })
        }else{
          this.setData({
            focusList: [{originalEntry:"没有找到结果"}],
            focusUI: true
          })
        }
      })
  },

  focusTown: function(whichTownInput){  //按镇分类
    this.setData({
      step: 0
    })
    db.collection("vocabulary")
      .aggregate()
      .match(_.and([
        {
          vocabulary: new RegExp("^"+this.data.val+".{1,10000}$")  //仅匹配第一个字为val的条目
        },
        {
          whichTown: whichTownInput
        }
      ]))
      .sample({
        size: 20
      })
      .limit(20)
      .end()
      .then(res=>{
        if(res.list != ""){
          this.setData({
            focusList: res.list,
            focusUI: true
          })
        }else{
          this.setData({
            focusList: [{originalEntry:"没有找到结果"}],
            focusUI: true
          })
        }
      })
  },

  simpleShow: function(e){  //focus栏中点击的值
    var id = e.currentTarget.dataset.index  //获取到元素的id值
    let focusList = this.data.focusList
    let indexId = focusList[id]
    this.setData({
      list: indexId,
      threeBtns: true,
      tsiqLonBtn: true,
      reachText:"",
      step: 0
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

  tsiqLon_1_diff: function(e){  //接一条异龙
    if(this.data.shanghaiValueAll == true){
      var laIndex = this.data.tsiqLonList[this.data.step].originalEntry  //第几个数组的原条目
      var laIndexStr = laIndex.charAt(laIndex.length - 1)  //第几个数组的原条目的最后一个字

      db.collection("vocabulary")
      .aggregate()
      .match({
        originalEntry: new RegExp("^"+laIndexStr+".{1,10000}$")  //仅匹配第一个字为val的条目
      })
      .sample({
        size: 1
      })
      .limit(1)
      .end()
      .then(res=>{
        if(res.list != ""){
          var oldList = this.data.tsiqLonList
          var newList = res.list
          oldList = oldList.concat(newList)
          this.setData({
            tsiqLonList: oldList,
            step: this.data.step + 1
          })
        }else{
          this.setData({
            tsiqLonBtn: false,
            reachText: "库中没有可供生成的词语了~"
          })
        }
      })
    }else if(this.data.comprehensiveValue == true){
      this.tsiqLon_1_diff_County("comprehensive_search")
    }else if(this.data.shanghaiShiRadio == "shanghaishi_all"){  //当上海市区>全境为真
      this.tsiqLon_1_diff_County("shanghaishi")
    }else if(this.data.shanghaiShiRadio == "shanghaishi_nanshi"){  //当上海市区>南市为真
      this.tsiqLon_1_diff_Town("shanghaishi_nanshi")
    }else if(this.data.shanghaiShiRadio == "shanghaishi_xujiahui"){  //当上海市区>徐家汇为真
      this.tsiqLon_1_diff_Town("shanghaishi_xujiahui")
    }else if(this.data.shanghaiShiRadio == "shanghaishi_fahua"){
      this.tsiqLon_1_diff_Town("shanghaishi_fahua")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_all"){  //当上海县>全境为真
      this.tsiqLon_1_diff_County( "shanghaixian")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_beiqiao"){  //当上海县>北桥为真
      this.tsiqLon_1_diff_Town( "shanghaixian_beiqiao")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_chenhang"){  //当上海县>陈行为真
      this.tsiqLon_1_diff_Town( "shanghaixian_chenhang")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_duhang"){  //当上海县>杜行为真
      this.tsiqLon_1_diff_Town( "shanghaixian_duhang")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_hongqiao"){ //当上海县>虹桥为真
      this.tsiqLon_1_diff_Town( "shanghaixian_hongqiao")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_huacao"){  //当上海县>华漕为真
      this.tsiqLon_1_diff_Town( "shanghaixian_huacao")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_huajing"){  //当上海县>华泾为真
      this.tsiqLon_1_diff_Town( "shanghaixian_huajing")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_jiwang"){  //当上海县>纪王为真
      this.tsiqLon_1_diff_Town( "shanghaixian_jiwang")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_longhua"){  //当上海县>龙华为真
      this.tsiqLon_1_diff_Town( "shanghaixian_longhua")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_luhui"){  //当上海县>鲁汇为真
      this.tsiqLon_1_diff_Town( "shanghaixian_luhui")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_meilong"){  //当上海县>梅陇为真
      this.tsiqLon_1_diff_Town( "shanghaixian_meilong")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_qibao"){  //当上海县>七宝为真
      this.tsiqLon_1_diff_Town( "shanghaixian_qibao")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_sanlin"){  //当上海县>三林为真
      this.tsiqLon_1_diff_Town( "shanghaixian_sanlin")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_xinzhuang"){  //当上海县>莘庄
      this.tsiqLon_1_diff_Town( "shanghaixian_xinzhuang")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_tangwan"){  //当上海县>塘湾为真
      this.tsiqLon_1_diff_Town( "shanghaixian_tangwan")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_wujing"){  //当上海县>吴泾为真
      this.tsiqLon_1_diff_Town( "shanghaixian_wujing")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_xinjing"){  //当上海县>新泾为真
      this.tsiqLon_1_diff_Town( "shanghaixian_xinjing")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_zhudi"){  //当上海县>诸翟为真
      this.tsiqLon_1_diff_Town( "shanghaixian_zhudi")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_zhuanqiao"){  //当上海县>颛桥为真
      this.tsiqLon_1_diff_Town( "shanghaixian_zhuanqiao")
    }else if(this.data.shanghaiXianRadio == "shanghaixian_beixinjing"){  //当上海县>北新泾为真
      this.tsiqLon_1_diff_Town( "shanghaixian_beixinjing")
    }else if(this.data.songjiangRadio == "songjiang_all"){
      this.tsiqLon_1_diff_County( "songjiang")
    }else if(this.data.songjiangRadio == "songjiang_cangqiao"){
      this.tsiqLon_1_diff_Town( "songjiang_cangqiao")
    }else if(this.data.songjiangRadio == "songjiang_chedun"){
      this.tsiqLon_1_diff_Town( "songjiang_chedun")
    }else if(this.data.songjiangRadio == "songjiang_dongjing"){
      this.tsiqLon_1_diff_Town( "songjiang_dongjing")
    }else if(this.data.songjiangRadio == "songjiang_jiuting"){
      this.tsiqLon_1_diff_Town( "songjiang_jiuting")
    }else if(this.data.songjiangRadio == "songjiang_sheshan"){
      this.tsiqLon_1_diff_Town( "songjiang_sheshan")
    }else if(this.data.songjiangRadio == "songjiang_sijing"){
      this.tsiqLon_1_diff_Town( "songjiang_sijing")
    }else if(this.data.songjiangRadio == "songjiang_xinbang"){
      this.tsiqLon_1_diff_Town( "songjiang_xinbang")
    }else if(this.data.songjiangRadio == "songjiang_xinqiao"){
      this.tsiqLon_1_diff_Town( "songjiang_xinqiao")
    }else if(this.data.songjiangRadio == "songjiang_yexie"){
      this.tsiqLon_1_diff_Town( "songjiang_yexie")
    }else if(this.data.songjiangRadio == "songjiang_zhangze"){
      this.tsiqLon_1_diff_Town( "songjiang_zhangze")
    }else if(this.data.songjiangRadio == "songjiang_shihudang"){
      this.tsiqLon_1_diff_Town( "songjiang_shihudang")
    }else if(this.data.songjiangRadio == "songjiang_tianmashan"){
      this.tsiqLon_1_diff_Town( "songjiang_tianmashan")  
    }else if(this.data.songjiangRadio == "songjiang_wulitang"){
      this.tsiqLon_1_diff_Town( "songjiang_wulitang")   
    }else if(this.data.songjiangRadio == "songjiang_xiaokunshan"){
      this.tsiqLon_1_diff_Town( "songjiang_xiaokunshan")   
    }else if(this.data.songjiangRadio == "songjiang_songjiangzhen"){
      this.tsiqLon_1_diff_Town( "songjiang_songjiangzhen")
    }else if(this.data.jinshanRadio == "jinshan_all"){
      this.tsiqLon_1_diff_County( "jinshan")
    }else if(this.data.jinshanRadio == "jinshan_caojing"){
      this.tsiqLon_1_diff_Town( "jinshan_caojing")
    }else if(this.data.jinshanRadio == "jinshan_fengjing"){
      this.tsiqLon_1_diff_Town( "jinshan_fengjing")
    }else if(this.data.jinshanRadio == "jinshan_ganxiang"){
      this.tsiqLon_1_diff_Town( "jinshan_ganxiang")
    }else if(this.data.jinshanRadio == "jinshan_langxia"){
      this.tsiqLon_1_diff_Town( "jinshan_langxia")
    }else if(this.data.jinshanRadio == "jinshan_lvxiang"){
      this.tsiqLon_1_diff_Town( "jinshan_lvxiang")
    }else if(this.data.jinshanRadio == "jinshan_qianyu"){
      this.tsiqLon_1_diff_Town( "jinshan_qianyu")
    }else if(this.data.jinshanRadio == "jinshan_shanyang"){
      this.tsiqLon_1_diff_Town( "jinshan_shanyang")
    }else if(this.data.jinshanRadio == "jinshan_tinglin"){
      this.tsiqLon_1_diff_Town( "jinshan_tinglin")
    }else if(this.data.jinshanRadio == "jinshan_xinnong"){
      this.tsiqLon_1_diff_Town( "jinshan_xinnong")
    }else if(this.data.jinshanRadio == "jinshan_xingta"){
      this.tsiqLon_1_diff_Town( "jinshan_xingta")
    }else if(this.data.jinshanRadio == "jinshan_zhuhang"){
      this.tsiqLon_1_diff_Town( "jinshan_zhuhang")
    }else if(this.data.jinshanRadio == "jinshan_zhujing"){
      this.tsiqLon_1_diff_Town( "jinshan_zhujing")
    }else if(this.data.jinshanRadio == "jinshan_jinshanwei"){
      this.tsiqLon_1_diff_Town( "jinshan_jinshanwei")
    }else if(this.data.qingpuRadio == "qingpu_all"){
      this.tsiqLon_1_diff_County( "qingpu")
    }else if(this.data.qingpuRadio == "qingpu_baihe"){
        this.tsiqLon_1_diff_Town( "qingpu_baihe")
    }else if(this.data.qingpuRadio == "qingpu_daying"){
        this.tsiqLon_1_diff_Town( "qingpu_daying")
    }else if(this.data.qingpuRadio == "qingpu_fengxi"){
        this.tsiqLon_1_diff_Town( "qingpu_fengxi")
    }else if(this.data.qingpuRadio == "qingpu_huancheng"){
        this.tsiqLon_1_diff_Town( "qingpu_huancheng")
    }else if(this.data.qingpuRadio == "qingpu_jinze"){
        this.tsiqLon_1_diff_Town( "qingpu_jinze")
    }else if(this.data.qingpuRadio == "qingpu_liansheng"){
        this.tsiqLon_1_diff_Town( "qingpu_liansheng")
    }else if(this.data.qingpuRadio == "qingpu_liantang"){
        this.tsiqLon_1_diff_Town( "qingpu_liantang")
    }else if(this.data.qingpuRadio == "qingpu_shangta"){
        this.tsiqLon_1_diff_Town( "qingpu_shangta")
    }else if(this.data.qingpuRadio == "qingpu_shenxiang"){
        this.tsiqLon_1_diff_Town( "qingpu_shenxiang")
    }else if(this.data.qingpuRadio == "qingpu_xiceng"){
        this.tsiqLon_1_diff_Town( "qingpu_xiceng")
    }else if(this.data.qingpuRadio == "qingpu_xiaozheng"){
        this.tsiqLon_1_diff_Town( "qingpu_xiaozheng")
    }else if(this.data.qingpuRadio == "qingpu_xujing"){
        this.tsiqLon_1_diff_Town( "qingpu_xujing")
    }else if(this.data.qingpuRadio == "qingpu_huaxin"){
      this.tsiqLon_1_diff_Town("qingpu_huaxin")
    }else if(this.data.qingpuRadio == "qingpu_yingzhong"){
        this.tsiqLon_1_diff_Town( "qingpu_yingzhong")
    }else if(this.data.qingpuRadio == "qingpu_zhaotun"){
        this.tsiqLon_1_diff_Town( "qingpu_zhaotun")
    }else if(this.data.qingpuRadio == "qingpu_zhaoxiang"){
        this.tsiqLon_1_diff_Town( "qingpu_zhaoxiang")
    }else if(this.data.qingpuRadio == "qingpu_zhengdian"){
        this.tsiqLon_1_diff_Town( "qingpu_zhengdian")
    }else if(this.data.qingpuRadio == "qingpu_chonggu"){
        this.tsiqLon_1_diff_Town( "qingpu_chonggu")
    }else if(this.data.qingpuRadio == "qingpu_zhujiajiao"){
        this.tsiqLon_1_diff_Town( "qingpu_zhujiajiao")
    }else if(this.data.qingpuRadio == "qingpu_xianghuaqiao"){
        this.tsiqLon_1_diff_Town( "qingpu_xianghuaqiao")
    }else if(this.data.qingpuRadio == "qingpu_qingpuzhen"){
        this.tsiqLon_1_diff_Town( "qingpu_qingpuzhen")
    }else if(this.data.fengxianRadio == "fengxian_all"){
        this.tsiqLon_1_diff_County( "fengxian")
    }else if(this.data.fengxianRadio == "fengxian_fengcheng"){
        this.tsiqLon_1_diff_Town( "fengxian_fengcheng")
    }else if(this.data.fengxianRadio == "fengxian_fengxin"){
        this.tsiqLon_1_diff_Town( "fengxian_fengxin")
    }else if(this.data.fengxianRadio == "fengxian_guangming"){
        this.tsiqLon_1_diff_Town( "fengxian_guangming")
    }else if(this.data.fengxianRadio == "fengxian_hongmiao"){
        this.tsiqLon_1_diff_Town( "fengxian_hongmiao")
    }else if(this.data.fengxianRadio == "fengxian_huqiao"){
        this.tsiqLon_1_diff_Town( "fengxian_huqiao")
    }else if(this.data.fengxianRadio == "fengxian_jianghai"){
        this.tsiqLon_1_diff_Town( "fengxian_jianghai")
    }else if(this.data.fengxianRadio == "fengxian_jinhui"){
        this.tsiqLon_1_diff_Town( "fengxian_jinhui")
    }else if(this.data.fengxianRadio == "fengxian_nanqiao"){
        this.tsiqLon_1_diff_Town( "fengxian_nanqiao")
    }else if(this.data.fengxianRadio == "fengxian_pingan"){
        this.tsiqLon_1_diff_Town( "fengxian_pingan")
    }else if(this.data.fengxianRadio == "fengxian_qianqiao"){
        this.tsiqLon_1_diff_Town( "fengxian_qianqiao")
    }else if(this.data.fengxianRadio == "fengxian_qingcun"){
        this.tsiqLon_1_diff_Town( "fengxian_qingcun")
    }else if(this.data.fengxianRadio == "fengxian_shaochang"){
        this.tsiqLon_1_diff_Town( "fengxian_shaochang")
    }else if(this.data.fengxianRadio == "fengxian_situan"){
        this.tsiqLon_1_diff_Town( "fengxian_situan")
    }else if(this.data.fengxianRadio == "fengxian_tairi"){
        this.tsiqLon_1_diff_Town( "fengxian_tairi")
    }else if(this.data.fengxianRadio == "fengxian_tangwai"){
        this.tsiqLon_1_diff_Town( "fengxian_tangwai")
    }else if(this.data.fengxianRadio == "fengxian_touqiao"){
        this.tsiqLon_1_diff_Town( "fengxian_touqiao")
    }else if(this.data.fengxianRadio == "fengxian_wuqiao"){
        this.tsiqLon_1_diff_Town( "fengxian_wuqiao")
    }else if(this.data.fengxianRadio == "fengxian_xidu"){
        this.tsiqLon_1_diff_Town( "fengxian_xidu")
    }else if(this.data.fengxianRadio == "fengxian_xiaotang"){
        this.tsiqLon_1_diff_Town( "fengxian_xiaotang")
    }else if(this.data.fengxianRadio == "fengxian_xinsi"){
        this.tsiqLon_1_diff_Town( "fengxian_xinsi")
    }else if(this.data.fengxianRadio == "fengxian_zhelin"){
        this.tsiqLon_1_diff_Town( "fengxian_zhelin")
    }else if(this.data.fengxianRadio == "fengxian_zhuanghang"){
        this.tsiqLon_1_diff_Town( "fengxian_zhuanghang")
    }else if(this.data.fengxianRadio == "fengxian_zhelin_nanshanhua"){
        this.tsiqLon_1_diff_Town( "fengxian_zhelin_nanshanhua")
    }else if(this.data.chuanshaRadio == "chuansha_all"){
        this.tsiqLon_1_diff_County( "chuansha")
    }else if(this.data.chuanshaRadio == "chuansha_beicai"){
        this.tsiqLon_1_diff_Town( "chuansha_beicai")
    }else if(this.data.chuanshaRadio == "chuansha_caolu"){
        this.tsiqLon_1_diff_Town( "chuansha_caolu")
    }else if(this.data.chuanshaRadio == "chuansha_gaodong"){
        this.tsiqLon_1_diff_Town( "chuansha_gaodong")
    }else if(this.data.chuanshaRadio == "chuansha_gaohang"){
        this.tsiqLon_1_diff_Town( "chuansha_gaohang")
    }else if(this.data.chuanshaRadio == "chuansha_gaonan"){
        this.tsiqLon_1_diff_Town( "chuansha_gaonan")
    }else if(this.data.chuanshaRadio == "chuansha_gaoqiao"){
        this.tsiqLon_1_diff_Town( "chuansha_gaoqiao")
    }else if(this.data.chuanshaRadio == "chuansha_heqing"){
        this.tsiqLon_1_diff_Town( "chuansha_heqing")
    }else if(this.data.chuanshaRadio == "chuansha_huamu"){
        this.tsiqLon_1_diff_Town( "chuansha_huamu")
    }else if(this.data.chuanshaRadio == "chuansha_jiangzhen"){
        this.tsiqLon_1_diff_Town( "chuansha_jiangzhen")
    }else if(this.data.chuanshaRadio == "chuansha_shiwan"){
        this.tsiqLon_1_diff_Town( "chuansha_shiwan")
    }else if(this.data.chuanshaRadio == "chuansha_jinqiao"){
        this.tsiqLon_1_diff_Town( "chuansha_jinqiao")
    }else if(this.data.chuanshaRadio == "chuansha_lingqiao"){
        this.tsiqLon_1_diff_Town( "chuansha_lingqiao")
    }else if(this.data.chuanshaRadio == "chuansha_liuli"){
        this.tsiqLon_1_diff_Town( "chuansha_liuli")
    }else if(this.data.chuanshaRadio == "chuansha_tangzhen"){
        this.tsiqLon_1_diff_Town( "chuansha_tangzhen")
    }else if(this.data.chuanshaRadio == "chuansha_wanggang"){
        this.tsiqLon_1_diff_Town( "chuansha_wanggang")
    }else if(this.data.chuanshaRadio == "chuansha_yanqiao"){
        this.tsiqLon_1_diff_Town( "chuansha_wanggang")
    }else if(this.data.chuanshaRadio == "chuansha_yangsi"){
        this.tsiqLon_1_diff_Town( "chuansha_yangsi")
    }else if(this.data.chuanshaRadio == "chuansha_yangyuan"){
        this.tsiqLon_1_diff_Town( "chuansha_yangyuan")
    }else if(this.data.chuanshaRadio == "chuansha_yangjing"){
        this.tsiqLon_1_diff_Town( "chuansha_yangjing")
    }else if(this.data.chuanshaRadio == "chuangsha_zhangjiang"){
        this.tsiqLon_1_diff_Town( "chuangsha_zhangjiang")
    }else if(this.data.chuanshaRadio == "chuansha_zhangqiao"){
        this.tsiqLon_1_diff_Town( "chuansha_zhangqiao")
    }else if(this.data.chuanshaRadio == "chuansha_chuanshazhen"){
        this.tsiqLon_1_diff_Town( "chuansha_chuanshazhen")
    }else if(this.data.nanhuiRadio == "nanhui_all"){
        this.tsiqLon_1_diff_County( "nanhui")
    }else if(this.data.nanhuiRadio == "nanhui_binhai"){
        this.tsiqLon_1_diff_Town( "nanhui_binhai")
    }else if(this.data.nanhuiRadio == "nanhui_datuan"){
        this.tsiqLon_1_diff_Town( "nanhui_datuan")
    }else if(this.data.nanhuiRadio == "nanhui_donghai"){
        this.tsiqLon_1_diff_Town( "nanhui_donghai")
    }else if(this.data.nanhuiRadio == "nanhui_hangtou"){
        this.tsiqLon_1_diff_Town( "nanhui_hangtou")
    }else if(this.data.nanhuiRadio == "nanhui_hengmian"){
        this.tsiqLon_1_diff_Town( "nanhui_hengmian")
    }else if(this.data.nanhuiRadio == "nanhui_huanglu"){
        this.tsiqLon_1_diff_Town( "nanhui_huanglu")
    }else if(this.data.nanhuiRadio == "nanhui_kangqiao"){
        this.tsiqLon_1_diff_Town( "nanhui_kangqiao")
    }else if(this.data.nanhuiRadio == "nanhui_laogang"){
        this.tsiqLon_1_diff_Town( "nanhui_laogang")
    }else if(this.data.nanhuiRadio == "nanhui_liuzao"){
        this.tsiqLon_1_diff_Town( "nanhui_liuzao")
    }else if(this.data.nanhuiRadio == "nanhui_nicheng"){
        this.tsiqLon_1_diff_Town( "nanhui_nicheng")
    }else if(this.data.nanhuiRadio == "nanhui_pengzhen"){
        this.tsiqLon_1_diff_Town( "nanhui_pengzhen")
    }else if(this.data.nanhuiRadio == "nanhui_sandun"){
        this.tsiqLon_1_diff_Town( "nanhui_sandun")
    }else if(this.data.nanhuiRadio == "nanhui_sanzao"){
        this.tsiqLon_1_diff_Town( "nanhui_sanzao")
    }else if(this.data.nanhuiRadio == "nanhui_shuyuan"){
        this.tsiqLon_1_diff_Town( "nanhui_shuyuan")
    }else if(this.data.nanhuiRadio == "nanhui_tanzhi"){
        this.tsiqLon_1_diff_Town( "nanhui_tanzhi")
    }else if(this.data.nanhuiRadio == "nanhui_waxie"){
        this.tsiqLon_1_diff_Town( "nanhui_waxie")
    }else if(this.data.nanhuiRadio == "nanhui_wanxiang"){
        this.tsiqLon_1_diff_Town( "nanhui_wanxiang")
    }else if(this.data.nanhuiRadio == "nanhui_xiasha"){
        this.tsiqLon_1_diff_Town( "nanhui_xiasha")
    }else if(this.data.nanhuiRadio == "nanhui_xinchang"){
        this.tsiqLon_1_diff_Town( "nanhui_xinchang")
    }else if(this.data.nanhuiRadio == "nanhui_xingang"){
        this.tsiqLon_1_diff_Town( "nanhui_xingang")
    }else if(this.data.nanhuiRadio == "nanhui_xuanqiao"){
        this.tsiqLon_1_diff_Town( "nanhui_xuanqiao")
    }else if(this.data.nanhuiRadio == "nanhui_yancang"){
        this.tsiqLon_1_diff_Town( "nanhui_yancang")
    }else if(this.data.nanhuiRadio == "nanhui_zhoupu"){
        this.tsiqLon_1_diff_Town( "nanhui_zhoupu")
    }else if(this.data.nanhuiRadio == "nanhui_zhuqiao"){
        this.tsiqLon_1_diff_Town( "nanhui_zhuqiao")
    }else if(this.data.nanhuiRadio == "nanhui_luchaogang"){
        this.tsiqLon_1_diff_Town( "nanhui_luchaogang")
    }else if(this.data.jiadingRadio == "jiading_all"){
        this.tsiqLon_1_diff_County( "jiading")
    }else if(this.data.jiadingRadio == "jiading_anting"){
        this.tsiqLon_1_diff_Town( "jiading_anting")
    }else if(this.data.jiadingRadio == "jiading_fengbang"){
        this.tsiqLon_1_diff_Town( "jiading_fengbang")
    }else if(this.data.jiadingRadio == "jiading_huating"){
        this.tsiqLon_1_diff_Town( "jiading_huating")
    }else if(this.data.jiadingRadio == "jiading_jiangqiao"){
        this.tsiqLon_1_diff_Town( "jiading_jiangqiao")
    }else if(this.data.jiadingRadio == "jiading_loutang"){
        this.tsiqLon_1_diff_Town( "jiading_loutang")
    }else if(this.data.jiadingRadio == "jiading_malu"){
        this.tsiqLon_1_diff_Town( "jiading_malu")
    }else if(this.data.jiadingRadio == "jiading_nanxiang"){
        this.tsiqLon_1_diff_Town( "jiading_nanxiang")
    }else if(this.data.jiadingRadio == "jiading_tanghang"){
        this.tsiqLon_1_diff_Town( "jiading_tanghang")
    }else if(this.data.jiadingRadio == "jiading_taopu"){
        this.tsiqLon_1_diff_Town( "jiading_taopu")
    }else if(this.data.jiadingRadio == "jiading_waigang"){
        this.tsiqLon_1_diff_Town( "jiading_waigang")
    }else if(this.data.jiadingRadio == "jiading_wangxin"){
        this.tsiqLon_1_diff_Town( "jiading_wangxin")
    }else if(this.data.jiadingRadio == "jiading_zhenru"){
        this.tsiqLon_1_diff_Town( "jiading_zhenru")
    }else if(this.data.jiadingRadio == "jiading_jiadingzhen"){
        this.tsiqLon_1_diff_Town( "jiading_jiadingzhen")
    }else if(this.data.baoshanRadio == "baoshan_all"){
        this.tsiqLon_1_diff_County( "baoshan")
    }else if(this.data.baoshanRadio == "baoshan_dachang"){
        this.tsiqLon_1_diff_Town( "baoshan_dachang")
    }else if(this.data.baoshanRadio == "baoshan_fengtang"){
        this.tsiqLon_1_diff_Town( "baoshan_fengtang")
    }else if(this.data.baoshanRadio == "baoshan_gucun"){
        this.tsiqLon_1_diff_Town( "baoshan_gucun")
    }else if(this.data.baoshanRadio == "baoshan_liuhang"){
        this.tsiqLon_1_diff_Town( "baoshan_liuhang")
    }else if(this.data.baoshanRadio == "baoshan_jiangwan"){
        this.tsiqLon_1_diff_Town( "baoshan_jiangwan")
    }else if(this.data.baoshanRadio == "baoshan_luodian"){
        this.tsiqLon_1_diff_Town( "baoshan_luodian")
    }else if(this.data.baoshanRadio == "baoshan_luojing"){
        this.tsiqLon_1_diff_Town( "baoshan_luojing")
    }else if(this.data.baoshanRadio == "baoshan_luonan"){
        this.tsiqLon_1_diff_Town( "baoshan_luonan")
    }else if(this.data.baoshanRadio == "baoshan_miaohang"){
        this.tsiqLon_1_diff_Town( "baoshan_miaohang")
    }else if(this.data.baoshanRadio == "baoshan_pengpu"){
        this.tsiqLon_1_diff_Town( "baoshan_pengpu")
    }else if(this.data.baoshanRadio == "baoshan_shengqiao"){
        this.tsiqLon_1_diff_Town( "baoshan_shengqiao")
    }else if(this.data.baoshanRadio == "baoshan_songnan"){
        this.tsiqLon_1_diff_Town( "baoshan_songnan")
    }else if(this.data.baoshanRadio == "baoshan_wusong"){
        this.tsiqLon_1_diff_Town( "baoshan_wusong")
    }else if(this.data.baoshanRadio == "baoshan_wujiaochang"){
        this.tsiqLon_1_diff_Town( "baoshan_wujiaochang")
    }else if(this.data.baoshanRadio == "baoshan_shuangcaodun"){
        this.tsiqLon_1_diff_Town( "baoshan_shuangcaodun")
    }else if(this.data.chongmingRadio == "chongming_all"){
        this.tsiqLon_1_diff_County( "chongming")
    }else if(this.data.chongmingRadio == "chongming_chenjia"){
        this.tsiqLon_1_diff_Town( "chongming_chenjia")
    }else if(this.data.chongmingRadio == "chongming_gangyan"){
      this.tsiqLon_1_diff_Town("chongming_gangyan")
    }
  },

  tsiqLon_1_diff_County: function(whichCountyInput){  //接一条异龙的县函数
    var laIndex = this.data.tsiqLonList[this.data.step].originalEntry  //第几个数组的原条目
    var laIndexStr = laIndex.charAt(laIndex.length - 1)  //第几个数组的原条目的最后一个字

    db.collection("vocabulary")
    .aggregate()
    .match(_.and([
      {
        originalEntry: new RegExp("^"+laIndexStr+".{1,10000}$")  //仅匹配第一个字为val的条目
      },
      {
        whichCounty: whichCountyInput
      }
    ]))
    .sample({
      size: 1
    })
    .limit(1)
    .end()
    .then(res=>{
      if(res.list != ""){
        var oldList = this.data.tsiqLonList
        var newList = res.list
        oldList = oldList.concat(newList)
        this.setData({
          tsiqLonList: oldList,
          step: this.data.step + 1
        })
      }else{
        this.setData({
          tsiqLonBtn: false,
          reachText: "库中没有可供生成的词语了~"
        })
      }
    })
  },

  tsiqLon_1_diff_Town: function(whichTownInput){  //接一条异龙的镇函数
    var laIndex = this.data.tsiqLonList[this.data.step].originalEntry  //第几个数组的原条目
    var laIndexStr = laIndex.charAt(laIndex.length - 1)  //第几个数组的原条目的最后一个字

    db.collection("vocabulary")
    .aggregate()
    .match(_.and([
      {
        originalEntry: new RegExp("^"+laIndexStr+".{1,10000}$")  //仅匹配第一个字为val的条目
      },
      {
        whichTown: whichTownInput
      }
    ]))
    .sample({
      size: 1
    })
    .limit(1)
    .end()
    .then(res=>{
      if(res.list != ""){
        var oldList = this.data.tsiqLonList
        var newList = res.list
        oldList = oldList.concat(newList)
        this.setData({
          tsiqLonList: oldList,
          step: this.data.step + 1
        })
      }else{
        this.setData({
          tsiqLonBtn: false,
          reachText: "库中没有可供生成的词语了~"
        })
      }
    })
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
      tsiqLonList: [],
      step: 0
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

  //统一控制的bindchange函数
  advanceChangeUniversal: function(townName){
    this.setData({
      isClear: false,
      val: "",
      focusUI: false,
      tsiqLonBtn: false,
      reachText: "",
      threeBtns: false,
      tsiqLonList: [],
      step: 0,
      townName: townName
    })
  },

  //所有的bindchange函数见下
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

  //统一控制的按钮函数
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

      isClear: false,
      val: "",
      focusUI: false,
      tsiqLonBtn: false,
      reachText: "",
      threeBtns: false,
      tsiqLonList: [],
      step: 0
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
      isClear: false,
      val: "",
      focusUI: false,
      tsiqLonBtn: false,
      reachText: "",
      threeBtns: false,
      tsiqLonList: [],
      step: 0,
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
      chongmingValue: true,
      
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
      countyName:"上海郊区方言词典",  //县
      townName:"",  //镇
      shanghaiValueAll:false,
      comprehensiveValue: true,
      //关于数据的
      noData:[],  //将状态栏设置为空
      page: 0,  //将将来要数据库中的页码也设置为0
      reachBottom:"",  //将“到底了”设置为空
      list:"",  //将“list“设置为空
      showHideBtnPanel: false,
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
      comprehensiveValue:false,

      isClear: false,
      val: "",
      focusUI: false,
      tsiqLonBtn: false,
      reachText: "",
      threeBtns: false,
      tsiqLonList: [],
      step: 0
    })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {
    return {
      title: '沪郊乡音辞典词语接龙',
      path: 'pages/Jielong/Jielong'
    }
  },

  onShareTimeline(){
    return {
      title: '沪郊乡音辞典词语接龙',
      path: 'pages/Jielong/Jielong'
    }
  }
})