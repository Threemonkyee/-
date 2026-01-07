
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreVertical, Building2, Stethoscope, TrendingUp, ChevronRight } from 'lucide-react';
import { HCP } from '../types';
import { MOCK_HCPS, MOCK_OPPORTUNITIES } from '../constants';

const HCPManagement: React.FC<{ user: any }> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const navigate = useNavigate();

  const filteredHCPS = MOCK_HCPS.filter(hcp => {
    const matchesSearch = hcp.name.includes(searchTerm) || hcp.hospital.includes(searchTerm);
    const matchesFilter = filterLevel === 'ALL' || hcp.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const getOpportunityCount = (hcpId: string) => {
    return MOCK_OPPORTUNITIES.filter(o => o.hcpId === hcpId && o.stage !== '成交').length;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">客户管理 (HCP)</h2>
          <p className="text-slate-500">管理您的医生与医疗机构关系，从画像到机会转化</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 flex items-center space-x-2 hover:bg-blue-700 transition-all">
          <Plus size={20} />
          <span>添加新客户</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="搜索医生姓名、医院或科室..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select 
              className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 w-full"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <option value="ALL">所有级别</option>
              <option value="A">A 级 (核心)</option>
              <option value="B">B 级 (潜力)</option>
              <option value="C">C 级 (普通)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">HCP 姓名</th>
                <th className="px-6 py-4">执业地点</th>
                <th className="px-6 py-4">分级</th>
                <th className="px-6 py-4">机会追踪</th>
                <th className="px-6 py-4">最后拜访</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHCPS.map((hcp) => {
                const optCount = getOpportunityCount(hcp.id);
                return (
                  <tr key={hcp.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {hcp.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{hcp.name}</p>
                          <div className="flex items-center text-xs text-slate-500 mt-0.5">
                            <Stethoscope size={12} className="mr-1" />
                            {hcp.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-slate-600">
                        <Building2 size={16} className="mr-2 text-slate-400" />
                        <span className="text-sm font-medium">{hcp.hospital}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        hcp.level === 'A' ? 'bg-red-50 text-red-600' : 
                        hcp.level === 'B' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {hcp.level} 级
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {optCount > 0 ? (
                        <button 
                          onClick={() => navigate(`/sales?hcpId=${hcp.id}`)}
                          className="flex items-center text-emerald-600 font-bold text-xs bg-emerald-50 px-2.5 py-1.5 rounded-lg w-fit hover:bg-emerald-100 transition-all group/btn"
                        >
                          <TrendingUp size={12} className="mr-1" />
                          <span>{optCount} 个活跃机会</span>
                          <ChevronRight size={12} className="ml-1 opacity-0 group-hover/btn:opacity-100 -translate-x-1 group-hover/btn:translate-x-0 transition-all" />
                        </button>
                      ) : (
                        <span className="text-slate-300 text-xs">暂无活跃机会</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {hcp.lastVisit}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HCPManagement;
