
export enum AppView {
  PUBLIC = 'PUBLIC',
  ADMIN = 'ADMIN',
  DASHBOARD = 'DASHBOARD',
  RD_STUDIO = 'RD_STUDIO', 
  API_STUDIO = 'API_STUDIO',
  GEO_INSIGHTS = 'GEO_INSIGHTS',
  AUTH = 'AUTH',
  AFFILIATE = 'AFFILIATE',
  RECRUITMENT = 'RECRUITMENT',
  PARTNERS = 'PARTNERS',
  BROWSE_TOOLS = 'BROWSE_TOOLS'
}

export type Language = 'en' | 'zh';
export type AuthMode = 'login' | 'signup';
export type AuthType = 'email' | 'mobile';

export interface EcosystemModule {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  metric?: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ProductSystem {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
}

export interface CoreValue {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
}

export interface PricingPlan {
  name: Record<Language, string>;
  price: Record<Language, string>;
  features: Record<Language, string[]>;
  cta: Record<Language, string>;
  highlighted?: boolean;
  type?: 'sme' | 'enterprise' | 'investor';
}

export interface AffiliateBenefit {
  tier: Record<Language, string>;
  condition: Record<Language, string>;
  reward: Record<Language, string>;
  icon: string;
}

export interface JobPosting {
  title: Record<Language, string>;
  count: number;
  salary: Record<Language, string>;
  requirements: Record<Language, string[]>;
  benefits: Record<Language, string[]>;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface GeoNode {
  id: string;
  type: string;
  label: string;
  status: 'done' | 'active' | 'waiting';
}

export interface CaseStudy {
  industry: Record<Language, string>;
  strategy: Record<Language, string>;
  result: Record<Language, string>;
  insight: Record<Language, string>;
}

export interface AISearchTool {
  name: string;
  share: string;
  advantage: Record<Language, string>;
  suitability: Record<Language, string>;
  traffic: string;
}

export interface GeoStep {
  title: Record<Language, string>;
  description: Record<Language, string>;
  timeline: string;
}

export interface StrategicPartner {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
  icon: string;
  category: 'Global' | 'Retail' | 'Tech';
}

export interface Tool {
  id: string;
  name: Record<Language, string>;
  description?: Record<Language, string>;
  path: string;
  isHot?: boolean;
}

export interface ToolCategory {
  id: string;
  name: Record<Language, string>;
  count: number;
  tools: Tool[];
  icon: string;
}
