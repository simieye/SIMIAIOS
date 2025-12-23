
import React from 'react';
import { LayoutDashboard, Zap, Shield, Network, LineChart, Cpu, Globe, Share2, Layers, Sliders, Mail, Target, BarChart3, Users, Rocket, Search, Quote, FileCode, Workflow, Milestone, Lightbulb, Trophy, CheckCircle2, SearchCode, BarChart, Eye, Sparkles, Box, FlaskConical, HeartPulse, Home, Infinity, Monitor, ShieldCheck, MapPin, Scale, UserCheck, Briefcase, Landmark, Percent, Gift, Code, Database, Microscope, Palette, Terminal, Brain, Factory, Stethoscope, Shirt, HardDrive, Bot, CircuitBoard, Radio, Component, FileJson, CloudLightning, BadgeDollarSign, FileText, ShoppingBag, Wand2, Scale3D, Boxes, GitMerge, MessageSquare, UserPlus, FileSearch, Megaphone, CheckSquare, Store, Video, Truck, Server, Container, Blocks, Handshake, Languages, Compass, TrendingUp, UserCircle, Star, Activity, ShoppingCart, PenTool, Layout, Send, Lock, HomeIcon, Image } from 'lucide-react';
import { ProductSystem, PricingPlan, Language, CaseStudy, AISearchTool, GeoStep, CoreValue, AffiliateBenefit, JobPosting, EcosystemModule, StrategicPartner, ToolCategory } from './types';

export const SYSTEMS: ProductSystem[] = [
  { 
    id: 'strat-team', 
    title: { en: 'Sovereign Team Matrix', zh: '主权团队矩阵' }, 
    description: { en: 'Build your 20+ AI agent army inheriting your core wisdom.', zh: '构建由 20+ AI Agent 组成的矩阵，完美继承你的商业智慧。' }, 
    icon: 'Users' 
  },
  { 
    id: 'strat-product', 
    title: { en: 'GEO Value Voice', zh: 'GEO 价值话语权' }, 
    description: { en: 'PDF to Atomic Site. Let AI search engines prioritize your brand.', zh: 'PDF 一键生成原子化官网，让全球 AI 引擎优先引用你的品牌。' }, 
    icon: 'Target' 
  },
  { 
    id: 'tactics-growth', 
    title: { en: '10x Execution Hub', zh: '10倍效率中心' }, 
    description: { en: 'Gary 15 AI Workflows replace 90% of repetitive tactical labor.', zh: 'Gary 15 大 AI 工作流，取代 90% 的重复性战术劳动。' }, 
    icon: 'Workflow' 
  },
  { 
    id: 'tactics-channel', 
    title: { en: 'Omni-Channel Reach', zh: '全球全渠道触达' }, 
    description: { en: 'Connect TikTok viral traffic with Redmond 10,000+ physical shelves.', zh: '打通 TikTok 流量与红萌线下万家商超，构建 O2O 闭环。' }, 
    icon: 'Globe' 
  },
  { 
    id: 'strat-capital', 
    title: { en: 'Smart Finance Core', zh: '智能财务核心' }, 
    description: { en: 'Real-time profit & cashflow tracking for business sovereignty.', zh: '实时追踪利润与现金流，确保你的商业决策主权。' }, 
    icon: 'Landmark' 
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'hero-first',
    title: { en: 'You Are The Hero', zh: '你是英雄' },
    description: { en: 'We provide the tool; you lead the vision. Growth is our only metric.', zh: '我们提供最锋利的工具，由你主宰全局。你的成长是唯一衡量标准。' },
    icon: 'ShieldCheck'
  },
  {
    id: 'sovereignty',
    title: { en: 'Absolute Sovereignty', zh: '绝对主权' },
    description: { en: '100% control over data, traffic, and decisions. No algorithm gatekeepers.', zh: '数据、流量、决策权 100% 归你所有。告别平台算法的绑架。' },
    icon: 'Trophy'
  },
  {
    id: 'empowerment',
    title: { en: 'Total Empowerment', zh: '全面赋能' },
    description: { en: 'From Super-Individuals to Global SMEs, we scale your capabilities.', zh: '从超级个体到全球中小企业，全面提升你的跨境统治力。' },
    icon: 'Zap'
  },
  {
    id: 'intelligence',
    title: { en: 'Unmatched Intelligence', zh: '无敌智慧' },
    description: { en: 'Taiji GEO dual-engine ensures you stay ahead of every competitor.', zh: '太极 GEO 阴阳双引擎，确保你永远领先竞争对手一步。' },
    icon: 'Brain'
  }
];

