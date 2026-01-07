
import React, { useMemo } from 'react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { FileDown, Filter } from 'lucide-react';
import { COLORS } from '../constants';
import { Campaign, CampaignStatus } from '../types';

const roiData = [
  { region: '华东', investment: 400, return: 2400 },
  { region: '华北', investment: 300, return: 1398 },
  { region: '华南', investment: 200, return: 9800 },
  { region: '西南', investment: 278, return: 3908 },
  { region: '西北', investment: 189, return: 4800 },
];

const Analytics: React.FC<{ user: any; campaigns: Campaign[] }> = ({ user, campaigns }) => {
  // 动态计算已通过活动的分类预算
  const categoryStats = useMemo(() => {
    const approved = campaigns.filter(c => c.status === CampaignStatus.COMPLIANCE_APPROVED);
    const stats: Record<string, number> = {
      '学术交流': 0,
      '圆桌讨论': 0,
      '科室推广': 0,
      '其他': 0
    };
    approved.forEach(c => {
      if (stats[c.type] !== undefined) stats[c.type] += c.budget;
      else stats['其他'] += c.budget;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [campaigns]);

  const totalApprovedBudget = useMemo(() => {
    return campaigns
      .filter(c => c.status === CampaignStatus.COMPLIANCE_APPROVED)
      .reduce((sum, c) => sum + c.budget, 0);
  }, [campaigns]);

  const complianceRate = useMemo(() => {
    const total = campaigns.length;
    if (total === 0) return '100%';
    const rejected = campaigns.filter(c => c.status === CampaignStatus.REJECTED).length;
    return `${(((total - rejected) / total) * 100).toFixed(1)}%`;
  }, [campaigns]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">深度数据分析</h2>
          <p className="text-slate-500">洞察 ROI、市场覆盖与团队绩效</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-slate-200 p-2 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 flex items-center space-x-2 hover:bg-blue-700 transition-all">
            <FileDown size={20} />
            <span>导出报表</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">已通过预算分布 (实时)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">* 仅统计合规已过通过的项目</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">各区域 ROI 对比</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="region" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Legend />
                <Bar dataKey="investment" name="投入 (k)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="return" name="产出 (k)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">关键绩效指标 (KPIs)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: '已批总预算', value: `￥${(totalApprovedBudget / 1000).toFixed(1)}k`, color: 'text-blue-600' },
            { label: '活动合规率', value: complianceRate, color: 'text-emerald-600' },
            { label: '高潜力HCP覆盖率', value: '82%', color: 'text-violet-600' },
            { label: '线索转化周期', value: '45天', color: 'text-orange-600' },
          ].map((kpi, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-sm text-slate-500 font-medium mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
