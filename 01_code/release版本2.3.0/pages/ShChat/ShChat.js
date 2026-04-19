// pages/ShChat/ShChat.js
const API_BASE_URL = 'https://fdwugniu.cc'; // 请确保已在后台配置合法域名
// 全局音频管理器
let globalAudioManager = null;
class GlobalAudioManager {
    constructor() {
        this.pool = [];
        this.maxPoolSize = 5;
        this.audioCache = new Map();
        this.preloadingSet = new Set();
    }

    getPlayer() {
        let player = this.pool.find(p => !p.isPlaying);
        if (!player && this.pool.length < this.maxPoolSize) {
            player = this.createPlayer();
            this.pool.push(player);
        }
        return player;
    }

    createPlayer() {
        const ctx = wx.createInnerAudioContext({ useWebAudioImplement: true });
        let isPlaying = false;
        ctx.onPlay(() => { isPlaying = true; });
        ctx.onPause(() => { isPlaying = false; });
        ctx.onStop(() => { isPlaying = false; });
        ctx.onEnded(() => { isPlaying = false; });
        ctx.onError(() => { isPlaying = false; });
        return { ctx, isPlaying };
    }

    async preloadAudio(url) {
        if (!url) return null;
        if (this.audioCache.has(url) || this.preloadingSet.has(url)) return;
        this.preloadingSet.add(url);
        try {
            const localPath = await this.downloadAndSave(url);
            this.audioCache.set(url, localPath);
            console.log(`音频预加载成功: ${url}`);
        } catch (err) {
            console.error(`音频预加载失败: ${url}`, err);
        } finally {
            this.preloadingSet.delete(url);
        }
    }

    async downloadAndSave(url) {
        const fs = wx.getFileSystemManager();
        const fileName = `audio_${Date.now()}_${Math.random().toString(36).substr(2, 8)}.mp3`;
        const localPath = `${wx.env.USER_DATA_PATH}/${fileName}`;
        const res = await new Promise((resolve, reject) => {
            wx.downloadFile({ url, success: resolve, fail: reject });
        });
        if (res.statusCode !== 200) throw new Error(`下载失败，状态码: ${res.statusCode}`);
        fs.saveFileSync(res.tempFilePath, localPath);
        return localPath;
    }

    async playAudio(url) {
        if (!url) return;
        try {
            let localPath = this.audioCache.get(url);
            if (!localPath) {
                console.log(`缓存未命中，正在下载: ${url}`);
                localPath = await this.downloadAndSave(url);
                this.audioCache.set(url, localPath);
            } else {
                console.log(`缓存命中，立即播放: ${url}`);
            }
            const player = this.getPlayer();
            if (player) {
                player.ctx.src = localPath;
                player.ctx.play();
            }
        } catch (err) {
            console.error('播放音频失败:', err);
            wx.showToast({ title: '播放失败', icon: 'none' });
        }
    }

    stopAll() {
        this.pool.forEach(p => p.ctx.stop());
    }
}