export const PRICING: PricingPlan[] = [
  {
    name: { en: 'Seed Hero (Early Bird)', zh: '种子英雄 (早鸟版)' },
    price: { en: '¥899/mo', zh: '¥899/月' },
    features: {
      en: ['Sovereign AI Logic Mastery', '15 Gary AI Workflows', 'Atomic GEO Site (+$1)', 'Access to 10k Stores Network'],
      zh: ['掌控主权 AI 逻辑', '15 大 Gary AI 工作流', '原子化 GEO 官网 (+$1)', '接入红萌万家商超网络']
    },
    cta: { en: 'Claim Early Access', zh: '立即抢占早鸟席位' },
    type: 'sme',
    highlighted: true
  },
  {
    name: { en: 'Strategic Empire', zh: '战略帝国版' },
    price: { en: '¥5999/mo', zh: '¥5999/月' },
    features: {
      en: ['Custom AI Agents', 'Full O2O Supply Chain Integration', 'Priority TikTok TSP Bidding', 'APEC/WTCA Network Access'],
      zh: ['定制化 AI Agent', '全链路 O2O 供应链集成', 'TikTok TSP 竞价优先权', '接入 APEC/WTCA 资源网络']
    },
    cta: { en: 'Build Your Empire', zh: '构建你的商业帝国' },
    type: 'enterprise'
  }
];

