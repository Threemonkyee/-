
import React, { useState } from 'react';
import { Kanban, List, Filter, Search, TrendingUp, MoreHorizontal, Calendar, XCircle, UserPlus } from 'lucide-react';
import { MOCK_OPPORTUNITIES, MOCK_HCPS } from '../constants';
import { Opportunity } from '../types';

const SalesTracking: React.FC<{ user: any }> = ({ user }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [showModal, setShowModal] = useState(false);
  const [newOpt, setNewOpt] = useState({
    hcpId: '',
    value: '',
    stage: '潜在' as Opportunity['stage'],
    probability: 30
  });

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

    setOpportunities([...opportunities, opportunity]);
    setShowModal(false);
    setNewOpt({ hcpId: '', value: '', stage: '潜在', probability: 30 });
  };

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
        {(['潜在', '跟进', '待结', '成交'] as const).map((stage) => (
          <div key={stage} className="flex flex-col space-y-4 min-w-[280px]">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${
                  stage === '成交' ? 'bg-emerald-500' : stage === '跟进' ? 'bg-blue-500' : 'bg-slate-400'
                }`}></span>
                <h4 className="font-bold text-slate-700">{stage}</h4>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {opportunities.filter(o => o.stage === stage).length}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
            </div>
            
            <div className="flex-1 space-y-4 bg-slate-100/50 p-3 rounded-2xl border border-dashed border-slate-200">
              {opportunities.filter(o => o.stage === stage).map(opt => (
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
              <button 
                onClick={() => {
                  setNewOpt({ ...newOpt, stage: stage });
                  setShowModal(true);
                }}
                className="w-full py-3 text-slate-400 hover:text-blue-600 text-sm font-medium border border-dashed border-slate-300 rounded-xl hover:bg-white transition-all flex items-center justify-center space-x-2"
              >
                <span>+ 添加机会</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <UserPlus size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">新建销售机会</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">目标 HCP (医生)</label>
                <select 
                  className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={newOpt.hcpId}
                  onChange={(e) => setNewOpt({ ...newOpt, hcpId: e.target.value })}
                >
                  <option value="">请选择医生...</option>
                  {MOCK_HCPS.map(h => (
                    <option key={h.id} value={h.id}>{h.name} - {h.hospital}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">预计价值 (CNY)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500" 
                    placeholder="金额"
                    value={newOpt.value}
                    onChange={(e) => setNewOpt({ ...newOpt, value: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">成交概率 (%)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500" 
                    placeholder="0-100"
                    value={newOpt.probability}
                    onChange={(e) => setNewOpt({ ...newOpt, probability: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">当前阶段</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['潜在', '跟进', '待结', '成交'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setNewOpt({ ...newOpt, stage: s, probability: s === '成交' ? 100 : newOpt.probability })}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        newOpt.stage === s 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex items-center justify-end space-x-3">
              <button onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">取消</button>
              <button 
                onClick={handleAddOpportunity}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
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
