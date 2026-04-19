// pages/AboutUs/AboutUs.js
const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    // 原有卡片数据
    inputSortList: [],
    pronuncationList: [],
    programMakerList: [],
    ChronicleList: [],
    UiDesignList: [],
    introduceList: [],
    AcknowledgeList: [],
    versionArea: true,
    inputArea: true,
    pronunciationArea: true,
    uiDesignArea: true,
    programMakerArea: true,
    AcknowledgeArea: true,
    ChronicleArea: true,
    introduceArea: true,
    fontMakerArea: true,   // 控制造字人员卡片展开/合拢
    fontMakerList: [],     // 造字人员数据列表

    // 字体相关状态
    fontExists: false,           // 本地是否有字体文件
    fontBtnText: '下载字体',     // 按钮文字
    isCheckingFont: false,       // 是否正在检查字体状态（防止重复请求）
  },

  onLoad() {
    wx.showLoading({ title: '数据加载中...' })
    this.loadAboutData()
    this.checkFontStatus()
  },

  onShow() {
    this.checkFontStatus()
  },

  // ------------------------------------------------------------
  // 检查字体状态（基于远程 ETag 比较）
  // ------------------------------------------------------------
  async checkFontStatus() {
    // 防止并发检查
    if (this.data.isCheckingFont) return;
    this.setData({ isCheckingFont: true });

    const app = getApp();
    if (!app || !app.FONT_CONFIG) {
      setTimeout(() => this.checkFontStatus(), 100);
      this.setData({ isCheckingFont: false });
      return;
    }

    const config = app.FONT_CONFIG;
    const fs = wx.getFileSystemManager();
    const localPath = `${wx.env.USER_DATA_PATH}/${config.fileName}`;

    // 1. 检查本地文件是否存在
    let localExists = false;
    try {
      fs.accessSync(localPath);
      localExists = true;
    } catch (e) {
      localExists = false;
    }

    // 2. 获取远程字体标识（ETag 或 Last-Modified）
    let remoteTag = null;
    try {
      remoteTag = await app.fetchRemoteFontTag();
    } catch (err) {
      console.warn('获取远程字体标识失败', err);
      // 网络异常时，根据本地状态显示
      if (localExists) {
        this.setData({
          fontExists: true,
          fontBtnText: '已下载字体',
          isCheckingFont: false
        });
      } else {
        this.setData({
          fontExists: false,
          fontBtnText: '下载字体',
          isCheckingFont: false
        });
      }
      return;
    }

    // 3. 读取本地存储的标识
    const localTag = wx.getStorageSync(app.REMOTE_FONT_TAG_KEY);

    // 4. 根据状态设置按钮文字
    let btnText = '下载字体';
    if (localExists) {
      if (localTag === remoteTag) {
        btnText = '字体已最新';
      } else {
        btnText = '更新字体';
      }
    }

    this.setData({
      fontExists: localExists,
      fontBtnText: btnText,
      isCheckingFont: false
    });
  },

  // ------------------------------------------------------------
  // 处理下载/更新按钮点击
  // ------------------------------------------------------------
  async handleDownloadFont() {
    const app = getApp();
    if (!app || !app.manuallyDownloadFont) {
      wx.showToast({ title: '字体功能暂不可用', icon: 'none' });
      return;
    }

    // 根据当前按钮文字执行不同操作
    const btnText = this.data.fontBtnText;

    if (btnText === '字体已最新') {
      wx.showToast({ title: '当前已是最新字体', icon: 'none' });
      return;
    }

    if (btnText === '更新字体') {
      // 询问用户是否更新
      wx.showModal({
        title: '字体更新',
        content: '检测到字体有更新，是否立即下载最新版本？',
        confirmText: '立即更新',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.performDownload();
          }
        }
      });
      return;
    }

    // 下载字体
    this.performDownload();
  },

  // 执行下载操作
  performDownload() {
    const app = getApp();

    wx.showLoading({ title: '准备下载...', mask: true });

    // 调用 app 的下载方法（内部有进度条）
    app.manuallyDownloadFont()
      .then(() => {
        wx.hideLoading();
        // 下载完成后刷新状态
        setTimeout(() => {
          this.checkFontStatus();
        }, 500);
      })
      .catch((err) => {
        wx.hideLoading();
        console.error('下载失败', err);
        wx.showToast({ title: '下载失败，请检查网络', icon: 'none' });
      });
  },

  // ------------------------------------------------------------
  // 处理删除字体按钮点击
  // ------------------------------------------------------------
  handleDeleteFont() {
    const app = getApp();
    if (!app || !app.deleteFont) {
      wx.showToast({ title: '字体功能暂不可用', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '确认删除',
      content: '删除后生僻字将无法正常显示，确定删除吗？',
      success: (res) => {
        if (res.confirm) {
          app.deleteFont();
          // 刷新按钮状态
          this.setData({
            fontExists: false,
            fontBtnText: '下载字体'
          });
          wx.showModal({
            title: '提示',
            content: '字体已删除，建议重启小程序以完全恢复系统字体。',
            showCancel: false
          });
        }
      }
    });
  },

  loadAboutData() {
    db.collection('aboutUsPage')
      .get()
      .then(res => {
        const rawData = res.data;

        const splitParagraphs = (text) => {
          if (!text || typeof text !== 'string') return [];
          return text.split('\n').filter(p => p.trim() !== '');
        };

        const fontMakerItems = rawData
          .filter(item => item.fontMaker)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.fontMaker) }));!
        this.setData({
          fontMakerList: fontMakerItems  
        });

        wx.hideLoading();
        const inputSortItems = rawData
          .filter(item => item.input)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.input) }));

        const pronunciationItems = rawData
          .filter(item => item.pronunciation)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.pronunciation) }));

        const programMakerItems = rawData
          .filter(item => item.programMaker)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.programMaker) }));

        const uiDesignItems = rawData
          .filter(item => item.uiDesign)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.uiDesign) }));

        const introduceItems = rawData
          .filter(item => item.introduce)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.introduce) }));

        const chronicleItems = rawData
          .filter(item => item.data)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.data) }));

        const acknowledgeItems = rawData
          .filter(item => item.Acknowledge)
          .map(item => ({ ...item, paragraphs: splitParagraphs(item.Acknowledge) }));

        this.setData({
          inputSortList: inputSortItems,
          pronuncationList: pronunciationItems,
          programMakerList: programMakerItems,
          UiDesignList: uiDesignItems,
          introduceList: introduceItems,
          ChronicleList: chronicleItems,
          AcknowledgeList: acknowledgeItems
        });

        wx.hideLoading();
      })
      .catch(err => {
        console.error('数据加载失败', err);
        wx.hideLoading();
        wx.showToast({ title: '数据加载失败', icon: 'none' });
      });
  },

  // --- 以下原有按钮事件保持不变 ---
  versionButton() {
    this.setData({ versionArea: !this.data.versionArea });
  },
  inputButton() {
    this.setData({ inputArea: !this.data.inputArea });
  },
  pronunciationButton() {
    this.setData({ pronunciationArea: !this.data.pronunciationArea });
  },
  uiDesignButton() {
    this.setData({ uiDesignArea: !this.data.uiDesignArea });
  },
  programMakerButton() {
    this.setData({ programMakerArea: !this.data.programMakerArea });
  },
  AcknowledgeButton() {
    this.setData({ AcknowledgeArea: !this.data.AcknowledgeArea });
  },
  ChronicleButton() {
    this.setData({ ChronicleArea: !this.data.ChronicleArea });
  },
  introduceButton() {
    this.setData({ introduceArea: !this.data.introduceArea });
  },
  fontMakerButton() {
    this.setData({ fontMakerArea: !this.data.fontMakerArea });
  },
  ReverseAll() {
    const data = this.data;
    this.setData({
      introduceArea: !data.introduceArea,
      inputArea: !data.inputArea,
      pronunciationArea: !data.pronunciationArea,
      uiDesignArea: !data.uiDesignArea,
      programMakerArea: !data.programMakerArea,
      AcknowledgeArea: !data.AcknowledgeArea,
      ChronicleArea: !data.ChronicleArea,
      versionArea: !data.versionArea,
      fontMakerArea: !data.fontMakerArea
    });
  },
  showAll() {
    this.setData({
      introduceArea: true,
      inputArea: true,
      pronunciationArea: true,
      uiDesignArea: true,
      programMakerArea: true,
      AcknowledgeArea: true,
      ChronicleArea: true,
      versionArea: true,
      fontMakerArea: true
    });
  },
  hideAll() {
    this.setData({
      introduceArea: false,
      inputArea: false,
      pronunciationArea: false,
      uiDesignArea: false,
      programMakerArea: false,
      AcknowledgeArea: false,
      ChronicleArea: false,
      versionArea: false,
      fontMakerArea: false
    });
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '沪郊乡音辞典关于我们',
      path: '/pages/AboutUs/AboutUs'
    };
  },
  onShareTimeline() {
    return {
      title: '沪郊乡音辞典关于沪郊乡音'
    };
  }
});