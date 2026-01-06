
import { HCP, HCPLevel, Campaign, CampaignStatus, UserRole, User, Opportunity } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: '张三', role: UserRole.REP, region: '华东区' },
  { id: '2', name: '李四', role: UserRole.MANAGER, region: '华东区' },
  { id: '3', name: '王五', role: UserRole.COMPLIANCE, region: '总部' },
  { id: '4', name: '赵六', role: UserRole.ADMIN, region: '总部' },
];

export const MOCK_HCPS: HCP[] = [
  { id: 'H1', name: '王医生', hospital: '第一人民医院', department: '心内科', level: HCPLevel.A, region: '上海', lastVisit: '2023-10-20', totalSpend: 15000 },
  { id: 'H2', name: '陈医生', hospital: '华山医院', department: '神经内科', level: HCPLevel.A, region: '上海', lastVisit: '2023-11-05', totalSpend: 22000 },
  { id: 'H3', name: '刘医生', hospital: '瑞金医院', department: '内分泌科', level: HCPLevel.B, region: '上海', lastVisit: '2023-10-15', totalSpend: 8000 },
  { id: 'H4', name: '孙医生', hospital: '第六人民医院', department: '骨科', level: HCPLevel.C, region: '苏州', lastVisit: '2023-09-12', totalSpend: 3000 },
  { id: 'H5', name: '周医生', hospital: '苏大附一院', department: '消化内科', level: HCPLevel.B, region: '苏州', lastVisit: '2023-11-01', totalSpend: 12000 },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'C1', title: '学术年会赞助', type: '学术交流', budget: 12000, status: CampaignStatus.SUBMITTED, applicant: '张三', date: '2023-11-20', description: '支持心内科学术年会', targetHCPs: ['H1', 'H2'] },
  { id: 'C2', title: '科室小型研讨会', type: '研讨会', budget: 4500, status: CampaignStatus.MANAGER_APPROVED, applicant: '张三', date: '2023-11-25', description: '关于新药临床应用的讨论', targetHCPs: ['H3'] },
  { id: 'C3', title: '医生节慰问', type: '公益活动', budget: 800, status: CampaignStatus.CLOSED, applicant: '张三', date: '2023-08-19', description: '慰问一线医生', targetHCPs: ['H1', 'H2', 'H3'] },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  { id: 'O1', hcpId: 'H1', hcpName: '王医生', value: 50000, stage: '跟进', probability: 60, updatedAt: '2023-11-10' },
  { id: 'O2', hcpId: 'H2', hcpName: '陈医生', value: 120000, stage: '潜在', probability: 30, updatedAt: '2023-11-12' },
  { id: 'O3', hcpId: 'H5', hcpName: '周医生', value: 85000, stage: '成交', probability: 100, updatedAt: '2023-11-01' },
];

export const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
