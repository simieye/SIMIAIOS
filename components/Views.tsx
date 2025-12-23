
import React, { useState, useEffect, useRef } from 'react';
import { SYSTEMS, PRICING, ICON_MAP, UI_STRINGS, CASE_STUDIES, AI_SEARCH_TOOLS, GEO_IMPLEMENTATION_STEPS, CORE_VALUES, JOB_POSTINGS, ECOSYSTEM_MODULES, TAIJI_STRATEGY_FEATURES, LIGE_FIVE_STEPS, GARY_WORKFLOWS, CHANNEL_PARTNERS, TECH_STACK, STRATEGIC_PARTNERS, TOOL_CATEGORIES } from '../constants';
import { AppView, Metric, ChatMessage, Language, AdminUser, GeoNode, AuthMode, AuthType, JobPosting, EcosystemModule, StrategicPartner, ToolCategory, Tool } from '../types';
import { calculateSovereignScore, runMarketingWorkflow, chatWithModel } from '../services/geminiService';
import { Search, Loader2, Play, Plus, Upload, Link, Check, ExternalLink, ArrowRight, Zap, Layers, Trash2, Edit3, ShieldAlert, CheckCircle2, MoreVertical, User, Users, Activity, Bell, Mail, Smartphone, Lock, Eye, EyeOff, Shield, Target, MousePointerClick, TrendingUp, BarChart3, Rocket, Globe, FileCode, Quote, Workflow, Radar, Milestone, Lightbulb, Trophy, Star, SearchCode, Milestone as StepIcon, Box, Sparkles, FlaskConical, HeartPulse, Infinity, Monitor, ShieldCheck, MapPin, Scale, UserCheck, TrendingDown, LayoutDashboard, Database, Activity as ActivityIcon, DollarSign, Settings, ChevronRight, Briefcase, Landmark, Share2, Percent, Gift, Code, Database as DatabaseIcon, Microscope, Palette, Terminal, Brain, Factory, Shirt, Home, Cpu, CircuitBoard, Bot, Radio, HardDrive, Component, FileJson, CloudLightning, BadgeDollarSign, FileText, ShoppingBag, Wand2, Boxes, GitMerge, MessageSquare, UserPlus, FileSearch, Megaphone, CheckSquare, Store, Video, Truck, Server, Container, Blocks, Handshake, Languages, Compass, UserCircle, X, Copy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as ReRadar } from 'recharts';

interface ViewProps {
  language: Language;
}

interface AuthViewProps extends ViewProps {
  onAuthSuccess: () => void;
}

