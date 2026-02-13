// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'suspended';
  customData?: Record<string, any>;
}

// Form Field Types
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'number' 
  | 'tel' 
  | 'date' 
  | 'datetime' 
  | 'select' 
  | 'multiselect' 
  | 'checkbox' 
  | 'radio' 
  | 'textarea' 
  | 'file' 
  | 'url' 
  | 'currency'
  | 'percentage'
  | 'rating'
  | 'switch';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, multiselect, radio, checkbox
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  defaultValue?: any;
  order: number;
  helpText?: string;
  hidden?: boolean;
}

// Custom Form Types
export interface CustomForm {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
  category?: string;
  icon?: string;
}

// Module Types
export type ModuleType = 'payments' | 'reminders' | 'analytics' | 'exports' | 'api' | 'branding';

export interface Module {
  id: ModuleType;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  isPremium: boolean;
  price?: number;
  settings?: Record<string, any>;
}

// Tenant/Organization Types
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  customCss?: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  modules: ModuleType[];
  createdAt: Date;
  expiresAt?: Date;
  maxUsers: number;
  maxForms: number;
  maxResponses: number;
}

// Reminder Types
export interface Reminder {
  id: string;
  title: string;
  message: string;
  userId: string;
  type: 'email' | 'sms' | 'in-app' | 'whatsapp';
  scheduledAt: Date;
  sentAt?: Date;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  recurrence?: 'once' | 'daily' | 'weekly' | 'monthly';
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  description: string;
  createdAt: Date;
  paidAt?: Date;
  metadata?: Record<string, any>;
}

// Activity Log
export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: 'user' | 'form' | 'payment' | 'reminder' | 'setting';
  entityId: string;
  details?: Record<string, any>;
  createdAt: Date;
  ipAddress?: string;
}

// Dashboard Widget Types
export interface Widget {
  id: string;
  type: 'stats' | 'chart' | 'recent' | 'calendar' | 'reminders';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config?: Record<string, any>;
}

// Chart Data Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

// Filter Types
export interface Filter {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';
  value: any;
}

// Sort Types
export interface Sort {
  field: string;
  direction: 'asc' | 'desc';
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: Pagination;
}

// Theme Settings
export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textMutedColor: string;
  borderColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
  fontFamily: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  buttonStyle: 'filled' | 'outlined' | 'ghost';
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  link?: string;
}
