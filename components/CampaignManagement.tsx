
import React, { useState } from 'react';
import { Plus, Clock, CheckCircle2, XCircle, Send, DollarSign, Users, AlertCircle } from 'lucide-react';
import { Campaign, CampaignStatus, UserRole } from '../types';

interface CampaignManagementProps {
  user: any;
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}

const CampaignManagement: React.FC<CampaignManagementProps> = ({ user, campaigns, setCampaigns }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '学术交流',
    budget: '',
    description: ''
  });

  const getStatusStyle = (status: CampaignStatus) => {
    switch (status) {
      case CampaignStatus.SUBMITTED: return 'bg-blue-50 text-blue-600 border-blue-100';
      case CampaignStatus.MANAGER_APPROVED: return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case CampaignStatus.COMPLIANCE_APPROVED: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case CampaignStatus.REJECTED: return 'bg-red-50 text-red-600 border-red-100';
      case CampaignStatus.CLOSED: return 'bg-slate-50 text-slate-500 border-slate-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status: CampaignStatus) => {
    switch (status) {
      case CampaignStatus.SUBMITTED: return <Send size={14} className="mr-1.5" />;
      case CampaignStatus.MANAGER_APPROVED: return <Clock size={14} className="mr-1.5" />;
      case CampaignStatus.COMPLIANCE_APPROVED: return <CheckCircle2 size={14} className="mr-1.5" />;
      case CampaignStatus.REJECTED: return <XCircle size={14} className="mr-1.5" />;
      default: return <AlertCircle size={14} className="mr-1.5" />;
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.budget) {
      alert("请填写完整信息");
      return;
    }
    const newCampaign: Campaign = {
      id: `C${Date.now()}`,
      title: formData.title,
      type: formData.type,
      budget: Number(formData.budget),
      status: CampaignStatus.SUBMITTED,
      applicant: user.name,
      date: new Date().toISOString().split('T')[0],
      description: formData.description,
      targetHCPs: ['H1']
    };
    setCampaigns([newCampaign, ...campaigns]);
    setShowModal(false);
    setFormData({ title: '', type: '学术交流', budget: '', description: '' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">市场活动管理</h2>
          <p className="text-slate-500">申请预算并跟踪活动的审批进展</p>
        </div>
        {user.role === UserRole.REP && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 flex items-center space-x-2 hover:bg-blue-700 transition-all"
          >
            <Plus size={20} />
            <span>提交新活动申请</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center ${getStatusStyle(camp.status)}`}>
                  {getStatusIcon(camp.status)}
                  {camp.status}
                </span>
                <span className="text-xs text-slate-400 font-medium">#{camp.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{camp.title}</h3>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{camp.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><DollarSign size={16} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">预算</p>
                    <p className="text-sm font-bold text-slate-700">￥{camp.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Users size={16} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">关联HCP</p>
                    <p className="text-sm font-bold text-slate-700">{camp.targetHCPs.length} 位</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                  {camp.applicant[0]}
                </div>
                <span className="text-xs font-medium text-slate-600">{camp.applicant}</span>
              </div>
              <span className="text-xs text-slate-400">{camp.date}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">提交市场活动申请</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">活动名称</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500" 
                  placeholder="例如：某药临床研讨会" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">活动类型</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                  >
                    <option>学术交流</option>
                    <option>圆桌讨论</option>
                    <option>科室推广</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">预算额度 (CNY)</label>
                  <input 
                    type="number" 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500" 
                    placeholder="金额" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">活动描述</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 h-24" 
                  placeholder="请简述活动目的与形式..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex items-center justify-end space-x-3">
              <button onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">取消</button>
              <button onClick={handleSubmit} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">提交审批</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement;
