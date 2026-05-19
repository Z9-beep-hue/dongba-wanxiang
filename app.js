// app.js - 东巴·万象 小程序主入口
App({
  globalData: {
    userInfo: null,
    theme: 'dark', // dark | paper
    version: '1.1.0',
    projectName: '东巴·万象',
    projectEN: 'Dongba Wanxiang',
    // 东巴文字数据（扩展版，含象形绘制类型）
    dongbaChars: [
      // ===== 天象 =====
      { id: 'DB001', name: '日', name_en: 'Sun', meaning: '太阳、光明、生命之源', category: '天象', color: '#F4A433', drawType: 'sun' },
      { id: 'DB002', name: '月', name_en: 'Moon', meaning: '月亮、夜晚、阴柔之美', category: '天象', color: '#C8D8E8', drawType: 'moon' },
      { id: 'DB003', name: '星辰', name_en: 'Stars', meaning: '方向、命运、天文历法', category: '天象', color: '#FFD700', drawType: 'star' },
      { id: 'DB004', name: '云', name_en: 'Cloud', meaning: '天界、过渡、神灵居所', category: '天象', color: '#B0C4DE', drawType: 'cloud' },
      { id: 'DB005', name: '雷', name_en: 'Thunder', meaning: '天威、震慑、净化之力', category: '天象', color: '#9B59B6', drawType: 'thunder' },
      { id: 'DB006', name: '雨', name_en: 'Rain', meaning: '润泽、丰收、生命甘霖', category: '天象', color: '#5DADE2', drawType: 'rain' },
      { id: 'DB007', name: '风', name_en: 'Wind', meaning: '自由、变化、无形之力', category: '天象', color: '#A9DFBF', drawType: 'wind' },
      // ===== 自然 =====
      { id: 'DB008', name: '水', name_en: 'Water', meaning: '水、河流、生命', category: '自然', color: '#4A90D9', drawType: 'water' },
      { id: 'DB009', name: '火', name_en: 'Fire', meaning: '火焰、热情、祭祀之火', category: '自然', color: '#E8451A', drawType: 'fire' },
      { id: 'DB010', name: '山', name_en: 'Mountain', meaning: '稳固、崇高、大地脊梁', category: '自然', color: '#6E4C2E', drawType: 'mountain' },
      { id: 'DB011', name: '石', name_en: 'Stone', meaning: '坚韧、永恒、大地之骨', category: '自然', color: '#7F8C8D', drawType: 'stone' },
      { id: 'DB012', name: '土', name_en: 'Earth', meaning: '大地、孕育、万物之母', category: '自然', color: '#A0522D', drawType: 'earth' },
      // ===== 地理 =====
      { id: 'DB013', name: '雪山', name_en: 'Snow Mountain', meaning: '玉龙雪山、神圣、永恒', category: '地理', color: '#E0F0FF', drawType: 'snow_mountain' },
      { id: 'DB014', name: '江', name_en: 'River', meaning: '母亲河、流动、生命之源', category: '地理', color: '#1565C0', drawType: 'river' },
      { id: 'DB015', name: '湖', name_en: 'Lake', meaning: '宁静、映照、心灵之镜', category: '地理', color: '#1ABC9C', drawType: 'lake' },
      // ===== 植物 =====
      { id: 'DB016', name: '云杉', name_en: 'Spruce', meaning: '圣树、祭天、玉龙雪山', category: '植物', color: '#2D8A3E', drawType: 'tree' },
      { id: 'DB017', name: '草', name_en: 'Grass', meaning: '生长、春天、万物复苏', category: '植物', color: '#66BB6A', drawType: 'grass' },
      { id: 'DB018', name: '花', name_en: 'Flower', meaning: '美丽、绽放、生命绚烂', category: '植物', color: '#E91E63', drawType: 'flower' },
      { id: 'DB019', name: '竹', name_en: 'Bamboo', meaning: '气节、坚韧、虚心向上', category: '植物', color: '#27AE60', drawType: 'bamboo' },
      // ===== 动物 =====
      { id: 'DB020', name: '虎', name_en: 'Tiger', meaning: '力量、勇气、山林之王', category: '动物', color: '#FF6B00', drawType: 'tiger' },
      { id: 'DB021', name: '大鹏鸟', name_en: 'Garuda', meaning: '神鸟、力量、天空之主', category: '动物', color: '#8B4513', drawType: 'bird' },
      { id: 'DB022', name: '青蛙', name_en: 'Frog', meaning: '雨水、繁殖、大地之声', category: '动物', color: '#4CAF50', drawType: 'frog' },
      { id: 'DB023', name: '白牦牛', name_en: 'White Yak', meaning: '神圣献祭、天神坐骑', category: '动物', color: '#F5F5F5', drawType: 'yak' },
      { id: 'DB024', name: '马', name_en: 'Horse', meaning: '奔驰、远行、忠诚伙伴', category: '动物', color: '#D2691E', drawType: 'horse' },
      { id: 'DB025', name: '羊', name_en: 'Sheep', meaning: '温顺、富足、六畜兴旺', category: '动物', color: '#F0E68C', drawType: 'sheep' },
      { id: 'DB026', name: '蛇', name_en: 'Snake', meaning: '灵动、蜕变、地下之灵', category: '动物', color: '#2ECC71', drawType: 'snake' },
      { id: 'DB027', name: '龙', name_en: 'Dragon', meaning: '神圣、威严、呼风唤雨', category: '动物', color: '#C0392B', drawType: 'dragon' },
      // ===== 人类 =====
      { id: 'DB028', name: '人', name_en: 'Human', meaning: '人类、祖先、生命体', category: '人类', color: '#8D6E63', drawType: 'human' },
      { id: 'DB029', name: '男', name_en: 'Man', meaning: '阳性、力量、责任担当', category: '人类', color: '#3498DB', drawType: 'man' },
      { id: 'DB030', name: '女', name_en: 'Woman', meaning: '阴性、孕育、生命之源', category: '人类', color: '#E91E63', drawType: 'woman' },
      { id: 'DB031', name: '子', name_en: 'Child', meaning: '新生、希望、未来之光', category: '人类', color: '#FFCC80', drawType: 'child' },
      // ===== 生活 =====
      { id: 'DB032', name: '家', name_en: 'Home', meaning: '家园、庇护、定居生活', category: '生活', color: '#A0522D', drawType: 'home' },
      { id: 'DB033', name: '衣', name_en: 'Clothing', meaning: '温暖、体面、文化之美', category: '生活', color: '#D81B60', drawType: 'clothing' },
      { id: 'DB034', name: '食', name_en: 'Food', meaning: '滋养、丰收、人间烟火', category: '生活', color: '#FF9800', drawType: 'food' },
      { id: 'DB035', name: '弓', name_en: 'Bow', meaning: '狩猎、勇武、纳西武士', category: '生活', color: '#795548', drawType: 'bow' },
      // ===== 法器 =====
      { id: 'DB036', name: '飞螺', name_en: 'Flying Conch', meaning: '宇宙、轮回、法音传播', category: '法器', color: '#FF9800', drawType: 'conch' },
      { id: 'DB037', name: '法鼓', name_en: 'Ritual Drum', meaning: ' rhythm、祭祀、通神之音', category: '法器', color: '#8D6E63', drawType: 'drum' },
      // ===== 吉祥 =====
      { id: 'DB038', name: '双鱼', name_en: 'Double Fish', meaning: '吉祥、丰收、阴阳和谐', category: '吉祥', color: '#20B2AA', drawType: 'fish' },
      { id: 'DB039', name: '福', name_en: 'Blessing', meaning: '幸福、好运、神灵赐福', category: '吉祥', color: '#E74C3C', drawType: 'blessing' },
      // ===== 神灵 =====
      { id: 'DB040', name: '神之眼', name_en: 'Eye of God', meaning: '洞察、智慧、神明的注视', category: '神灵', color: '#6A0DAD', drawType: 'eye' },
      { id: 'DB041', name: '神', name_en: 'God', meaning: '至高、创造、万物主宰', category: '神灵', color: '#D4A017', drawType: 'god' },
      { id: 'DB042', name: '鬼', name_en: 'Ghost', meaning: '亡灵、冥界、生死轮回', category: '神灵', color: '#34495E', drawType: 'ghost' },
      // ===== 文化 =====
      { id: 'DB043', name: '东巴经', name_en: 'Scripture', meaning: '智慧、传承、宇宙法则', category: '文化', color: '#795548', drawType: 'scripture' },
      { id: 'DB044', name: '舞', name_en: 'Dance', meaning: '仪式、欢乐、人神共庆', category: '文化', color: '#E67E22', drawType: 'dance' },
      { id: 'DB045', name: '乐', name_en: 'Music', meaning: '和声、祭祀、天籁之音', category: '文化', color: '#9B59B6', drawType: 'music' },
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
    console.log('东巴·万象 启动 v' + this.globalData.version)
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
  },

  // ==================== 东巴象形符号绘制引擎 ====================
  // 所有页面统一调用此函数绘制东巴象形符号
  drawDongbaSymbol(ctx, drawType, cx, cy, size, color) {
    const s = size || 40
    const c = color || '#8B4513'
    ctx.setStrokeStyle(c)
    ctx.setFillStyle(c)
    ctx.setLineWidth(Math.max(1.5, s / 25))
    ctx.setLineCap('round')
    ctx.setLineJoin('round')

    const R = s / 2

    switch (drawType) {
      // ===== 天象 =====
      case 'sun': {
        // 太阳：中心圆 + 8条光芒
        ctx.beginPath()
        ctx.arc(cx, cy, R * 0.35, 0, Math.PI * 2)
        ctx.fill()
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4
          ctx.beginPath()
          ctx.moveTo(cx + Math.cos(a) * R * 0.45, cy + Math.sin(a) * R * 0.45)
          ctx.lineTo(cx + Math.cos(a) * R * 0.75, cy + Math.sin(a) * R * 0.75)
          ctx.stroke()
        }
        break
      }
      case 'moon': {
        // 月亮：月牙
        ctx.beginPath()
        ctx.arc(cx - R * 0.15, cy, R * 0.5, -Math.PI * 0.7, Math.PI * 0.7)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(cx + R * 0.05, cy, R * 0.4, Math.PI * 0.6, -Math.PI * 0.6, true)
        ctx.stroke()
        break
      }
      case 'star': {
        // 星辰：五角星 + 小点
        const drawStar = (sx, sy, r) => {
          ctx.beginPath()
          for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5 - Math.PI / 2
            const radius = i % 2 === 0 ? r : r * 0.4
            const px = sx + Math.cos(angle) * radius
            const py = sy + Math.sin(angle) * radius
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
        }
        drawStar(cx, cy, R * 0.5)
        // 周围小星点
        ctx.setFillStyle(c)
        ctx.beginPath(); ctx.arc(cx - R * 0.6, cy - R * 0.5, 1.5, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(cx + R * 0.6, cy + R * 0.4, 1.5, 0, Math.PI * 2); ctx.fill()
        break
      }
      case 'cloud': {
        // 云：几个圆组合
        ctx.beginPath()
        ctx.arc(cx - R * 0.3, cy, R * 0.35, 0, Math.PI * 2)
        ctx.arc(cx + R * 0.1, cy - R * 0.15, R * 0.4, 0, Math.PI * 2)
        ctx.arc(cx + R * 0.35, cy + R * 0.05, R * 0.3, 0, Math.PI * 2)
        ctx.fill()
        break
      }
      case 'thunder': {
        // 雷：闪电折线
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.2, cy - R * 0.7)
        ctx.lineTo(cx + R * 0.15, cy - R * 0.1)
        ctx.lineTo(cx - R * 0.05, cy - R * 0.1)
        ctx.lineTo(cx + R * 0.25, cy + R * 0.7)
        ctx.stroke()
        // 小云
        ctx.beginPath()
        ctx.arc(cx - R * 0.4, cy - R * 0.6, R * 0.2, 0, Math.PI * 2)
        ctx.arc(cx + R * 0.1, cy - R * 0.65, R * 0.25, 0, Math.PI * 2)
        ctx.stroke()
        break
      }
      case 'rain': {
        // 雨：云 + 雨滴
        ctx.beginPath()
        ctx.arc(cx - R * 0.2, cy - R * 0.4, R * 0.25, 0, Math.PI * 2)
        ctx.arc(cx + R * 0.1, cy - R * 0.5, R * 0.3, 0, Math.PI * 2)
        ctx.stroke()
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath()
          ctx.moveTo(cx + i * R * 0.2, cy - R * 0.1)
          ctx.lineTo(cx + i * R * 0.15, cy + R * 0.5)
          ctx.stroke()
        }
        break
      }
      case 'wind': {
        // 风：流线
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath()
          const y = cy + i * R * 0.3
          ctx.moveTo(cx - R * 0.5, y)
          ctx.quadraticCurveTo(cx, y - R * 0.2, cx + R * 0.3, y)
          ctx.quadraticCurveTo(cx + R * 0.5, y + R * 0.1, cx + R * 0.7, y - R * 0.05)
          ctx.stroke()
        }
        break
      }

      // ===== 自然 =====
      case 'water': {
        // 水：波浪
        ctx.beginPath()
        for (let i = 0; i < 3; i++) {
          const wy = cy - R * 0.2 + i * R * 0.25
          ctx.moveTo(cx - R * 0.6, wy)
          for (let x = -R * 0.6; x <= R * 0.6; x += R * 0.2) {
            ctx.quadraticCurveTo(cx + x + R * 0.1, wy - R * 0.12, cx + x + R * 0.2, wy)
          }
        }
        ctx.stroke()
        break
      }
      case 'fire': {
        // 火：火焰
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.2, cy + R * 0.4)
        ctx.quadraticCurveTo(cx - R * 0.3, cy, cx - R * 0.05, cy - R * 0.5)
        ctx.quadraticCurveTo(cx + R * 0.1, cy - R * 0.7, cx + R * 0.15, cy - R * 0.4)
        ctx.quadraticCurveTo(cx + R * 0.35, cy - R * 0.1, cx + R * 0.2, cy + R * 0.4)
        ctx.closePath()
        ctx.stroke()
        // 内焰
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.05, cy + R * 0.3)
        ctx.quadraticCurveTo(cx - R * 0.1, cy - R * 0.1, cx, cy - R * 0.35)
        ctx.quadraticCurveTo(cx + R * 0.1, cy - R * 0.1, cx + R * 0.05, cy + R * 0.3)
        ctx.closePath()
        ctx.stroke()
        break
      }
      case 'mountain': {
        // 山：三角峰
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.7, cy + R * 0.4)
        ctx.lineTo(cx - R * 0.25, cy - R * 0.4)
        ctx.lineTo(cx, cy + R * 0.1)
        ctx.lineTo(cx + R * 0.3, cy - R * 0.5)
        ctx.lineTo(cx + R * 0.7, cy + R * 0.4)
        ctx.stroke()
        break
      }
      case 'stone': {
        // 石：不规则圆石
        ctx.beginPath()
        ctx.ellipse(cx, cy, R * 0.5, R * 0.35, 0.2, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.1, cy - R * 0.1)
        ctx.lineTo(cx + R * 0.15, cy + R * 0.05)
        ctx.stroke()
        break
      }
      case 'earth': {
        // 土：地平线上冒芽
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.6, cy + R * 0.2)
        ctx.lineTo(cx + R * 0.6, cy + R * 0.2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.2)
        ctx.quadraticCurveTo(cx - R * 0.1, cy - R * 0.1, cx, cy - R * 0.4)
        ctx.quadraticCurveTo(cx + R * 0.1, cy - R * 0.1, cx, cy + R * 0.2)
        ctx.stroke()
        break
      }

      // ===== 地理 =====
      case 'snow_mountain': {
        // 雪山：三角+雪顶
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.6, cy + R * 0.4)
        ctx.lineTo(cx, cy - R * 0.5)
        ctx.lineTo(cx + R * 0.6, cy + R * 0.4)
        ctx.closePath()
        ctx.stroke()
        // 雪顶
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.2, cy - R * 0.15)
        ctx.lineTo(cx, cy - R * 0.5)
        ctx.lineTo(cx + R * 0.2, cy - R * 0.15)
        ctx.closePath()
        ctx.setFillStyle('#FFFFFF')
        ctx.fill()
        ctx.setFillStyle(c)
        break
      }
      case 'river': {
        // 江：蜿蜒河流
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.5, cy - R * 0.3)
        ctx.quadraticCurveTo(cx - R * 0.1, cy - R * 0.5, cx + R * 0.1, cy)
        ctx.quadraticCurveTo(cx + R * 0.3, cy + R * 0.5, cx + R * 0.6, cy + R * 0.2)
        ctx.stroke()
        // 波纹
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.2, cy + R * 0.1)
        ctx.quadraticCurveTo(cx, cy + R * 0.25, cx + R * 0.2, cy + R * 0.1)
        ctx.stroke()
        break
      }
      case 'lake': {
        // 湖：椭圆+波纹
        ctx.beginPath()
        ctx.ellipse(cx, cy + R * 0.15, R * 0.5, R * 0.25, 0, 0, Math.PI * 2)
        ctx.stroke()
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(cx - R * 0.3 + i * R * 0.05, cy - R * 0.15 + i * R * 0.15)
          ctx.quadraticCurveTo(cx, cy - R * 0.25 + i * R * 0.15, cx + R * 0.3 - i * R * 0.05, cy - R * 0.15 + i * R * 0.15)
          ctx.stroke()
        }
        break
      }

      // ===== 植物 =====
      case 'tree': {
        // 树：树干 + 三角形树冠
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.08, cy + R * 0.4)
        ctx.lineTo(cx - R * 0.05, cy - R * 0.1)
        ctx.lineTo(cx + R * 0.05, cy - R * 0.1)
        ctx.lineTo(cx + R * 0.08, cy + R * 0.4)
        ctx.closePath()
        ctx.fill()
        // 树冠三层
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(cx - R * (0.45 - i * 0.08), cy - R * 0.1 + i * R * 0.15)
          ctx.lineTo(cx, cy - R * 0.55 + i * R * 0.12)
          ctx.lineTo(cx + R * (0.45 - i * 0.08), cy - R * 0.1 + i * R * 0.15)
          ctx.closePath()
          ctx.stroke()
        }
        break
      }
      case 'grass': {
        // 草：三片草叶
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath()
          ctx.moveTo(cx + i * R * 0.2, cy + R * 0.35)
          ctx.quadraticCurveTo(cx + i * R * 0.25, cy, cx + i * R * 0.15, cy - R * 0.4)
          ctx.stroke()
        }
        break
      }
      case 'flower': {
        // 花：中心圆 + 5花瓣
        const petal = (angle) => {
          const px = cx + Math.cos(angle) * R * 0.35
          const py = cy + Math.sin(angle) * R * 0.35
          ctx.beginPath()
          ctx.ellipse(px, py, R * 0.18, R * 0.1, angle, 0, Math.PI * 2)
          ctx.fill()
        }
        for (let i = 0; i < 5; i++) petal((i * Math.PI * 2) / 5 - Math.PI / 2)
        ctx.beginPath()
        ctx.arc(cx, cy, R * 0.12, 0, Math.PI * 2)
        ctx.setFillStyle('#F4D03F')
        ctx.fill()
        ctx.setFillStyle(c)
        break
      }
      case 'bamboo': {
        // 竹：节段
        for (let i = 0; i < 3; i++) {
          const by = cy - R * 0.3 + i * R * 0.3
          ctx.beginPath()
          ctx.moveTo(cx - R * 0.1, by)
          ctx.lineTo(cx - R * 0.08, by + R * 0.25)
          ctx.lineTo(cx + R * 0.08, by + R * 0.25)
          ctx.lineTo(cx + R * 0.1, by)
          ctx.closePath()
          ctx.stroke()
          // 节
          ctx.beginPath()
          ctx.moveTo(cx - R * 0.12, by + R * 0.25)
          ctx.lineTo(cx + R * 0.12, by + R * 0.25)
          ctx.stroke()
        }
        // 竹叶
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.1, cy - R * 0.1)
        ctx.quadraticCurveTo(cx + R * 0.4, cy - R * 0.2, cx + R * 0.5, cy - R * 0.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.1, cy)
        ctx.quadraticCurveTo(cx - R * 0.35, cy - R * 0.1, cx - R * 0.45, cy - R * 0.4)
        ctx.stroke()
        break
      }

      // ===== 动物 =====
      case 'tiger': {
        // 虎：虎头轮廓 + 王字
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.35, cy + R * 0.15)
        ctx.quadraticCurveTo(cx - R * 0.45, cy - R * 0.15, cx - R * 0.2, cy - R * 0.35)
        ctx.lineTo(cx - R * 0.1, cy - R * 0.45)
        ctx.lineTo(cx + R * 0.1, cy - R * 0.45)
        ctx.lineTo(cx + R * 0.2, cy - R * 0.35)
        ctx.quadraticCurveTo(cx + R * 0.45, cy - R * 0.15, cx + R * 0.35, cy + R * 0.15)
        ctx.quadraticCurveTo(cx, cy + R * 0.45, cx - R * 0.35, cy + R * 0.15)
        ctx.closePath()
        ctx.stroke()
        // 王
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.15, cy - R * 0.1)
        ctx.lineTo(cx + R * 0.15, cy - R * 0.1)
        ctx.moveTo(cx - R * 0.12, cy + R * 0.02)
        ctx.lineTo(cx + R * 0.12, cy + R * 0.02)
        ctx.moveTo(cx, cy - R * 0.2)
        ctx.lineTo(cx, cy + R * 0.15)
        ctx.stroke()
        // 眼
        ctx.beginPath(); ctx.arc(cx - R * 0.12, cy - R * 0.05, 2, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(cx + R * 0.12, cy - R * 0.05, 2, 0, Math.PI * 2); ctx.fill()
        break
      }
      case 'bird': {
        // 鸟（大鹏）：展翅
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.2)
        ctx.quadraticCurveTo(cx - R * 0.15, cy + R * 0.1, cx - R * 0.05, cy + R * 0.35)
        ctx.quadraticCurveTo(cx + R * 0.05, cy + R * 0.1, cx, cy - R * 0.2)
        ctx.fill()
        // 左翅
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.05, cy - R * 0.05)
        ctx.quadraticCurveTo(cx - R * 0.5, cy - R * 0.35, cx - R * 0.7, cy - R * 0.05)
        ctx.quadraticCurveTo(cx - R * 0.4, cy + R * 0.05, cx - R * 0.05, cy + R * 0.1)
        ctx.fill()
        // 右翅
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.05, cy - R * 0.05)
        ctx.quadraticCurveTo(cx + R * 0.5, cy - R * 0.35, cx + R * 0.7, cy - R * 0.05)
        ctx.quadraticCurveTo(cx + R * 0.4, cy + R * 0.05, cx + R * 0.05, cy + R * 0.1)
        ctx.fill()
        // 头冠
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.2)
        ctx.lineTo(cx, cy - R * 0.45)
        ctx.stroke()
        break
      }
      case 'frog': {
        // 蛙：圆身 + 四肢
        ctx.beginPath()
        ctx.ellipse(cx, cy, R * 0.4, R * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
        // 眼
        ctx.beginPath(); ctx.arc(cx - R * 0.12, cy - R * 0.1, R * 0.08, 0, Math.PI * 2); ctx.stroke()
        ctx.beginPath(); ctx.arc(cx + R * 0.12, cy - R * 0.1, R * 0.08, 0, Math.PI * 2); ctx.stroke()
        // 后腿
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.35, cy + R * 0.1)
        ctx.quadraticCurveTo(cx - R * 0.55, cy + R * 0.2, cx - R * 0.45, cy + R * 0.4)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.35, cy + R * 0.1)
        ctx.quadraticCurveTo(cx + R * 0.55, cy + R * 0.2, cx + R * 0.45, cy + R * 0.4)
        ctx.stroke()
        break
      }
      case 'yak': {
        // 牦牛：身+长角
        ctx.beginPath()
        ctx.ellipse(cx, cy + R * 0.1, R * 0.4, R * 0.25, 0, 0, Math.PI * 2)
        ctx.stroke()
        // 角
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.25, cy - R * 0.05)
        ctx.quadraticCurveTo(cx - R * 0.5, cy - R * 0.35, cx - R * 0.15, cy - R * 0.45)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.25, cy - R * 0.05)
        ctx.quadraticCurveTo(cx + R * 0.5, cy - R * 0.35, cx + R * 0.15, cy - R * 0.45)
        ctx.stroke()
        // 头
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.05, R * 0.15, 0, Math.PI * 2)
        ctx.stroke()
        break
      }
      case 'horse': {
        // 马：马头侧影
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.3, cy + R * 0.35)
        ctx.quadraticCurveTo(cx + R * 0.35, cy + R * 0.1, cx + R * 0.15, cy - R * 0.25)
        ctx.lineTo(cx + R * 0.05, cy - R * 0.45)
        ctx.lineTo(cx - R * 0.05, cy - R * 0.35)
        ctx.lineTo(cx - R * 0.15, cy - R * 0.15)
        ctx.quadraticCurveTo(cx - R * 0.35, cy, cx - R * 0.25, cy + R * 0.25)
        ctx.quadraticCurveTo(cx - R * 0.1, cy + R * 0.35, cx + R * 0.3, cy + R * 0.35)
        ctx.closePath()
        ctx.stroke()
        // 眼
        ctx.beginPath(); ctx.arc(cx + R * 0.05, cy - R * 0.15, 2, 0, Math.PI * 2); ctx.fill()
        // 鬃毛
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.05, cy - R * 0.35)
        ctx.lineTo(cx + R * 0.15, cy - R * 0.55)
        ctx.lineTo(cx + R * 0.2, cy - R * 0.3)
        ctx.stroke()
        break
      }
      case 'sheep': {
        // 羊：卷角
        ctx.beginPath()
        ctx.ellipse(cx, cy + R * 0.1, R * 0.3, R * 0.25, 0, 0, Math.PI * 2)
        ctx.stroke()
        // 卷角
        ctx.beginPath()
        ctx.arc(cx - R * 0.2, cy - R * 0.15, R * 0.2, -Math.PI * 0.8, Math.PI * 0.3)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(cx + R * 0.2, cy - R * 0.15, R * 0.2, Math.PI * 0.7, Math.PI * 2.2, true)
        ctx.stroke()
        break
      }
      case 'snake': {
        // 蛇：S形
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.4, cy + R * 0.3)
        ctx.quadraticCurveTo(cx + R * 0.1, cy + R * 0.4, cx - R * 0.1, cy)
        ctx.quadraticCurveTo(cx - R * 0.3, cy - R * 0.4, cx + R * 0.1, cy - R * 0.3)
        ctx.stroke()
        // 眼
        ctx.beginPath(); ctx.arc(cx + R * 0.15, cy - R * 0.25, 2, 0, Math.PI * 2); ctx.fill()
        break
      }
      case 'dragon': {
        // 龙：简化龙形
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.4, cy + R * 0.2)
        ctx.quadraticCurveTo(cx - R * 0.3, cy - R * 0.1, cx - R * 0.1, cy - R * 0.3)
        ctx.quadraticCurveTo(cx + R * 0.1, cy - R * 0.5, cx + R * 0.3, cy - R * 0.2)
        ctx.quadraticCurveTo(cx + R * 0.5, cy + R * 0.1, cx + R * 0.2, cy + R * 0.3)
        ctx.quadraticCurveTo(cx, cy + R * 0.4, cx - R * 0.4, cy + R * 0.2)
        ctx.closePath()
        ctx.stroke()
        // 角
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.1, cy - R * 0.3)
        ctx.lineTo(cx - R * 0.15, cy - R * 0.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.05, cy - R * 0.35)
        ctx.lineTo(cx + R * 0.1, cy - R * 0.5)
        ctx.stroke()
        // 眼
        ctx.beginPath(); ctx.arc(cx + R * 0.05, cy - R * 0.15, 2.5, 0, Math.PI * 2); ctx.fill()
        break
      }

      // ===== 人类 =====
      case 'human': {
        // 人：简化人形
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.25, R * 0.15, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.1)
        ctx.lineTo(cx, cy + R * 0.15)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.25, cy + R * 0.05)
        ctx.lineTo(cx + R * 0.25, cy + R * 0.05)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.15)
        ctx.lineTo(cx - R * 0.15, cy + R * 0.4)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.15)
        ctx.lineTo(cx + R * 0.15, cy + R * 0.4)
        ctx.stroke()
        break
      }
      case 'man': {
        // 男：人形 + 强调
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.25, R * 0.15, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.1)
        ctx.lineTo(cx, cy + R * 0.2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.25, cy + R * 0.05)
        ctx.lineTo(cx + R * 0.25, cy + R * 0.05)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.2)
        ctx.lineTo(cx - R * 0.15, cy + R * 0.45)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.2)
        ctx.lineTo(cx + R * 0.15, cy + R * 0.45)
        ctx.stroke()
        // 力量标记
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.25, cy - R * 0.35)
        ctx.lineTo(cx + R * 0.4, cy - R * 0.5)
        ctx.stroke()
        break
      }
      case 'woman': {
        // 女：人形 + 裙装
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.25, R * 0.15, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.1)
        ctx.lineTo(cx, cy + R * 0.1)
        ctx.stroke()
        // 裙
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.25, cy + R * 0.1)
        ctx.lineTo(cx, cy + R * 0.45)
        ctx.lineTo(cx + R * 0.25, cy + R * 0.1)
        ctx.closePath()
        ctx.stroke()
        break
      }
      case 'child': {
        // 子：小人形
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.15, R * 0.12, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.03)
        ctx.lineTo(cx, cy + R * 0.15)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.15, cy + R * 0.05)
        ctx.lineTo(cx + R * 0.15, cy + R * 0.05)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.15)
        ctx.lineTo(cx - R * 0.1, cy + R * 0.35)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.15)
        ctx.lineTo(cx + R * 0.1, cy + R * 0.35)
        ctx.stroke()
        break
      }

      // ===== 生活 =====
      case 'home': {
        // 家：房子
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.4, cy + R * 0.25)
        ctx.lineTo(cx - R * 0.4, cy - R * 0.1)
        ctx.lineTo(cx, cy - R * 0.45)
        ctx.lineTo(cx + R * 0.4, cy - R * 0.1)
        ctx.lineTo(cx + R * 0.4, cy + R * 0.25)
        ctx.closePath()
        ctx.stroke()
        // 门
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.1, cy + R * 0.25)
        ctx.lineTo(cx - R * 0.1, cy + R * 0.05)
        ctx.lineTo(cx + R * 0.1, cy + R * 0.05)
        ctx.lineTo(cx + R * 0.1, cy + R * 0.25)
        ctx.stroke()
        break
      }
      case 'clothing': {
        // 衣：长袍
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.25, cy - R * 0.35)
        ctx.lineTo(cx + R * 0.25, cy - R * 0.35)
        ctx.lineTo(cx + R * 0.35, cy + R * 0.35)
        ctx.lineTo(cx - R * 0.35, cy + R * 0.35)
        ctx.closePath()
        ctx.stroke()
        // 领口
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.35)
        ctx.lineTo(cx, cy + R * 0.35)
        ctx.stroke()
        // 腰带
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.3, cy + R * 0.05)
        ctx.lineTo(cx + R * 0.3, cy + R * 0.05)
        ctx.stroke()
        break
      }
      case 'food': {
        // 食：碗 + 热气
        ctx.beginPath()
        ctx.arc(cx, cy + R * 0.1, R * 0.35, 0, Math.PI)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.35, cy + R * 0.1)
        ctx.lineTo(cx + R * 0.35, cy + R * 0.1)
        ctx.stroke()
        // 热气
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath()
          ctx.moveTo(cx + i * R * 0.12, cy - R * 0.15)
          ctx.quadraticCurveTo(cx + i * R * 0.15, cy - R * 0.35, cx + i * R * 0.1, cy - R * 0.45)
          ctx.stroke()
        }
        break
      }
      case 'bow': {
        // 弓：弓形 + 弦
        ctx.beginPath()
        ctx.arc(cx - R * 0.05, cy, R * 0.4, -Math.PI * 0.45, Math.PI * 0.45)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.05, cy - R * 0.28)
        ctx.lineTo(cx - R * 0.05, cy + R * 0.28)
        ctx.stroke()
        // 箭
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.05, cy)
        ctx.lineTo(cx + R * 0.55, cy)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.45, cy - R * 0.08)
        ctx.lineTo(cx + R * 0.55, cy)
        ctx.lineTo(cx + R * 0.45, cy + R * 0.08)
        ctx.stroke()
        break
      }

      // ===== 法器 =====
      case 'conch': {
        // 海螺：螺旋
        ctx.beginPath()
        ctx.moveTo(cx + R * 0.25, cy - R * 0.3)
        ctx.quadraticCurveTo(cx - R * 0.1, cy - R * 0.45, cx - R * 0.35, cy - R * 0.1)
        ctx.quadraticCurveTo(cx - R * 0.4, cy + R * 0.2, cx - R * 0.1, cy + R * 0.35)
        ctx.quadraticCurveTo(cx + R * 0.25, cy + R * 0.3, cx + R * 0.35, cy)
        ctx.quadraticCurveTo(cx + R * 0.3, cy - R * 0.15, cx + R * 0.25, cy - R * 0.3)
        ctx.closePath()
        ctx.stroke()
        // 螺旋纹
        ctx.beginPath()
        ctx.arc(cx - R * 0.05, cy, R * 0.12, 0, Math.PI * 1.5)
        ctx.stroke()
        break
      }
      case 'drum': {
        // 鼓：圆鼓身
        ctx.beginPath()
        ctx.ellipse(cx, cy, R * 0.4, R * 0.35, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.4, cy - R * 0.1)
        ctx.lineTo(cx - R * 0.4, cy + R * 0.2)
        ctx.lineTo(cx + R * 0.4, cy + R * 0.2)
        ctx.lineTo(cx + R * 0.4, cy - R * 0.1)
        ctx.stroke()
        // 鼓钉
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath(); ctx.arc(cx + i * R * 0.2, cy - R * 0.05, 1.5, 0, Math.PI * 2); ctx.fill()
        }
        break
      }

      // ===== 吉祥 =====
      case 'fish': {
        // 双鱼：两条鱼
        const drawFish = (fx, fy, flip) => {
          const dir = flip ? -1 : 1
          ctx.beginPath()
          ctx.ellipse(fx, fy, R * 0.2, R * 0.12, 0, 0, Math.PI * 2)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(fx + dir * R * 0.2, fy)
          ctx.lineTo(fx + dir * R * 0.35, fy - R * 0.1)
          ctx.lineTo(fx + dir * R * 0.35, fy + R * 0.1)
          ctx.closePath()
          ctx.fill()
          ctx.beginPath(); ctx.arc(fx - dir * R * 0.08, fy - R * 0.02, 1.5, 0, Math.PI * 2); ctx.fill()
        }
        drawFish(cx - R * 0.12, cy - R * 0.08, false)
        drawFish(cx + R * 0.12, cy + R * 0.08, true)
        break
      }
      case 'blessing': {
        // 福：简化符号（方形+十字）
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.3, cy - R * 0.3)
        ctx.lineTo(cx + R * 0.3, cy - R * 0.3)
        ctx.lineTo(cx + R * 0.3, cy + R * 0.3)
        ctx.lineTo(cx - R * 0.3, cy + R * 0.3)
        ctx.closePath()
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.3)
        ctx.lineTo(cx, cy + R * 0.3)
        ctx.moveTo(cx - R * 0.3, cy)
        ctx.lineTo(cx + R * 0.3, cy)
        ctx.stroke()
        // 中心点
        ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill()
        break
      }

      // ===== 神灵 =====
      case 'eye': {
        // 神之眼：眼睛
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.4, cy)
        ctx.quadraticCurveTo(cx, cy - R * 0.35, cx + R * 0.4, cy)
        ctx.quadraticCurveTo(cx, cy + R * 0.35, cx - R * 0.4, cy)
        ctx.closePath()
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(cx, cy, R * 0.18, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath(); ctx.arc(cx, cy, R * 0.08, 0, Math.PI * 2); ctx.fill()
        break
      }
      case 'god': {
        // 神：人形+光环
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.15, R * 0.15, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx, cy + R * 0.25)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.2, cy + R * 0.08)
        ctx.lineTo(cx + R * 0.2, cy + R * 0.08)
        ctx.stroke()
        // 光环
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.15, R * 0.25, Math.PI * 0.8, Math.PI * 2.2)
        ctx.stroke()
        break
      }
      case 'ghost': {
        // 鬼：幽灵形
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.1, R * 0.25, Math.PI, 0)
        ctx.lineTo(cx + R * 0.25, cy + R * 0.35)
        ctx.lineTo(cx + R * 0.1, cy + R * 0.25)
        ctx.lineTo(cx, cy + R * 0.35)
        ctx.lineTo(cx - R * 0.1, cy + R * 0.25)
        ctx.lineTo(cx - R * 0.25, cy + R * 0.35)
        ctx.closePath()
        ctx.stroke()
        // 眼
        ctx.beginPath(); ctx.arc(cx - R * 0.08, cy - R * 0.05, 2, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(cx + R * 0.08, cy - R * 0.05, 2, 0, Math.PI * 2); ctx.fill()
        break
      }

      // ===== 文化 =====
      case 'scripture': {
        // 东巴经：书卷
        ctx.beginPath()
        ctx.moveTo(cx - R * 0.25, cy - R * 0.35)
        ctx.quadraticCurveTo(cx - R * 0.3, cy, cx - R * 0.25, cy + R * 0.35)
        ctx.lineTo(cx + R * 0.25, cy + R * 0.35)
        ctx.quadraticCurveTo(cx + R * 0.3, cy, cx + R * 0.25, cy - R * 0.35)
        ctx.closePath()
        ctx.stroke()
        // 文字线
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath()
          ctx.moveTo(cx - R * 0.15, cy + i * R * 0.12)
          ctx.lineTo(cx + R * 0.15, cy + i * R * 0.12)
          ctx.stroke()
        }
        break
      }
      case 'dance': {
        // 舞：舞动的人形
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.15, R * 0.12, 0, Math.PI * 2)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx, cy + R * 0.15)
        ctx.stroke()
        // 舞动的手臂
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.02)
        ctx.quadraticCurveTo(cx - R * 0.35, cy - R * 0.2, cx - R * 0.45, cy - R * 0.4)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.02)
        ctx.quadraticCurveTo(cx + R * 0.35, cy + R * 0.05, cx + R * 0.4, cy + R * 0.25)
        ctx.stroke()
        // 腿
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.15)
        ctx.lineTo(cx - R * 0.15, cy + R * 0.4)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx, cy + R * 0.15)
        ctx.lineTo(cx + R * 0.15, cy + R * 0.35)
        ctx.stroke()
        break
      }
      case 'music': {
        // 乐：铃/钟
        ctx.beginPath()
        ctx.arc(cx, cy - R * 0.05, R * 0.25, Math.PI, 0)
        ctx.lineTo(cx + R * 0.25, cy + R * 0.25)
        ctx.lineTo(cx - R * 0.25, cy + R * 0.25)
        ctx.closePath()
        ctx.stroke()
        // 铃舌
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.05)
        ctx.lineTo(cx, cy + R * 0.15)
        ctx.stroke()
        ctx.beginPath(); ctx.arc(cx, cy + R * 0.2, 3, 0, Math.PI * 2); ctx.fill()
        // 声波
        ctx.beginPath()
        ctx.arc(cx + R * 0.4, cy - R * 0.1, R * 0.08, -Math.PI * 0.5, Math.PI * 0.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(cx + R * 0.55, cy - R * 0.1, R * 0.12, -Math.PI * 0.5, Math.PI * 0.5)
        ctx.stroke()
        break
      }

      default: {
        // 默认：菱形占位
        ctx.beginPath()
        ctx.moveTo(cx, cy - R * 0.5)
        ctx.lineTo(cx + R * 0.35, cy)
        ctx.lineTo(cx, cy + R * 0.5)
        ctx.lineTo(cx - R * 0.35, cy)
        ctx.closePath()
        ctx.stroke()
      }
    }
  }
})
