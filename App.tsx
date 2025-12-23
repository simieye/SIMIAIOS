
import React, { useState, useEffect } from 'react';
import { AppView, Language } from './types';
import { UI_STRINGS } from './constants';
import { Navbar, Sidebar } from './components/Layout';
import { PublicHome, UserDashboard, RDStudio, ApiStudio, AdminDashboard, AuthView, GeoInsights, RecruitmentView, PartnersView, ToolsDirectory } from './components/Views';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.PUBLIC);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('simiai-auth') === 'true';
  });
  
  // Initialize language state from local storage on component mount
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('simiai-lang');
      return (saved === 'en' || saved === 'zh') ? saved : 'zh';
    } catch (error) {
      console.warn("Failed to access localStorage for language settings:", error);
      return 'zh';
    }
  });

  // Sync lang attribute and document title when language or view changes
  useEffect(() => {
    // Dynamically update the HTML lang attribute
    document.documentElement.setAttribute('lang', language);

    // Dynamically update document title based on current view and language
    const t = UI_STRINGS[language];
    let pageTitle = '';
    switch (currentView) {
      case AppView.PUBLIC:
        pageTitle = language === 'en' ? 'Simiai OS | Empowering the Individual Hero' : 'Simiai OS | 赋能每一个商业英雄';
        break;
      case AppView.PARTNERS:
        pageTitle = `${t.strategicPartners} | Simiai OS`;
        break;
      case AppView.BROWSE_TOOLS:
        pageTitle = `${t.browseTools} | Simiai OS`;
        break;
      case AppView.AUTH:
        pageTitle = `${t.signIn} | Simiai OS`;
        break;
      case AppView.DASHBOARD:
        pageTitle = `${t.dashboard} | Simiai OS`;
        break;
      case AppView.RD_STUDIO:
        pageTitle = `${t.geoStudio} | Simiai OS`;
        break;
      case AppView.API_STUDIO:
        pageTitle = `${t.apiStudio} | Simiai OS`;
        break;
      case AppView.ADMIN:
        pageTitle = `${t.admin} | Simiai OS`;
        break;
      case AppView.GEO_INSIGHTS:
        pageTitle = `${t.insights} | Simiai OS`;
        break;
      case AppView.RECRUITMENT:
        pageTitle = `${t.recruitmentTitle} | Simiai OS`;
        break;
      default:
        pageTitle = 'Simiai OS';
    }
    document.title = pageTitle;
  }, [language, currentView]);

  /**
   * Toggles the application language and persists the choice to local storage.
   */
  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'zh' : 'en';
    setLanguage(nextLang);
    try {
      localStorage.setItem('simiai-lang', nextLang);
    } catch (error) {
      console.error("Could not save language preference to localStorage:", error);
    }
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

  const t = UI_STRINGS[language];

  const renderView = () => {
    // Basic route protection
    const protectedViews = [AppView.DASHBOARD, AppView.RD_STUDIO, AppView.API_STUDIO, AppView.ADMIN, AppView.GEO_INSIGHTS];
    if (protectedViews.includes(currentView) && !isLoggedIn) {
      return <AuthView language={language} onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentView) {
      case AppView.PUBLIC:
        return <PublicHome language={language} setView={setCurrentView} />;
      case AppView.BROWSE_TOOLS:
        return <ToolsDirectory language={language} />;
      case AppView.PARTNERS:
        return <PartnersView language={language} />;
      case AppView.AUTH:
        return <AuthView language={language} onAuthSuccess={handleAuthSuccess} />;
      case AppView.DASHBOARD:
        return <UserDashboard language={language} />;
      case AppView.RD_STUDIO:
        return <RDStudio language={language} />;
      case AppView.API_STUDIO:
        return <ApiStudio language={language} />;
      case AppView.ADMIN:
        return <AdminDashboard language={language} />;
      case AppView.GEO_INSIGHTS:
        return <GeoInsights language={language} />;
      case AppView.RECRUITMENT:
        return <RecruitmentView language={language} />;
      default:
        return <PublicHome language={language} setView={setCurrentView} />;
    }
  };

  const isInternalView = isLoggedIn && [AppView.DASHBOARD, AppView.ADMIN, AppView.RD_STUDIO, AppView.API_STUDIO, AppView.GEO_INSIGHTS, AppView.RECRUITMENT].includes(currentView);

  return (
    <div className="min-h-screen bg-neutral-dark text-neutral-light overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar setView={setCurrentView} language={language} toggleLanguage={toggleLanguage} isLoggedIn={isLoggedIn} />
      
      {isInternalView && (
        <Sidebar setView={setCurrentView} onLogout={handleLogout} active={currentView} language={language} />
      )}
      
      <main className={currentView === AppView.BROWSE_TOOLS ? "lg:pl-0" : ""}>
        {renderView()}
      </main>

      {/* Persistent CTA */}
      {(currentView === AppView.PUBLIC || currentView === AppView.PARTNERS || currentView === AppView.BROWSE_TOOLS) && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <button 
            onClick={() => setCurrentView(isLoggedIn ? AppView.DASHBOARD : AppView.AUTH)}
            className="glass blue-glow px-8 py-3 rounded-full text-white font-black uppercase tracking-widest border-primary flex items-center space-x-2 hover:scale-110 transition-transform active:scale-95"
          >
            <span>{isLoggedIn ? t.dashboard : t.launch}</span>
            <div className="w-2 h-2 rounded-full bg-accent"></div>
          </button>
        </div>
      )}

      {/* Footer */}
      {(currentView === AppView.PUBLIC || currentView === AppView.PARTNERS || currentView === AppView.BROWSE_TOOLS) && (
        <footer className="border-t border-white/10 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col space-y-4 mb-8 md:mb-0">
              <span className="text-2xl font-black tracking-tight">Simiai <span className="text-primary">OS</span></span>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">You Are the Hero, We Are the Tool.</p>
            </div>
            
            <div className="flex flex-col md:items-end space-y-4">
              <div className="flex space-x-8 text-sm font-bold uppercase tracking-tighter">
                <a href="#" className="hover:text-primary transition-colors">{t.docs}</a>
                <a href="#" className="hover:text-primary transition-colors">{t.privacy}</a>
                <a href="#" className="hover:text-primary transition-colors">{t.terms}</a>
                <a href="#" className="hover:text-primary transition-colors">{t.contact}</a>
              </div>
              <div className="text-[10px] text-gray-500 leading-relaxed md:text-right font-medium">
                <p>© 2025 深圳市斯密爱科技有限公司 Simiai Technology Co., Ltd.</p>
                <p className="mt-1 opacity-60">深圳市南山区粤海街道高新南一道国家工程实验室大厦</p>
                <p className="mt-2 text-primary/60">{t.mission}</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
