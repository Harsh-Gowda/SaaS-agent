import { useEffect } from 'react';
import { AppProvider, useApp, useAuth, useUI } from '@/store';
import { initializeMockData } from '@/data/mock';
import { Toaster } from '@/components/ui/sonner';
// toast is used via sonner's toast function in components

// Auth Components
import LoginForm from '@/components/auth/LoginForm';

// Layout Components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

// View Components
import Dashboard from '@/components/dashboard/Dashboard';
import UserManagement from '@/components/users/UserManagement';
import FormBuilder from '@/components/form-builder/FormBuilder';
import FormList from '@/components/form-builder/FormList';
import Reminders from '@/components/reminders/Reminders';
import Payments from '@/components/payments/Payments';
import Settings from '@/components/settings/Settings';
import Analytics from '@/components/analytics/Analytics';
import ActivityLog from '@/components/activity/ActivityLog';

// Landing Page
import LandingPage from '@/sections/LandingPage';

import './App.css';

// Main App Content
function AppContent() {
  const { state } = useApp();
  const { isAuthenticated } = useAuth();
  const { currentView, sidebarOpen } = useUI();

  useEffect(() => {
    // Initialize mock data on app load
    initializeMockData();
  }, []);

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <LoginForm />
        <Toaster position="top-right" richColors />
      </div>
    );
  }

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'forms':
        return <FormList />;
      case 'form-builder':
        return <FormBuilder />;
      case 'reminders':
        return <Reminders />;
      case 'payments':
        return <Payments />;
      case 'settings':
        return <Settings />;
      case 'analytics':
        return <Analytics />;
      case 'activity':
        return <ActivityLog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {state.isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : state.error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-500 text-lg">{state.error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            renderView()
          )}
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}

// Main App with Provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