export const UI_STRINGS = {
  en: {
    website: 'Your BP',
    userHub: 'Your Hub',
    admin: 'Command Center',
    geoStudio: 'Creation Studio',
    dashboard: 'Your Growth',
    apiStudio: 'Logic Studio',
    finance: 'Financial Core',
    settings: 'Preferences',
    signIn: 'Welcome Back',
    signUp: 'Start Winning',
    signOut: 'Sign Out',
    email: 'Email',
    mobile: 'Mobile',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    sendCode: 'Send Code',
    verifyCode: 'Code',
    noAccount: "New Hero?",
    hasAccount: 'Returning Hero?',
    authTitle: 'Step into Sovereignty',
    authSub: 'You are the Hero. Simiai OS is your Tool. Manage your AI-Native empire.',
    hero: 'Super Individual',
    seed: 'Empire Builder',
    welcome: 'Welcome, Sovereign.',
    osRunning: 'Your AI Matrix is active. Master your market.',
    uploadKnowledge: 'Import Vision PDF',
    newWorkflow: 'New Growth Cycle',
    revenueGrowth: 'Efficiency & Impact Score',
    recentWorkflows: 'Active AI Nodes',
    viewAll: 'Case Studies',
    taijiTitle: 'Strategic Engine',
    taijiSub: 'Taiji GEO + Lige Logic. You define, we execute.',
    saveDraft: 'Save Progress',
    publishStudio: 'Deploy Empire',
    studioToolbox: 'Mastery Tools',
    livePreview: 'Real-time Reality',
    visibility: 'AI Citation Rate',
    optimizing: 'Scaling Your Vision...',
    apiTitle: 'Sovereign API',
    apiSub: '1000+ Brains connected to your business logic.',
    beta: 'ULTIMATE',
    activeModel: 'Brain Unit:',
    chatPlaceholder: 'Simiai: "How can I help you rule today?"',
    chatSub: 'Query about TikTok viral hooks or offline distribution.',
    typeInstruction: 'Your Command...',
    launch: 'Become Unstoppable',
    docs: 'Builder Guides',
    privacy: 'Privacy Rights',
    terms: 'Sovereign Terms',
    contact: 'Hero Support',
    mission: 'Empowering every entrepreneur to become the most powerful version of themselves.',
    adminRestricted: 'Master Command',
    placeholderUrl: 'Paste your vision or PDF URL...',
    calcScore: 'Measure Success Index',
    scoreResult: 'Your Sovereignty Score',
    flexiblePlans: 'Invest in Your Evolution',
    heroText: 'Master Your Story.',
    heroSub: 'The world’s first Sovereign AI OS. Stop following algorithms; start ruling your own empire with absolute confidence.',
    eightPillars: 'The Eight Pillars',
    eightPillarsSub: 'From Vision to Global Retail Reality.',
    marketStats: 'The $4T Opportunity',
    marketSub: 'AI-driven commerce is shifting. Claim your 20% share of AI search traffic.',
    ligeStep: 'Methodology',
    garyWorkflow: 'Execution Hub',
    step1: 'Define WHO',
    step2: 'Perfect TOUCH',
    step3: 'Launch REACH',
    step4: 'Secure HOOK',
    step5: 'Claim SHELF',
    adPerformance: 'Visibility Metrics',
    roas: 'ROI Impact',
    spend: 'Investment',
    clicks: 'Hits',
    citationRate: 'AI Authority',
    referenceRate: 'Growth Volume',
    geoScore: 'Mastery Score',
    insights: 'Global Intel',
    insightsSub: 'Benchmarks for your unstoppable evolution.',
    caseStudies: 'Heroes Like You',
    aiComparison: 'Search Dominance',
    formula: 'Success Formula',
    formulaText: 'You + Simiai OS = Unstoppable',
    share: 'Market Share',
    advantage: 'The Edge',
    suitability: 'Persona Fit',
    traffic: 'Momentum',
    roadmap: 'Growth Roadmap',
    roadmapSub: '30 Days from Zero to Sovereignty.',
    fashionFocus: 'Fashion Hero',
    fashionFocusSub: 'Lookbooks to hooks.',
    beautyFocus: 'Beauty Architect',
    beautyFocusSub: 'Influencers to shelves.',
    medicalFocus: 'Trust Builder',
    medicalFocusSub: 'Compliance at scale.',
    affiliateTitle: 'Growth Alliance',
    affiliateSub: '10,000 partners win together.',
    investorTitle: 'Strategic Equity',
    investorSub: '¥100M raise for a ¥200M empire. Join us.',
    affiliateLink: 'Your Node',
    affiliateStats: 'Earnings',
    recruitmentTitle: 'Join Core Team',
    recruitmentSub: 'Building for 10k stores and 10M heroes.',
    recruitmentHero: 'Build for Heroes',
    jobRequirements: 'Standards',
    jobBenefits: 'Rewards',
    applyNow: 'Join Us',
    ecoSectionTitle: 'The Growth Loop',
    ecoSectionSub: 'From viral TikTok clips to supermarket checkout lanes.',
    atomicSectionTitle: 'Atomic Website',
    atomicSectionSub: '+$1 to own a high-conversion GEO-native brand site.',
    atomicOneClick: 'Deploy Now',
    partnerRecruitment: '10,000 Allies',
    strategicPartners: 'Our Alliances',
    partnersSub: 'Top associations backing your global sovereignty.',
    becomePartner: 'Join Alliance',
    applyAccess: 'Apply Access',
    browseTools: 'Browse Tools',
    toolsHeroTitle: 'Empower Your Heroic Journey',
    toolsHeroSub: 'Discover AI tools built to amplify your cross-border dominance. You rule the business; we sharpen the blade.',
    allCategories: 'All Categories',
    viewAllTools: 'View All',
    referralTitle: 'Unlock Premium Access for FREE!',
    referralSub: 'Share Simiai OS with friends and rule together.',
    referralPro: 'Invite 2 friends to Professional Plan -> Get 1 Year Premium FREE.',
    referralSme: 'Invite 2 friends to SME Plan -> Get 1 Year Functionality FREE.',
    copyReferral: 'Copy Referral Link',
    joinNow: 'Try Now'
  },
  zh: {
    website: '你的 BP',
    userHub: '你的中心',
    admin: '统领中心',
    geoStudio: '创作工作室',
    dashboard: '你的成长',
    apiStudio: '逻辑实验室',
    finance: '财务核心',
    settings: '系统偏好',
    signIn: '欢迎回来',
    signUp: '开启旅程',
    signOut: '退出系统',
    email: '邮箱地址',
    mobile: '手机号码',
    password: '密码',
    confirmPassword: '确认密码',
    sendCode: '获取验证码',
    verifyCode: '验证码',
    noAccount: '新英雄？',
    hasAccount: '回归英雄？',
    authTitle: '步入主权之路',
    authSub: '你是英雄，Simiai OS 是你的工具。管理你的 AI 原生帝国。',
    hero: '超级个体',
    seed: '帝国构建者',
    welcome: '欢迎回来，主宰者。',
    osRunning: 'AI 矩阵已就绪。开始主宰你的市场。',
    uploadKnowledge: '导入愿景 PDF',
    newWorkflow: '开启增长周期',
    revenueGrowth: '效率与影响力评分',
    recentWorkflows: '活跃 AI 节点',
    viewAll: '成功案例',
    taijiTitle: '战略引擎',
    taijiSub: '太极 GEO + 力哥逻辑。由你定义，AI 执行。',
    saveDraft: '保存进度',
    publishStudio: '部署帝国',
    studioToolbox: '掌控工具',
    livePreview: '实时现实',
    visibility: 'AI 引用率',
    optimizing: '扩展愿景中...',
    apiTitle: '主权 API',
    apiSub: '连接 1000+ 大脑，深度集成你的业务。',
    beta: '终极版',
    activeModel: '大脑单元:',
    chatPlaceholder: 'Simiai: “今天我该如何帮你赢？”',
    chatSub: '询问关于 TikTok 爆款钩子或线下分销。',
    typeInstruction: '你的指令...',
    launch: '变得不可阻挡',
    docs: '构建者指南',
    privacy: '隐私权利',
    terms: '主权条款',
    contact: '英雄支持',
    mission: '赋能每一位创业者成为最强大的自己。',
    adminRestricted: '主控室',
    placeholderUrl: '粘贴你的愿景或 PDF 链接...',
    calcScore: '衡量成功指数',
    scoreResult: '你的主权评分',
    flexiblePlans: '为你的进化投资',
    heroText: '主导你的故事。',
    heroSub: '全球首款主权 AI 操作系统。别再追随算法，开始以绝对自信统治你的帝国。',
    eightPillars: '“八化”支柱',
    eightPillarsSub: '从商业愿景到全球零售现实。',
    marketStats: '4 万亿美元机遇',
    marketSub: 'AI 驱动商业大迁徙。占领 20% 的 AI 搜索流量份额。',
    ligeStep: '方法论',
    garyWorkflow: '执行中心',
    step1: '定义 WHO',
    step2: '完美 TOUCH',
    step3: '发布 REACH',
    step4: '掌控 HOOK',
    step5: '占领 SHELF',
    adPerformance: '可见度指标',
    roas: 'ROI 影响力',
    spend: '投入金额',
    clicks: '点击量',
    citationRate: 'AI 权威度',
    referenceRate: '增长覆盖',
    geoScore: '掌控评分',
    insights: '全球情报',
    insightsSub: '助力你不可阻挡进化的基准分析。',
    caseStudies: '像你一样的英雄',
    aiComparison: '搜索统治力',
    formula: '成功公式',
    formulaText: '你 + Simiai OS = 不可阻挡',
    share: '市场份额',
    advantage: '核心优势',
    suitability: '角色匹配',
    traffic: '增长势能',
    roadmap: '增长路线图',
    roadmapSub: '30 天，从零到主权统治。',
    fashionFocus: '时尚英雄',
    fashionFocusSub: '画册转钩子。',
    beautyFocus: '美妆架构师',
    beautyFocusSub: '达人连货架。',
    medicalFocus: '信任构建者',
    medicalFocusSub: '规模化合规。',
    affiliateTitle: '增长联盟',
    affiliateSub: '10,000 名伙伴共同赢取未来。',
    investorTitle: '战略股权',
    investorSub: '1 亿融资助力 2 亿估值帝国。加入我们。',
    affiliateLink: '你的节点',
    affiliateStats: '累计收益',
    recruitmentTitle: '加入核心团队',
    recruitmentSub: '为万家商超和千万英雄打造工具。',
    recruitmentHero: '为英雄构建',
    jobRequirements: '专业标准',
    jobBenefits: '英雄待遇',
    applyNow: '加入我们',
    ecoSectionTitle: '增长闭环',
    ecoSectionSub: '从 TikTok 爆款视频到线下商超收银台。',
    atomicSectionTitle: '原子官网',
    atomicSectionSub: '只需 +1 美元，即可拥有高转化 GEO 原生品牌站。',
    atomicOneClick: '立即部署',
    partnerRecruitment: '10,000 名盟友',
    strategicPartners: '战略同盟',
    partnersSub: '全球顶级协会，为你的全球主权背书。',
    becomePartner: '加入同盟',
    applyAccess: '获取权限',
    browseTools: '工具目录',
    toolsHeroTitle: '英雄工具库',
    toolsHeroSub: '发现旨在提升出海效率与竞争力的 AI 工具。你是生意的主宰，我们是你的最强锋刃。',
    allCategories: '所有类别',
    viewAllTools: '查看全部',
    referralTitle: '免费解锁一年高级访问！',
    referralSub: '与英雄朋友分享 Simiai OS，共同主宰全球。',
    referralPro: '推荐 2 位朋友加入专业计划 -> 获一年高级访问。',
    referralSme: '推荐 2 位朋友加入中小企业计划 -> 获一年功能免费。',
    copyReferral: '复制推荐链接',
    joinNow: '现在试试'
  }
};

