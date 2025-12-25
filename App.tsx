
import React, { useState, useEffect } from 'react';
import { AppView, Language } from './types';
import { UI_STRINGS } from './constants';
import { Navbar, Sidebar } from './components/Layout';
import { PublicHome, UserDashboard, RDStudio, ApiStudio, AdminDashboard, AuthView, GeoInsights, RecruitmentView, PartnersView, ToolsDirectory, MCPMarketView, OSAssistantView, SnovioCenterView, BextImageCenterView, SovereigntyCenterView, ModelMarketView, TaijiGeoView, KnowledgeBaseView, NeuralTrainingView } from './components/Views';
import { Key } from 'lucide-react';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.PUBLIC);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('simiai-auth') === 'true';
  });
  
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('simiai-lang');
      return (saved === 'en' || saved === 'zh') ? saved : 'zh';
    } catch (error) {
      return 'zh';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    const t = UI_STRINGS[language];
    document.title = (t.titles as any)[currentView.toLowerCase()] || 'Simiai OS';
  }, [language, currentView]);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkApiKey();
  }, []);

  const handleOpenSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'zh' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('simiai-lang', nextLang);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('simiai-auth', 'true');
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('simiai-auth');
    setCurrentView(AppView.PUBLIC);
  };

  const renderView = () => {
    const protectedViews = [
      AppView.DASHBOARD, AppView.RD_STUDIO, AppView.API_STUDIO, 
      AppView.ADMIN, AppView.GEO_INSIGHTS, AppView.MCP_MARKET, 
      AppView.OS_ASSISTANT, AppView.SNOV_CENTER, AppView.BEXT_IMAGE_CENTER, 
      AppView.DATA_SOVEREIGNTY, AppView.MODEL_MARKET, AppView.TAIJI_GEO,
      AppView.KNOWLEDGE_BASE, AppView.NEURAL_TRAINING
    ];
    
    if (protectedViews.includes(currentView) && !isLoggedIn) {
      return <AuthView language={language} onAuthSuccess={handleAuthSuccess} />;
    }

    if (!hasApiKey && isLoggedIn && protectedViews.includes(currentView)) {
      return (
        <div className="pt-32 px-10 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center text-accent shadow-2xl border border-accent/20">
            <Key size={48} />
          </div>
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Select Your Sovereignty Key</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
              To utilize Gemini 3 Pro and high-performance neural nodes, you must select a paid project API key.
            </p>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="inline-block text-primary hover:underline font-black text-xs uppercase tracking-widest">
              View Billing Documentation
            </a>
          </div>
          <button 
            onClick={handleOpenSelectKey}
            className="bg-accent text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs blue-glow-accent hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Open Key Selector
          </button>
        </div>
      );
    }

    switch (currentView) {
      case AppView.PUBLIC: return <PublicHome language={language} setView={setCurrentView} />;
      case AppView.BROWSE_TOOLS: return <ToolsDirectory language={language} />;
      case AppView.MCP_MARKET: return <MCPMarketView language={language} />;
      case AppView.MODEL_MARKET: return <ModelMarketView language={language} />;
      case AppView.OS_ASSISTANT: return <OSAssistantView language={language} />;
      case AppView.SNOV_CENTER: return <SnovioCenterView language={language} />;
      case AppView.BEXT_IMAGE_CENTER: return <BextImageCenterView language={language} />;
      case AppView.DATA_SOVEREIGNTY: return <SovereigntyCenterView language={language} />;
      case AppView.TAIJI_GEO: return <TaijiGeoView language={language} />;
      case AppView.KNOWLEDGE_BASE: return <KnowledgeBaseView language={language} />;
      case AppView.NEURAL_TRAINING: return <NeuralTrainingView language={language} />;
      case AppView.PARTNERS: return <PartnersView language={language} />;
      case AppView.AUTH: return <AuthView language={language} onAuthSuccess={handleAuthSuccess} />;
      case AppView.DASHBOARD: return <UserDashboard language={language} />;
      case AppView.RD_STUDIO: return <RDStudio language={language} />;
      case AppView.API_STUDIO: return <ApiStudio language={language} />;
      case AppView.ADMIN: return <AdminDashboard language={language} />;
      case AppView.GEO_INSIGHTS: return <GeoInsights language={language} />;
      case AppView.RECRUITMENT: return <RecruitmentView language={language} />;
      default: return <PublicHome language={language} setView={setCurrentView} />;
    }
  };

  const isInternalView = isLoggedIn && currentView !== AppView.PUBLIC && currentView !== AppView.PARTNERS && currentView !== AppView.AUTH && currentView !== AppView.BROWSE_TOOLS;

  return (
    <div className="min-h-screen bg-neutral-dark text-neutral-light overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar setView={setCurrentView} language={language} toggleLanguage={toggleLanguage} isLoggedIn={isLoggedIn} />
      
      {isInternalView && (
        <Sidebar setView={setCurrentView} onLogout={handleLogout} active={currentView} language={language} />
      )}
      
      <main className={!isInternalView ? "lg:pl-0" : ""}>
        {renderView()}
      </main>

      {(currentView === AppView.PUBLIC) && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <button 
            onClick={() => setCurrentView(isLoggedIn ? AppView.DASHBOARD : AppView.AUTH)}
            className="glass blue-glow px-8 py-3 rounded-full text-white font-black uppercase tracking-widest border border-primary/20 flex items-center space-x-2 hover:scale-110 transition-transform active:scale-95"
          >
            <span>{isLoggedIn ? UI_STRINGS[language].dashboard : UI_STRINGS[language].launch}</span>
            <div className="w-2 h-2 rounded-full bg-accent"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
