
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Kanban, List, TrendingUp, MoreHorizontal, Calendar, XCircle, UserPlus, FilterX } from 'lucide-react';
import { MOCK_OPPORTUNITIES, MOCK_HCPS } from '../constants';
import { Opportunity } from '../types';

const SalesTracking: React.FC<{ user: any }> = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterHcpId = searchParams.get('hcpId');
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [showModal, setShowModal] = useState(false);
  const [newOpt, setNewOpt] = useState({
    hcpId: '',
    value: '',
    stage: '潜在' as Opportunity['stage'],
    probability: 30
  });

  // 根据参数过滤显示的数据
  const displayOpportunities = filterHcpId 
    ? opportunities.filter(o => o.hcpId === filterHcpId)
    : opportunities;

  const filteredHCPName = filterHcpId ? MOCK_HCPS.find(h => h.id === filterHcpId)?.name : null;

  const handleAddOpportunity = () => {
    const selectedHCP = MOCK_HCPS.find(h => h.id === newOpt.hcpId);
    if (!selectedHCP) {
      alert('请选择一个医生');
      return;
    }

    const opportunity: Opportunity = {
      id: `O${Date.now()}`,
      hcpId: selectedHCP.id,
      hcpName: selectedHCP.name,
      value: Number(newOpt.value),
      stage: newOpt.stage,
      probability: Number(newOpt.probability),
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setOpportunities([opportunity, ...opportunities]);
    setShowModal(false);
    setNewOpt({ hcpId: '', value: '', stage: '潜在', probability: 30 });
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  const getHCPLevel = (hcpId: string) => {
    const hcp = MOCK_HCPS.find(h => h.id === hcpId);
    return hcp ? hcp.level : 'C';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-slate-800">销售机会追踪</h2>
            {filterHcpId && (
              <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                <span>客户: {filteredHCPName}</span>
                <button onClick={clearFilter} className="hover:text-blue-900 transition-colors">
                  <FilterX size={14} />
                </button>
              </div>
            )}
          </div>
          <p className="text-slate-500">从潜在到成交，全程监控您的销售管线</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm">
            <Kanban size={18} />
            <span>看板模式</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-bold text-sm transition-all">
            <List size={18} />
            <span>列表模式</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 min-h-[500px]">
        {(['潜在', '跟进', '待结', '成交'] as const).map((stage) => {
          const stageOpts = displayOpportunities.filter(o => o.stage === stage);
          return (
            <div key={stage} className="flex flex-col space-y-4 min-w-[280px]">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    stage === '成交' ? 'bg-emerald-500' : stage === '跟进' ? 'bg-blue-500' : 'bg-slate-400'
                  }`}></span>
                  <h4 className="font-bold text-slate-700">{stage}</h4>
                  <span className="bg-white border border-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {stageOpts.length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
              </div>
              
              <div className="flex-1 space-y-4 bg-slate-100/40 p-3 rounded-2xl border border-dashed border-slate-200 min-h-[400px]">
                {stageOpts.map(opt => (
                  <div key={opt.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{opt.hcpName}</h5>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${getHCPLevel(opt.hcpId) === 'A' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            {getHCPLevel(opt.hcpId)}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">#{opt.id}</span>
                      </div>
                      <span className="text-blue-600 text-sm font-bold">￥{(opt.value/1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4">
                      <div className="flex items-center bg-slate-50 px-2 py-1 rounded">
                        <TrendingUp size={12} className="mr-1 text-emerald-500" />
                        概率: {opt.probability}%
                      </div>
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {opt.updatedAt}
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-500 ${opt.probability === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${opt.probability}%` }}></div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => {
                    setNewOpt({ ...newOpt, stage: stage, hcpId: filterHcpId || '' });
                    setShowModal(true);
                  }}
                  className="w-full py-4 text-slate-400 hover:text-blue-600 text-xs font-bold border border-dashed border-slate-300 rounded-xl hover:bg-white hover:border-blue-300 transition-all flex items-center justify-center space-x-2"
                >
                  <span>+ 添加{stage}机会</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
                  <UserPlus size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">新建销售机会</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">选择 HCP (医生)</label>
                <select 
                  className="w-full bg-slate-50 border-none rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
                  value={newOpt.hcpId}
                  onChange={(e) => setNewOpt({ ...newOpt, hcpId: e.target.value })}
                  disabled={!!filterHcpId}
                >
                  <option value="">请选择目标客户...</option>
                  {MOCK_HCPS.map(h => (
                    <option key={h.id} value={h.id}>{h.name} - {h.hospital}</option>
                  ))}
                </select>
                {filterHcpId && <p className="text-[10px] text-blue-500 mt-1.5 font-bold">已锁定当前筛选的客户</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">预计价值 (CNY)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">￥</span>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-none rounded-xl p-3.5 pl-8 focus:ring-2 focus:ring-blue-500 font-bold" 
                      placeholder="0.00"
                      value={newOpt.value}
                      onChange={(e) => setNewOpt({ ...newOpt, value: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">成交概率 (%)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border-none rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 font-bold" 
                    placeholder="0-100"
                    value={newOpt.probability}
                    onChange={(e) => setNewOpt({ ...newOpt, probability: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-colors">取消</button>
              <button 
                onClick={handleAddOpportunity}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                保存机会
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTracking;