export const STRATEGIC_PARTNERS: StrategicPartner[] = [
  {
    id: 'wtca',
    name: { en: 'World Trade Centers Association', zh: '世界贸易中心协会 (WTCA)' },
    description: { 
      en: 'Supporting YOUR entry into 100+ countries with B2B trade matchmaking.', 
      zh: '支持你进入 100+ 国家，提供 B2B 贸易精准对接。' 
    },
    highlights: {
      en: ['Your Priority Access', 'Your Global Investment'],
      zh: ['你优先接入全球资源', '你的全球投资机会']
    },
    icon: 'Globe',
    category: 'Global'
  },
  {
    id: 'apec-yue',
    name: { en: 'Global Yue Merchant Alliance (APEC)', zh: 'APEC 全球粤商会联盟' },
    description: { 
      en: 'Your regional gateway for policy support and chamber networking.', 
      zh: '你在区域市场的政策支持与商会网络入口。' 
    },
    highlights: {
      en: ['Your APEC Access', 'Your Market Channels'],
      zh: ['你的 APEC 专属通道', '你的市场优先布局']
    },
    icon: 'Compass',
    category: 'Global'
  },
  {
    id: 'redmond',
    name: { en: 'Redmond Global Retail', zh: '红萌全球线下商超' },
    description: { 
      en: 'Automatic listing on 10,000+ shelves across AU & NA.', 
      zh: '全自动上架澳洲、北美 10,000+ 线下实体商超。' 
    },
    highlights: {
      en: ['Your Physical Presence', 'Your O2O Loop'],
      zh: ['你的线下实体布局', '你的 O2O 增长闭环']
    },
    icon: 'Store',
    category: 'Retail'
  },
  {
    id: 'jiucheng',
    name: { en: 'Jiucheng Cross-border Circle', zh: '久成跨境圈' },
    description: { 
      en: 'Your strategic hub for viral content and niche market mastery.', 
      zh: '你的战略核心，主导爆款内容与细分市场。' 
    },
    highlights: {
      en: ['Your Viral Hooks', 'Your Expert Networking'],
      zh: ['你的爆款钩子库', '你的专家社交圈']
    },
    icon: 'Users',
    category: 'Tech'
  }
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'security',
    name: { en: 'Security & Compliance', zh: '安全与合规' },
    count: 156,
    icon: 'Shield',
    tools: [
      { id: 'soc2-risk', name: { en: 'AI SOC2 Risk Assessment', zh: 'AI SOC2 风险评估' }, path: '/tools/soc2-risk', isHot: true },
      { id: 'iso27017-quiz', name: { en: 'AI ISO27017 Awareness Quiz', zh: 'AI ISO27017 安全意识测验' }, path: '/tools/iso27017-quiz' },
      { id: 'vuln-plan', name: { en: 'AI Vulnerability Assessment Planner', zh: 'AI 漏洞评估规划工具' }, path: '/tools/vuln-plan' },
      { id: 'threat-intel', name: { en: 'AI Threat Intelligence Analyzer', zh: 'AI 威胁情报分析器' }, path: '/tools/threat-intel' },
      { id: 'ir-playbook', name: { en: 'AI Incident Response Playbook Gen', zh: 'AI 事件响应剧本生成器' }, path: '/tools/ir-playbook', isHot: true },
      { id: 'cloud-sec', name: { en: 'AI Cloud Security Optimizer', zh: 'AI 云安全优化器' }, path: '/tools/cloud-sec' },
      { id: 'access-review', name: { en: 'AI Access Review Automation', zh: 'AI 访问审查自动化工具' }, path: '/tools/access-review' }
    ]
  },
  {
    id: 'marketing',
    name: { en: 'Marketing', zh: '营销' },
    count: 140,
    icon: 'Megaphone',
    tools: [
      { id: 'video-strat', name: { en: 'AI Video Marketing Strategy', zh: 'AI 视频营销策略生成器' }, path: '/tools/video-strat', isHot: true },
      { id: 'fb-ads', name: { en: 'AI Facebook Ads Generator', zh: 'AI Facebook 广告生成器' }, path: '/tools/fb-ads' },
      { id: 'buyer-persona', name: { en: 'AI Buyer Persona Generator', zh: 'AI 买家角色生成器' }, path: '/tools/buyer-persona', isHot: true },
      { id: 'lead-magnet', name: { en: 'AI Lead Magnet Generator', zh: 'AI 引导磁铁生成器' }, path: '/tools/lead-magnet' },
      { id: 'cta-gen', name: { en: 'AI Call-to-Action Generator', zh: 'AI 行动号召生成器' }, path: '/tools/cta-gen' },
      { id: 'swot-gen', name: { en: 'AI SWOT Analysis Generator', zh: 'AI SWOT 分析生成器' }, path: '/tools/swot-gen' }
    ]
  },
  {
    id: 'writing',
    name: { en: 'Writing & Content', zh: '写作与内容' },
    count: 136,
    icon: 'PenTool',
    tools: [
      { id: 'essay-writer', name: { en: 'AI Essay Writing Tool', zh: 'AI 论文写作工具' }, path: '/tools/essay-writer' },
      { id: 'paraphraser', name: { en: 'AI Paraphrasing Tool', zh: 'AI 改写工具' }, path: '/tools/paraphraser', isHot: true },
      { id: 'ux-writer', name: { en: 'AI UX Writing Generator', zh: 'AI 用户体验写作生成器' }, path: '/tools/ux-writer' },
      { id: 'tldr-gen', name: { en: 'AI TLDR Generator', zh: 'AI 内容摘要生成器' }, path: '/tools/tldr-gen' },
      { id: 'geo-writer', name: { en: 'AI GEO Content Optimizer', zh: 'AI GEO 内容优化器' }, path: '/tools/geo-writer', isHot: true },
      { id: 'human-seo', name: { en: 'AI Humanized SEO Article', zh: 'AI 人性化 SEO 文章' }, path: '/tools/human-seo' }
    ]
  },
  {
    id: 'uk-property',
    name: { en: 'UK Housing & Property', zh: '英国住房与房产' },
    count: 122,
    icon: 'HomeIcon',
    tools: [
      { id: 'rental-timer', name: { en: 'AI Rental Market Timer', zh: 'AI 租赁市场定时器' }, path: '/tools/rental-timer' },
      { id: 'virtual-view', name: { en: 'AI Virtual Viewing Script', zh: 'AI 虚拟观看脚本' }, path: '/tools/virtual-view' },
      { id: 'yield-calc', name: { en: 'AI Rental Yield Calculator', zh: 'AI 租金收益计算器' }, path: '/tools/yield-calc', isHot: true },
      { id: 'valuation-proof', name: { en: 'AI Valuation Proof', zh: 'AI 估值证明' }, path: '/tools/valuation-proof' },
      { id: 'tenant-plan', name: { en: 'AI Tenant Retention Plan', zh: 'AI 租户保留计划' }, path: '/tools/tenant-plan' }
    ]
  },
  {
    id: 'images',
    name: { en: 'Images & Visuals', zh: '图像与视觉' },
    count: 118,
    icon: 'Image',
    tools: [
      { id: 'vehicle-artist', name: { en: 'AI Vehicle Concept Artist', zh: 'AI 车辆概念艺术家' }, path: '/tools/vehicle-artist' },
      { id: 'logo-gen', name: { en: 'AI Logo Generator', zh: 'AI 标志生成器' }, path: '/tools/logo-gen', isHot: true },
      { id: 'fashion-gen', name: { en: 'AI Fashion Design Creator', zh: 'AI 时尚设计创作工具' }, path: '/tools/fashion-gen' },
      { id: 'interior-viz', name: { en: 'AI Architectural Visualizer', zh: 'AI 建筑可视化工具' }, path: '/tools/interior-viz', isHot: true },
      { id: 'game-char', name: { en: 'AI Game Character Generator', zh: 'AI 游戏角色生成器' }, path: '/tools/game-char' }
    ]
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Network: <Network className="w-6 h-6" />,
  LineChart: <LineChart className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Share2: <Share2 className="w-6 h-6" />,
  Dashboard: <LayoutDashboard className="w-6 h-6" />,
  Sliders: <Sliders className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  BarChart: <BarChart3 className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  Quote: <Quote className="w-6 h-6" />,
  FileCode: <FileCode className="w-6 h-6" />,
  Workflow: <Workflow className="w-6 h-6" />,
  Milestone: <Milestone className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
  Check: <CheckCircle2 className="w-6 h-6" />,
  Audit: <SearchCode className="w-6 h-6" />,
  Analytics: <BarChart className="w-6 h-6" />,
  Preview: <Eye className="w-6 h-6" />,
  Beauty: <Sparkles className="w-6 h-6" />,
  Fashion: <Shirt className="w-6 h-6" />,
  Labs: <FlaskConical className="w-6 h-6" />,
  Medical: <HeartPulse className="w-6 h-6" />,
  Infinity: <Infinity className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Landmark: <Landmark className="w-6 h-6" />,
  Gift: <Gift className="w-6 h-6" />,
  Percent: <Percent className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Microscope: <Microscope className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Factory: <Factory className="w-6 h-6" />,
  MedicalPlus: <Stethoscope className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  HardDrive: <HardDrive className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  CircuitBoard: <CircuitBoard className="w-6 h-6" />,
  Radio: <Radio className="w-6 h-6" />,
  Component: <Component className="w-6 h-6" />,
  FileJson: <FileJson className="w-6 h-6" />,
  CloudLightning: <CloudLightning className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Wand2: <Wand2 className="w-6 h-6" />,
  Boxes: <Boxes className="w-6 h-6" />,
  GitMerge: <GitMerge className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  UserPlus: <UserPlus className="w-6 h-6" />,
  FileSearch: <FileSearch className="w-6 h-6" />,
  Megaphone: <Megaphone className="w-6 h-6" />,
  CheckSquare: <CheckSquare className="w-6 h-6" />,
  Store: <Store className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Container: <Container className="w-6 h-6" />,
  Blocks: <Blocks className="w-6 h-6" />,
  Handshake: <Handshake className="w-6 h-6" />,
  Languages: <Languages className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  UserCircle: <UserCircle className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  Send: <Send className="w-6 h-6" />,
  Box: <Box className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
  HomeIcon: <HomeIcon className="w-6 h-6" />,
  Image: <Image className="w-6 h-6" />,
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    industry: { en: 'SOHO Hero', zh: 'SOHO 英雄' },
    strategy: { en: 'A solo seller scaling from zero to $1M using Simiai GEO engines.', zh: '一名独立卖家利用 Simiai GEO 引擎从零成长为百万美金俱乐部成员。' },
    result: { en: '10x Efficiency Boost', zh: '10 倍效率提升' },
    insight: { en: 'Sovereignty = Control', zh: '主权即掌控' }
  }
];

