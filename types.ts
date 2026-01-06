
export enum UserRole {
  REP = '医药代表',
  MANAGER = '区域经理',
  COMPLIANCE = '合规部门',
  ADMIN = '管理层'
}

export enum HCPLevel {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface HCP {
  id: string;
  name: string;
  hospital: string;
  department: string;
  level: HCPLevel;
  region: string;
  lastVisit: string;
  totalSpend: number;
}

export enum CampaignStatus {
  DRAFT = '草稿',
  SUBMITTED = '已提交',
  MANAGER_APPROVED = '经理已批',
  REJECTED = '已拒绝',
  COMPLIANCE_APPROVED = '合规已过',
  CLOSED = '已关闭'
}

export interface Campaign {
  id: string;
  title: string;
  type: string;
  budget: number;
  status: CampaignStatus;
  applicant: string;
  date: string;
  description: string;
  targetHCPs: string[];
}

export interface Opportunity {
  id: string;
  hcpId: string;
  hcpName: string;
  value: number;
  stage: '潜在' | '跟进' | '待结' | '成交';
  probability: number;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  region: string;
}
