
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SYSTEMS, PRICING, ICON_MAP, UI_STRINGS, CASE_STUDIES, AI_SEARCH_TOOLS, GEO_IMPLEMENTATION_STEPS, CORE_VALUES, JOB_POSTINGS, LIGE_FIVE_STEPS, GARY_WORKFLOWS, TECH_STACK, STRATEGIC_PARTNERS, TOOL_CATEGORIES, AI_MODELS, GEO_BENEFITS, MCP_SERVERS } from '../constants';
import { AppView, Language, ChatMessage, GeoContent, ContentType, GeoDiagnostic, GeoKnowledgeUnit, AuthMode } from '../types';
import { calculateSovereignScore, chatWithModel, runGeoOptimization, analyzeGeoDiagnostic, refineGeoOptimization, generateVisualContent, fetchB2BLeadsIntelligence, fetchUrlContent, fetchShopifyProducts, deployGeoToMarketing, processKnowledgeUnit, runFineTuningEpoch, generateBatchGeoContent, fetchSystemHealth, fetchGeoIntelligence } from '../services/geminiService';
import { Search, Loader2, Play, Plus, Upload, Link, Check, ExternalLink, ArrowRight, Zap, Layers, Trash2, Edit3, ShieldAlert, CheckCircle2, MoreVertical, User, Users, Activity, Bell, Mail, Smartphone, Lock, Eye, EyeOff, Shield, Target, MousePointerClick, TrendingUp, BarChart3, Rocket, Globe, FileCode, Quote, Workflow, Radar, Milestone, Lightbulb, Trophy, Star, SearchCode, Milestone as StepIcon, Box, Sparkles, Sparkles as MarketIcon, FlaskConical, HeartPulse, Infinity, Monitor, ShieldCheck, MapPin, Scale, UserCheck, TrendingDown, LayoutDashboard, Database, Activity as ActivityIcon, DollarSign, Settings, ChevronRight, Briefcase, Landmark, Share2, Percent, Gift, Code, Database as DatabaseIcon, Microscope, Palette, Terminal, Brain, Factory, Shirt, Home, Cpu, CircuitBoard, Bot, Radio, HardDrive, Component, FileJson, CloudLightning, BadgeDollarSign, FileText, ShoppingBag, Wand2, Scale3D, Boxes, GitMerge, MessageSquare, UserPlus, FileSearch, Megaphone, CheckSquare, Store, Video, Truck, Server as ServerIcon, Container, Blocks, Handshake, Languages, Compass, UserCircle, X, Copy, ChevronDown, Send, ChevronUp, MousePointer2, Network, ScanSearch, CandlestickChart, VideoIcon, MessageCircle, MailSearch, UserCheck2, ListMusic, DatabaseZap, Globe2, ImageIcon, PaletteIcon, WandSparkles, Download, Layers3, MoveHorizontal, Crop, ShoppingCart, Fingerprint, Key, HardDrive as StorageIcon, FileJson2, Filter, Binary, Newspaper, BarChart4, ChevronRightCircle, RefreshCcw, FileCheck, Info, FileStack, LayoutTemplate, History, Layout, BookOpen, AlertCircle, Save, ShoppingBag as ShopifyIcon, AlertTriangle, FileUp, TableProperties, Sparkle, ListFilter, Settings2, ShieldAlert as GapIcon, Lightbulb as InsightIcon, SearchCode as TermIcon, FileSearch2, Wand, Share, SlidersHorizontal, FileUp as FileUploadIcon, BrainCircuit, DatabaseZap as VaultIcon, Info as InfoIcon, Heart, Globe as WorldIcon, ClipboardCheck } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar as ReRadar, ResponsiveContainer, PolarRadiusAxis, Legend, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';

interface ViewProps {
  language: Language;
}

interface AuthViewProps extends ViewProps {
  onAuthSuccess: () => void;
}

interface PublicHomeProps extends ViewProps {
  setView: (v: AppView) => void;
}

/**
 * Public Home View: The gateway for new heroes
 */
