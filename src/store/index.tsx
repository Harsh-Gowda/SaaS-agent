import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { 
  User, 
  CustomForm, 
  Tenant, 
  Module, 
  Reminder, 
  Payment, 
  ActivityLog,
  Notification,
  ThemeSettings 
} from '@/types';

// App State Interface
interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Tenant
  tenant: Tenant | null;
  
  // Data
  users: User[];
  forms: CustomForm[];
  reminders: Reminder[];
  payments: Payment[];
  activityLogs: ActivityLog[];
  notifications: Notification[];
  
  // Modules
  modules: Module[];
  
  // Theme
  theme: ThemeSettings;
  
  // UI State
  sidebarOpen: boolean;
  currentView: 'dashboard' | 'users' | 'forms' | 'form-builder' | 'reminders' | 'payments' | 'settings' | 'analytics' | 'activity';
  isLoading: boolean;
  error: string | null;
}

// Initial Theme
const defaultTheme: ThemeSettings = {
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  accentColor: '#ec4899',
  backgroundColor: '#f8fafc',
  surfaceColor: '#ffffff',
  textColor: '#1e293b',
  textMutedColor: '#64748b',
  borderColor: '#e2e8f0',
  successColor: '#10b981',
  warningColor: '#f59e0b',
  errorColor: '#ef4444',
  infoColor: '#3b82f6',
  fontFamily: 'Inter',
  borderRadius: 'md',
  buttonStyle: 'filled',
};

// Initial State
const initialState: AppState = {
  currentUser: null,
  isAuthenticated: false,
  tenant: null,
  users: [],
  forms: [],
  reminders: [],
  payments: [],
  activityLogs: [],
  notifications: [],
  modules: [
    { id: 'payments', name: 'Payments', description: 'Track and manage payments', icon: 'CreditCard', isActive: false, isPremium: true },
    { id: 'reminders', name: 'Reminders', description: 'Automated reminders and notifications', icon: 'Bell', isActive: false, isPremium: true },
    { id: 'analytics', name: 'Analytics', description: 'Advanced analytics and reporting', icon: 'BarChart3', isActive: true, isPremium: false },
    { id: 'exports', name: 'Data Export', description: 'Export data in multiple formats', icon: 'Download', isActive: true, isPremium: false },
    { id: 'api', name: 'API Access', description: 'RESTful API for integrations', icon: 'Code', isActive: false, isPremium: true },
    { id: 'branding', name: 'White Label', description: 'Custom branding and theming', icon: 'Palette', isActive: false, isPremium: true },
  ],
  theme: defaultTheme,
  sidebarOpen: true,
  currentView: 'dashboard',
  isLoading: false,
  error: null,
};

// Action Types
type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_TENANT'; payload: Tenant | null }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'SET_FORMS'; payload: CustomForm[] }
  | { type: 'ADD_FORM'; payload: CustomForm }
  | { type: 'UPDATE_FORM'; payload: CustomForm }
  | { type: 'DELETE_FORM'; payload: string }
  | { type: 'SET_REMINDERS'; payload: Reminder[] }
  | { type: 'ADD_REMINDER'; payload: Reminder }
  | { type: 'UPDATE_REMINDER'; payload: Reminder }
  | { type: 'SET_PAYMENTS'; payload: Payment[] }
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'SET_ACTIVITY_LOGS'; payload: ActivityLog[] }
  | { type: 'ADD_ACTIVITY_LOG'; payload: ActivityLog }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'TOGGLE_MODULE'; payload: string }
  | { type: 'SET_THEME'; payload: Partial<ThemeSettings> }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_CURRENT_VIEW'; payload: AppState['currentView'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_TENANT':
      return { ...state, tenant: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.payload.id ? action.payload : u)),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    case 'SET_FORMS':
      return { ...state, forms: action.payload };
    case 'ADD_FORM':
      return { ...state, forms: [...state.forms, action.payload] };
    case 'UPDATE_FORM':
      return {
        ...state,
        forms: state.forms.map((f) => (f.id === action.payload.id ? action.payload : f)),
      };
    case 'DELETE_FORM':
      return {
        ...state,
        forms: state.forms.filter((f) => f.id !== action.payload),
      };
    case 'SET_REMINDERS':
      return { ...state, reminders: action.payload };
    case 'ADD_REMINDER':
      return { ...state, reminders: [...state.reminders, action.payload] };
    case 'UPDATE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map((r) => (r.id === action.payload.id ? action.payload : r)),
      };
    case 'SET_PAYMENTS':
      return { ...state, payments: action.payload };
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };
    case 'SET_ACTIVITY_LOGS':
      return { ...state, activityLogs: action.payload };
    case 'ADD_ACTIVITY_LOG':
      return { ...state, activityLogs: [action.payload, ...state.activityLogs] };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'TOGGLE_MODULE':
      return {
        ...state,
        modules: state.modules.map((m) =>
          m.id === action.payload ? { ...m, isActive: !m.isActive } : m
        ),
      };
    case 'SET_THEME':
      return { ...state, theme: { ...state.theme, ...action.payload } };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Selectors
export const useAuth = () => {
  const { state, dispatch } = useApp();
  return {
    user: state.currentUser,
    isAuthenticated: state.isAuthenticated,
    setUser: (user: User | null) => dispatch({ type: 'SET_USER', payload: user }),
    setAuthenticated: (value: boolean) => dispatch({ type: 'SET_AUTHENTICATED', payload: value }),
    login: (user: User) => {
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    },
    logout: () => {
      dispatch({ type: 'RESET_STATE' });
    },
  };
};

export const useTheme = () => {
  const { state, dispatch } = useApp();
  return {
    theme: state.theme,
    setTheme: (theme: Partial<ThemeSettings>) => dispatch({ type: 'SET_THEME', payload: theme }),
  };
};

export const useUsers = () => {
  const { state, dispatch } = useApp();
  return {
    users: state.users,
    setUsers: (users: User[]) => dispatch({ type: 'SET_USERS', payload: users }),
    addUser: (user: User) => dispatch({ type: 'ADD_USER', payload: user }),
    updateUser: (user: User) => dispatch({ type: 'UPDATE_USER', payload: user }),
    deleteUser: (id: string) => dispatch({ type: 'DELETE_USER', payload: id }),
  };
};

export const useForms = () => {
  const { state, dispatch } = useApp();
  return {
    forms: state.forms,
    setForms: (forms: CustomForm[]) => dispatch({ type: 'SET_FORMS', payload: forms }),
    addForm: (form: CustomForm) => dispatch({ type: 'ADD_FORM', payload: form }),
    updateForm: (form: CustomForm) => dispatch({ type: 'UPDATE_FORM', payload: form }),
    deleteForm: (id: string) => dispatch({ type: 'DELETE_FORM', payload: id }),
  };
};

export const useModules = () => {
  const { state, dispatch } = useApp();
  return {
    modules: state.modules,
    toggleModule: (id: string) => dispatch({ type: 'TOGGLE_MODULE', payload: id }),
    activeModules: state.modules.filter((m) => m.isActive),
  };
};

export const useUI = () => {
  const { state, dispatch } = useApp();
  return {
    sidebarOpen: state.sidebarOpen,
    currentView: state.currentView,
    isLoading: state.isLoading,
    error: state.error,
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    setCurrentView: (view: AppState['currentView']) => dispatch({ type: 'SET_CURRENT_VIEW', payload: view }),
    setLoading: (value: boolean) => dispatch({ type: 'SET_LOADING', payload: value }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
  };
};
