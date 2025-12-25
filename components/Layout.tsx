
import React from 'react';
import { AppView, Language } from '../types';
import { ICON_MAP, UI_STRINGS } from '../constants';
// Added Link to the lucide-react imports to resolve the missing reference on line 95
import { Menu, X, User, Bell, LogOut, ChevronRight, LayoutDashboard, Database, Activity, DollarSign, Settings, Globe, Shield, Lightbulb, Users, FlaskConical, Handshake, Box, FileSearch, MessageCircle, MailSearch, ImageIcon, ShieldCheck, Sparkles, BookOpen, BrainCircuit, Binary, Link } from 'lucide-react';

interface NavbarProps {
  setView: (v: AppView) => void;
  language: Language;
  toggleLanguage: () => void;
  isLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ setView, language, toggleLanguage, isLoggedIn }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = UI_STRINGS[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setView(AppView.PUBLIC)}>
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center mr-2 blue-glow">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Simiai <span className="text-primary">OS</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setView(AppView.PUBLIC)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.website}</button>
            <button onClick={() => setView(AppView.OS_ASSISTANT)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-bold transition-colors text-accent flex items-center space-x-1"><MessageCircle size={14} /> <span>{t.osAssistant}</span></button>
            <button onClick={() => setView(AppView.TAIJI_GEO)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-black text-white flex items-center space-x-1"><Binary size={14} className="text-primary" /> <span>{t.taijiGeo}</span></button>
            <button onClick={() => setView(AppView.BEXT_IMAGE_CENTER)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-black text-accent flex items-center space-x-1"><ImageIcon size={14} /> <span>{t.bextCenter}</span></button>
            
            <button 
              onClick={() => setView(AppView.AUTH)} 
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-black transition-all blue-glow active:scale-95 flex items-center space-x-2 shadow-lg shadow-primary/20"
            >
              <FileSearch size={16} />
              <span>{t.freeReport}</span>
            </button>

            <button onClick={() => setView(isLoggedIn ? AppView.DASHBOARD : AppView.AUTH)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.userHub}</button>
            
            <button 
              onClick={toggleLanguage} 
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all hover:bg-primary/10 text-primary border border-primary/20 group"
              aria-label="Toggle Language"
            >
              <Globe size={14} className="group-hover:rotate-12 transition-transform" />
              <div className="flex items-center divide-x divide-primary/20">
                <span className={`pr-1.5 ${language === 'zh' ? 'text-primary' : 'text-gray-500'}`}>简</span>
                <span className={`pl-1.5 ${language === 'en' ? 'text-primary' : 'text-gray-500'}`}>EN</span>
              </div>
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <button onClick={() => { setView(AppView.PUBLIC); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">{t.website}</button>
            <button onClick={() => { setView(AppView.TAIJI_GEO); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-primary">{t.taijiGeo}</button>
            <button onClick={() => { setView(isLoggedIn ? AppView.DASHBOARD : AppView.AUTH); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">{t.userHub}</button>
            <button 
              onClick={() => { toggleLanguage(); setIsOpen(false); }} 
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-primary border border-primary/20 bg-primary/5 font-black text-xs uppercase"
            >
              <Globe size={16} />
              <span>{language === 'en' ? '切换至中文' : 'Switch to EN'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Sidebar: React.FC<{ setView: (v: AppView) => void, onLogout: () => void, active: AppView, language: Language }> = ({ setView, onLogout, active, language }) => {
  const t = UI_STRINGS[language];
  const menuItems = [
    { view: AppView.DASHBOARD, icon: <LayoutDashboard />, label: t.dashboard },
    { view: AppView.KNOWLEDGE_BASE, icon: <BookOpen />, label: t.knowledgeBase },
    { view: AppView.NEURAL_TRAINING, icon: <BrainCircuit />, label: t.neuralTraining },
    { view: AppView.TAIJI_GEO, icon: <Binary />, label: t.taijiGeo },
    { view: AppView.DATA_SOVEREIGNTY, icon: <ShieldCheck />, label: t.sovereigntyCenter },
    { view: AppView.OS_ASSISTANT, icon: <MessageCircle />, label: t.osAssistant },
    { view: AppView.MODEL_MARKET, icon: <Sparkles />, label: t.modelMarket },
    { view: AppView.BEXT_IMAGE_CENTER, icon: <ImageIcon />, label: t.bextCenter },
    { view: AppView.SNOV_CENTER, icon: <MailSearch />, label: t.snovCenter },
    { view: AppView.MCP_MARKET, icon: <Link />, label: t.mcpMarket },
    { view: AppView.RD_STUDIO, icon: <FlaskConical />, label: language === 'zh' ? '研发生态' : 'R&D Ecosystem' },
    { icon: <Settings />, label: t.settings },
  ];

  return (
    <div className="w-64 glass h-screen fixed left-0 top-16 hidden lg:flex flex-col p-4 border-r border-white/10">
      <div className="space-y-1 flex-grow overflow-y-auto custom-scrollbar">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => item.view && setView(item.view)}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
              active === item.view ? 'bg-primary/20 text-primary border border-primary/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-bold text-xs uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex items-center space-x-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white uppercase group-hover:scale-110 transition-transform">JD</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{t.hero}</p>
            <p className="text-xs text-gray-500 truncate">{t.seed}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">{t.signOut}</span>
        </button>
      </div>
    </div>
  );
};
