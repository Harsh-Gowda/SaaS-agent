import { useState } from 'react';
import { useApp, useTheme, useModules } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { Module } from '@/types';
import {
  Palette,
  Building2,
  CreditCard,
  Bell,
  Shield,
  Users,
  Sparkles,
  Save,
  Upload,
  Mail,
  Smartphone,
} from 'lucide-react';

const colorOptions = [
  { name: 'Indigo', value: '#6366f1', class: 'bg-indigo-500' },
  { name: 'Purple', value: '#8b5cf6', class: 'bg-purple-500' },
  { name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
  { name: 'Green', value: '#10b981', class: 'bg-green-500' },
  { name: 'Orange', value: '#f97316', class: 'bg-orange-500' },
  { name: 'Pink', value: '#ec4899', class: 'bg-pink-500' },
  { name: 'Red', value: '#ef4444', class: 'bg-red-500' },
  { name: 'Slate', value: '#64748b', class: 'bg-slate-500' },
];

const fontOptions = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
];

export default function Settings() {
  const { state } = useApp();
  const { theme, setTheme } = useTheme();
  const { modules, toggleModule } = useModules();
  // const { user } = useAuth(); // TODO: Use for user-specific settings
  
  const [activeTab, setActiveTab] = useState('branding');
  const [brandingData, setBrandingData] = useState({
    companyName: state.tenant?.name || 'DataFlow',
    logo: state.tenant?.logo || '',
    favicon: state.tenant?.favicon || '',
  });

  // const isAdmin = user?.role === 'admin'; // TODO: Use for admin-only features

  const handleSaveBranding = () => {
    toast.success('Branding settings saved');
  };

  const handleModuleToggle = (moduleId: string) => {
    toggleModule(moduleId);
    const module = modules.find(m => m.id === moduleId);
    toast.success(`${module?.name} ${module?.isActive ? 'disabled' : 'enabled'}`);
  };

  const ModuleCard = ({ module }: { module: Module }) => {
    const icons: Record<string, React.ElementType> = {
      CreditCard,
      Bell,
      BarChart3: () => <span className="text-lg">📊</span>,
      Download: () => <span className="text-lg">⬇️</span>,
      Code: () => <span className="text-lg">💻</span>,
      Palette,
    };
    const Icon = icons[module.icon] || Building2;

    return (
      <Card className={cn(
        'transition-all duration-200',
        module.isActive ? 'border-indigo-200 shadow-md' : 'opacity-75'
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                module.isActive ? 'bg-indigo-100' : 'bg-slate-100'
              )}>
                <Icon className={cn(
                  'h-5 w-5',
                  module.isActive ? 'text-indigo-600' : 'text-slate-400'
                )} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{module.name}</h4>
                  {module.isPremium && (
                    <Badge variant="secondary" className="text-xs gap-1">
                      <Sparkles className="h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-500">{module.description}</p>
              </div>
            </div>
            <Switch
              checked={module.isActive}
              onCheckedChange={() => handleModuleToggle(module.id)}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account and application settings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-auto">
          <TabsTrigger value="branding" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Branding</span>
          </TabsTrigger>
          <TabsTrigger value="modules" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Modules</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Branding</CardTitle>
              <CardDescription>
                Customize your organization's appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={brandingData.companyName}
                    onChange={(e) => setBrandingData({ ...brandingData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                      {brandingData.logo ? (
                        <img src={brandingData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                      ) : (
                        <Upload className="h-6 w-6 text-slate-400" />
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="mb-3 block">Primary Color</Label>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setTheme({ primaryColor: color.value })}
                      className={cn(
                        'w-10 h-10 rounded-lg transition-all',
                        color.class,
                        theme.primaryColor === color.value && 'ring-2 ring-offset-2 ring-slate-900 scale-110'
                      )}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Font Family</Label>
                <Select 
                  value={theme.fontFamily} 
                  onValueChange={(value) => setTheme({ fontFamily: value })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-3 block">Border Radius</Label>
                <div className="flex gap-2">
                  {['none', 'sm', 'md', 'lg', 'xl', 'full'].map((radius) => (
                    <button
                      key={radius}
                      onClick={() => setTheme({ borderRadius: radius as any })}
                      className={cn(
                        'px-4 py-2 border rounded-lg text-sm capitalize transition-all',
                        theme.borderRadius === radius 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-200 hover:border-slate-300'
                      )}
                    >
                      {radius}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveBranding} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="p-6 rounded-lg border"
                style={{ 
                  fontFamily: theme.fontFamily,
                  borderRadius: theme.borderRadius === 'none' ? 0 : 
                    theme.borderRadius === 'sm' ? '4px' :
                    theme.borderRadius === 'md' ? '6px' :
                    theme.borderRadius === 'lg' ? '8px' :
                    theme.borderRadius === 'xl' ? '12px' : '9999px'
                }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.primaryColor }}>
                  {brandingData.companyName}
                </h3>
                <p className="text-slate-500 mb-4">This is how your branding will appear</p>
                <div className="flex gap-2">
                  <Button style={{ backgroundColor: theme.primaryColor }}>
                    Primary Button
                  </Button>
                  <Button variant="outline">Secondary Button</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modules Tab */}
        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modules</CardTitle>
              <CardDescription>
                Enable or disable features for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-slate-500">Receive updates via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-slate-500">Browser push notifications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-slate-500">Text message alerts</p>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium">New User Alerts</p>
                    <p className="text-sm text-slate-500">When new users are added</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Update Password
              </Button>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-slate-500 mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-red-600 mb-2">Danger Zone</h4>
                <p className="text-sm text-slate-500 mb-4">
                  Permanently delete your account and all data
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
