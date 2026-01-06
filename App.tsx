
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

const SidebarItem: React.FC<{ to: string; icon: React.ElementType; label: string; active: boolean }> = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100">
                P
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">PharmaFlow</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
              <SidebarItem to="/" icon={LayoutDashboard} label="数据大屏" active={window.location.hash === '#/'} />
              <SidebarItem to="/hcp" icon={Users} label="客户管理" active={window.location.hash === '#/hcp'} />
              <SidebarItem to="/campaign" icon={Megaphone} label="市场活动" active={window.location.hash === '#/campaign'} />
              <SidebarItem to="/sales" icon={TrendingUp} label="销售机会" active={window.location.hash === '#/sales'} />
              
              {(currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.COMPLIANCE || currentUser.role === UserRole.ADMIN) && (
                <SidebarItem to="/approvals" icon={ShieldCheck} label="审批中心" active={window.location.hash === '#/approvals'} />
              )}
              
              {(currentUser.role === UserRole.MANAGER || currentUser.role === UserRole.ADMIN) && (
                <SidebarItem to="/analytics" icon={FilePieChart} label="数据分析" active={window.location.hash === '#/analytics'} />
              )}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserCircle size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 truncate">{currentUser.role}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 md:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="flex-1 hidden md:block">
              <h1 className="text-lg font-semibold text-slate-800">
                欢迎回来, <span className="text-blue-600">{currentUser.name}</span>
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <UserSwitch currentUser={currentUser} onSwitch={setCurrentUser} />
              <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <button className="flex items-center space-x-2 text-slate-600 hover:text-red-600 transition-colors">
                <LogOut size={18} />
                <span className="hidden md:inline font-medium text-sm">注销</span>
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
