import { useAuth, useUI, useModules } from '@/store';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  PlusCircle,
  Bell, 
  CreditCard, 
  Settings, 
  BarChart3, 
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  view: 'dashboard' | 'users' | 'forms' | 'form-builder' | 'reminders' | 'payments' | 'settings' | 'analytics' | 'activity';
  badge?: number;
  premium?: boolean;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  { id: 'users', label: 'Users', icon: Users, view: 'users' },
  { id: 'forms', label: 'Forms', icon: FileText, view: 'forms' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, view: 'analytics' },
];

const moduleNavItems: NavItem[] = [
  { id: 'reminders', label: 'Reminders', icon: Bell, view: 'reminders', premium: true },
  { id: 'payments', label: 'Payments', icon: CreditCard, view: 'payments', premium: true },
];

const systemNavItems: NavItem[] = [
  { id: 'activity', label: 'Activity Log', icon: Activity, view: 'activity' },
  { id: 'settings', label: 'Settings', icon: Settings, view: 'settings' },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, setCurrentView, currentView } = useUI();
  const { logout, user } = useAuth();
  const { modules } = useModules();

  const handleNavClick = (view: NavItem['view']) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const isModuleActive = (moduleId: string) => {
    return modules.find(m => m.id === moduleId)?.isActive ?? false;
  };

  const NavButton = ({ item }: { item: NavItem }) => {
    const isActive = currentView === item.view;
    const Icon = item.icon;
    
    // Check if this is a premium module that's not activated
    if (item.premium && !isModuleActive(item.id)) {
      return null;
    }

    return (
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
          'w-full justify-start gap-3 mb-1 transition-all duration-200',
          isActive 
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
            : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50',
          !sidebarOpen && 'justify-center px-2'
        )}
        onClick={() => handleNavClick(item.view)}
      >
        <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-white')} />
        {sidebarOpen && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {item.premium && (
              <Sparkles className="h-3 w-3 text-amber-400" />
            )}
            {item.badge && (
              <Badge variant={isActive ? 'secondary' : 'default'} className="ml-auto text-xs">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Button>
    );
  };

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-40 transition-all duration-300 flex flex-col',
        sidebarOpen ? 'w-64' : 'w-16'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DF</span>
            </div>
            <span className="font-semibold text-slate-800">DataFlow</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">DF</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-600"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className={cn('space-y-1', sidebarOpen ? 'px-3' : 'px-2')}>
          {/* Main Navigation */}
          <div className="mb-4">
            {sidebarOpen && (
              <p className="px-3 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Main
              </p>
            )}
            {mainNavItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>

          {/* Create Form Button */}
          <div className={cn('mb-4', sidebarOpen ? 'px-3' : 'px-2')}>
            <Button
              className={cn(
                'w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200',
                !sidebarOpen && 'justify-center px-2'
              )}
              onClick={() => handleNavClick('form-builder')}
            >
              <PlusCircle className="h-4 w-4 flex-shrink-0" />
              {sidebarOpen && <span className="ml-2">Create Form</span>}
            </Button>
          </div>

          {/* Modules */}
          {(isModuleActive('reminders') || isModuleActive('payments')) && (
            <div className="mb-4">
              {sidebarOpen && (
                <p className="px-3 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Modules
                </p>
              )}
              {moduleNavItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* System */}
          <div>
            {sidebarOpen && (
              <p className="px-3 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                System
              </p>
            )}
            {systemNavItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* User Section */}
      <div className="border-t border-slate-100 p-3">
        <div className={cn(
          'flex items-center gap-3 p-2 rounded-lg bg-slate-50',
          !sidebarOpen && 'justify-center'
        )}>
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-medium text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          )}
          
          {sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
