// 神路图故事页
Page({
  data: {
    activeRealm: 'human',
    showFigureDetail: false,
    selectedFigure: {},
    realms: {
      ghost: {
        name: '鬼界',
        nameCN: 'The Underworld',
        icon: '💀',
        headerColor: '#2D0A0A',
        description: '鬼界是东巴宇宙观中最底层的世界，位于大地之下的黑暗空间。《神路图》以此为起点，记录了亡灵从黑暗的鬼界出发，经过重重考验，最终升入天界的漫长旅程。鬼界中居住着各类鬼神，也是被诅咒者和横死者的归宿。',
        figures: [
          { name: '鬼王撒达', role: '冥界主宰', icon: '👑', color: '#8B0000', desc: '掌管鬼界秩序的最高统治者，形象凶猛威严。东巴经中记载，东巴法师需在超度仪式中向其祭祀，以换取亡灵的安全通行。' },
          { name: '引路鬼差', role: '冥界向导', icon: '🕯', color: '#4A0000', desc: '专门引导新亡灵进入鬼界的使者。东巴《神路图》中，引路鬼差手持灯盏，面目狰狞却职责神圣。' },
          { name: '厉鬼群像', role: '横死亡魂', icon: '👻', color: '#2D2D2D', desc: '横死、冤死的亡魂，在《神路图》中以哀怨的形态出现。东巴超度仪式的重要目的之一，就是为这些亡魂提供安慰与超度。' },
        ]
      },
      human: {
        name: '人间',
        nameCN: 'The Human World',
        icon: '🌍',
        headerColor: '#1A3A1A',
        description: '人间是东巴宇宙观的中心，是人类、动植物和自然万物共存的世界。纳西族"万物有灵"的信仰认为，山川河流、花草树木皆有灵魂，人类与自然之间存在着平等而神圣的契约关系。',
        figures: [
          { name: '丁巴什罗', role: '东巴文化创立者/人间神圣', icon: '📖', color: '#2E8B57', desc: '纳西族传说中东巴文化的创立者，被尊为"什罗法王"。他在人间传授东巴文字、建立祭祀体系，是人间与神界的重要中介。' },
          { name: '阿普三朵', role: '纳西族保护神', icon: '⛰', color: '#4A7C59', desc: '又称"玉龙第三朵"，是玉龙雪山的化身，也是纳西族最重要的保护神。每年农历二月八日是三朵节，纳西族人前往神祠祭拜。' },
          { name: '东巴法师', role: '人神沟通者', icon: '🧙', color: '#8B6914', desc: '东巴（Dongba）是纳西族的祭司兼知识分子，掌握东巴文字，主持各类祭祀仪式。东巴既是文化传承者，也是沟通人界与神界的中介。' },
        ]
      },
      heaven: {
        name: '天界',
        nameCN: 'The Celestial Realm',
        icon: '⛅',
        headerColor: '#0A1A3A',
        description: '天界是东巴宇宙的最高境界，居住着最高天神和升天的祖先英灵。天界位于玉龙雪山之上的云端，是光明、智慧和永恒的象征。《神路图》的最终目的地正是天界，亡灵经过超度得以永居此处。',
        figures: [
          { name: '天神美利东主', role: '天界最高神', icon: '☀', color: '#D4A017', desc: '纳西族最高天神，居于天界最高处，象征光明与正义。每年祭天仪式（"汝卡"）中，纳西族人向其献上白牦牛，祈求护佑族人平安丰收。' },
          { name: '大鹏神鸟都盘修曲', role: '天界护法神', icon: '🦅', color: '#B8860B', desc: '大鹏神鸟（纳西语称"都盘修曲"，意为白海螺色的大鹏）是东巴什罗的三大护法神之一，象征正义与力量，守护天界安宁。' },
          { name: '祖先英灵', role: '得道升天者', icon: '⭐', color: '#C0C0C0', desc: '经由东巴超度仪式升入天界的纳西族祖先。他们在天界永生，并持续保护子孙后代。每年祭天时，纳西人会呼唤祖先的英灵前来享用祭品。' },
        ]
      }
    },
    currentRealm: {},
  },

  onLoad() {
    this._switchToRealm('human')
  },

  onReady() {
    this._drawScrollCanvas()
  },

  _switchToRealm(realm) {
    this.setData({
      activeRealm: realm,
      currentRealm: this.data.realms[realm],
    })
  },

  switchRealm(e) {
    const rlm = e.currentTarget.dataset.realm
    this._switchToRealm(rlm)
    wx.vibrateShort({ type: 'light' })
  },

  onFigureTap(e) {
    const idx = e.currentTarget.dataset.idx
    const figure = this.data.currentRealm.figures[idx]
    this.setData({ showFigureDetail: true, selectedFigure: figure })
  },

  closeFigureDetail() {
    this.setData({ showFigureDetail: false })
  },

  noop() {},

  _drawScrollCanvas() {
    const ctx = wx.createCanvasContext('scrollCanvas')
    const w = 660, h = 200
    
    // 仿古纸背景
    ctx.setFillStyle('#F0E8D4')
    ctx.fillRect(0, 0, w, h)
    
    // 绘制三界分区
    const sections = [
      { x: 0, w: w/3, label: '鬼界 • 冥府', color: '#8B0000', bgAlpha: 0.15 },
      { x: w/3, w: w/3, label: '人间 • 世界', color: '#2D6A2D', bgAlpha: 0.15 },
      { x: w*2/3, w: w/3, label: '天界 • 神域', color: '#003A7A', bgAlpha: 0.15 },
    ]
    
    sections.forEach(sec => {
      ctx.setFillStyle(sec.color)
      ctx.globalAlpha = sec.bgAlpha
      ctx.fillRect(sec.x, 0, sec.w, h)
      ctx.globalAlpha = 1
      
      // 分隔线
      if (sec.x > 0) {
        ctx.setStrokeStyle('rgba(139,105,20,0.5)')
        ctx.setLineWidth(1)
        ctx.beginPath()
        ctx.moveTo(sec.x, 10)
        ctx.lineTo(sec.x, h-10)
        ctx.stroke()
      }
      
      // 标签
      ctx.setFillStyle(sec.color)
      ctx.setFontSize(14)
      ctx.setTextAlign('center')
      ctx.fillText(sec.label, sec.x + sec.w/2, h - 15)
    })
    
    // 人物图标（模拟360+人物）
    const iconPositions = [
      [60, 80], [130, 60], [190, 100], [260, 75], [210, 50],
      [380, 70], [440, 95], [490, 55], [550, 80], [430, 50],
      [670, 65], [740, 90], [790, 55], [840, 75], [720, 45],
    ]
    iconPositions.forEach(([x, y]) => {
      ctx.setFillStyle('#8B6914')
      ctx.setFontSize(18)
      ctx.setTextAlign('center')
      ctx.fillText('人', x, y)
    })
    
    // 边框
    ctx.setStrokeStyle('#8B6914')
    ctx.setLineWidth(2)
    ctx.strokeRect(2, 2, w-4, h-4)
    
    ctx.draw()
  },
})
