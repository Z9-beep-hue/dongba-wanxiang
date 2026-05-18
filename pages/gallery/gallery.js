// 东巴字典页逻辑
const app = getApp()

// 完整的文化背景数据
const CULTURAL_NOTES = {
  'DB001': '东巴文中太阳神是"丁巴什罗"，太阳崇拜是纳西族万物有灵信仰的核心',
  'DB002': '月亮在东巴神话中与生命轮回密切相关，月圆象征圆满与团聚',
  'DB003': '金沙江是纳西族的母亲河，水在东巴祭祀中具有净化意义，"祭署"即祭水神',
  'DB004': '东巴祭天仪式中，火是沟通天地神灵的媒介，也代表驱邪的神力',
  'DB005': '修曲是东巴法帽"五幅冠"的核心装饰，象征东巴法师通天的能力',
  'DB006': '东巴神话中，老虎是"英古阿格鲁"的坐骑，象征勇猛的战神精神',
  'DB007': '双鱼纹样是五幅冠装饰之一，源于纳西族对金沙江渔猎文化的记忆',
  'DB008': '云杉是祭天仪式的圣树，玉龙雪山上的云杉林是纳西族心中的神山圣域',
  'DB009': '玉龙雪山是纳西族的保护神，东巴经中称为"美丽的雪山之神"',
  'DB010': '东巴经中神灵的眼睛象征无处不在的神力，也代表东巴法师的"天眼"',
  'DB011': '青蛙是五幅冠装饰之一，纳西族认为青蛙的叫声是大地与天神沟通的信号',
  'DB012': '飞螺是五幅冠装饰之一，法螺的声音被认为能驱邪避鬼，是东巴仪式的重要法器',
  'DB013': '白牦牛在祭天仪式中是最珍贵的祭品，代表纳西族对天神最高的敬意',
  'DB014': '在东巴《神路图》中，云是连接人间与天界的通道，行云如神灵过境',
  'DB015': '东巴历法以星辰命名，纳西族十二生肖历与星辰崇拜密切相关',
  'DB016': '东巴文的"人"字是极简象形，直立的人形表达了纳西族"天地人和"的宇宙观',
  'DB017': '纳西族传统木楞房是东巴文"家"的原型，代表从游牧到定居的历史转变',
  'DB018': '东巴祭天仪式在"圣草地"举行，草象征大地的繁衍生息与春天的轮回',
  'DB019': '金沙江是纳西族的母亲河，东巴经中多次描述江神"署"的神力',
  'DB020': '东巴经典（东巴古籍）是世界记忆遗产，记录了纳西族完整的宇宙观与祭祀体系',
}

Page({
  data: {
    searchKeyword: '',
    activeCategory: '全部',
    categories: [],
    allChars: [],
    filteredChars: [],
    totalCount: 0,
    showDetail: false,
    selectedId: '',
    selectedChar: {},
  },

  onLoad(options) {
    const chars = app.globalData.dongbaChars
    // 补充文化背景
    const enrichedChars = chars.map(c => ({
      ...c,
      cultural_note: CULTURAL_NOTES[c.id] || '东巴文化博大精深，此符号承载着纳西族千年的文化记忆',
    }))
    
    const categories = app.getAllCategories()
    this.setData({
      allChars: enrichedChars,
      filteredChars: enrichedChars,
      categories,
      totalCount: enrichedChars.length,
    })

    // 如果有focusId参数，自动打开对应文字
    if (options.focusId) {
      const char = enrichedChars.find(c => c.id === options.focusId)
      if (char) {
        setTimeout(() => this._openDetail(char), 300)
      }
    }
  },

  onReady() {
    // 延迟绘制所有文字canvas
    setTimeout(() => this._drawAllCharCanvases(), 200)
  },

  onShow() {
    // 回到页面时重绘
    setTimeout(() => this._drawAllCharCanvases(), 100)
  },

  _drawAllCharCanvases() {
    this.data.filteredChars.forEach(char => {
      this._drawCharCanvas(char)
    })
  },

  _drawCharCanvas(char) {
    const canvasId = `char_${char.id}`
    const ctx = wx.createCanvasContext(canvasId)
    const w = 90, h = 90

    // 仿古纸背景
    ctx.setFillStyle('#F5EBD2')
    ctx.fillRect(0, 0, w, h)

    // 象形符号（用色块和文字模拟）
    ctx.setFillStyle(char.color || '#8B4513')
    ctx.setFontSize(38)
    ctx.setTextAlign('center')
    ctx.fillText(char.name.charAt(0), w/2, 56)

    ctx.draw()
  },

  onSearch(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    this._filterChars(keyword, this.data.activeCategory)
  },

  onSearchConfirm(e) {
    this._filterChars(e.detail.value, this.data.activeCategory)
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ activeCategory: category })
    this._filterChars(this.data.searchKeyword, category)
    setTimeout(() => this._drawAllCharCanvases(), 200)
  },

  _filterChars(keyword, category) {
    let result = this.data.allChars
    if (category && category !== '全部') {
      result = result.filter(c => c.category === category)
    }
    if (keyword) {
      const kw = keyword.toLowerCase()
      result = result.filter(c =>
        c.name.includes(kw) ||
        c.meaning.includes(kw) ||
        (c.name_en && c.name_en.toLowerCase().includes(kw))
      )
    }
    this.setData({ filteredChars: result })
  },

  onCharTap(e) {
    const id = e.currentTarget.dataset.id
    const char = this.data.allChars.find(c => c.id === id)
    if (char) this._openDetail(char)
  },

  _openDetail(char) {
    this.setData({
      showDetail: true,
      selectedId: char.id,
      selectedChar: char,
    })
    setTimeout(() => this._drawDetailCanvas(char), 100)
    wx.vibrateShort({ type: 'light' })
  },

  _drawDetailCanvas(char) {
    const ctx = wx.createCanvasContext('detailCanvas')
    const w = 200, h = 200

    ctx.setFillStyle('#F5EBD2')
    ctx.fillRect(0, 0, w, h)

    // 装饰框
    ctx.setStrokeStyle('#8B6914')
    ctx.setLineWidth(3)
    ctx.strokeRect(6, 6, w-12, h-12)
    ctx.setStrokeStyle('rgba(212,160,23,0.4)')
    ctx.setLineWidth(1)
    ctx.strokeRect(14, 14, w-28, h-28)

    // 符号
    ctx.setFillStyle(char.color || '#8B4513')
    ctx.setFontSize(80)
    ctx.setTextAlign('center')
    ctx.fillText(char.name.charAt(0), w/2, 130)

    // 小标注
    ctx.setFillStyle('#8B6914')
    ctx.setFontSize(16)
    ctx.fillText('東巴文 · ' + char.id, w/2, 180)

    ctx.draw()
  },

  closeDetail() {
    this.setData({ showDetail: false, selectedId: '' })
  },

  noop() {},

  goLearnWrite() {
    const char = this.data.selectedChar
    this.closeDetail()
    wx.switchTab({ url: `/pages/write/write` })
  },

  onShareAppMessage() {
    const char = this.data.selectedChar
    return {
      title: `东巴文字「${char.name}」- ${char.meaning}`,
      path: `/pages/gallery/gallery?focusId=${char.id}`,
    }
  },
})
