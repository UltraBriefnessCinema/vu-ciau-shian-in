Component({
  data: {
    selected: 0,
    color: "#CACACA",
    selectedColor: "#07C160",
    list: [{
      pagePath: "/pages/WordProu/WordProu",
      text: "字音"
    }, {
      pagePath: "/pages/Vocabulary/Vocabulary",
      text: "词汇"
    }, {
      pagePath: "/pages/AboutUs/AboutUs",
      text: "关于我们"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})