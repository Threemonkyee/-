
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  XAxis,
  YAxis
} from 'recharts';
import { User, Campaign, Opportunity } from '../types';
import { MOCK_HCPS, COLORS } from '../constants';

const data = [
  { name: '1月', sales: 4000, visits: 24 },
  { name: '2月', sales: 3000, visits: 13 },
  { name: '3月', sales: 2000, visits: 98 },
  { name: '4月', sales: 2780, visits: 39 },
  { name: '5月', sales: 1890, visits: 48 },
  { name: '6月', sales: 2390, visits: 38 },
  { name: '7月', sales: 3490, visits: 43 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; isUp: boolean; icon: React.ElementType; color: string }> = ({ title, value, trend, isUp, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col space-y-2">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <div className={`flex items-center text-xs font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
  </div>
);

const Dashboard: React.FC<{ user: User; campaigns: Campaign[]; opportunities: Opportunity[] }> = ({ user, campaigns, opportunities }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">业务总览</h2>
          <p className="text-slate-500 mt-1">实时掌握您的销售指标与合规进展</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 font-medium">
            区域: {user.region}
          </span>
          <span className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-medium">
            {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="负责HCP总数" value="128" trend="+12.5%" isUp={true} icon={Users} color="bg-blue-600" />
        <StatCard title="月销售额 (CNY)" value="￥458.2k" trend="+8.2%" isUp={true} icon={TrendingUp} color="bg-emerald-600" />
        <StatCard title="活动总数" value={campaigns.length.toString()} trend="当前" isUp={true} icon={Target} color="bg-orange-600" />
        <StatCard title="销售机会" value={opportunities.length.toString()} trend="+4" isUp={true} icon={Calendar} color="bg-violet-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">销售 & 拜访趋势</h3>
            <select className="bg-slate-50 border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-0">
              <option>最近7个月</option>
              <option>最近1年</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">高潜HCP (Top 5)</h3>
          <div className="space-y-4">
            {MOCK_HCPS.slice(0, 5).map((hcp, idx) => (
              <div key={hcp.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm`} style={{ backgroundColor: COLORS[idx % COLORS.length] }}>
                  {hcp.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{hcp.name}</p>
                  <p className="text-xs text-slate-500 truncate">{hcp.hospital} | {hcp.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">￥{(hcp.totalSpend/1000).toFixed(1)}k</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${hcp.level === 'A' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    Level {hcp.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2">
            <span>查看全部客户</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
