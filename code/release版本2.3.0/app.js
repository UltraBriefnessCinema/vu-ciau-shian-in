// app.js
App({
  FONT_CONFIG: {
    family: 'chFont',
    fileName: 'chFont.ttf',
    cloudPath: 'https://hjxy-1310829406.cos.ap-shanghai.myqcloud.com/chFont.ttf',
  },

  REMOTE_FONT_TAG_KEY: 'remote_font_tag',
  FONT_LOADED_KEY: 'font_loaded_flag',   // 标记字体是否已成功加载过

  onLaunch() {
    console.log('小程序启动');
    wx.cloud.init({ env: "hujiaodictionary-4f8kvxn93beeb58" });

    if (wx.setInnerAudioOption) {
      wx.setInnerAudioOption({ obeyMuteSwitch: false, mixWithOther: false });
    }

    // 先显示一个启动遮罩（在 app.json 中配置或动态创建），等字体就绪后再隐藏
    this.initFont();
  },

  async initFont() {
    try {
      await this.ensureFontReady();
      // 字体就绪，通知全局
      this.fontReady = true;
      wx.setStorageSync(this.FONT_LOADED_KEY, true);
      console.log('✅ 字体已就绪，可以正常显示');
    } catch (err) {
      console.error('❌ 字体初始化失败', err);
      // 即使失败也不阻塞使用，只是生僻字显示异常
      this.fontReady = false;
    } finally {
      // 隐藏启动遮罩（如果你的启动页是自定义的，可在这里控制）
      this.hideLaunchMask();
    }
  },

  // 隐藏启动遮罩（示例：通过全局数据控制）
  hideLaunchMask() {
    // 如果你的首页有 loading 状态，可通过 getCurrentPages 通知
    const pages = getCurrentPages();
    if (pages.length > 0) {
      const page = pages[pages.length - 1];
      if (page.setData) {
        page.setData({ fontReady: true });
      }
    }
  },

  // 确保字体可用（核心）
  async ensureFontReady() {
    const config = this.FONT_CONFIG;
    const fs = wx.getFileSystemManager();
    const localPath = `${wx.env.USER_DATA_PATH}/${config.fileName}`;

    // 1. 检查本地是否已有文件
    let localExists = false;
    try {
      fs.accessSync(localPath);
      localExists = true;
    } catch (e) {}

    // 2. 获取远程标识
    let remoteTag = null;
    try {
      remoteTag = await this.fetchRemoteFontTag();
    } catch (err) {
      console.warn('获取远程标识失败，将使用本地文件（如有）');
    }

    const localTag = wx.getStorageSync(this.REMOTE_FONT_TAG_KEY);
    const needDownload = !localExists || (remoteTag && localTag !== remoteTag);

    if (needDownload) {
      // 需要下载（首次或更新）
      console.log('需要下载字体文件');
      await this.downloadAndSaveFont(config, localPath);
    } else {
      console.log('本地字体已是最新，直接使用网络URL加载');
    }

    // 3. 统一使用网络 URL 加载字体（最稳定）
    await this.loadFontFromNetwork(config.family, config.cloudPath);
    wx.setStorageSync('font_cached_url', config.cloudPath);

    // 4. 记录远程标识（如有）
    if (remoteTag) {
      wx.setStorageSync(this.REMOTE_FONT_TAG_KEY, remoteTag);
    }
  },

  // 下载字体并保存到本地（后台静默）
  async downloadAndSaveFont(config, localPath) {
    return new Promise((resolve, reject) => {
      wx.showLoading({ title: '正在下载字体...', mask: true });
      const downloadTask = wx.downloadFile({
        url: config.cloudPath,
        success: (res) => {
          if (res.statusCode === 200) {
            const fs = wx.getFileSystemManager();
            try {
              fs.saveFileSync(res.tempFilePath, localPath);
              console.log('字体保存成功:', localPath);
              resolve();
            } catch (e) {
              console.warn('保存字体文件失败（不影响使用）', e);
              resolve(); // 保存失败不阻塞加载
            }
          } else {
            reject(new Error(`下载失败，状态码 ${res.statusCode}`));
          }
        },
        fail: reject
      });

      downloadTask.onProgressUpdate((res) => {
        wx.showLoading({ title: `下载中 ${res.progress}%`, mask: true });
        if (res.progress === 100) {
          wx.showLoading({ title: '处理中...', mask: true });
        }
      });
    }).finally(() => {
      wx.hideLoading();
    });
  },

  async fetchRemoteFontTag() {
    const config = this.FONT_CONFIG;
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.cloudPath,
        method: 'HEAD',
        success: (res) => {
          const etag = res.header?.Etag || res.header?.etag;
          const lastModified = res.header?.['Last-Modified'] || res.header?.['last-modified'];
          const tag = etag || lastModified;
          if (!tag) reject(new Error('无法获取字体标识'));
          else resolve(tag);
        },
        fail: reject
      });
    });
  },

  async loadFontFromNetwork(family, url) {
    return wx.loadFontFace({
      family,
      source: `url("${url}")`,
      global: true,
      scopes: ['webview', 'native']
    });
  },

  // 公开方法：手动下载/更新（关于我们页面调用）
  async manuallyDownloadFont() {
    const config = this.FONT_CONFIG;
    const localPath = `${wx.env.USER_DATA_PATH}/${config.fileName}`;
    await this.downloadAndSaveFont(config, localPath);
    await this.loadFontFromNetwork(config.family, config.cloudPath);
    wx.showToast({ title: '字体已更新', icon: 'success' });
    this.fontReady = true;
  },

  deleteFont() {
    const config = this.FONT_CONFIG;
    const localPath = `${wx.env.USER_DATA_PATH}/${config.fileName}`;
    const fs = wx.getFileSystemManager();
    try {
      fs.unlinkSync(localPath);
      wx.removeStorageSync(this.REMOTE_FONT_TAG_KEY);
      wx.removeStorageSync('font_cached_url');
      wx.removeStorageSync(this.FONT_LOADED_KEY);
      wx.showToast({ title: '字体已删除', icon: 'success' });
      this.fontReady = false;
    } catch (e) {
      wx.showToast({ title: '字体文件不存在', icon: 'none' });
    }
  },

  // 分享配置...
  onShareAppMessage() {
    return { title: '沪郊乡音辞典关于我们', path: '/pages/AboutUs/AboutUs' };
  },
  onShareTimeline() {
    return { title: '沪郊乡音辞典关于沪郊乡音' };
  }
});