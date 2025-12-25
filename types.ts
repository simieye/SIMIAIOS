
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
  BROWSE_TOOLS = 'BROWSE_TOOLS',
  MCP_MARKET = 'MCP_MARKET',
  OS_ASSISTANT = 'OS_ASSISTANT',
  SNOV_CENTER = 'SNOV_CENTER',
  BEXT_IMAGE_CENTER = 'BEXT_IMAGE_CENTER',
  DATA_SOVEREIGNTY = 'DATA_SOVEREIGNTY',
  MODEL_MARKET = 'MODEL_MARKET',
  TAIJI_GEO = 'TAIJI_GEO',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  NEURAL_TRAINING = 'NEURAL_TRAINING'
}

export type Language = 'en' | 'zh';
export type AuthMode = 'login' | 'signup';
export type AuthType = 'email' | 'mobile';

export type ContentType = 'PRODUCT' | 'BLOG' | 'WHITEPAPER' | 'FAQ' | 'HOWTO' | 'OTHER';
export type ContentStatus = 'PENDING' | 'ANALYZING' | 'OPTIMIZING' | 'DONE' | 'FAILED';

export interface GeoContent {
  id: string;
  tenantId: string;
  title: string;
  sourceUrl?: string;
  sourceType: 'url' | 'pdf' | 'text' | 'shopify';
  originalHtml?: string;
  originalMarkdown?: string;
  optimizedHtml?: string;
  optimizedMarkdown?: string;
  jsonLd?: any;
  status: ContentStatus;
  type: ContentType;
  createdAt: string;
  updatedAt: string;
  
  // Scoring Metrics
  originalScore?: number;
  currentScore?: number;
  diagnostic?: GeoDiagnostic;

  // Relations
  units?: GeoKnowledgeUnit[];
  citations?: GeoCitation[];
  statistics?: GeoStatistic[];
  scores?: GeoScore[];
}

export interface GeoKnowledgeUnit {
  id: string;
  contentId: string;
  orderIndex: number;
  title: string;
  body: string;
  tags: string[];
  embeddingStatus: 'PROCESSED' | 'PENDING';
}

export interface GeoCitation {
  id: string;
  contentId: string;
  sourceUrl: string;
  snippet?: string;
  author?: string;
}

export interface GeoStatistic {
  id: string;
  contentId: string;
  metricName: string;
  value?: number;
  unit?: string;
  sourceUrl: string;
  description?: string;
}

export interface GeoScore {
  id: string;
  contentId: string;
  overallScore: number;
  authoritativeScore: number;
  statisticScore: number;
  quotationScore: number;
  technicalScore: number;
  fluentScore: number;
  uniquenessScore: number;
  estimatedBoostPct: number;
  createdAt: string;
}

export interface GeoDiagnostic {
  missingFactors: string[];
  detectedFactors: Record<string, number>;
  suggestedSources: Array<{ type: string; topic: string; url: string }>;
  suggestedQuotes: Array<{ author: string; text: string; url: string }>;
  keyTechnicalTerms: string[];
  overallScore?: number;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: 'Text' | 'Image' | 'Multi-modal' | 'Code' | 'Video' | 'Audio';
  isPremium?: boolean;
  isFree?: boolean;
  contextLimit?: string;
  pricing?: string;
}

export interface MCPServer {
  id: string;
  name: string;
  category: 'Browser' | 'Data' | 'Dev' | 'Payment' | 'Creative' | 'Research' | 'Outreach' | 'Vision';
  description: Record<Language, string>;
  icon: string;
  isHot?: boolean;
  capabilities: string[];
}

export interface ProductSystem {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: Record<Language, string>;
  price: string;
  features: Record<Language, string[]>;
  isPopular?: boolean;
}

export interface CaseStudy {
  id: string;
  title: Record<Language, string>;
  metric: string;
  image: string;
}

export interface AISearchTool {
  id: string;
  name: string;
  logo: string;
}

export interface GeoStep {
  id: number;
  title: Record<Language, string>;
  desc: Record<Language, string>;
}

export interface CoreValue {
  id: string;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  icon: string;
}

export interface AffiliateBenefit {
  id: string;
  title: Record<Language, string>;
  icon: string;
}

export interface JobPosting {
  id: string;
  title: Record<Language, string>;
  department: string;
  requirements: Record<Language, string[]>;
  benefits: Record<Language, string[]>;
}

export interface StrategicPartner {
  id: string;
  name: string;
  logo: string;
}

export interface ToolCategory {
  id: string;
  name: Record<Language, string>;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: Record<Language, string>;
  icon: string;
}

export interface Metric {
  label: Record<Language, string>;
  value: string;
  change: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface GeoNode {
  id: string;
  label: string;
  type: string;
}
