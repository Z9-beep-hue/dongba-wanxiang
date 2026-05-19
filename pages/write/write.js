// 东巴书写体验页
const app = getApp()

// 书写要点提示（根据文字类型）
const WRITING_TIPS_MAP = {
  '天象': '先画轮廓圆形，再添加放射状符号。力道均匀，线条流畅。',
  '神灵': '神灵符号通常左右对称，先画中轴线，再向两侧展开。',
  '动物': '先描轮廓，抓住动物的最典型特征，东巴文不求写实，重在传神。',
  '植物': '植物符号多有弧线，注意笔画的生命感与流动性。',
  '自然': '自然符号简洁，几笔即可，重在速度与韵律。',
  '默认': '东巴文是象形文字，临摹时抓住物体最显著的轮廓特征即可。',
}

Page({
  data: {
    selectedCharId: 'DB001',
    currentChar: {},
    learnableChars: [],
    writingTips: '',
    inputName: '',
    generatedName: [],
    brushSize: 6,
    brushOptions: [
      { size: 3, label: '细' },
      { size: 6, label: '中' },
      { size: 10, label: '粗' },
    ],
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    strokes: [],
  },

  onLoad() {
    const chars = app.globalData.dongbaChars
    this.setData({ learnableChars: chars })
    this._selectChar('DB001')
  },

  onReady() {
    this._initWritingCanvas()
    this._drawDemoCanvas()
  },

  onUnload() {
    this._cleanupCanvas()
  },

  _selectChar(id) {
    const char = app.globalData.dongbaChars.find(function(c) { return c.id === id })
    if (!char) return
    const tips = WRITING_TIPS_MAP[char.category] || WRITING_TIPS_MAP['默认']
    this.setData({
      selectedCharId: id,
      currentChar: char,
      writingTips: tips,
    })
  },

  selectChar(e) {
    const id = e.currentTarget.dataset.id
    this._selectChar(id)
    const that = this
    setTimeout(function() {
      that._drawDemoCanvas()
      that._initWritingCanvas()
    }, 100)
    wx.vibrateShort({ type: 'light' })
  },

  _drawDemoCanvas() {
    const char = this.data.currentChar
    if (!char || !char.name) return
    const ctx = wx.createCanvasContext('demoCanvas')
    const w = 180, h = 180

    ctx.setFillStyle('#F5EBD2')
    ctx.fillRect(0, 0, w, h)
    ctx.setStrokeStyle('#8B6914')
    ctx.setLineWidth(2)
    ctx.strokeRect(5, 5, w - 10, h - 10)
    ctx.setStrokeStyle('rgba(139,105,20,0.3)')
    ctx.setLineWidth(1)
    ctx.strokeRect(12, 12, w - 24, h - 24)

    // 绘制东巴象形符号
    app.drawDongbaSymbol(ctx, char.drawType, w / 2, h / 2 + 5, 70, char.color || '#8B4513')

    ctx.draw()
  },

  _initWritingCanvas() {
    const ctx = wx.createCanvasContext('writingCanvas')
    const w = 680, h = 680

    // 仿古米字格背景
    ctx.setFillStyle('rgba(245,235,210,0.3)')
    ctx.fillRect(0, 0, w, h)
    ctx.setStrokeStyle('rgba(139,105,20,0.15)')
    ctx.setLineWidth(1)

    // 米字格辅助线
    ctx.beginPath()
    ctx.moveTo(w / 2, 0)
    ctx.lineTo(w / 2, h)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()

    // 对角辅助线（虚线感）
    ctx.setStrokeStyle('rgba(139,105,20,0.08)')
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(w, h)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(w, 0)
    ctx.lineTo(0, h)
    ctx.stroke()

    ctx.draw()
    this.ctx = ctx
    this.setData({ strokes: [] })
  },

  _cleanupCanvas() {
    // 清理所有事件监听，防止内存泄漏
    this.ctx = null
    this.currentStroke = null
  },

  touchStart(e) {
    if (!e.touches || !e.touches[0]) return
    const touch = e.touches[0]
    const that = this
    const query = wx.createSelectorQuery()
    query.select('.writing-canvas').boundingClientRect(function(rect) {
      if (!rect) return
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      that.setData({ isDrawing: true, lastX: x, lastY: y })
      that.currentStroke = [{ x: x, y: y }]
    }).exec()
  },

  touchMove(e) {
    if (!this.data.isDrawing) return
    if (!e.touches || !e.touches[0]) return
    const touch = e.touches[0]
    const that = this
    const query = wx.createSelectorQuery()
    query.select('.writing-canvas').boundingClientRect(function(rect) {
      if (!rect) return
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      const ctx = wx.createCanvasContext('writingCanvas')

      // 绘制当前段
      ctx.beginPath()
      ctx.moveTo(that.data.lastX, that.data.lastY)
      ctx.lineTo(x, y)
      ctx.setStrokeStyle('#321A0A')
      ctx.setLineWidth(that.data.brushSize)
      ctx.setLineCap('round')
      ctx.setLineJoin('round')
      ctx.stroke()
      ctx.draw(true) // true = 保留之前内容

      that.setData({ lastX: x, lastY: y })
      if (that.currentStroke) {
        that.currentStroke.push({ x: x, y: y })
      }
    }).exec()
  },

  touchEnd() {
    if (!this.data.isDrawing) return
    this.setData({ isDrawing: false })
    if (this.currentStroke && this.currentStroke.length > 0) {
      const newStrokes = this.data.strokes.concat([this.currentStroke])
      this.setData({ strokes: newStrokes })
      this.currentStroke = []
    }
  },

  undoStroke() {
    if (this.data.strokes.length === 0) return
    const newStrokes = this.data.strokes.slice(0, -1)
    this.setData({ strokes: newStrokes })
    this._redrawAllStrokes(newStrokes)
    wx.vibrateShort({ type: 'light' })
  },

  _redrawAllStrokes(strokes) {
    this._initWritingCanvas()
    if (strokes.length === 0) return
    const ctx = wx.createCanvasContext('writingCanvas')
    for (let i = 0; i < strokes.length; i++) {
      const stroke = strokes[i]
      if (stroke.length < 2) continue
      ctx.beginPath()
      ctx.moveTo(stroke[0].x, stroke[0].y)
      for (let j = 1; j < stroke.length; j++) {
        ctx.lineTo(stroke[j].x, stroke[j].y)
      }
      ctx.setStrokeStyle('#321A0A')
      ctx.setLineWidth(this.data.brushSize)
      ctx.setLineCap('round')
      ctx.setLineJoin('round')
      ctx.stroke()
    }
    ctx.draw(false)
  },

  clearCanvas() {
    this._initWritingCanvas()
    this.setData({ strokes: [] })
    wx.vibrateShort({ type: 'medium' })
  },

  setBrush(e) {
    const size = e.currentTarget.dataset.size
    this.setData({ brushSize: size })
  },

  onNameInput(e) {
    this.setData({ inputName: e.detail.value })
  },

  // 东巴名字生成器：将汉字名字映射到东巴文化含义
  generateDongbaName() {
    const name = this.data.inputName.trim()
    if (!name) {
      wx.showToast({ title: '请先输入名字', icon: 'none' })
      return
    }

    // 建立汉字到东巴文字的映射（基于音义关联）
    const charMapping = {
      '山': { char: '⛰', meaning: '雪山永恒' },
      '水': { char: '≋', meaning: '江河灵动' },
      '火': { char: '🔥', meaning: '热情如焰' },
      '木': { char: '🌿', meaning: '生命盎然' },
      '金': { char: '⭐', meaning: '金星指引' },
      '日': { char: '☀', meaning: '光明如日' },
      '月': { char: '☽', meaning: '月华柔美' },
      '云': { char: '☁', meaning: '自在如云' },
      '风': { char: '🌀', meaning: '随风而行' },
      '龙': { char: '🐉', meaning: '大鹏展翅' },
      '虎': { char: '🐯', meaning: '威猛如虎' },
      '鱼': { char: '🐟', meaning: '双鱼吉祥' },
      '花': { char: '🌸', meaning: '花开富贵' },
      '雪': { char: '❄', meaning: '玉龙雪山' },
    }

    const blessings = [
      { char: '☀', meaning: '光明大道' },
      { char: '⭐', meaning: '星途璀璨' },
      { char: '🌿', meaning: '生生不息' },
      { char: '🦅', meaning: '鹏程万里' },
      { char: '⛰', meaning: '稳如泰山' },
    ]

    const result = []
    for (let i = 0; i < name.length; i++) {
      const ch = name[i]
      if (charMapping[ch]) {
        result.push({ char: charMapping[ch].char, meaning: charMapping[ch].meaning })
      } else {
        const code = ch.charCodeAt(0)
        const blessing = blessings[code % blessings.length]
        result.push({ char: blessing.char, meaning: blessing.meaning })
      }
    }

    this.setData({ generatedName: result })
    wx.vibrateShort({ type: 'light' })
  },
})
