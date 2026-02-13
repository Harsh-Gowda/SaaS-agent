import { useState, useMemo } from 'react';
import { useUsers, useForms } from '@/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Users,
  FileText,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

// Mock data for analytics
const userActivityData = [
  { date: 'Mon', logins: 45, signups: 8 },
  { date: 'Tue', logins: 52, signups: 12 },
  { date: 'Wed', logins: 48, signups: 6 },
  { date: 'Thu', logins: 61, signups: 15 },
  { date: 'Fri', logins: 55, signups: 10 },
  { date: 'Sat', logins: 38, signups: 4 },
  { date: 'Sun', logins: 42, signups: 5 },
];

const formSubmissionsData = [
  { name: 'Student Registration', submissions: 145, responses: 132 },
  { name: 'Patient Intake', submissions: 89, responses: 85 },
  { name: 'Employee Onboarding', submissions: 67, responses: 64 },
  { name: 'Customer Feedback', submissions: 234, responses: 198 },
];

const userRoleData = [
  { name: 'Admin', value: 5, color: '#6366f1' },
  { name: 'Manager', value: 12, color: '#8b5cf6' },
  { name: 'User', value: 78, color: '#10b981' },
  { name: 'Guest', value: 23, color: '#f59e0b' },
];

const monthlyGrowthData = [
  { month: 'Jan', users: 120, forms: 8 },
  { month: 'Feb', users: 145, forms: 10 },
  { month: 'Mar', users: 180, forms: 12 },
  { month: 'Apr', users: 220, forms: 15 },
  { month: 'May', users: 285, forms: 18 },
  { month: 'Jun', users: 340, forms: 22 },
];

const deviceData = [
  { name: 'Desktop', value: 58, color: '#6366f1' },
  { name: 'Mobile', value: 35, color: '#8b5cf6' },
  { name: 'Tablet', value: 7, color: '#10b981' },
];

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
            <div className={cn(
              'flex items-center gap-1 mt-2 text-sm',
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span>{change}</span>
              <span className="text-slate-400 ml-1">vs last month</span>
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

export default function Analytics() {
  const { users } = useUsers();
  const { forms } = useForms();
  const [timeRange, setTimeRange] = useState('7d');

  // Calculate stats
  const stats = useMemo(() => {
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalForms = forms.length;
    const totalSubmissions = 543; // Mock data
    const avgResponseTime = '2.3h'; // Mock data

    return {
      activeUsers,
      totalForms,
      totalSubmissions,
      avgResponseTime,
    };
  }, [users, forms]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 mt-1">
            Insights and statistics about your data
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          change="+12%"
          trend="up"
          icon={Users}
          color="#6366f1"
        />
        <StatCard
          title="Total Forms"
          value={stats.totalForms}
          change="+3"
          trend="up"
          icon={FileText}
          color="#8b5cf6"
        />
        <StatCard
          title="Form Submissions"
          value={stats.totalSubmissions}
          change="+28%"
          trend="up"
          icon={Activity}
          color="#10b981"
        />
        <StatCard
          title="Avg Response Time"
          value={stats.avgResponseTime}
          change="-15%"
          trend="up"
          icon={TrendingUp}
          color="#f59e0b"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Activity</CardTitle>
            <CardDescription>Daily logins and new signups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={userActivityData}>
                <defs>
                  <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="logins" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorLogins)" 
                  name="Logins"
                />
                <Area 
                  type="monotone" 
                  dataKey="signups" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorSignups)" 
                  name="Signups"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Form Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Form Performance</CardTitle>
            <CardDescription>Submissions vs responses by form</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={formSubmissionsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="submissions" fill="#6366f1" name="Submissions" radius={[0, 4, 4, 0]} />
                <Bar dataKey="responses" fill="#10b981" name="Responses" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Growth */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Growth Over Time</CardTitle>
            <CardDescription>Users and forms growth trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="users" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', r: 4 }}
                  name="Users"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="forms" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  name="Forms"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Roles Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Roles</CardTitle>
            <CardDescription>Distribution by role</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {userRoleData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Device Usage</CardTitle>
            <CardDescription>Access by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Forms */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Forms</CardTitle>
            <CardDescription>Forms with highest completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formSubmissionsData
                .sort((a, b) => (b.responses / b.submissions) - (a.responses / a.submissions))
                .slice(0, 4)
                .map((form, index) => {
                  const completionRate = Math.round((form.responses / form.submissions) * 100);
                  return (
                    <div key={form.name} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{form.name}</span>
                          <span className="text-sm text-slate-500">
                            {form.responses} / {form.submissions}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex-shrink-0">
                        {completionRate}%
                      </Badge>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
