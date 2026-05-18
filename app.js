// app.js - 东巴·万象 小程序主入口
App({
  globalData: {
    userInfo: null,
    theme: 'dark', // dark | paper
    version: '1.0.0',
    projectName: '东巴·万象',
    projectEN: 'Dongba Wanxiang',
    // 东巴文字数据（简版，完整版从云端加载）
    dongbaChars: [
      { id: 'DB001', name: '日', name_en: 'Sun', meaning: '太阳、光明、生命之源', category: '天象', color: '#F4A433' },
      { id: 'DB002', name: '月', name_en: 'Moon', meaning: '月亮、夜晚、阴柔之美', category: '天象', color: '#C8D8E8' },
      { id: 'DB003', name: '水', name_en: 'Water', meaning: '水、河流、生命', category: '自然', color: '#4A90D9' },
      { id: 'DB004', name: '火', name_en: 'Fire', meaning: '火焰、热情、祭祀之火', category: '自然', color: '#E8451A' },
      { id: 'DB005', name: '大鹏鸟', name_en: 'Garuda', meaning: '神鸟、力量、天空之主', category: '神灵', color: '#8B4513' },
      { id: 'DB006', name: '虎', name_en: 'Tiger', meaning: '力量、勇气、山林之王', category: '动物', color: '#FF6B00' },
      { id: 'DB007', name: '双鱼', name_en: 'Double Fish', meaning: '吉祥、丰收、阴阳和谐', category: '吉祥', color: '#20B2AA' },
      { id: 'DB008', name: '云杉', name_en: 'Spruce', meaning: '圣树、祭天、玉龙雪山', category: '植物', color: '#2D8A3E' },
      { id: 'DB009', name: '雪山', name_en: 'Snow Mountain', meaning: '玉龙雪山、神圣、永恒', category: '地理', color: '#E0F0FF' },
      { id: 'DB010', name: '神之眼', name_en: 'Eye of God', meaning: '洞察、智慧、神明的注视', category: '神灵', color: '#6A0DAD' },
      { id: 'DB011', name: '青蛙', name_en: 'Frog', meaning: '雨水、繁殖、大地之声', category: '动物', color: '#4CAF50' },
      { id: 'DB012', name: '飞螺', name_en: 'Flying Conch', meaning: '宇宙、轮回、法音传播', category: '法器', color: '#FF9800' },
      { id: 'DB013', name: '白牦牛', name_en: 'White Yak', meaning: '神圣献祭、天神坐骑', category: '动物', color: '#F5F5F5' },
      { id: 'DB014', name: '云', name_en: 'Cloud', meaning: '天界、过渡、神灵居所', category: '天象', color: '#B0C4DE' },
      { id: 'DB015', name: '星辰', name_en: 'Stars', meaning: '方向、命运、天文历法', category: '天象', color: '#FFD700' },
      { id: 'DB016', name: '人', name_en: 'Human', meaning: '人类、祖先、生命体', category: '人类', color: '#8D6E63' },
      { id: 'DB017', name: '家', name_en: 'Home', meaning: '家园、庇护、定居生活', category: '生活', color: '#A0522D' },
      { id: 'DB018', name: '草', name_en: 'Grass', meaning: '生长、春天、万物复苏', category: '植物', color: '#66BB6A' },
      { id: 'DB019', name: '江', name_en: 'River', meaning: '母亲河、流动、生命之源', category: '地理', color: '#1565C0' },
      { id: 'DB020', name: '东巴经', name_en: 'Scripture', meaning: '智慧、传承、宇宙法则', category: '文化', color: '#795548' },
    ],
    // 占卜用卦象数据
    fortuneGuaData: [
      { name: '日卦', symbol: '☀', meaning: '光明大道，诸事顺遂', advice: '此时行事，光明在前，一步一个脚印方可成大事' },
      { name: '月卦', symbol: '☽', meaning: '潜行蓄力，韬光养晦', advice: '暂时收敛锋芒，内修其德，时机自来' },
      { name: '水卦', symbol: '≋', meaning: '随机应变，灵活处世', advice: '如水般顺势而为，不硬碰强，以柔克刚' },
      { name: '火卦', symbol: '🔥', meaning: '热情充沛，行动当下', advice: '内心充盈动力，此时正是出发的最好时机' },
      { name: '山卦', symbol: '⛰', meaning: '稳如磐石，沉着应对', advice: '遇事不慌，如雪山般屹立，方能化险为夷' },
      { name: '木卦', symbol: '🌿', meaning: '生机盎然，向阳而生', advice: '保持生长的姿态，向着光的方向前进' },
      { name: '虎卦', symbol: '🐯', meaning: '威猛无畏，勇往直前', advice: '此时宜主动出击，虎步向前，机会属于勇者' },
      { name: '鸟卦', symbol: '🦅', meaning: '高瞻远瞩，展翅高飞', advice: '放眼长远，不囿于眼前小利，鸿鹄之志自成' },
    ]
  },

  onLaunch() {
    console.log('东巴·万象 启动')
    // 可在此处初始化云开发等
  },

  // 工具方法：根据分类筛选文字
  getCharsByCategory(category) {
    if (category === '全部') return this.globalData.dongbaChars
    return this.globalData.dongbaChars.filter(c => c.category === category)
  },

  // 获取所有分类
  getAllCategories() {
    const cats = [...new Set(this.globalData.dongbaChars.map(c => c.category))]
    return ['全部', ...cats]
  }
})
