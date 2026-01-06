
import React, { useState } from 'react';
import { ShieldCheck, UserCheck, AlertCircle, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Campaign, CampaignStatus, UserRole } from '../types';
import { MOCK_CAMPAIGNS } from '../constants';

const ApprovalWorkflow: React.FC<{ user: any }> = ({ user }) => {
  const [items, setItems] = useState<Campaign[]>(MOCK_CAMPAIGNS.filter(c => 
    (user.role === UserRole.MANAGER && c.status === CampaignStatus.SUBMITTED) ||
    (user.role === UserRole.COMPLIANCE && c.status === CampaignStatus.MANAGER_APPROVED)
  ));

  const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    setItems(items.filter(i => i.id !== id));
    // In a real app, this would call an API
    alert(`${action === 'APPROVE' ? '已通过' : '已拒绝'} 申请 #${id}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">暂无待审批项</h3>
        <p className="text-slate-500 mt-2">所有的活动申请都已处理完毕，保持高效！</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">审批中心</h2>
          <p className="text-slate-500">待您审核的市场活动及异常申请</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {item.type}
                </span>
                <span className="text-slate-400 text-xs font-medium">#{item.id}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center">
                  <UserCheck size={16} className="mr-1.5 text-slate-400" />
                  申请人: {item.applicant}
                </div>
                <div className="flex items-center font-bold text-slate-700">
                  <AlertCircle size={16} className="mr-1.5 text-orange-500" />
                  预算: ￥{item.budget.toLocaleString()}
                </div>
              </div>
              <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                "{item.description}"
              </p>
            </div>
            
            <div className="flex md:flex-col gap-2 w-full md:w-auto">
              <button 
                onClick={() => handleAction(item.id, 'APPROVE')}
                className="flex-1 md:w-32 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle size={18} />
                <span>通过</span>
              </button>
              <button 
                onClick={() => handleAction(item.id, 'REJECT')}
                className="flex-1 md:w-32 py-2.5 bg-white text-red-600 border border-red-100 rounded-xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
              >
                <XCircle size={18} />
                <span>拒绝</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalWorkflow;
