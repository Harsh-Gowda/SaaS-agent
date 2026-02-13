import { useEffect } from 'react';
import { useApp, useAuth, useUsers, useForms } from '@/store';
import { 
  Users, 
  FileText, 
  Bell, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock chart data
const userGrowthData = [
  { name: 'Jan', users: 45 },
  { name: 'Feb', users: 52 },
  { name: 'Mar', users: 61 },
  { name: 'Apr', users: 58 },
  { name: 'May', users: 72 },
  { name: 'Jun', users: 85 },
  { name: 'Jul', users: 94 },
];

const formSubmissionsData = [
  { name: 'Student Reg', submissions: 45 },
  { name: 'Patient Intake', submissions: 32 },
  { name: 'Employee Onboard', submissions: 28 },
  { name: 'Feedback', submissions: 56 },
];

const statusData = [
  { name: 'Active', value: 68, color: '#10b981' },
  { name: 'Inactive', value: 24, color: '#f59e0b' },
  { name: 'Pending', value: 8, color: '#3b82f6' },
];

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
}

function StatCard({ title, value, description, icon: Icon, trend, trendValue, color }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
            <div className="flex items-center gap-2 mt-2">
              {trend && trendValue && (
                <div className={cn(
                  'flex items-center gap-1 text-sm',
                  trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500'
                )}>
                  {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : 
                   trend === 'down' ? <TrendingDown className="h-4 w-4" /> : null}
                  <span>{trendValue}</span>
                </div>
              )}
              <span className="text-sm text-slate-400">{description}</span>
            </div>
          </div>
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const { user } = useAuth();
  const { users } = useUsers();
  const { forms } = useForms();

  // Load data on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('dataflow_users');
    if (storedUsers) {
      dispatch({ type: 'SET_USERS', payload: JSON.parse(storedUsers) });
    }
    
    const storedForms = localStorage.getItem('dataflow_forms');
    if (storedForms) {
      dispatch({ type: 'SET_FORMS', payload: JSON.parse(storedForms) });
    }
    
    const storedActivity = localStorage.getItem('dataflow_activity_logs');
    if (storedActivity) {
      dispatch({ type: 'SET_ACTIVITY_LOGS', payload: JSON.parse(storedActivity) });
    }
  }, [dispatch]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalForms: forms.length,
    activeForms: forms.filter(f => f.isActive).length,
    totalResponses: 245,
    thisMonthResponses: 42,
  };

  const recentActivity = state.activityLogs.slice(0, 5);

  const getActivityIcon = (entityType: string) => {
    switch (entityType) {
      case 'user':
        return Users;
      case 'form':
        return FileText;
      case 'payment':
        return CreditCard;
      default:
        return Activity;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'bg-green-100 text-green-700';
      case 'updated':
        return 'bg-blue-100 text-blue-700';
      case 'deleted':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-500 mt-1">
            Here's what's happening with your data today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Plus className="h-4 w-4" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          description="from last month"
          icon={Users}
          trend="up"
          trendValue="+12%"
          color="#6366f1"
        />
        <StatCard
          title="Active Forms"
          value={stats.activeForms}
          description={`of ${stats.totalForms} total`}
          icon={FileText}
          trend="up"
          trendValue="+3"
          color="#8b5cf6"
        />
        <StatCard
          title="Total Responses"
          value={stats.totalResponses}
          description={`+${stats.thisMonthResponses} this month`}
          icon={Activity}
          trend="up"
          trendValue="+18%"
          color="#10b981"
        />
        <StatCard
          title="Pending Reminders"
          value={state.reminders.filter(r => r.status === 'pending').length}
          description="to be sent"
          icon={Bell}
          trend="neutral"
          trendValue="5"
          color="#f59e0b"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
            <CardDescription>New users over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Form Submissions Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Form Submissions</CardTitle>
            <CardDescription>Responses by form type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={formSubmissionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="submissions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Status</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <CardDescription>Latest actions in your account</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No recent activity</p>
              ) : (
                recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.entityType);
                  return (
                    <div 
                      key={activity.id} 
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                        getActionColor(activity.action)
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900 capitalize">
                            {activity.action} {activity.entityType}
                          </p>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {activity.entityType}
                          </Badge>
                        </div>
                        {activity.details?.name && (
                          <p className="text-sm text-slate-500 mt-0.5">
                            {activity.details.name}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(activity.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Plan Usage</CardTitle>
          <CardDescription>Your current plan limits and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Users</span>
                <span className="text-sm text-slate-500">{stats.totalUsers} / 50</span>
              </div>
              <Progress value={(stats.totalUsers / 50) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Forms</span>
                <span className="text-sm text-slate-500">{stats.totalForms} / 20</span>
              </div>
              <Progress value={(stats.totalForms / 20) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Responses</span>
                <span className="text-sm text-slate-500">{stats.totalResponses} / 10,000</span>
              </div>
              <Progress value={(stats.totalResponses / 10000) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