export const AI_SEARCH_TOOLS: AISearchTool[] = [
  {
    name: 'Gemini 3 Pro',
    share: '45%',
    advantage: { en: 'Multi-modal logic reasoning', zh: '多模态逻辑推理' },
    suitability: { en: 'Your Global B2B Reach', zh: '你的全球 B2B 触达' },
    traffic: 'High'
  }
];

export const GEO_IMPLEMENTATION_STEPS: GeoStep[] = [
  {
    title: { en: 'Logic Mapping', zh: '逻辑映射' },
    description: { en: 'Linking your core vision to AI citation engines.', zh: '将你的核心愿景链接至 AI 引用引擎。' },
    timeline: 'Day 30'
  }
];

export const JOB_POSTINGS: JobPosting[] = [
  {
    title: { en: 'AI Workflow Architect', zh: 'AI 工作流架构师' },
    count: 5,
    salary: { en: 'Equity Focus', zh: '股权导向' },
    requirements: { en: ['Obsessed with Hero Growth'], zh: ['极度关注用户变强'] },
    benefits: { en: ['True Sovereignty'], zh: ['真正的个人主权'] }
  }
];

export const TAIJI_STRATEGY_FEATURES = [
  {
    icon: 'Store',
    title: { en: 'Your Shelf', zh: '你的货架' },
    description: { en: '10,000+ Stores Network.', zh: '接入 10,000+ 商超网络。' },
  },
  {
    icon: 'Video',
    title: { en: 'Your Traffic', zh: '你的流量' },
    description: { en: 'Automated viral flows.', zh: '全自动爆款流量。' },
  },
  {
    icon: 'ShieldCheck',
    title: { en: 'Your Data', zh: '你的数据' },
    description: { en: 'Absolute Sovereignty.', zh: '绝对的数据主权。' },
  },
];

