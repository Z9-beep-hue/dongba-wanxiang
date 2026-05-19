// 东巴字典页逻辑
const app = getApp()

// 完整的文化背景数据
const CULTURAL_NOTES = {
  'DB001': '东巴文中太阳神是"丁巴什罗"，太阳崇拜是纳西族万物有灵信仰的核心',
  'DB002': '月亮在东巴神话中与生命轮回密切相关，月圆象征圆满与团聚',
  'DB003': '东巴历法以星辰命名，纳西族十二生肖历与星辰崇拜密切相关',
  'DB004': '在东巴《神路图》中，云是连接人间与天界的通道，行云如神灵过境',
  'DB005': '雷在东巴信仰中代表天威，雷电被认为能净化邪恶，震慑妖魔',
  'DB006': '雨是大地复苏的甘霖，纳西族祭水神"署"的仪式中祈求风调雨顺',
  'DB007': '风无形却有力，东巴神话中风是传递天神旨意的信使',
  'DB008': '金沙江是纳西族的母亲河，水在东巴祭祀中具有净化意义，"祭署"即祭水神',
  'DB009': '东巴祭天仪式中，火是沟通天地神灵的媒介，也代表驱邪的神力',
  'DB010': '山在纳西族信仰中神圣崇高，每一座山都有自己的山神守护',
  'DB011': '石象征坚韧与永恒，东巴经中用石来比喻不屈的意志',
  'DB012': '土是万物之母，纳西族农耕文化中对大地怀有最深的敬畏',
  'DB013': '玉龙雪山是纳西族的保护神，东巴经中称为"美丽的雪山之神"',
  'DB014': '金沙江是纳西族的母亲河，东巴经中多次描述江神"署"的神力',
  'DB015': '湖泊如镜，在东巴信仰中映照人心，是心灵净化的象征',
  'DB016': '云杉是祭天仪式的圣树，玉龙雪山上的云杉林是纳西族心中的神山圣域',
  'DB017': '东巴祭天仪式在"圣草地"举行，草象征大地的繁衍生息与春天的轮回',
  'DB018': '花是美的化身，东巴经中以花比喻生命的绚烂与短暂',
  'DB019': '竹有气节，纳西族以竹的坚韧比喻君子的品格',
  'DB020': '东巴神话中，老虎是"英古阿格鲁"的坐骑，象征勇猛的战神精神',
  'DB021': '修曲是东巴法帽"五幅冠"的核心装饰，象征东巴法师通天的能力',
  'DB022': '青蛙是五幅冠装饰之一，纳西族认为青蛙的叫声是大地与天神沟通的信号',
  'DB023': '白牦牛在祭天仪式中是最珍贵的祭品，代表纳西族对天神最高的敬意',
  'DB024': '马是纳西族游牧时代的忠实伙伴，象征远行与忠诚',
  'DB025': '羊温顺富足，纳西族以六畜兴旺祈求家族繁荣',
  'DB026': '蛇灵动善变，在东巴信仰中象征地下世界的神秘力量',
  'DB027': '龙在东巴文化中神圣威严，掌管风雨，保佑五谷丰登',
  'DB028': '东巴文的"人"字是极简象形，直立的人形表达了纳西族"天地人和"的宇宙观',
  'DB029': '男代表阳性力量，在东巴祭天仪式中承担主祭之责',
  'DB030': '女代表阴性孕育，纳西族尊崇母性，视之为生命之源',
  'DB031': '子是新生与希望，东巴经中孩童象征族群的未来与传承',
  'DB032': '纳西族传统木楞房是东巴文"家"的原型，代表从游牧到定居的历史转变',
  'DB033': '衣是体面与温暖，东巴服饰上的纹样承载着家族的历史与信仰',
  'DB034': '食是人间烟火，东巴祭祀中以最好的食物敬奉神灵',
  'DB035': '弓是纳西武士的标志，东巴经中英雄常以弓箭射落邪恶',
  'DB036': '飞螺是五幅冠装饰之一，法螺的声音被认为能驱邪避鬼，是东巴仪式的重要法器',
  'DB037': '法鼓 rhythm 震天，东巴法师击鼓通神，引导亡灵穿越三界',
  'DB038': '双鱼纹样是五幅冠装饰之一，源于纳西族对金沙江渔猎文化的记忆',
  'DB039': '福是神灵的赐福，东巴仪式中通过诵经与祭祀祈求幸福安康',
  'DB040': '东巴经中神灵的眼睛象征无处不在的神力，也代表东巴法师的"天眼"',
  'DB041': '神是至高存在，创造万物，纳西族祭天即祭最高天神',
  'DB042': '鬼是亡灵的居所，东巴超度仪式帮助亡灵脱离鬼界，升入天界',
  'DB043': '东巴经典（东巴古籍）是世界记忆遗产，记录了纳西族完整的宇宙观与祭祀体系',
  'DB044': '舞是人与神的对话，东巴舞蹈在仪式中连接人间与天界',
  'DB045': '乐是天籁之音，东巴音乐以铃声、鼓声、法螺声沟通天地',
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

    // 绘制东巴象形符号
    app.drawDongbaSymbol(ctx, char.drawType, w / 2, h / 2 + 2, 52, char.color || '#8B4513')

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

    // 绘制东巴象形符号（大图）
    app.drawDongbaSymbol(ctx, char.drawType, w / 2, h / 2 - 5, 90, char.color || '#8B4513')

    // 小标注
    ctx.setFillStyle('#8B6914')
    ctx.setFontSize(16)
    ctx.setTextAlign('center')
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