export const PublicHome: React.FC<PublicHomeProps> = ({ language, setView }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="pt-40 pb-32 space-y-32">
      <section className="max-w-7xl mx-auto px-8 text-center space-y-12">
        <div className="inline-flex items-center space-x-3 px-6 py-2 bg-primary/10 rounded-full text-xs font-black text-primary uppercase border border-primary/20">
          <Sparkle size={14} className="animate-pulse" /> <span>{t.beta}</span>
        </div>
        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
          {language === 'en' ? 'Master Your' : '主导你的'} <br />
          <span className="text-primary">{language === 'en' ? 'Sovereignty' : '主权故事'}</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
          {t.heroSub}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <button 
            onClick={() => setView(AppView.AUTH)}
            className="bg-primary text-white px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.5em] text-xs blue-glow hover:scale-105 transition-all shadow-2xl"
          >
            {t.launch}
          </button>
          <button 
            onClick={() => setView(AppView.PARTNERS)}
            className="glass text-white px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.5em] text-xs border border-white/10 hover:bg-white/5 transition-all"
          >
            {t.becomePartner}
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {SYSTEMS.slice(0, 3).map((sys, i) => (
          <div key={sys.id} className="glass p-12 rounded-[4rem] border-white/5 space-y-8 hover:border-primary/30 transition-all group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 group-hover:blue-glow">
              {ICON_MAP[sys.icon] || <Box size={32} />}
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight text-white">{sys.title[language]}</h3>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] leading-relaxed">{sys.description[language]}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

/**
 * 行业知识库系统 (Knowledge Base Hub)
 */
export const KnowledgeBaseView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [units, setUnits] = useState<GeoKnowledgeUnit[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleUpload = async () => {
    if (!title || !body) return;
    setIsProcessing(true);
    try {
      const unit = await processKnowledgeUnit(title, body);
      setUnits(prev => [unit, ...prev]);
      setTitle('');
      setBody('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-8 pb-20 space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
          <BookOpen size={14}/> <span>主权知识资产库 v1.0</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">{t.knowledgeBase}</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-12 rounded-[4rem] border-white/5 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:scale-110 transition-transform"><VaultIcon size={120} /></div>
            <h3 className="text-2xl font-black uppercase text-white relative z-10">录入新知识单元</h3>
            <div className="space-y-6 relative z-10">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="单元标题 (如：2025 欧美逆变器准入标准)" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" />
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="知识正文或原始文档摘录..." className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold resize-none" />
              <button onClick={handleUpload} disabled={isProcessing || !title} className="w-full py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs blue-glow flex items-center justify-center space-x-2">
                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <DatabaseIcon size={18} />}
                <span>注入语义空间</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {units.length === 0 ? (
              <div className="col-span-full h-64 glass rounded-[4rem] flex flex-col items-center justify-center space-y-4 opacity-30 border-dashed">
                <FileSearch2 size={64} />
                <p className="font-black uppercase tracking-widest">暂无知识资产，请从左侧开始录入</p>
              </div>
            ) : units.map(unit => (
              <div key={unit.id} className="glass p-8 rounded-[3rem] border-white/5 space-y-6 hover:border-primary/40 transition-all group shadow-xl">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-black uppercase text-white group-hover:text-primary transition-colors">{unit.title}</h4>
                  <div className="px-3 py-1 bg-accent/20 text-accent rounded-full text-[8px] font-black uppercase border border-accent/20">EMBEDDING_OK</div>
                </div>
                <p className="text-sm text-gray-500 font-bold line-clamp-3 leading-relaxed uppercase">{unit.body}</p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {unit.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-gray-400">#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 神经网络训练系统 (Neural Training Studio)
 */
export const NeuralTrainingView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [isTraining, setIsTraining] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const handleStartTraining = async () => {
    if (!instruction) return;
    setIsTraining(true);
    addLog(`INITIATING TRAINING SEQUENCE...`);
    addLog(`LOAD_DATA_SOURCE: Sovereign_Vault_v2.5`);
    
    try {
      const result = await runFineTuningEpoch(instruction, ["High precision conversion", "Brand authoritative tone", "GEO factor injection"]);
      addLog(`COMPILING_GRADIENTS...`);
      addLog(`OPTIMIZATION_COMPLETE: Loss reduced.`);
      addLog(result || 'Model bias updated successfully.');
    } catch (e) {
      addLog(`CRITICAL_ERROR: Gradient explosion detected.`);
    } finally {
      setIsTraining(false);
    }
  };

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [log]);

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-8 pb-20 space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-accent/10 rounded-full text-[10px] font-black text-accent uppercase border border-accent/20 shadow-lg">
          <BrainCircuit size={14}/> <span>主权大模型微调中心 • RLHF 强化循环已开启</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">{t.neuralTraining}</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8">
          <div className="glass p-12 rounded-[4rem] border-white/5 space-y-8 shadow-2xl">
            <h3 className="text-2xl font-black uppercase text-white">训练目标定义</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
              向主权模型下达“人格”或“专业度”训练指令。系统将基于知识库自动生成微调样本。
            </p>
            <div className="space-y-6">
              <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="例如：模拟专业能源顾问语气，对光伏技术术语进行 100% 精确校对，且带有极简主义的品牌风格..." className="w-full h-48 bg-black/60 border border-white/10 rounded-3xl p-8 text-sm font-bold text-accent outline-none focus:border-accent transition-all" />
              <button onClick={handleStartTraining} disabled={isTraining || !instruction} className="w-full py-7 bg-accent text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs blue-glow-accent flex items-center justify-center space-x-4">
                {isTraining ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                <span>执行主权进化</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-black/90 rounded-[4rem] border border-white/5 p-10 h-[600px] flex flex-col shadow-2xl shadow-accent/5">
             <header className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div className="flex space-x-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-[10px] font-mono text-accent/60">SOVEREIGN_NODE_STDOUT</span>
             </header>
             <div ref={terminalRef} className="flex-1 overflow-y-auto font-mono text-[11px] text-accent/80 space-y-2 custom-scrollbar">
                {log.length === 0 && <p className="opacity-20 animate-pulse">Awaiting neural instructions...</p>}
                {log.map((l, i) => (
                  <p key={i} className="leading-relaxed animate-in fade-in slide-in-from-left-2">{l}</p>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const strategyMap: Record<ContentType, string[]> = {
  PRODUCT: ['Statistics', 'Quotations', 'TechnicalTerms', 'UniqueWords'],
  BLOG: ['Fluent', 'UniqueWords', 'TechnicalTerms'],
  WHITEPAPER: ['Authoritative', 'Statistics', 'Quotations', 'TechnicalTerms'],
  FAQ: ['Fluent', 'TechnicalTerms'],
  HOWTO: ['Fluent', 'TechnicalTerms', 'UniqueWords'],
  OTHER: ['Fluent', 'UniqueWords'],
};

const GEO_FACTORS_LIST = [
  { id: 'Authoritative', icon: <ShieldCheck size={14} />, desc: '权威度：通过专家 persona 和公认的事实陈述建立品牌信任。' },
  { id: 'Statistics', icon: <BarChart4 size={14} />, desc: '统计数据：注入定量数据、百分比和具体市场指标以增强说服力。' },
  { id: 'Quotations', icon: <Quote size={14} />, desc: '引言引用：引用行业专家、满意客户或第三方机构的原始语录。' },
  { id: 'TechnicalTerms', icon: <Binary size={14} />, desc: '技术术语：使用行业特有的精确术语，展示深度的专业知识水平。' },
  { id: 'Fluent', icon: <Languages size={14} />, desc: '流畅度：优化语言结构，确保 AI 搜索在摘要提取时逻辑连贯。' },
  { id: 'UniqueWords', icon: <Fingerprint size={14} />, desc: '独特词汇：使用非通用词汇和差异化表述，提高信息的独特权重。' },
];

const PRESETS = [
  { id: 'trust', name: '权威信任型', weights: { Authoritative: 90, Statistics: 60, Quotations: 80, TechnicalTerms: 40, Fluent: 50, UniqueWords: 30 } },
  { id: 'tech', name: '专业技术型', weights: { Authoritative: 50, Statistics: 80, Quotations: 30, TechnicalTerms: 100, Fluent: 60, UniqueWords: 70 } },
  { id: 'market', name: '爆款增长型', weights: { Authoritative: 40, Statistics: 70, Quotations: 90, TechnicalTerms: 30, Fluent: 90, UniqueWords: 80 } },
];

/**
 * 太极 GEO 系统 - 核心视图
 */
export const TaijiGeoView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [activeTab, setActiveTab] = useState<'hub' | 'wizard' | 'batch'>('hub');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  
  const [step, setStep] = useState(1);
  const [geoInput, setGeoInput] = useState('');
  const [refineInput, setRefineInput] = useState('');
  const [sourceType, setSourceType] = useState<'url' | 'pdf' | 'text' | 'shopify'>('text');
  const [contentType, setContentType] = useState<ContentType>('PRODUCT');
  const [factorWeights, setFactorWeights] = useState<Record<string, number>>(
    Object.fromEntries(GEO_FACTORS_LIST.map(f => [f.id, 0]))
  );

  const [batchTopic, setBatchTopic] = useState('');
  const [batchCount, setBatchCount] = useState(5);
  const [batchResults, setBatchResults] = useState<any[]>([]);

  const [geoResult, setGeoResult] = useState<any>(null);
  const [diagnostic, setDiagnostic] = useState<GeoDiagnostic | null>(null);
  const [contentLibrary, setContentLibrary] = useState<GeoContent[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [shopifyProducts, setShopifyProducts] = useState<any[]>([]);

  useEffect(() => {
    if (step === 1 || activeTab === 'batch') {
      const defaults = strategyMap[contentType] || [];
      setFactorWeights(prev => {
        const next = { ...prev };
        GEO_FACTORS_LIST.forEach(f => {
          next[f.id] = defaults.includes(f.id) ? 75 : 10;
        });
        return next;
      });
    }
  }, [contentType, step, activeTab]);

  const applyPreset = (p: any) => setFactorWeights(p.weights);

  const handleFetchShopify = async () => {
    setIsProcessing(true);
    try {
      const prods = await fetchShopifyProducts();
      setShopifyProducts(prods);
    } catch (e) {
      alert("Failed to sync Product System.");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectProduct = (p: any) => {
    setGeoInput(`${p.title}\n\n${p.description}\n\nPrice: ${p.price}`);
    setSourceType('text');
  };

  const handlePublish = async () => {
    if (!selectedContentId) return;
    setIsPublishing(true);
    try {
      await deployGeoToMarketing(selectedContentId, 'google');
      alert("Sync Success: Strategy pushed to marketing node.");
    } catch (e) {
      alert("Sync Failed.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleFetchUrl = async () => {
    if (!geoInput.startsWith('http')) {
      alert("请输入有效的 URL");
      return;
    }
    setIsFetchingUrl(true);
    try {
      const content = await fetchUrlContent(geoInput);
      setGeoInput(content);
    } catch (e) {
      alert("Firecrawl 抓取失败。");
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (!geoInput) return;
    setIsProcessing(true);
    try {
      setStep(2); 
      const diag = await analyzeGeoDiagnostic(geoInput);
      setDiagnostic(diag);
      
      setFactorWeights(prev => {
        const next = { ...prev };
        diag.missingFactors.forEach(f => {
          if (next[f] < 50) next[f] = 85; 
        });
        return next;
      });
      
      setIsProcessing(false);
      setStep(3); 
    } catch (e) {
      setIsProcessing(false);
      setStep(1);
      alert("分析失败。");
    }
  };

  const handleRunOptimization = async () => {
    if (!diagnostic || !geoInput) return;
    setIsProcessing(true);
    try {
      setStep(4);
      const result = await runGeoOptimization(geoInput, factorWeights, diagnostic, language);
      setGeoResult(result);
      
      const newId = Math.random().toString(36).substr(2, 9);
      const newItem: GeoContent = {
        id: newId,
        tenantId: 't-default',
        title: geoInput.slice(0, 30) + '...',
        sourceType,
        type: contentType,
        status: 'DONE',
        createdAt: new Date().toLocaleDateString(),
        updatedAt: '刚刚',
        currentScore: result.overallScore,
        originalScore: diagnostic.overallScore,
        optimizedHtml: result.optimizedHtml,
        diagnostic: diagnostic,
        jsonLd: result.schema,
        optimizedFactors: result.optimizedFactors
      } as any;
      
      setContentLibrary(prev => [newItem, ...prev]);
      setIsProcessing(false);
      setStep(5);
    } catch (e) {
      setIsProcessing(false);
      setStep(3);
      alert("优化失败。");
    }
  };

  const handleBatchGenerate = async () => {
    if (!batchTopic) return;
    setIsProcessing(true);
    try {
      const results = await generateBatchGeoContent(batchTopic, batchCount, factorWeights);
      setBatchResults(results);
    } catch (e) {
      alert("批量生成失败。");
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedItem = useMemo(() => contentLibrary.find(i => i.id === selectedContentId), [contentLibrary, selectedContentId]);
  
  const radarData = useMemo(() => {
    const src = selectedItem?.diagnostic || diagnostic;
    const opt = selectedItem ? (selectedItem as any).optimizedFactors : geoResult?.optimizedFactors;
    const targetWeights = (step === 3 || activeTab === 'batch') ? factorWeights : null;

    if (!src && !targetWeights) return [];
    return GEO_FACTORS_LIST.map(f => ({
      subject: f.id,
      A: src ? Math.round((src.detectedFactors[f.id] || 0) * 100) : 0,
      B: opt ? Math.round((opt[f.id] || 0) * 100) : (targetWeights ? targetWeights[f.id] : 0)
    }));
  }, [selectedItem, diagnostic, geoResult, step, factorWeights, activeTab]);

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-8 pb-24 space-y-12">
       <header className="space-y-4">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
             <Binary size={14}/> <span>太极 GEO 指挥部 v2.5</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">太极 GEO 引擎</h1>
       </header>

       <div className="flex p-1.5 bg-white/5 rounded-[2.5rem] w-fit border border-white/10 backdrop-blur-3xl shadow-2xl">
          <button onClick={() => setActiveTab('hub')} className={`px-10 py-5 rounded-[1.8rem] text-[11px] font-black uppercase transition-all ${activeTab === 'hub' ? 'bg-primary text-white blue-glow' : 'text-gray-500 hover:text-white'}`}>资产库</button>
          <button onClick={() => { setActiveTab('wizard'); setStep(1); }} className={`px-10 py-5 rounded-[1.8rem] text-[11px] font-black uppercase transition-all ${activeTab === 'wizard' ? 'bg-primary text-white blue-glow' : 'text-gray-500 hover:text-white'}`}>优化实验室</button>
          <button onClick={() => setActiveTab('batch')} className={`px-10 py-5 rounded-[1.8rem] text-[11px] font-black uppercase transition-all ${activeTab === 'batch' ? 'bg-primary text-white blue-glow' : 'text-gray-500 hover:text-white'}`}>批量生成</button>
       </div>

       {activeTab === 'hub' && (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
               <div className="glass p-12 rounded-[4rem] border-white/5 space-y-10 shadow-2xl">
                  <header className="flex justify-between items-center border-b border-white/5 pb-8">
                    <h3 className="text-2xl font-black uppercase text-white">已优化资产库</h3>
                    <button onClick={() => setActiveTab('wizard')} className="bg-primary/10 text-primary px-6 py-2 rounded-full font-black text-[10px] uppercase border border-primary/20 hover:bg-primary/20 transition-all">新建优化</button>
                  </header>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                      <thead>
                        <tr className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-4">
                          <th className="pb-4 pl-8">资产详情</th>
                          <th className="pb-4 text-center">状态</th>
                          <th className="pb-4 text-center text-primary">GEO 评分</th>
                          <th className="pb-4 text-center">效能对比</th>
                          <th className="pb-4 pr-8 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentLibrary.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-20 text-gray-700 font-bold uppercase tracking-widest">暂无记录</td>
                          </tr>
                        ) : contentLibrary.map(item => (
                          <tr 
                            key={item.id} 
                            onClick={() => setSelectedContentId(item.id)} 
                            className={`group cursor-pointer transition-all ${selectedContentId === item.id ? 'bg-primary/5' : 'hover:bg-white/[0.02]'}`}
                          >
                            <td className="py-6 pl-8 rounded-l-[2rem] border-y border-l border-white/5 group-hover:border-primary/20">
                               <div className="flex items-center space-x-6">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${selectedContentId === item.id ? 'bg-primary text-white blue-glow' : 'bg-white/5 text-primary'}`}>
                                     <FileText size={20} />
                                  </div>
                                  <div>
                                     <h4 className="font-black text-sm text-white uppercase truncate max-w-[200px]">{item.title}</h4>
                                     <p className="text-[9px] text-gray-600 font-bold uppercase mt-1">{item.type} • {item.updatedAt}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="py-6 text-center border-y border-white/5 group-hover:border-primary/20">
                               <span className="inline-flex items-center px-3 py-1 bg-accent/10 rounded-full text-[8px] font-black text-accent uppercase border border-accent/20">
                                  {item.status}
                               </span>
                            </td>
                            <td className="py-6 text-center border-y border-white/5 group-hover:border-primary/20">
                               <div className="flex flex-col items-center">
                                  <span className="text-2xl font-black text-primary tracking-tighter">{item.currentScore}%</span>
                                  <span className="text-[7px] font-black text-gray-600 uppercase">Current</span>
                               </div>
                            </td>
                            <td className="py-6 text-center border-y border-white/5 group-hover:border-primary/20">
                               <div className="flex items-center justify-center space-x-1 text-accent">
                                  <TrendingUp size={10}/>
                                  <span className="text-[10px] font-black">+{item.currentScore! - item.originalScore!}%</span>
                               </div>
                            </td>
                            <td className="py-6 pr-8 rounded-r-[2rem] border-y border-r border-white/5 group-hover:border-primary/20 text-right">
                               <button className="p-3 glass rounded-xl text-gray-600 hover:text-primary transition-all">
                                  <ExternalLink size={16}/>
                                </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedItem && (
                    <div className="mt-12 p-10 glass rounded-[3.5rem] border-primary/20 bg-primary/5 space-y-8 animate-in slide-in-from-bottom-5">
                       <header className="flex justify-between items-center border-b border-white/10 pb-6">
                          <h3 className="text-xl font-black uppercase text-white flex items-center space-x-3">
                             <FileCheck size={24} className="text-primary" />
                             <span>主权内容预览</span>
                          </h3>
                          <button onClick={handlePublish} disabled={isPublishing} className="bg-primary text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] blue-glow flex items-center space-x-2">
                             {isPublishing ? <Loader2 className="animate-spin" size={14} /> : <Share size={14} />}
                             <span>同步营销系统</span>
                          </button>
                       </header>
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="max-h-[350px] overflow-y-auto custom-scrollbar prose prose-invert prose-blue max-w-none text-gray-400 text-sm bg-black/40 p-6 rounded-3xl" dangerouslySetInnerHTML={{ __html: selectedItem.optimizedHtml }}></div>
                          <div className="bg-black/50 p-6 rounded-3xl border border-white/5 space-y-4">
                             <h4 className="text-[10px] font-black text-primary uppercase flex items-center space-x-2"><FileCode size={14} /> <span>SCHEMA 标记</span></h4>
                             <pre className="text-[9px] font-mono text-accent/80 overflow-x-auto whitespace-pre custom-scrollbar h-60 bg-black/60 p-4 rounded-xl">
                                {selectedItem.jsonLd || "// No schema generated"}
                             </pre>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </div>
            <div className="lg:col-span-4">
               {selectedItem ? (
                 <div className="glass p-12 rounded-[4rem] border-white/5 space-y-12 shadow-2xl sticky top-32">
                    <h3 className="text-xl font-black uppercase text-white border-b border-white/5 pb-6">因子效能分布</h3>
                    <div className="h-[300px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                             <PolarGrid stroke="rgba(255,255,255,0.05)" />
                             <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} />
                             <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                             <ReRadar name="Baseline" dataKey="A" stroke="#666" fill="#666" fillOpacity={0.1} />
                             <ReRadar name="Optimized" dataKey="B" stroke="#007AFF" fill="#007AFF" fillOpacity={0.4} strokeWidth={3} />
                             <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                          </RadarChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="p-6 glass rounded-2xl border-l-4 border-primary bg-primary/5">
                       <p className="text-[10px] font-black text-primary uppercase mb-2">主权评分提升：</p>
                       <h5 className="text-4xl font-black text-white">+{selectedItem.currentScore! - selectedItem.originalScore!}%</h5>
                    </div>
                 </div>
               ) : (
                 <div className="glass p-12 rounded-[4rem] border-white/5 shadow-2xl text-center space-y-6 opacity-40">
                    <BarChart4 size={100} className="mx-auto text-primary" />
                    <p className="text-xs font-black uppercase tracking-[0.3em]">选择一个资产查看详细分析</p>
                 </div>
               )}
            </div>
         </div>
       )}

       {activeTab === 'wizard' && (
         <div className="max-w-5xl mx-auto w-full">
            <div className="glass p-16 rounded-[5rem] border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-white/5 overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-[1000ms]" style={{ width: `${(step/5)*100}%` }}></div>
               </div>
               
               {step === 1 && (
                 <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="text-center space-y-6">
                       <div className="w-24 h-24 bg-primary/20 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary border border-primary/20"><FileUploadIcon size={40}/></div>
                       <h3 className="text-5xl font-black uppercase tracking-tighter text-white">主权资产摄入</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-8">
                          <div className="grid grid-cols-2 gap-4">
                             {[
                                { id: 'text', label: '纯文本', icon: <FileText size={20} /> },
                                { id: 'url', label: 'MCP 抓取', icon: <Network size={20} /> },
                                { id: 'pdf', label: 'PDF 扫描', icon: <FileUp size={20} /> },
                                { id: 'shopify', label: '产品系统', icon: <ShoppingBag size={20} /> }
                             ].map(s => (
                               <button key={s.id} onClick={() => setSourceType(s.id as any)} className={`py-6 rounded-[2rem] text-[10px] font-black uppercase transition-all flex flex-col items-center space-y-3 ${sourceType === s.id ? 'bg-primary text-white scale-105 shadow-xl' : 'glass text-gray-600 border-white/5 hover:text-white'}`}>
                                  {s.icon}
                                  <span>{s.label}</span>
                               </button>
                             ))}
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                             {['PRODUCT', 'BLOG', 'FAQ', 'WHITEPAPER'].map(t => (
                               <button key={t} onClick={() => setContentType(t as any)} className={`py-4 rounded-xl text-[9px] font-black uppercase transition-all ${contentType === t ? 'bg-accent text-white border-accent shadow-lg' : 'glass text-gray-600 hover:text-white border-white/5'}`}>{t}</button>
                             ))}
                          </div>
                       </div>
                       <textarea value={geoInput} onChange={(e) => setGeoInput(e.target.value)} placeholder="在此处输入内容或 URL 进行诊断..." className="w-full min-h-[450px] bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 font-bold text-sm focus:border-primary transition-all custom-scrollbar shadow-inner text-white resize-none" />
                    </div>
                    <div className="flex justify-end pt-8 border-t border-white/5">
                       <button onClick={handleStartAnalysis} disabled={!geoInput || isProcessing} className="bg-primary text-white px-20 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm blue-glow flex items-center space-x-6">
                          {isProcessing ? <Loader2 className="animate-spin" /> : <Zap size={20}/>}
                          <span>执行神经网络诊断</span>
                       </button>
                    </div>
                 </div>
               )}

               {step === 2 && (
                 <div className="py-40 flex flex-col items-center justify-center space-y-12">
                    <div className="relative"><div className="w-80 h-80 rounded-full border-[14px] border-primary/5 border-t-primary animate-spin"></div><div className="absolute inset-0 flex items-center justify-center"><FileSearch2 size={80} className="text-primary animate-pulse" /></div></div>
                    <h4 className="text-3xl font-black uppercase text-white tracking-widest">正在解析内容主权...</h4>
                 </div>
               )}

               {step === 3 && diagnostic && (
                 <div className="space-y-12 animate-in fade-in">
                    <header className="flex justify-between items-end border-b border-white/5 pb-10">
                       <div className="space-y-4">
                          <h3 className="text-4xl font-black uppercase tracking-tighter text-white">诊断完成：策略推荐</h3>
                          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">当前 GEO 基准评分: <span className="text-primary font-black">{diagnostic.overallScore}%</span></p>
                       </div>
                       <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-gray-600 hover:text-white underline">重新摄入资产</button>
                    </header>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                       <div className="lg:col-span-7 glass p-12 rounded-[3.5rem] border-white/5 space-y-10 bg-primary/5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-black uppercase text-primary flex items-center space-x-4"><SlidersHorizontal size={24} /><span>策略因子精准调优</span></h4>
                            <div className="flex space-x-2">
                               {PRESETS.map(p => (
                                 <button key={p.id} onClick={() => applyPreset(p)} className="px-4 py-1.5 glass rounded-full text-[9px] font-black uppercase border border-white/10 hover:border-primary/40 transition-all text-gray-400 hover:text-primary">{p.name}</button>
                               ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-8 pt-4">
                             {GEO_FACTORS_LIST.map(factor => (
                                <div key={factor.id} className="space-y-4 group">
                                   <div className="flex justify-between items-center">
                                      <div className="flex items-center space-x-4">
                                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${factorWeights[factor.id] > 0 ? 'bg-primary text-white blue-glow' : 'bg-white/5 text-gray-600'}`}>{factor.icon}</div>
                                         <div>
                                            <span className="text-xs font-black uppercase tracking-widest text-white block">{factor.id}</span>
                                            <p className="text-[8px] text-gray-500 font-bold uppercase leading-tight mt-1 max-w-[200px]">{factor.desc}</p>
                                         </div>
                                      </div>
                                      <span className="text-sm font-mono text-primary font-black tracking-tighter">{factorWeights[factor.id]}%</span>
                                   </div>
                                   <input type="range" min="0" max="100" step="5" value={factorWeights[factor.id]} onChange={(e) => setFactorWeights(prev => ({ ...prev, [factor.id]: parseInt(e.target.value) }))} className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary focus:outline-none transition-all hover:bg-white/10" />
                                </div>
                             ))}
                          </div>
                       </div>
                       <div className="lg:col-span-5 space-y-10">
                          <div className="glass p-12 rounded-[4rem] border-white/5 space-y-8 bg-gradient-to-br from-black/40 to-transparent">
                             <h4 className="text-sm font-black uppercase text-white border-b border-white/10 pb-6 tracking-widest flex items-center space-x-3"><Radar size={16} className="text-primary" /><span>策略效能分布预期</span></h4>
                             <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                   <RadarChart cx="50%" cy="50%" outerRadius="85%" data={radarData}>
                                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'black' }} />
                                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                      <ReRadar name="Baseline" dataKey="A" stroke="#444" fill="#444" fillOpacity={0.1} strokeWidth={1} />
                                      <ReRadar name="Strategy" dataKey="B" stroke="#007AFF" fill="#007AFF" fillOpacity={0.4} strokeWidth={4} />
                                      <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                   </RadarChart>
                                </ResponsiveContainer>
                             </div>
                             <div className="p-6 glass rounded-2xl border-l-4 border-accent bg-accent/5">
                                <div className="flex items-center space-x-3 mb-2 text-accent">
                                   <InfoIcon size={14} />
                                   <span className="text-[10px] font-black uppercase tracking-widest">专家提示</span>
                                </div>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase">
                                  根据 Perplexity 检索模型，提高 [Statistics] 与 [TechnicalTerms] 的权重通常能显著提升 70% 以上的搜索引用倾向。
                                </p>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="flex justify-end pt-8 border-t border-white/5">
                       <button onClick={handleRunOptimization} disabled={Object.values(factorWeights).every(v => v === 0) || isProcessing} className="bg-primary text-white px-20 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm blue-glow flex items-center space-x-8 hover:scale-105 active:scale-95 transition-all">
                          {isProcessing ? <Loader2 className="animate-spin" /> : <Rocket size={24}/>}
                          <span>启动主权进化引擎</span>
                       </button>
                    </div>
                 </div>
               )}
            </div>
         </div>
       )}

       {activeTab === 'batch' && (
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-bottom-5">
            <div className="lg:col-span-8 space-y-10">
               <div className="glass p-16 rounded-[5rem] border-white/5 space-y-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-accent shadow-[0_0_20px_rgba(52,199,89,0.3)]"></div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-white flex items-center space-x-4">
                     <Layers3 size={32} className="text-accent" />
                     <span>高通量 GEO 内容生成</span>
                  </h3>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">基于主权知识库与微调模型，一次性生成多组高引用率内容。</p>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase px-4">生成主题</label>
                       <input value={batchTopic} onChange={(e) => setBatchTopic(e.target.value)} placeholder="输入生成主题 (如：工业级太阳能逆变器市场分析)" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white font-bold outline-none focus:border-accent transition-all" />
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-6">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">生成数量:</span>
                          {[5, 10, 20].map(n => (
                            <button key={n} onClick={() => setBatchCount(n)} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${batchCount === n ? 'bg-accent text-black shadow-lg shadow-accent/20' : 'glass text-white hover:bg-white/5'}`}>{n}</button>
                          ))}
                       </div>
                       <button onClick={handleBatchGenerate} disabled={isProcessing || !batchTopic} className="bg-accent text-black px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center space-x-3 hover:scale-105 active:scale-95 transition-all">
                          {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                          <span>立即生成批量</span>
                       </button>
                    </div>
                  </div>
               </div>

               {batchResults.length > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-500">
                    {batchResults.map((res, i) => (
                      <div key={i} className="glass p-10 rounded-[3rem] border-white/5 space-y-6 group hover:border-accent/40 transition-all shadow-xl">
                         <div className="flex justify-between items-start">
                            <h4 className="text-xl font-black uppercase text-white group-hover:text-accent transition-colors">{res.title}</h4>
                            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[8px] font-black uppercase border border-accent/20">{res.dominantFactor} Dominant</span>
                         </div>
                         <p className="text-sm text-gray-500 font-bold leading-relaxed line-clamp-4 uppercase">{res.text}</p>
                         <button className="text-[9px] font-black text-accent uppercase tracking-widest flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>导出资产</span>
                            <ArrowRight size={12} />
                         </button>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="glass p-12 rounded-[4rem] border-white/5 space-y-10 bg-primary/5 sticky top-32">
                  <header className="flex items-center justify-between border-b border-white/10 pb-6">
                    <h4 className="text-sm font-black uppercase text-primary flex items-center space-x-3">
                       <SlidersHorizontal size={18} />
                       <span>生成策略权重</span>
                    </h4>
                    <button onClick={() => setContentType('PRODUCT')} className="text-[10px] font-black text-gray-600 hover:text-primary transition-colors underline uppercase">重置</button>
                  </header>
                  
                  <div className="space-y-6">
                    {GEO_FACTORS_LIST.map(factor => (
                       <div key={factor.id} className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase">
                             <span className="text-gray-400">{factor.id}</span>
                             <span className="text-primary">{factorWeights[factor.id]}%</span>
                          </div>
                          <input type="range" min="0" max="100" step="10" value={factorWeights[factor.id]} onChange={(e) => setFactorWeights(prev => ({ ...prev, [factor.id]: parseInt(e.target.value) }))} className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary" />
                       </div>
                    ))}
                  </div>

                  <div className="h-[200px] w-full mt-8">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                           <PolarGrid stroke="rgba(255,255,255,0.05)" />
                           <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 8, fontWeight: 'bold' }} />
                           <ReRadar name="Batch Strategy" dataKey="B" stroke="#007AFF" fill="#007AFF" fillOpacity={0.3} strokeWidth={2} />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

/**
 * User Growth Dashboard
 */
export const UserDashboard: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-8 pb-20 space-y-16">
       <header className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
             <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
                <LayoutDashboard size={14}/> <span>主权指挥中心 • 会话处于活跃状态</span>
             </div>
             <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">欢迎回来，指挥官</h1>
             <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">{t.osRunning}</p>
          </div>
          <button className="bg-white text-black px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center space-x-3">
             <Plus size={18} /> <span>创建新任务</span>
          </button>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: '品牌曝光增长', val: '98%', icon: <TrendingUp />, color: 'text-primary' },
            { label: 'AI 搜索引用率', val: '84%', icon: <Eye />, color: 'text-accent' },
            { label: '内容主权评分', val: '92', icon: <Trophy />, color: 'text-white' }
          ].map((m, i) => (
            <div key={i} className="glass p-12 rounded-[3.5rem] border-white/5 space-y-6 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-all">
               <div className="absolute top-0 right-0 p-10 text-white/5 opacity-40 group-hover:scale-125 group-hover:text-primary/20 transition-all">{m.icon}</div>
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">{m.label}</p>
               <h3 className={`text-6xl font-black ${m.color} uppercase tracking-tighter`}>{m.val}</h3>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-primary" style={{ width: m.val.includes('%') ? m.val : '92%' }}></div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export const RDStudio: React.FC<ViewProps> = ({ language }) => (
  <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-16">
     <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
           <FlaskConical size={14}/> <span>研发生态中心 • 协议 V5.2</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">研发逻辑中心</h1>
     </header>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass p-16 rounded-[5rem] border-white/5 space-y-12 shadow-2xl relative group overflow-hidden bg-gradient-to-br from-primary/10 to-transparent hover:border-primary/40 transition-all">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-primary group-hover:opacity-10 group-hover:scale-110 transition-all"><CircuitBoard size={250} /></div>
           <h3 className="text-4xl font-black uppercase tracking-tight relative z-10 text-white">神经工作流 design</h3>
           <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm relative z-10 leading-relaxed">为您的特定业务逻辑映射自定义 AI 智能体集群。</p>
           <button className="bg-primary text-white px-12 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs blue-glow relative z-10 shadow-2xl">立即设计蓝图</button>
        </div>
        <div className="glass p-16 rounded-[5rem] border-white/5 space-y-12 shadow-2xl relative group overflow-hidden bg-gradient-to-br from-accent/10 to-transparent hover:border-accent/40 transition-all">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-accent group-hover:opacity-10 group-hover:scale-110 transition-all"><Terminal size={250} /></div>
           <h3 className="text-4xl font-black uppercase tracking-tight relative z-10 text-white">自动化管线测试</h3>
           <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm relative z-10 leading-relaxed">对 1000+ API 节点进行延迟与输出准确度实时压力测试。</p>
           <button className="bg-accent text-white px-12 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl relative z-10">运行测试节点</button>
        </div>
     </div>
  </div>
);

export const ApiStudio: React.FC<ViewProps> = ({ language }) => (
  <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-16">
     <header className="space-y-4">
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">API 总指挥部</h1>
        <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">管理与集成 Simiai Gateway 下的所有主权 API</p>
     </header>
     <div className="glass p-16 rounded-[5rem] border-white/5 space-y-10 shadow-2xl bg-black/40">
        <div className="flex items-center space-x-8 border-b border-white/5 pb-12">
           <div className="px-8 py-3 bg-primary/20 text-primary rounded-[1.5rem] text-sm font-black uppercase tracking-[0.3em] border border-primary/20 shadow-lg">POST</div>
           <div className="text-xl font-mono text-gray-400 tracking-tight">https://api.simiai.os/v1/sovereign-matrix</div>
        </div>
        <div className="bg-black/80 p-12 rounded-[3.5rem] border border-white/5 font-mono text-sm text-accent/80 overflow-x-auto h-[450px] custom-scrollbar shadow-inner leading-relaxed">
           {`{
  "request_id": "sim_78945231_master",
  "auth_type": "physical_node_isolation",
  "active_nodes": [
    "openrouter-gpt-4o-7712",
    "aiml-claude-3-8823",
    "bext-image-v4-9901"
  ],
  "sovereignty_parameters": {
    "zero_knowledge": true,
    "row_level_isolation": "enabled",
    "encryption": "AES_256_GCM_PROVIDER"
  },
  "status": "ready_to_compute"
}`}
        </div>
        <div className="flex justify-between items-center">
           <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">当前请求状态：200 OK • 耗时：45ms</p>
           <button className="text-primary font-black uppercase tracking-widest text-xs hover:underline flex items-center space-x-2">
              <Copy size={16}/> <span>复制代码</span>
           </button>
        </div>
     </div>
  </div>
);

export const AuthView: React.FC<AuthViewProps> = ({ language, onAuthSuccess }) => {
  const t = UI_STRINGS[language];
  const [mode, setMode] = useState<AuthMode>('login');
  return (
    <div className="min-h-screen pt-32 px-4 flex items-center justify-center bg-neutral-dark">
      <div className="w-full max-w-md glass p-12 rounded-[3.5rem] border-white/5 space-y-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
        <div className="text-center space-y-4">
           <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 blue-glow shadow-2xl">
              <Shield size={32} className="text-white" />
           </div>
           <h2 className="text-3xl font-black uppercase tracking-tight text-white">{mode === 'login' ? t.signIn : t.signUp}</h2>
           <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t.authSub}</p>
        </div>
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase px-4">{t.email}</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all font-bold text-sm text-white" placeholder="hero@simiai.os" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase px-4">{t.password}</label>
              <input type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all font-bold text-sm text-white" placeholder="••••••••" />
           </div>
        </div>
        <button onClick={onAuthSuccess} className="w-full bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs blue-glow hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
           {mode === 'login' ? t.signIn : t.signUp}
        </button>
        <p className="text-center text-[10px] font-black text-gray-500 uppercase">
           {mode === 'login' ? t.noAccount : t.hasAccount}{' '}
           <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-primary hover:underline transition-all font-black">
             {mode === 'login' ? t.signUp : t.signIn}
           </button>
        </p>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC<ViewProps> = ({ language }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemHealth().then(res => {
      setStats(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="pt-40 flex justify-center"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-red-500/10 rounded-full text-[10px] font-black text-red-500 uppercase border border-red-500/20 shadow-lg">
          <Shield size={14}/> <span>最高权限控制台 • Root Access</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">系统统领中心</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: '活跃主权节点', value: stats.activeNodes, icon: <Network /> },
          { label: '全局吞吐量', value: stats.throughput, icon: <Activity /> },
          { label: '平均响应耗时', value: stats.latency, icon: <Zap /> },
          { label: '加密等级', value: stats.sovereignEncryption, icon: <Lock /> },
        ].map((s, i) => (
          <div key={i} className="glass p-10 rounded-[3rem] border-white/5 space-y-4 group">
            <div className="text-primary group-hover:scale-110 transition-transform">{s.icon}</div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label}</p>
            <h4 className="text-3xl font-black text-white">{s.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass p-12 rounded-[4rem] border-white/5 space-y-8">
          <h3 className="text-2xl font-black uppercase text-white">主权计算资源监控 (实时)</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={[{n:1,u:20},{n:2,u:45},{n:3,u:30},{n:4,u:55},{n:5,u:40},{n:6,u:stats.computeUsage}]}>
                 <defs>
                   <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <Area type="monotone" dataKey="u" stroke="#007AFF" fillOpacity={1} fill="url(#colorUv)" strokeWidth={4} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-4 glass p-12 rounded-[4rem] border-white/5 space-y-6">
           <h3 className="text-xl font-black uppercase text-white">安全日志</h3>
           <div className="space-y-4 font-mono text-[10px] text-gray-500 overflow-y-auto max-h-64 custom-scrollbar">
             <p className="text-accent">[OK] Zero-Knowledge handshake completed.</p>
             <p>[INFO] Node #422 syncing with gateway.</p>
             <p className="text-primary">[AUTH] Admin elevation verified.</p>
             <p>[INFO] GEO content batch deployed (ID: x921)</p>
             <p className="text-red-500">[WARN] High latency detected in Europe-West-1.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const GeoInsights: React.FC<ViewProps> = ({ language }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGeoIntelligence().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="pt-40 flex justify-center"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-12">
      <header className="space-y-4">
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">全球 GEO 情报库</h1>
        <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">基于 41 个主要市场的实时可见度洞察</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass p-12 rounded-[4rem] border-white/5 space-y-10">
          <h3 className="text-2xl font-black uppercase text-white">区域可见度评分 (Region Score)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="region" tick={{fill:'#555', fontSize: 10, fontWeight: 'bold'}} />
                <YAxis tick={{fill:'#555', fontSize: 10}} />
                <Tooltip contentStyle={{backgroundColor:'#111', border:'none', borderRadius:'1rem'}} />
                <Bar dataKey="visibility" fill="#007AFF" radius={[10,10,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {data.map((r, i) => (
            <div key={i} className="glass p-8 rounded-[3rem] border-white/5 flex items-center justify-between group hover:border-primary/40 transition-all">
              <div className="flex items-center space-x-6">
                 <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary"><WorldIcon size={20} /></div>
                 <div>
                    <h4 className="text-lg font-black uppercase text-white">{r.region}</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">正在流行: <span className="text-accent">{r.trending}</span></p>
                 </div>
              </div>
              <div className="text-right">
                 <div className="text-2xl font-black text-primary">{r.visibility}%</div>
                 <div className="text-[9px] font-black text-gray-600 uppercase">{r.dominance} Dominance</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RecruitmentView: React.FC<ViewProps> = ({ language }) => {
  const [step, setStep] = useState(1);
  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full glass p-16 rounded-[5rem] border-white/5 space-y-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 text-primary/5"><UserPlus size={200} /></div>
         
         {step === 1 && (
           <div className="space-y-10 relative z-10 text-center animate-in fade-in">
              <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto blue-glow"><Trophy size={40} className="text-white" /></div>
              <div className="space-y-4">
                 <h2 className="text-4xl font-black uppercase tracking-tighter">加入 Simiai 核心团队</h2>
                 <p className="text-gray-500 font-bold uppercase tracking-widest text-sm leading-relaxed">
                   我们正在寻找有主权意识的开发者、增长专家与商业英雄，共同构建 AI-Native 帝国。
                 </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                 {['AI 算法架构师', 'GEO 增长合伙人', '主权数据治理官'].map((job, i) => (
                   <button key={i} onClick={() => setStep(2)} className="w-full py-6 glass rounded-[2rem] border-white/5 hover:border-primary/40 text-left px-8 flex justify-between items-center group transition-all">
                      <span className="font-black uppercase tracking-widest text-xs text-gray-400 group-hover:text-white">{job}</span>
                      <ArrowRight size={18} className="text-primary group-hover:translate-x-2 transition-transform" />
                   </button>
                 ))}
              </div>
           </div>
         )}

         {step === 2 && (
           <div className="space-y-10 relative z-10 animate-in slide-in-from-right">
              <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-gray-500 hover:text-white underline">返回列表</button>
              <h2 className="text-4xl font-black uppercase tracking-tighter">提交主权简历</h2>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase px-4">Github / Portfolio URL</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" placeholder="https://github.com/hero" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase px-4">核心主权愿景 (200字以内)</label>
                    <textarea className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold resize-none" placeholder="为什么你认为你是我们正在寻找的英雄？" />
                 </div>
                 <button onClick={() => setStep(3)} className="w-full py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs blue-glow shadow-2xl">同步至人才矩阵</button>
              </div>
           </div>
         )}

         {step === 3 && (
           <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-in zoom-in">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent"><ClipboardCheck size={48} /></div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">申请已加密上传</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-center text-xs">
                我们会通过您的主权联系方式进行异步回复。Stay Unstoppable.
              </p>
              <button onClick={() => setStep(1)} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest">返回</button>
           </div>
         )}
      </div>
    </div>
  );
};

export const PartnersView: React.FC<ViewProps> = ({ language }) => {
  return (
    <div className="pt-24 min-h-screen px-10 pb-20 space-y-20 flex flex-col items-center">
      <header className="text-center space-y-6 max-w-4xl">
        <h1 className="text-8xl font-black tracking-tighter uppercase leading-none">战略主权同盟</h1>
        <p className="text-xl text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
          与全球顶尖技术提供商与行业协会共同构建安全、透明、高效的 AI 贸易生态。
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 w-full max-w-7xl">
         {STRATEGIC_PARTNERS.map(p => (
           <div key={p.id} className="glass aspect-video rounded-[3rem] border-white/5 flex flex-col items-center justify-center space-y-4 group hover:border-primary/40 transition-all cursor-pointer">
              <div className="text-primary group-hover:scale-110 transition-transform"><Handshake size={48} /></div>
              <span className="font-black uppercase tracking-widest text-[10px] text-gray-500 group-hover:text-white transition-colors">{p.name}</span>
           </div>
         ))}
         {Array.from({length:5}).map((_, i) => (
           <div key={i} className="glass aspect-video rounded-[3rem] border-white/5 border-dashed flex items-center justify-center opacity-20">
              <Plus size={32} />
           </div>
         ))}
      </div>

      <div className="glass p-16 rounded-[5rem] border-white/5 max-w-5xl w-full text-center space-y-10 bg-gradient-to-br from-primary/5 to-transparent">
         <h2 className="text-4xl font-black uppercase tracking-tighter">成为我们的战略伙伴</h2>
         <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
           如果您拥有核心数据节点、高通量计算资源或深厚的行业 Know-how，欢迎加入 Simiai 英雄同盟。
         </p>
         <button className="bg-primary text-white px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.5em] text-xs blue-glow">提交入盟申请</button>
      </div>
    </div>
  );
};

export const ToolsDirectory: React.FC<ViewProps> = ({ language }) => {
  const [search, setSearch] = useState('');
  const categories = ['All', 'Growth', 'Automation', 'Logic', 'Vision', 'Finance'];
  const [activeCat, setActiveCat] = useState('All');

  return (
    <div className="pt-24 px-10 pb-20 space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-16">
        <div className="space-y-4">
          <h1 className="text-8xl font-black tracking-tighter uppercase leading-none">工具矩阵</h1>
          <p className="text-xl text-gray-500 font-bold uppercase tracking-widest">100+ 主权 AI 工作流套件</p>
        </div>
        <div className="relative w-full md:w-96">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
           <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-16 py-5 text-white font-bold outline-none focus:border-primary transition-all" placeholder="搜寻主权工具..." />
        </div>
      </header>

      <div className="flex flex-wrap gap-4">
         {categories.map(c => (
           <button key={c} onClick={() => setActiveCat(c)} className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCat === c ? 'bg-primary text-white blue-glow' : 'glass text-gray-500 hover:text-white'}`}>{c}</button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {Array.from({length:12}).map((_, i) => (
           <div key={i} className="glass p-10 rounded-[4rem] border-white/5 space-y-8 group hover:border-primary/40 transition-all flex flex-col justify-between shadow-2xl">
              <div className="space-y-6">
                 <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary group-hover:blue-glow transition-all"><CircuitBoard size={32}/></div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">Tool Node #{i+101}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">High performance logic processor for cross-border optimization.</p>
                 </div>
              </div>
              <button className="w-full py-5 glass border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all">挂载工作流</button>
           </div>
         ))}
      </div>
    </div>
  );
};

export const MCPMarketView: React.FC<ViewProps> = ({ language }) => (
  <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-16">
     <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
           <Link size={14}/> <span>MCP.so 通用连接市场 • 17,223+ 服务器</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">MCP 万物连接</h1>
     </header>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {MCP_SERVERS.map(mcp => (
          <div key={mcp.id} className="glass p-10 rounded-[3.5rem] border-white/5 space-y-8 hover:border-primary/40 transition-all flex flex-col justify-between shadow-2xl">
             <div className="space-y-6">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-primary border border-white/10 shadow-inner">
                   <ServerIcon size={32} />
                </div>
                <div>
                   <h3 className="text-2xl font-black uppercase tracking-tight text-white">{mcp.name}</h3>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">{mcp.category}</p>
                </div>
             </div>
             <button className="w-full py-5 bg-primary text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] blue-glow shadow-xl">挂载主权协议</button>
          </div>
        ))}
     </div>
  </div>
);

export const OSAssistantView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await chatWithModel([...messages, userMsg], 'gemini-3-flash-preview', language);
      setMessages(prev => [...prev, { role: 'assistant', content: reply || 'Error' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection to AI Matrix lost. Please retry." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 lg:pl-64 h-screen flex flex-col px-10 pb-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">{t.osAssistant}</h1>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t.assistantSub}</p>
      </header>
      <div className="flex-1 glass rounded-[3.5rem] border-white/5 overflow-hidden flex flex-col relative shadow-2xl">
        <div ref={scrollRef} className="flex-1 p-10 space-y-8 overflow-y-auto custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center space-y-6">
              <MessageCircle size={100} />
              <p className="text-xl font-black uppercase tracking-[0.5em]">{t.chatPlaceholder}</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-6 rounded-[2rem] text-sm font-bold leading-relaxed ${m.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'glass text-gray-200 border-white/10 rounded-bl-none'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="glass p-6 rounded-[2rem] rounded-bl-none border-white/10">
                <Loader2 className="animate-spin text-primary" size={24} />
              </div>
            </div>
          )}
        </div>
        <div className="p-8 border-t border-white/5 bg-black/40">
          <div className="flex gap-4">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.typeInstruction} 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none text-sm font-bold text-white transition-all" 
            />
            <button onClick={handleSend} disabled={loading || !input} className="bg-primary text-white p-4 rounded-2xl blue-glow hover:scale-110 active:scale-95 transition-all shadow-xl">
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SnovioCenterView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [domain, setDomain] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleSearch = async () => {
    if (!domain || !role) return;
    setLoading(true);
    try {
      const result = await fetchB2BLeadsIntelligence(domain, role);
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-16">
      <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
          <MailSearch size={14}/> <span>Snov.io B2B 主权节点 • v2 API 已连接</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">{t.snovCenter}</h1>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-12 rounded-[4rem] border-white/5 space-y-10 shadow-2xl">
            <h3 className="text-2xl font-black uppercase text-white">线索搜寻参数</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase px-4">目标域名</label>
                <input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" placeholder="example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase px-4">目标职位/角色</label>
                <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" placeholder="Purchasing Manager" />
              </div>
              <button onClick={handleSearch} disabled={loading || !domain} className="w-full py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs blue-glow shadow-2xl">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "执行 AI 穿透搜索"}
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          {data ? (
            <div className="space-y-12 animate-in fade-in duration-700">
              <div className="glass p-12 rounded-[4rem] border-white/5 space-y-8 shadow-2xl">
                <h3 className="text-2xl font-black uppercase text-white">穿透结果：发现 {data.leads?.length} 个高价值节点</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.leads?.map((l: any, i: number) => (
                    <div key={i} className="p-8 glass rounded-[2.5rem] border-white/5 hover:border-primary/40 transition-all group">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:blue-glow transition-all"><User size={24}/></div>
                        <div>
                          <p className="font-black text-white uppercase">{l.name}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase">{l.position}</p>
                        </div>
                      </div>
                      <p className="text-xs font-mono text-primary group-hover:underline cursor-pointer">{l.email}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass p-12 rounded-[4rem] border-white/5 space-y-8 shadow-2xl">
                <h3 className="text-2xl font-black uppercase text-white">高转化序列：AI 策略生成</h3>
                <div className="space-y-6">
                  {data.sequence?.map((s: any, i: number) => (
                    <div key={i} className="p-8 glass rounded-[2.5rem] border-white/5 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <p className="text-[10px] font-black text-accent uppercase tracking-widest">邮件步骤 #{i+1} • 延迟：{s.delayDays}天</p>
                        <p className="text-xs font-black text-white">{s.subject}</p>
                      </div>
                      <p className="text-sm text-gray-400 font-bold leading-relaxed whitespace-pre-wrap">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full glass rounded-[4rem] border-white/5 flex flex-col items-center justify-center space-y-6 opacity-20 shadow-2xl">
              <Mail size={120} />
              <p className="text-xl font-black uppercase tracking-[0.5em]">输入搜寻参数以启动主权获客</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const BextImageCenterView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    try {
      const url = await generateVisualContent(prompt, aspectRatio);
      setImage(url);
    } catch (e) {
      alert("视觉生成失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-16">
      <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
          <ImageIcon size={14}/> <span>飞象AI (BextAI) 视觉工作站 • Pro Mode</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">{t.bextCenter}</h1>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-12 rounded-[4rem] border-white/5 space-y-10 shadow-2xl">
             <h3 className="text-2xl font-black uppercase text-white">视觉引擎参数</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-500 uppercase px-4">视觉指令 (Prompt)</label>
                   <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold h-32 outline-none focus:border-primary transition-all" placeholder="例如：一个极简主义的时尚品牌香水瓶，大理石背景，专业影棚布光..." />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-500 uppercase px-4">画幅比例</label>
                   <div className="grid grid-cols-3 gap-3">
                      {(["1:1", "16:9", "9:16"] as const).map(ratio => (
                        <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`py-4 rounded-xl text-[10px] font-black transition-all ${aspectRatio === ratio ? 'bg-primary text-white blue-glow' : 'glass text-gray-600 border-white/10 hover:text-white'}`}>{ratio}</button>
                      ))}
                   </div>
                </div>
                <button onClick={handleGenerate} disabled={loading || !prompt} className="w-full py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-xs blue-glow shadow-2xl flex items-center justify-center space-x-3">
                   {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                   <span>生成视觉资产</span>
                </button>
             </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="glass h-full rounded-[4.5rem] border-white/5 flex flex-col items-center justify-center p-10 relative overflow-hidden shadow-2xl">
             {loading ? (
               <div className="text-center space-y-6 animate-pulse">
                  <WandSparkles size={80} className="mx-auto text-primary animate-bounce" />
                  <p className="text-xl font-black uppercase tracking-[0.4em] text-white">正在炼制主权视觉...</p>
               </div>
             ) : image ? (
               <div className="relative group w-full h-full flex items-center justify-center">
                  <img src={image} alt="Generated" className="max-w-full max-h-full rounded-[3rem] shadow-2xl object-contain animate-in zoom-in duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem] flex items-center justify-center space-x-6">
                     <button onClick={() => {}} className="bg-white text-black p-6 rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl"><Download size={32}/></button>
                     <button onClick={() => setImage(null)} className="bg-red-500 text-white p-6 rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl"><Trash2 size={32}/></button>
                  </div>
               </div>
             ) : (
               <div className="text-center space-y-6 opacity-20">
                  <ImageIcon size={150} />
                  <p className="text-xl font-black uppercase tracking-[0.5em]">主权视觉预览区域</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SovereigntyCenterView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      try {
        const data = await calculateSovereignScore("High performance sovereign node active. Data isolation Tier 1.");
        setScoreData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, []);

  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-16">
      <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
          <ShieldCheck size={14}/> <span>数据主权中心 • 零知识架构已部署</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">{t.sovereigntyCenter}</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass p-16 rounded-[4.5rem] border-white/5 space-y-10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-3xl font-black uppercase tracking-tight text-white">主权安全评分</h3>
          {loading ? <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" size={64} /></div> : (
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="text-[10rem] font-black text-primary tracking-tighter leading-none">{scoreData?.score || 94}<span className="text-3xl font-bold ml-2">%</span></div>
              <div className="grid grid-cols-1 gap-4 pt-10 border-t border-white/5">
                {(scoreData?.breakdown || ["Row Level Isolation", "Zero Knowledge Storage", "End-to-End Encryption"]).map((b: string, i: number) => (
                  <div key={i} className="flex items-center space-x-4 text-gray-400">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span className="text-sm font-bold uppercase tracking-widest">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ModelMarketView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="pt-24 lg:pl-64 min-h-screen px-10 pb-20 space-y-16">
      <header className="space-y-4">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase border border-primary/20 shadow-lg">
          <MarketIcon size={14}/> <span>主权模型市场 • 1000+ 顶尖模型 API</span>
        </div>
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">{t.modelMarket}</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {AI_MODELS.map(model => (
          <div key={model.id} className="glass p-12 rounded-[4rem] border-white/5 space-y-8 hover:border-primary/40 transition-all shadow-2xl group">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 shadow-inner group-hover:scale-110 group-hover:blue-glow transition-all">
                <Brain size={32} />
              </div>
              <div className="flex flex-col items-end gap-2">
                {model.isFree && <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black rounded-full border border-green-500/20 uppercase tracking-widest">FREE</span>}
                {model.isPremium && <span className="px-3 py-1 bg-accent/10 text-accent text-[9px] font-black rounded-full border border-accent/20 uppercase tracking-widest">PRO</span>}
              </div>
            </div>
            <div>
               <h3 className="text-3xl font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors">{model.name}</h3>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">{model.provider} • {model.category}</p>
            </div>
            <button className="w-full py-4 glass border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all">挂载节点</button>
          </div>
        ))}
      </div>
    </div>
  );
};
