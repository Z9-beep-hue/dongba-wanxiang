// 东巴占卜页逻辑
const app = getApp()

Page({
  data: {
    discSpinning: false,
    discAngle: 0,
    resultShown: false,
    fortuneResult: null,
    activeQuestion: '',
    questionOptions: [
      '学业事业', '感情姻缘', '财运金钱',
      '健康平安', '人际关系', '近期决策',
    ],
  },

  onReady() {
    this._drawFortuneDisc()
  },

  _drawFortuneDisc() {
    const ctx = wx.createCanvasContext('fortuneDisc')
    const w = 280, h = 280
    const cx = w / 2, cy = h / 2
    const r = 120

    const guaData = app.globalData.fortuneGuaData
    const segAngle = (Math.PI * 2) / guaData.length

    // 绘制八个扇区
    const colors = ['#8B0000', '#B8860B', '#2F4F4F', '#4B0082', '#1C3A5C', '#3B6E4C', '#6B3A2A', '#4A2060']
    guaData.forEach(function(gua, i) {
      const startAngle = i * segAngle - Math.PI / 2
      const endAngle = startAngle + segAngle

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, startAngle, endAngle)
      ctx.closePath()
      ctx.setFillStyle(colors[i % colors.length])
      ctx.fill()
      ctx.setStrokeStyle('#D4A017')
      ctx.setLineWidth(1)
      ctx.stroke()

      // 文字
      const midAngle = startAngle + segAngle / 2
      const textR = r * 0.65
      const tx = cx + Math.cos(midAngle) * textR
      const ty = cy + Math.sin(midAngle) * textR

      ctx.setFillStyle('#F8F4EE')
      ctx.setFontSize(13)
      ctx.setTextAlign('center')
      ctx.fillText(gua.symbol || gua.name.charAt(0), tx, ty + 3)
      ctx.setFontSize(10)
      ctx.fillText(gua.name.replace('卦', ''), tx, ty + 16)
    })

    // 外环
    ctx.setStrokeStyle('#D4A017')
    ctx.setLineWidth(4)
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()

    // 内环
    ctx.setStrokeStyle('rgba(212,160,23,0.4)')
    ctx.setLineWidth(1)
    ctx.beginPath()
    ctx.arc(cx, cy, 30, 0, Math.PI * 2)
    ctx.stroke()

    // 中心圆
    ctx.setFillStyle('#1C140F')
    ctx.beginPath()
    ctx.arc(cx, cy, 28, 0, Math.PI * 2)
    ctx.fill()

    ctx.draw()
  },

  selectQuestion(e) {
    this.setData({ activeQuestion: e.currentTarget.dataset.q })
    wx.vibrateShort({ type: 'light' })
  },

  startFortune() {
    if (!this.data.activeQuestion || this.data.discSpinning) return
    wx.vibrateShort({ type: 'medium' })
    this.setData({ discSpinning: true })

    // 模拟卦盘旋转
    let spinCount = 0
    const totalSpins = 20 + Math.floor(Math.random() * 15)
    const targetGua = Math.floor(Math.random() * app.globalData.fortuneGuaData.length)

    const that = this
    const spinInterval = setInterval(function() {
      spinCount++
      const speed = spinCount < totalSpins * 0.6 ? 18 : Math.max(3, 18 - (spinCount - totalSpins * 0.6) * 1.5)
      that.setData({ discAngle: that.data.discAngle + speed })

      if (spinCount >= totalSpins) {
        clearInterval(spinInterval)
        that._showResult(targetGua)
      }
    }, 50)
  },

  _showResult(guaIndex) {
    const guaData = app.globalData.fortuneGuaData
    const gua = guaData[guaIndex]

    // 生成宜忌
    const yiOptions = ['学习进修', '结交益友', '出行远游', '创新突破', '静心冥思', '运动健身', '阅读思考', '联系家人']
    const jiOptions = ['鲁莽决策', '争执口舌', '大额投资', '轻信他人', '熬夜劳累', '拖延懈怠', '冲动消费', '孤注一掷']

    const shuffleAndPick = function(arr, n) {
      const shuffled = arr.slice().sort(function() { return Math.random() - 0.5 })
      return shuffled.slice(0, n)
    }

    const result = {
      name: gua.name,
      symbol: gua.symbol,
      meaning: gua.meaning,
      advice: gua.advice,
      yi: shuffleAndPick(yiOptions, 3),
      ji: shuffleAndPick(jiOptions, 2),
    }

    this.setData({
      discSpinning: false,
      resultShown: true,
      fortuneResult: result,
    })
    wx.vibrateShort({ type: 'heavy' })
  },

  resetFortune() {
    this.setData({
      resultShown: false,
      fortuneResult: null,
      activeQuestion: '',
      discAngle: 0,
    })
    const that = this
    setTimeout(function() { that._drawFortuneDisc() }, 200)
  },

  onShareAppMessage() {
    const result = this.data.fortuneResult
    if (!result) return { title: '东巴·万象 - 东巴占卜', path: '/pages/fortune/fortune' }
    return {
      title: '东巴占卜结果「' + result.name + '」- ' + result.meaning,
      path: '/pages/fortune/fortune',
    }
  },
})
