// 首页逻辑
const app = getApp()

Page({
  data: {
    dailyChar: {},
    previewItems: [
      { id: 1, label: '帆布包', img: '/images/mockup_bag.jpg' },
      { id: 2, label: '手机壳', img: '/images/mockup_phone.jpg' },
      { id: 3, label: '笔记本', img: '/images/mockup_notebook.jpg' },
      { id: 4, label: '马克杯', img: '/images/mockup_mug.jpg' },
    ],
    animRunning: false,
  },

  onLoad() {
    this._setDailyChar()
  },

  onReady() {
    this._drawHeroCanvas()
    this._drawDailyCharCanvas()
  },

  // 根据日期选择今日东巴字
  _setDailyChar() {
    const chars = app.globalData.dongbaChars
    const today = new Date()
    const dayIndex = (today.getDate() + today.getMonth()) % chars.length
    this.setData({ dailyChar: chars[dayIndex] })
  },

  // 绘制首页主视觉Canvas
  _drawHeroCanvas() {
    const ctx = wx.createCanvasContext('heroCanvas')
    const w = 300, h = 300
    
    // 背景圆形
    ctx.setFillStyle('rgba(212,160,23,0.08)')
    ctx.beginPath()
    ctx.arc(150, 150, 140, 0, Math.PI * 2)
    ctx.fill()
    
    // 外环
    ctx.setStrokeStyle('#D4A017')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.arc(150, 150, 135, 0, Math.PI * 2)
    ctx.stroke()
    
    // 内环
    ctx.setStrokeStyle('#C0392B')
    ctx.setLineWidth(1)
    ctx.beginPath()
    ctx.arc(150, 150, 100, 0, Math.PI * 2)
    ctx.stroke()
    
    // 中心太阳符号
    ctx.setFillStyle('#D4A017')
    ctx.beginPath()
    ctx.arc(150, 150, 45, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.setFillStyle('#C0392B')
    ctx.beginPath()
    ctx.arc(150, 150, 25, 0, Math.PI * 2)
    ctx.fill()
    
    // 放射线
    ctx.setStrokeStyle('#D4A017')
    ctx.setLineWidth(2)
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4
      const x1 = 150 + Math.cos(angle) * 50
      const y1 = 150 + Math.sin(angle) * 50
      const x2 = 150 + Math.cos(angle) * 88
      const y2 = 150 + Math.sin(angle) * 88
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    
    // 围绕的8个小符号圆（使用东巴象形符号）
    const symbolTypes = ['sun', 'moon', 'water', 'fire', 'mountain', 'tree', 'tiger', 'bird']
    const symbolColors = ['#F4A433', '#C8D8E8', '#4A90D9', '#E8451A', '#6E4C2E', '#2D8A3E', '#FF6B00', '#8B4513']
    symbolTypes.forEach((stype, i) => {
      const angle = (i * Math.PI) / 4 - Math.PI / 8
      const r = 118
      const sx = 150 + Math.cos(angle) * r
      const sy = 150 + Math.sin(angle) * r
      
      ctx.setFillStyle('rgba(192,57,43,0.8)')
      ctx.beginPath()
      ctx.arc(sx, sy, 14, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.setStrokeStyle('#D4A017')
      ctx.setLineWidth(1)
      ctx.beginPath()
      ctx.arc(sx, sy, 14, 0, Math.PI * 2)
      ctx.stroke()
      
      // 绘制小东巴符号
      app.drawDongbaSymbol(ctx, stype, sx, sy + 1, 20, symbolColors[i] || '#F8F4EE')
    })
    
    ctx.draw()
  },

  // 绘制今日文字Canvas
  _drawDailyCharCanvas() {
    const char = this.data.dailyChar
    if (!char.name) return
    
    const ctx = wx.createCanvasContext('dailyCharCanvas')
    const w = 140, h = 140
    
    // 仿古纸背景
    ctx.setFillStyle('#F5EBD2')
    ctx.fillRect(0, 0, w, h)
    
    // 装饰边框
    ctx.setStrokeStyle('#8B6914')
    ctx.setLineWidth(2)
    ctx.strokeRect(4, 4, w-8, h-8)
    ctx.setStrokeStyle('rgba(212,160,23,0.5)')
    ctx.setLineWidth(1)
    ctx.strokeRect(10, 10, w-20, h-20)
    
    // 文字符号
    const colorMap = {
      '天象': '#D4A017',
      '神灵': '#6A0DAD',
      '动物': '#FF6B00',
      '植物': '#2E8B57',
      '自然': '#4A90D9',
      '文化': '#795548',
      '吉祥': '#20B2AA',
      '地理': '#1565C0',
      '生活': '#A0522D',
      '法器': '#FF9800',
      '人类': '#8D6E63',
    }
    const symColor = colorMap[char.category] || '#8B4513'
    
    // 绘制东巴象形符号
    app.drawDongbaSymbol(ctx, char.drawType, w / 2, h / 2 - 8, 55, symColor)
    
    // 文字名称
    ctx.setFillStyle('#321A0A')
    ctx.setFontSize(16)
    ctx.setTextAlign('center')
    ctx.fillText(char.name, w/2, 110)
    
    ctx.draw()
  },

  canvasTouch() {
    // 点击主视觉canvas有涟漪反馈
    wx.vibrateShort({ type: 'light' })
  },

  goToGallery() {
    wx.switchTab({ url: '/pages/gallery/gallery' })
  },
  goToWrite() {
    wx.switchTab({ url: '/pages/write/write' })
  },
  goToFortune() {
    wx.switchTab({ url: '/pages/fortune/fortune' })
  },
  goToStory() {
    wx.switchTab({ url: '/pages/story/story' })
  },
  goToCharDetail() {
    const char = this.data.dailyChar
    wx.navigateTo({ url: `/pages/gallery/gallery?focusId=${char.id}` })
  },
})