const Toast: React.FC<{ message: string; type: 'success' | 'info'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-24 right-8 z-[100] p-4 rounded-xl glass border-l-4 flex items-center space-x-3 animate-in slide-in-from-right duration-300 ${type === 'success' ? 'border-accent' : 'border-primary'}`}>
      {type === 'success' ? <CheckCircle2 className="text-accent" /> : <Zap className="text-primary" />}
      <span className="font-medium">{message}</span>
    </div>
  );
};

// --- Promotional Modal Component ---
const PromoModal: React.FC<{ isOpen: boolean; onClose: () => void; language: Language }> = ({ isOpen, onClose, language }) => {
  const t = UI_STRINGS[language];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass max-w-lg w-full rounded-[2.5rem] border-primary/20 p-10 relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto blue-glow border border-primary/20">
            <Gift size={40} />
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase">{t.referralTitle}</h2>
          <p className="text-gray-400 font-bold leading-relaxed">{t.referralSub}</p>
          
          <div className="space-y-4 text-left">
            <div className="p-5 glass rounded-2xl border-white/5 bg-primary/5 flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Star size={20} /></div>
              <p className="text-sm font-bold text-gray-200">{t.referralPro}</p>
            </div>
            <div className="p-5 glass rounded-2xl border-white/5 bg-accent/5 flex items-start space-x-4">
              <div className="p-2 bg-accent/10 rounded-lg text-accent"><CheckCircle2 size={20} /></div>
              <p className="text-sm font-bold text-gray-200">{t.referralSme}</p>
            </div>
          </div>

          <button 
            onClick={() => {
              navigator.clipboard.writeText("https://simiai.os/hero-invite?id=HERO123");
              alert("Link copied!");
            }}
            className="w-full bg-primary text-white py-5 rounded-[1.8rem] font-black uppercase tracking-widest flex items-center justify-center space-x-3 blue-glow transition-all hover:scale-105 active:scale-95"
          >
            <Copy size={20} />
            <span>{t.copyReferral}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const AuthView: React.FC<AuthViewProps> = ({ language, onAuthSuccess }) => {
  const t = UI_STRINGS[language];
  const [mode, setMode] = useState<AuthMode>('login');
  const [authType, setAuthType] = useState<AuthType>('email');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ identifier: '', password: '', confirmPassword: '', code: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full glass p-8 rounded-[2rem] border-white/10 relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-colors"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 blur-[80px] rounded-full"></div>
        <div className="relative text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 blue-glow">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">{t.authTitle}</h1>
          <p className="text-gray-400 text-sm">{t.authSub}</p>
        </div>
        <div className="flex p-1 bg-white/5 rounded-2xl mb-8 border border-white/5">
          <button onClick={() => setMode('login')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'login' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}>{t.signIn}</button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'signup' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}>{t.signUp}</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{authType === 'email' ? <Mail size={18} /> : <Smartphone size={18} />}</div>
              <input required className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-primary focus:ring-0 outline-none transition-all placeholder-gray-500 text-sm" placeholder={authType === 'email' ? t.email : t.mobile} value={formData.identifier} onChange={(e) => setFormData({...formData, identifier: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Lock size={18} /></div>
              <input required type={showPassword ? 'text' : 'password'} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 focus:border-primary focus:ring-0 outline-none transition-all placeholder-gray-500 text-sm" placeholder={t.password} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-2xl font-bold transition-all hover:bg-primary/90 flex items-center justify-center space-x-2 blue-glow disabled:opacity-50 mt-6 active:scale-95">{loading ? <Loader2 size={20} className="animate-spin" /> : <span>{mode === 'login' ? t.signIn : t.signUp}</span>}</button>
        </form>
      </div>
    </div>
  );
};

export const PublicHome: React.FC<ViewProps & { setView: (v: AppView) => void }> = ({ language, setView }) => {
  const [calcInput, setCalcInput] = useState('');
  const [result, setResult] = useState<{ score: number, tips: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const t = UI_STRINGS[language];

  const handleCalculate = async () => {
    if (!calcInput) return;
    setLoading(true);
    try {
      const data = await calculateSovereignScore(calcInput, language);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 space-y-40 pb-32 overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[150px] -z-10 rounded-full"></div>
        <div className="inline-flex items-center space-x-2 glass px-4 py-1.5 rounded-full border-primary/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
           <Star size={14} className="text-primary fill-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">{language === 'zh' ? '主导你的 BP · 掌控你的未来' : 'Rule Your BP · Master Your Future'}</span>
        </div>
        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9] uppercase">
          {language === 'zh' ? <>主宰<br/><span className="gradient-text">全球市场</span></> : <>Rule<br/><span className="gradient-text">Global Markets</span></>}
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed font-bold tracking-tight">{t.heroSub}</p>
        
        <div className="max-w-3xl mx-auto p-1.5 glass rounded-[2.5rem] shadow-2xl blue-glow flex flex-col md:flex-row gap-3 relative z-10 group bg-black/40">
          <input className="flex-1 bg-transparent border-none focus:ring-0 text-white px-8 py-5 placeholder-gray-500 font-bold text-lg" placeholder={t.placeholderUrl} value={calcInput} onChange={(e) => setCalcInput(e.target.value)} />
          <button onClick={handleCalculate} disabled={loading} className="bg-primary text-white font-black px-12 py-5 rounded-[1.8rem] flex items-center justify-center space-x-3 transition-all hover:bg-primary/90 disabled:opacity-50 shadow-lg active:scale-95">
            {loading ? <Loader2 className="animate-spin" /> : <Rocket className="w-6 h-6" />}
            <span className="uppercase tracking-widest text-sm">{t.calcScore}</span>
          </button>
        </div>

        {result && (
          <div className="mt-12 animate-in fade-in slide-in-from-top-6 glass p-12 rounded-[3.5rem] max-w-2xl mx-auto border-accent/20 relative overflow-hidden text-left bg-black/60 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Activity size={100} /></div>
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-2xl font-black tracking-tighter uppercase">{t.scoreResult}: <span className="text-accent">{result.score}%</span></h4>
              <div className="w-40 bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-accent h-full shadow-[0_0_15px_#34C759]" style={{ width: `${result.score}%` }}></div></div>
            </div>
            <ul className="space-y-6">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex items-start space-x-5 text-gray-300 font-bold leading-relaxed"><div className="p-1.5 bg-accent/20 rounded-lg shrink-0 mt-0.5"><Check size={14} className="text-accent" /></div><span>{tip}</span></li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="glass p-16 md:p-24 rounded-[4rem] border-white/5 bg-gradient-to-br from-black via-[#0a0a0a] to-black relative overflow-hidden flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-10 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/20 rounded-full text-xs font-black text-primary uppercase tracking-widest border border-primary/30">
               <UserCircle size={14} /> <span>Your Hero Journey</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
              {language === 'zh' ? <>为超级个体<br/><span className="text-gray-600">&</span> 工厂赋能</> : <>Empowering<br/><span className="text-gray-600">&</span> Source Factories</>}
            </h2>
            <p className="text-xl text-gray-400 font-bold leading-relaxed">{language === 'zh' ? '无论你是单枪匹马的外贸 SOHO，还是雄心勃勃的工厂主，Simiai OS 都能让你在 1/3 的时间内管理 10 倍业务。' : 'Whether you are a solo SOHO seller or an ambitious factory owner, Simiai OS empowers you to manage 10x the scale in 1/3 of the time.'}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 glass rounded-3xl border-primary/20 bg-primary/5">
                <p className="text-[10px] font-black text-primary uppercase mb-2">Target Hero</p>
                <p className="text-sm font-bold text-white uppercase">SOHO / FACTORY</p>
              </div>
              <div className="p-6 glass rounded-3xl border-accent/20 bg-accent/5">
                <p className="text-[10px] font-black text-accent uppercase mb-2">The Impact</p>
                <p className="text-sm font-bold text-white uppercase">10x EFFICIENCY</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center relative">
             <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-white/5 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-full h-full rounded-full border-[0.5px] border-white/10 animate-[spin_10s_linear_infinite] p-8">
                      <div className="w-full h-full rounded-full border-[0.5px] border-white/10 animate-[spin_8s_linear_infinite_reverse] p-8">
                         <div className="w-full h-full rounded-full border-[0.5px] border-white/10 animate-[spin_6s_linear_infinite] flex items-center justify-center">
                             <div className="w-1/2 h-1/2 glass rounded-full blue-glow flex items-center justify-center">
                                <UserCircle size={48} className="text-white animate-pulse" />
                             </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-white/[0.02] -z-10 uppercase tracking-tighter leading-none">YOUR CORE</div>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">{t.eightPillars}</h2>
          <p className="text-gray-500 font-black tracking-[0.6em] uppercase text-xs">{t.eightPillarsSub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map(val => (
            <div key={val.id} className="glass p-12 rounded-[3.5rem] hover:border-primary/50 transition-all group hover:-translate-y-4 duration-500 relative overflow-hidden bg-black/40">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-colors"></div>
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-10 group-hover:scale-110 group-hover:blue-glow transition-all duration-700 border border-primary/10">
                {ICON_MAP[val.icon]}
              </div>
              <h3 className="text-2xl font-black mb-5 tracking-tight uppercase group-hover:text-primary transition-colors">{val.title[language]}</h3>
              <p className="text-gray-400 text-sm font-bold leading-relaxed">{val.description[language]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 bg-white/5 rounded-[4rem]">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-black uppercase mb-4">{t.strategicPartners}</h2>
           <p className="text-gray-400 font-bold max-w-2xl mx-auto">{t.partnersSub}</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
           {STRATEGIC_PARTNERS.map(p => (
             <div key={p.id} className="flex flex-col items-center space-y-2 cursor-pointer transition-transform hover:scale-110" onClick={() => setView(AppView.PARTNERS)}>
               <div className="p-4 glass rounded-2xl bg-white/5">{ICON_MAP[p.icon]}</div>
               <span className="text-[10px] font-black uppercase tracking-widest">{p.id.toUpperCase()}</span>
             </div>
           ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">{t.flexiblePlans}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((plan, idx) => (
            <div key={idx} className={`glass p-12 rounded-[3rem] relative overflow-hidden border-white/5 transition-all hover:scale-105 duration-500 ${plan.highlighted ? 'border-accent/40 bg-accent/5 blue-glow' : 'bg-black/20'}`}>
              {plan.highlighted && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-accent text-black font-black text-[10px] uppercase tracking-widest rounded-bl-3xl">POPULAR</div>
              )}
              <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.highlighted ? 'bg-accent text-black' : 'bg-white/5 text-gray-500'}`}>
                  {plan.type === 'sme' ? <Users size={24} /> : plan.type === 'enterprise' ? <Briefcase size={24} /> : <Landmark size={24} />}
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">{plan.price[language]}</span>
              </div>
              <h3 className="text-xl font-black mb-8 uppercase tracking-tight">{plan.name[language]}</h3>
              <ul className="space-y-4 mb-10">
                {plan.features[language].map((f, i) => (
                  <li key={i} className="flex items-center space-x-3 text-xs font-bold text-gray-300">
                    <Check size={14} className="text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setView(AppView.AUTH)} className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${plan.highlighted ? 'bg-accent text-black shadow-xl shadow-accent/30' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                {plan.cta[language]}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- AI Tools Directory View ---
export const ToolsDirectory: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [promoOpen, setPromoOpen] = useState(false);

  useEffect(() => {
    // Show promo modal after a short delay
    const timer = setTimeout(() => setPromoOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-32 pb-40 px-4 min-h-screen max-w-7xl mx-auto space-y-24">
      <PromoModal isOpen={promoOpen} onClose={() => setPromoOpen(false)} language={language} />

      <header className="text-center space-y-8 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10rem] font-black text-white/[0.02] -z-10 uppercase tracking-tighter leading-none">ARMORY</div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">{t.toolsHeroTitle}</h1>
        <p className="text-xl text-gray-400 font-bold max-w-3xl mx-auto leading-relaxed">{t.toolsHeroSub}</p>
        
        <div className="flex justify-center space-x-4">
           <button className="bg-primary text-white font-black uppercase tracking-widest text-xs px-10 py-5 rounded-[2rem] blue-glow hover:scale-105 active:scale-95 transition-all">
             {t.allCategories}
           </button>
           <button onClick={() => setPromoOpen(true)} className="glass text-accent border-accent/20 font-black uppercase tracking-widest text-xs px-10 py-5 rounded-[2rem] hover:bg-accent/5 transition-all">
             {t.referralTitle}
           </button>
        </div>
      </header>

      <div className="space-y-32">
        {TOOL_CATEGORIES.map((cat) => (
          <section key={cat.id} className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-4">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-primary/10 rounded-[1.8rem] flex items-center justify-center text-primary border border-primary/10">
                  {ICON_MAP[cat.icon]}
                </div>
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tight">{cat.name[language]}</h2>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{cat.count}+ {language === 'zh' ? '工具' : 'Tools'}</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-primary font-black uppercase tracking-widest text-xs hover:translate-x-2 transition-transform">
                <span>{t.viewAllTools} ({cat.count})</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.tools.map((tool) => (
                <div key={tool.id} className="glass p-8 rounded-[2.5rem] border-white/5 bg-black/40 hover:border-primary/40 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                  {tool.isHot && (
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-accent text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-bl-2xl">HOT</div>
                  )}
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors leading-tight">{tool.name[language]}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Workflow Module</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-primary/20 border border-white/10"></div>
                       <div className="w-6 h-6 rounded-full bg-accent/20 border border-white/10"></div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="glass p-16 rounded-[4rem] border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 text-center space-y-10 mt-20 relative overflow-hidden">
         <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
         <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full"></div>
         <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none relative z-10">Let Sovereign AI<br/><span className="gradient-text">Work For You</span></h2>
         <p className="text-xl text-gray-400 font-bold max-w-2xl mx-auto relative z-10">Join 10,000+ entrepreneurs using Simiai OS to master their business and reclaim their freedom.</p>
         <button className="bg-primary text-white font-black uppercase tracking-widest text-sm px-16 py-6 rounded-[2.5rem] blue-glow hover:scale-110 active:scale-95 transition-all relative z-10">
           {t.joinNow}
         </button>
      </footer>
    </div>
  );
};

export const PartnersView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="pt-32 pb-40 px-4 min-h-screen">
       <div className="max-w-7xl mx-auto space-y-20">
          <header className="text-center space-y-6 relative">
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10rem] font-black text-white/[0.02] -z-10 uppercase tracking-tighter">ALLIANCE</div>
             <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">{t.strategicPartners}</h1>
             <p className="text-xl text-gray-400 font-bold max-w-2xl mx-auto">{t.partnersSub}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             {STRATEGIC_PARTNERS.map((partner) => (
               <div key={partner.id} className="glass p-12 rounded-[4rem] border-white/5 bg-black/40 hover:border-primary/40 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">{ICON_MAP[partner.icon]}</div>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-10">
                     <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary border border-primary/20 group-hover:blue-glow transition-all">
                        {ICON_MAP[partner.icon]}
                     </div>
                     <div>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 inline-block">{partner.category}</span>
                        <h3 className="text-3xl font-black uppercase tracking-tight text-white">{partner.name[language]}</h3>
                     </div>
                  </div>
                  <p className="text-gray-400 font-bold leading-relaxed mb-10 text-lg">{partner.description[language]}</p>
                  
                  <div className="space-y-4 mb-12">
                     <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Cooperation Highlights</h4>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {partner.highlights[language].map((h, i) => (
                          <li key={i} className="flex items-center space-x-3 text-sm font-bold text-gray-300">
                             <Check size={16} className="text-accent" />
                             <span>{h}</span>
                          </li>
                        ))}
                     </ul>
                  </div>

                  <button className="w-full bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs py-5 rounded-[2rem] border border-white/10 transition-all flex items-center justify-center space-x-3">
                     <span>{t.applyAccess}</span>
                     <ArrowRight size={18} />
                  </button>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export const RDStudio: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'LIGE' | 'GARY' | 'CHANNEL' | 'INFRA'>('LIGE');

  const handlePdfSim = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 3000);
  };

  return (
    <div className="lg:ml-64 p-8 pt-24 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-white/5 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase mb-2">{t.taijiTitle}</h1>
            <p className="text-gray-400 font-bold">{t.taijiSub}</p>
          </div>
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 overflow-x-auto shrink-0">
             <button onClick={() => setActiveTab('LIGE')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === 'LIGE' ? 'bg-primary text-white blue-glow' : 'text-gray-500 hover:text-white'}`}>Hero Strategy</button>
             <button onClick={() => setActiveTab('GARY')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === 'GARY' ? 'bg-accent text-black' : 'text-gray-500 hover:text-white'}`}>Hero Workflows</button>
             <button onClick={() => setActiveTab('CHANNEL')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === 'CHANNEL' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>Global Channels</button>
             <button onClick={() => setActiveTab('INFRA')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === 'INFRA' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>Sovereign Tools</button>
          </div>
        </div>

        {activeTab === 'LIGE' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {LIGE_FIVE_STEPS.map((step, i) => (
                <div key={step.id} className="glass p-6 rounded-[2.5rem] border-white/5 bg-black/20 hover:border-primary/40 transition-all group">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">{ICON_MAP[step.icon]}</div>
                   <h3 className="text-sm font-black text-white mb-2 uppercase">{step.label[language]}</h3>
                   <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{step.sub[language]}</p>
                </div>
              ))}
            </div>

            <div 
              onClick={handlePdfSim}
              className={`glass rounded-[3.5rem] p-16 border-dashed border-2 border-white/10 flex flex-col items-center justify-center group cursor-pointer hover:border-primary/50 transition-all ${isUploading ? 'animate-pulse' : ''}`}
            >
              {isUploading ? (
                <div className="text-center">
                  <Loader2 size={80} className="text-primary animate-spin mb-8 mx-auto" />
                  <p className="text-2xl font-black uppercase tracking-widest text-white">{t.optimizing}</p>
                </div>
              ) : (
                <>
                  <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-gray-500 mb-10 group-hover:text-primary group-hover:blue-glow transition-all">
                    <Target size={64} />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-4 tracking-tight group-hover:text-white transition-colors">{language === 'zh' ? '导入商业愿景 PDF' : 'Import Vision PDF'}</h3>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">AI will audit your logic and generate your atomic brand site.</p>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'GARY' && (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
               {GARY_WORKFLOWS.map((flow) => (
                 <div key={flow.id} className="glass p-8 rounded-[3rem] border-white/5 bg-black/40 hover:scale-[1.05] transition-all cursor-pointer group flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:blue-glow transition-all">
                       {ICON_MAP[flow.icon] || <Zap />}
                    </div>
                    <h4 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-accent transition-colors">{flow.label[language]}</h4>
                    <button className="mt-6 p-2 rounded-full bg-white/5 hover:bg-accent/20 transition-all opacity-0 group-hover:opacity-100"><Play size={14} className="text-accent" /></button>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'CHANNEL' && (
          <div className="space-y-12">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-12 rounded-[4rem] border-accent/20 bg-accent/5 flex flex-col justify-between">
                   <div>
                      <div className="p-4 bg-accent/10 rounded-2xl text-accent mb-8 inline-block"><Video size={40} /></div>
                      <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">Your Viral Hub</h3>
                      <p className="text-gray-400 font-bold leading-relaxed mb-10">Sync TikTok traffic with your AI workflows. Scale your viral content automatically.</p>
                   </div>
                   <button className="w-full py-5 bg-accent text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all">Start Viral Loop</button>
                </div>

                <div className="glass p-12 rounded-[4rem] border-primary/20 bg-primary/5 flex flex-col justify-between">
                   <div>
                      <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-8 inline-block"><Store size={40} /></div>
                      <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">Your Retail Shelf</h3>
                      <p className="text-gray-400 font-bold leading-relaxed mb-10">Access 10,000+ Redmond stores across AU/NA. Your physical presence managed by AI.</p>
                   </div>
                   <button className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs blue-glow hover:scale-[1.02] transition-all">Claim Shelves</button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'INFRA' && (
          <div className="space-y-12">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-12 rounded-[4rem] border-white/5 bg-black/20">
                   <h3 className="text-2xl font-black uppercase mb-8 tracking-tight">Sovereign Architecture</h3>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {TECH_STACK.map((tech, i) => (
                        <div key={i} className="p-6 glass rounded-3xl border-white/5 bg-white/5 flex flex-col items-center text-center">
                           <div className="p-3 bg-primary/10 rounded-xl text-primary mb-4">{ICON_MAP[tech.icon]}</div>
                           <p className="text-sm font-black text-white">{tech.name}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="glass p-12 rounded-[4rem] border-purple-500/20 bg-purple-500/5">
                   <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">UI Mastery</h3>
                   <div className="p-6 glass rounded-3xl border-white/10 flex flex-col items-center justify-center animate-pulse">
                      <Wand2 size={40} className="text-purple-500 mb-4" />
                      <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Generating Sovereignty...</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const UserDashboard: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="lg:ml-64 p-8 pt-24 min-h-screen animate-in fade-in duration-500 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase mb-2">{t.welcome}</h1>
            <p className="text-gray-400 font-bold">{t.osRunning}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="glass px-6 py-3 rounded-2xl flex items-center space-x-2 text-sm font-bold border-white/10 hover:bg-white/5 transition-all">
              <FileText size={18} className="text-primary" />
              <span>{t.uploadKnowledge}</span>
            </button>
            <button className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center space-x-2 text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              <Plus size={18} />
              <span>{t.newWorkflow}</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Impact Factor', val: '4.8x', desc: 'Growth Index', color: 'text-accent' },
            { label: 'Market Nodes', val: '1,420', desc: 'Stores Synced', color: 'text-primary' },
            { label: 'Sovereignty', val: '92%', desc: 'Data Mastery', color: 'text-orange-500' },
            { label: 'Target Forecast', val: '¥300M', desc: '2028 Revenue', color: 'text-purple-500' }
          ].map((stat, i) => (
            <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 bg-black/20">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-baseline space-x-2">
                <span className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.val}</span>
                <span className="text-xs font-bold text-gray-500">{stat.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass p-12 rounded-[3.5rem] border-white/5 bg-black/40">
           <h3 className="text-2xl font-black uppercase mb-10 tracking-tight">Sovereign Empire Matrix</h3>
           <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {SYSTEMS.map((sys, idx) => (
                <div key={idx} className="p-8 glass rounded-[2rem] border-white/5 bg-white/5 flex flex-col items-center text-center space-y-4 hover:border-primary/40 transition-all group">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:blue-glow transition-all">
                      {ICON_MAP[sys.icon]}
                   </div>
                   <h4 className="text-sm font-black text-white uppercase">{sys.title[language]}</h4>
                   <p className="text-[10px] text-gray-500 font-bold leading-relaxed">{sys.description[language]}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export const ApiStudio: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const response = await chatWithModel([...messages, userMsg], 'gemini-3-flash-preview', language);
      setMessages(prev => [...prev, { role: 'model', content: response || 'Error' }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:ml-64 p-8 pt-24 h-screen flex flex-col animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col space-y-8">
        <header>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-4xl font-black tracking-tight uppercase">{t.apiTitle}</h1>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-black tracking-widest border border-primary/20">{t.beta}</span>
          </div>
          <p className="text-gray-400 font-bold">{t.apiSub}</p>
        </header>

        <div className="flex-grow glass rounded-[3rem] border-white/5 bg-black/20 p-8 overflow-y-auto custom-scrollbar flex flex-col space-y-6">
          {messages.length === 0 ? (
            <div className="flex-grow flex items-center justify-center opacity-10">
              <ActivityIcon size={120} />
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-5 rounded-3xl font-bold text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'bg-white/5 border border-white/10 text-gray-200'}`}>
                  {m.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl"><Loader2 className="animate-spin text-primary" size={20} /></div>
            </div>
          )}
        </div>

        <div className="glass p-2 rounded-[2rem] border-white/10 bg-black/40 flex space-x-2">
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 text-white font-bold placeholder-gray-500"
            placeholder={t.chatPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          {/* FIX: Removed invalid 'handleSend' attribute from the button element */}
          <button disabled={loading || !input} onClick={handleSend} className="bg-primary text-white p-4 rounded-2xl hover:bg-primary/90 transition-all disabled:opacity-50">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="lg:ml-64 p-8 pt-24 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-4 tracking-tighter">{t.adminRestricted}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="glass p-10 rounded-[2.5rem] border-white/5 bg-black/40">
          <Users className="text-primary w-8 h-8 mb-4" />
          <p className="text-3xl font-black tracking-tighter">1,240</p>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Global Heroes</p>
        </div>
        <div className="glass p-10 rounded-[2.5rem] border-white/5 bg-black/40">
          <Globe className="text-accent w-8 h-8 mb-4" />
          <p className="text-3xl font-black tracking-tighter">84%</p>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sovereign Mastery</p>
        </div>
        <div className="glass p-10 rounded-[2.5rem] border-white/5 bg-black/40">
          <Brain className="text-purple-500 w-8 h-8 mb-4" />
          <p className="text-3xl font-black tracking-tighter">20+</p>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Core Engineers</p>
        </div>
      </div>
    </div>
  );
};

export const GeoInsights: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="lg:ml-64 p-8 pt-24 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-4 tracking-tighter">{t.insights}</h1>
      <p className="text-gray-400 font-bold">{t.insightsSub}</p>
      <div className="mt-10 grid grid-cols-1 gap-10">
        <div className="glass p-12 rounded-[3.5rem] border-white/5 bg-black/20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-accent/10 rounded-2xl text-accent"><Radar size={32} /></div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">{t.geoScore}</h3>
              <p className="text-xs text-gray-500 font-bold tracking-widest">REACH POTENTIAL AUDIT</p>
            </div>
          </div>
          <div className="h-80 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
             <BarChart3 size={64} className="text-gray-800 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecruitmentView: React.FC<ViewProps> = ({ language }) => {
  const t = UI_STRINGS[language];
  return (
    <div className="pt-32 pb-40 px-4 min-h-screen max-w-7xl mx-auto">
      <div className="text-center mb-24 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10rem] font-black text-white/[0.03] -z-10 uppercase tracking-tighter leading-none">JOIN CORE</div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">{t.recruitmentHero}</h1>
        <p className="text-lg md:text-xl text-gray-400 font-bold max-w-2xl mx-auto">{t.recruitmentSub}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {JOB_POSTINGS.map((job, i) => (
          <div key={i} className="glass p-12 rounded-[4rem] border-white/5 bg-black/20 hover:scale-[1.02] transition-all group">
            <div className="flex justify-between items-start mb-10">
               <div>
                 <h3 className="text-3xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{job.title[language]}</h3>
                 <div className="flex items-center space-x-2 text-accent font-black text-xs tracking-widest uppercase">
                   <Users size={16} />
                   <span>{job.count} {language === 'zh' ? '名空缺' : 'Positions Open'}</span>
                 </div>
               </div>
               <div className="p-4 bg-primary/10 rounded-3xl text-primary"><Briefcase size={28} /></div>
            </div>
            <div className="space-y-8 mb-12">
               <div>
                 <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">{t.jobRequirements}</h4>
                 <div className="flex flex-wrap gap-2">
                   {job.requirements[language].map((req, idx) => (
                     <span key={idx} className="px-4 py-2 glass rounded-full text-xs font-bold border-white/10">{req}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">{t.jobBenefits}</h4>
                 <div className="flex flex-wrap gap-2">
                   {job.benefits[language].map((ben, idx) => (
                     <span key={idx} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-xs font-bold border border-accent/20">{ben}</span>
                   ))}
                 </div>
               </div>
            </div>
            <button className="w-full bg-primary text-white font-black uppercase tracking-widest text-sm py-5 rounded-[2rem] hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center space-x-3">
              <span>{t.applyNow}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
