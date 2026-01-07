
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  TrendingUp, 
  FilePieChart, 
  ShieldCheck, 
  Settings,
  Menu,
  X,
  UserCircle,
  LogOut,
  Bell
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import HCPManagement from './components/HCPManagement';
import CampaignManagement from './components/CampaignManagement';
import SalesTracking from './components/SalesTracking';
import Analytics from './components/Analytics';
import ApprovalWorkflow from './components/ApprovalWorkflow';
import UserSwitch from './components/UserSwitch';
import { User, UserRole } from './types';
import { MOCK_USERS } from './constants';

const SidebarItem: React.FC<{ to: string; icon: React.ElementType; label: string; active: boolean; onClick?: () => void }> = ({ to, icon: Icon, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
    }`}
  >
    <Icon size={20} className={active ? 'text-white' : 'group-hover:text-blue-600'} />
    <span className="font-semibold text-sm md:text-base">{label}</span>
  </Link>
);

const Navigation: React.FC<{ currentUser: User; isSidebarOpen: boolean; setIsSidebarOpen: (open: boolean) => void }> = ({ currentUser, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* 移动端遮罩层 */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
                P
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">PharmaFlow</span>
            </div>
            {/* 移动端专用关闭按钮 */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 md:space-y-2 overflow-y-auto pt-2">
            <SidebarItem to="/" icon={LayoutDashboard} label="数据大屏" active={currentPath === '/'} onClick={() => setIsSidebarOpen(false)} />
            <SidebarItem to="/hcp" icon={Users} label="客户管理" active={currentPath === '/hcp'} onClick={() => setIsSidebarOpen(false)} />
            <SidebarItem to="/campaign" icon={Megaphone} label="市场活动" active={currentPath === '/campaign'} onClick={() => setIsSidebarOpen(false)} />
            <SidebarItem to="/sales" icon={TrendingUp} label="销售机会" active={currentPath === '/sales'} onClick={() => setIsSidebarOpen(false)} />
            
            {(currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.COMPLIANCE || currentUser.role === UserRole.ADMIN) && (
              <SidebarItem to="/approvals" icon={ShieldCheck} label="审批中心" active={currentPath === '/approvals'} onClick={() => setIsSidebarOpen(false)} />
            )}
            
            {(currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.ADMIN) && (
              <SidebarItem to="/analytics" icon={FilePieChart} label="数据分析" active={currentPath === '/analytics'} onClick={() => setIsSidebarOpen(false)} />
            )}
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center space-x-3 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <UserCircle size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider truncate">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 默认收起移动端菜单

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Navigation currentUser={currentUser} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 md:hidden text-slate-600"
              >
                <Menu size={22} />
              </button>
              <h1 className="text-lg font-bold text-slate-800 hidden md:block">
                欢迎回来, <span className="text-blue-600">{currentUser.name}</span>
              </h1>
              <h1 className="text-lg font-bold text-slate-800 md:hidden truncate max-w-[120px]">
                {currentUser.name}
              </h1>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <UserSwitch currentUser={currentUser} onSwitch={setCurrentUser} />
              <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-6 w-px bg-slate-200 mx-1 md:mx-2"></div>
              <button className="flex items-center space-x-1.5 text-slate-500 hover:text-red-600 transition-colors">
                <LogOut size={18} />
                <span className="hidden lg:inline font-bold text-xs uppercase tracking-wider">注销</span>
              </button>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard user={currentUser} />} />
              <Route path="/hcp" element={<HCPManagement user={currentUser} />} />
              <Route path="/campaign" element={<CampaignManagement user={currentUser} />} />
              <Route path="/sales" element={<SalesTracking user={currentUser} />} />
              <Route path="/analytics" element={<Analytics user={currentUser} />} />
              <Route path="/approvals" element={<ApprovalWorkflow user={currentUser} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
