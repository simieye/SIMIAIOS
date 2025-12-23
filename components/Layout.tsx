
import React from 'react';
import { AppView, Language } from '../types';
import { ICON_MAP, UI_STRINGS } from '../constants';
import { Menu, X, User, Bell, LogOut, ChevronRight, LayoutDashboard, Database, Activity, DollarSign, Settings, Globe, Shield, Lightbulb, Users, FlaskConical, Handshake, Box } from 'lucide-react';

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
            <button onClick={() => setView(AppView.BROWSE_TOOLS)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors font-black text-accent">{t.browseTools}</button>
            <button onClick={() => setView(AppView.PARTNERS)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.strategicPartners}</button>
            <button onClick={() => setView(AppView.RECRUITMENT)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">{language === 'zh' ? '英雄帖' : 'Careers'}</button>
            <button onClick={() => setView(isLoggedIn ? AppView.DASHBOARD : AppView.AUTH)} className="hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.userHub}</button>
            {/* FIX: Removed the invalid 'toggleLanguage' boolean attribute from the button element */}
            <button onClick={toggleLanguage} className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5 transition-colors text-primary border border-primary/20">
              <Globe size={14} />
              <span>{language === 'en' ? 'CN' : 'EN'}</span>
            </button>
            
            {isLoggedIn ? (
              <button onClick={() => setView(AppView.RD_STUDIO)} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">{t.geoStudio}</button>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={() => setView(AppView.AUTH)} className="text-sm font-bold px-4 py-2 hover:text-primary transition-colors">{t.signIn}</button>
                <button onClick={() => setView(AppView.AUTH)} className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20">{t.signUp}</button>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleLanguage} className="text-primary p-2">
              <Globe size={20} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => { setView(AppView.PUBLIC); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">{t.website}</button>
            <button onClick={() => { setView(AppView.BROWSE_TOOLS); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-accent">{t.browseTools}</button>
            <button onClick={() => { setView(AppView.PARTNERS); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">{t.strategicPartners}</button>
            <button onClick={() => { setView(AppView.RECRUITMENT); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">{language === 'zh' ? '英雄帖' : 'Careers'}</button>
            <button onClick={() => { setView(isLoggedIn ? AppView.DASHBOARD : AppView.AUTH); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">{t.userHub}</button>
            {isLoggedIn ? (
              <button onClick={() => { setView(AppView.RD_STUDIO); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary">{t.geoStudio}</button>
            ) : (
              <button onClick={() => { setView(AppView.AUTH); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-primary">{t.signIn}</button>
            )}
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
    { view: AppView.BROWSE_TOOLS, icon: <Box />, label: t.browseTools },
    { view: AppView.RD_STUDIO, icon: <FlaskConical />, label: language === 'zh' ? '研发生态' : 'R&D Ecosystem' },
    { view: AppView.PARTNERS, icon: <Handshake />, label: t.strategicPartners },
    { view: AppView.GEO_INSIGHTS, icon: <Lightbulb />, label: t.insights },
    { view: AppView.API_STUDIO, icon: <Activity />, label: t.apiStudio },
    { view: AppView.RECRUITMENT, icon: <Users />, label: language === 'zh' ? '英雄帖' : 'Recruitment' },
    { icon: <DollarSign />, label: t.finance },
    { icon: <Settings />, label: t.settings },
  ];

  return (
    <div className="w-64 glass h-screen fixed left-0 top-16 hidden lg:flex flex-col p-4 border-r border-white/10">
      <div className="space-y-2 flex-grow">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => item.view && setView(item.view)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              active === item.view ? 'bg-primary/20 text-primary border border-primary/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
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