Page({
  data: {
    messages: [
      {
        id: 1,
        role: 'ai',
        contentFragments: [{ type: 'text', text: '你好！你可以问我“自行车怎么说？”或“【脚踏车】怎么读？”' }],
        audioUrl: null
      }
    ],
    inputText: '',
    isLoading: false,
    scrollToView: '',
    scrollTop: 0,
    keyboardHeight: 0,
    lastAudioUrl: null,
    lastAudioFilename: null,
    keyboardPadding: 24
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  onFocus() {},
  onBlur() {
    this.setData({ keyboardHeight: 0 });
  },
  onScroll(e) {
    this.setData({ scrollTop: e.detail.scrollTop });
  },


  onLoad() {
    // 监听键盘高度变化
    this.keyboardListener = wx.onKeyboardHeightChange((res) => {
      console.log('键盘高度变化:', res.height);
      // 键盘弹起时，设置输入框底部内边距 = 键盘高度（减去部分安全区域）
      if (res.height > 0) {
        this.setData({ keyboardPadding: res.height });
      } else {
        this.setData({ keyboardPadding: 24 }); // 键盘收起恢复默认
      }
    });
  },

  onUnload() {
    // 页面卸载时移除监听
    if (this.keyboardListener) {
      this.keyboardListener();
    }
  },

  onInputFocus() {
    // 可预留，键盘监听已处理
  },

  onInputBlur() {
    // 可预留
  },
  // 键盘确认回调（回车发送）
  enterInput() {
    this.sendMessage();
  },

  // 点击“生成语音”按钮
  onQuickRead(e) {
    const word = e.currentTarget.dataset.word;
    this.setData({ inputText: `【${word}】怎么读` });
    this.sendMessage();
  },

  // 发送消息
  async sendMessage() {
    const text = this.data.inputText.trim();
    if (!text || this.data.isLoading) return;

    // 特殊指令：再读一遍
    if (text === '再读一遍') {
      if (this.data.lastAudioUrl) {
        this.playAudioByUrl(this.data.lastAudioUrl);
        this.appendMessage('ai', '好的，再为你播放一遍。');
      } else {
        this.appendMessage('ai', '刚才好像没合成过语音。');
      }
      this.setData({ inputText: '' });
      return;
    }

    // 特殊指令：下载语音
    if (text === '下载语音' || text === '下载') {
      if (this.data.lastAudioUrl) {
        this.downloadAudioToLocal(this.data.lastAudioUrl);
        this.appendMessage('ai', '正在下载并保存音频，请稍后...');
      } else {
        this.appendMessage('ai', '没有可供下载的音频。');
      }
      this.setData({ inputText: '' });
      return;
    }

    // 普通消息
    const userFragments = [{ type: 'text', text: text }];
    const userMsg = {
      id: Date.now(),
      role: 'user',
      contentFragments: userFragments,
      audioUrl: null
    };

    const newMessages = [...this.data.messages, userMsg];
    this.setData({
      messages: newMessages,
      inputText: '',
      isLoading: true,
      scrollToView: `msg-${userMsg.id}`
    });

    try {
      const requestBody = { message: text };
      if (this.data.lastAudioFilename) {
        requestBody.last_audio_filename = this.data.lastAudioFilename;
      }

      const res = await this.requestChat(requestBody);
      const data = res.data;

      const fragments = this.parseHtmlToFragments(data.text || '（未收到有效回复）');
      const audioUrl = data.audio ? API_BASE_URL + data.audio : null;

      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        contentFragments: fragments,
        audioUrl: audioUrl
      };

      this.setData({
        messages: [...this.data.messages, aiMsg],
        isLoading: false,
        scrollToView: `msg-${aiMsg.id}`
      });

      if (audioUrl) {
        this.setData({
          lastAudioUrl: audioUrl,
          lastAudioFilename: data.audio_filename || null
        });
      }
    } catch (err) {
      console.error('请求失败', err);
      const errorMsg = {
        id: Date.now() + 1,
        role: 'ai',
        contentFragments: [{ type: 'text', text: '网络请求失败，请稍后重试。' }],
        audioUrl: null
      };
      this.setData({
        messages: [...this.data.messages, errorMsg],
        isLoading: false,
        scrollToView: `msg-${errorMsg.id}`
      });
    }
  },

  appendMessage(role, content) {
    const msg = {
      id: Date.now(),
      role: role,
      contentFragments: [{ type: 'text', text: content }],
      audioUrl: null
    };
    this.setData({
      messages: [...this.data.messages, msg],
      scrollToView: `msg-${msg.id}`
    });
  },

  requestChat(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${API_BASE_URL}/api/chat`,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: data,
        success: resolve,
        fail: reject
      });
    });
  },

  parseHtmlToFragments(html) {
    const fragments = [];
    let lastIndex = 0;
    const tagRegex = /<(\/?)(\w+)([^>]*)>/g;
    let match;

    const addText = (text) => {
      if (!text) return;
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        if (line) fragments.push({ type: 'text', text: line });
        if (i < lines.length - 1) fragments.push({ type: 'br' });
      });
    };

    while ((match = tagRegex.exec(html)) !== null) {
      const [fullTag, isClose, tagName, attrs] = match;
      const index = match.index;

      if (index > lastIndex) {
        addText(html.substring(lastIndex, index));
      }

      if (!isClose) {
        if (tagName === 'br') {
          fragments.push({ type: 'br' });
        } else if (tagName === 'hr') {
          fragments.push({ type: 'hr' });
        } else if (tagName === 'b' || tagName === 'strong') {
          const closeTag = `</${tagName}>`;
          const closeIndex = html.indexOf(closeTag, tagRegex.lastIndex);
          if (closeIndex !== -1) {
            const innerHtml = html.substring(tagRegex.lastIndex, closeIndex);
            const innerText = innerHtml.replace(/<[^>]*>/g, '');
            fragments.push({ type: 'b', text: innerText });
            tagRegex.lastIndex = closeIndex + closeTag.length;
          }
        } else if (tagName === 'small') {
          const closeTag = `</small>`;
          const closeIndex = html.indexOf(closeTag, tagRegex.lastIndex);
          if (closeIndex !== -1) {
            const innerText = html.substring(tagRegex.lastIndex, closeIndex).replace(/<[^>]*>/g, '');
            fragments.push({ type: 'small', text: innerText });
            tagRegex.lastIndex = closeIndex + closeTag.length;
          }
        } else if (tagName === 'a') {
          const classMatch = attrs.match(/class=["']([^"']*)["']/);
          const onclickMatch = attrs.match(/quickRead\('([^']*)'\)/);
          if (classMatch && classMatch[1].includes('voice-btn') && onclickMatch) {
            const word = onclickMatch[1];
            fragments.push({ type: 'quickRead', word: word });
            const closeA = html.indexOf('</a>', tagRegex.lastIndex);
            if (closeA !== -1) tagRegex.lastIndex = closeA + 4;
          } else {
            const hrefMatch = attrs.match(/href=["']([^"']*)["']/);
            const href = hrefMatch ? hrefMatch[1] : '#';
            const closeA = html.indexOf('</a>', tagRegex.lastIndex);
            if (closeA !== -1) {
              const linkText = html.substring(tagRegex.lastIndex, closeA).replace(/<[^>]*>/g, '');
              fragments.push({ type: 'link', text: linkText, href: href });
              tagRegex.lastIndex = closeA + 4;
            }
          }
        }
      }
      lastIndex = tagRegex.lastIndex;
    }

    if (lastIndex < html.length) {
      addText(html.substring(lastIndex));
    }

    return fragments.length ? fragments : [{ type: 'text', text: html }];
  },

  // 点击链接下载
  downloadLink(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;
    if (url.endsWith('.mp3') || url.endsWith('.wav') || url.includes('/audio/')) {
      this.downloadAudioToLocal(url);
    } else {
      wx.setClipboardData({
        data: url,
        success: () => wx.showToast({ title: '链接已复制', icon: 'none' })
      });
    }
  },

  // 下载音频并保存到本地
  downloadAudioToLocal(url) {
    wx.showLoading({ title: '下载中...' });
    wx.downloadFile({
      url: url,
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 200) {
          const fs = wx.getFileSystemManager();
          const savePath = `${wx.env.USER_DATA_PATH}/audio_${Date.now()}.mp3`;
          try {
            fs.saveFileSync(res.tempFilePath, savePath);
            wx.showModal({
              title: '保存成功',
              content: `音频已保存到小程序本地。\n是否立即播放？`,
              confirmText: '播放',
              cancelText: '不用了',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  this.playAudioByUrl(savePath);
                }
              }
            });
          } catch (e) {
            console.error('保存失败', e);
            wx.showToast({ title: '保存失败，可尝试预览后手动保存', icon: 'none' });
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              fileType: 'audio'
            });
          }
        } else {
          wx.showToast({ title: '下载失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({ title: '下载失败', icon: 'none' });
      }
    });
  },

  // 原下载方法调用新方法（保留兼容）
  downloadAudio(url) {
    this.downloadAudioToLocal(url);
  },

  playAudio(e) {
    const url = e.currentTarget.dataset.url;
    this.playAudioByUrl(url);
  },

// 直接通过 URL 或本地路径播放
  playAudioByUrl(url) {
    if (!url) return;
    if (!globalAudioManager) {
      globalAudioManager = new GlobalAudioManager();
    }
    // 判断是否为本地文件路径（wxfile:// 或包含 USER_DATA_PATH）
    if (url.startsWith('wxfile://') || url.includes(wx.env.USER_DATA_PATH)) {
      // 直接播放本地文件，不经过缓存下载
      const player = globalAudioManager.getPlayer();
      if (player) {
        player.ctx.src = url;
        player.ctx.play();
      }
    } else {
      // 网络 URL，走带缓存的播放流程
      globalAudioManager.playAudio(url);
    }
  },

  onShareAppMessage() {
    return {
      title: '沪郊乡音·方言大模型',
      path: '/pages/ShChat/ShChat'
    };
  },

  onShareTimeline() {
    return {
      title: '沪郊乡音·方言大模型',
      path: '/pages/ShChat/ShChat'
    };
  }
});