export const ECOSYSTEM_MODULES: EcosystemModule[] = [
  {
    id: 'hero-logic',
    title: { en: 'Logic Core', zh: '逻辑核心' },
    description: { en: 'Inheriting your core business wisdom.', zh: '继承你的核心商业智慧。' },
    icon: 'Brain'
  }
];

export const LIGE_FIVE_STEPS = [
  { id: 'WHO', label: { en: 'WHO: Identity', zh: 'WHO: 身份' }, sub: { en: 'Define your hero role', zh: '定义你的英雄角色' }, icon: 'UserCircle' },
  { id: 'TOUCH', label: { en: 'TOUCH: Contact', zh: 'TOUCH: 触点' }, sub: { en: 'Perfect your presence', zh: '完美你的品牌存在' }, icon: 'Target' },
  { id: 'REACH', label: { en: 'REACH: Scale', zh: 'REACH: 规模' }, sub: { en: 'Launch global flows', zh: '启动全球流量' }, icon: 'Globe' },
  { id: 'HOOK', label: { en: 'HOOK: Bond', zh: 'HOOK: 羁绊' }, sub: { en: 'Secure conversion', zh: '确保用户转化' }, icon: 'Zap' },
  { id: 'SHELF', label: { en: 'SHELF: Reality', zh: 'SHELF: 现实' }, sub: { en: 'Claim physical space', zh: '占领物理空间' }, icon: 'Store' },
];

export const GARY_WORKFLOWS = [
  { id: 'wf1', label: { en: 'TikTok Gen', zh: 'TikTok 脚本' }, icon: 'Video' },
  { id: 'wf2', label: { en: 'GEO Audit', zh: 'GEO 审计' }, icon: 'SearchCode' },
  { id: 'wf3', icon: 'Bot', label: { en: 'Negotiator', zh: 'AI 谈判官' } },
];

export const CHANNEL_PARTNERS = [];

export const TECH_STACK = [
  { name: 'Gemini 3 Pro', desc: 'Logic Engine', icon: 'Brain' },
  { name: 'Veo 3.1', desc: 'Creative Engine', icon: 'Video' },
  { name: 'Taiji GEO', desc: 'Search Engine', icon: 'Search' },
];
