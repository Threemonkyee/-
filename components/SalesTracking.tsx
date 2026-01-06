
import React from 'react';
import { Kanban, List, Filter, Search, TrendingUp, MoreHorizontal, Calendar } from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '../constants';

const SalesTracking: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">销售机会追踪</h2>
          <p className="text-slate-500">从潜在到成交，全程监控您的销售管线</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm">
            <Kanban size={18} />
            <span>看板</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-bold text-sm transition-all">
            <List size={18} />
            <span>列表</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 min-h-[500px]">
        {['潜在', '跟进', '待结', '成交'].map((stage) => (
          <div key={stage} className="flex flex-col space-y-4 min-w-[280px]">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${
                  stage === '成交' ? 'bg-emerald-500' : stage === '跟进' ? 'bg-blue-500' : 'bg-slate-400'
                }`}></span>
                <h4 className="font-bold text-slate-700">{stage}</h4>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {MOCK_OPPORTUNITIES.filter(o => o.stage === stage).length}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
            </div>
            
            <div className="flex-1 space-y-4 bg-slate-100/50 p-3 rounded-2xl border border-dashed border-slate-200">
              {MOCK_OPPORTUNITIES.filter(o => o.stage === stage).map(opt => (
                <div key={opt.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{opt.hcpName}</h5>
                    <span className="text-blue-600 text-xs font-bold">￥{(opt.value/1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 space-x-3 mb-4">
                    <div className="flex items-center">
                      <TrendingUp size={12} className="mr-1 text-emerald-500" />
                      {opt.probability}%
                    </div>
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {opt.updatedAt}
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${opt.probability === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${opt.probability}%` }}></div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-slate-400 hover:text-blue-600 text-sm font-medium border border-dashed border-slate-300 rounded-xl hover:bg-white transition-all">
                + 添加机会
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesTracking;
