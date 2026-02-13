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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center p-1 bg-slate-100/50 backdrop-blur-sm rounded-xl border border-slate-200/60 w-fit">
          <TabsList className="bg-transparent gap-1">
            <TabsTrigger
              value="branding"
              className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 px-6"
            >
              <Palette className="h-4 w-4" />
              <span>Branding</span>
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 px-6"
            >
              <Building2 className="h-4 w-4" />
              <span>Modules</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 px-6"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 px-6"
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-8 animate-in fade-in-50 duration-500">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Company Identity</CardTitle>
                  <CardDescription>
                    Define how your brand appears across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-slate-700">Company Name</Label>
                      <Input
                        value={brandingData.companyName}
                        onChange={(e) => setBrandingData({ ...brandingData, companyName: e.target.value })}
                        className="bg-white/70 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 h-11"
                        placeholder="e.g. Acme Corp"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-slate-700">Enterprise Logo</Label>
                      <div className="flex items-center gap-6">
                        <div className="relative group">
                          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200 group-hover:border-indigo-400 group-hover:bg-white transition-all duration-300">
                            {brandingData.logo ? (
                              <img src={brandingData.logo} alt="Logo" className="w-full h-full object-contain p-3" />
                            ) : (
                              <Upload className="h-8 w-8 text-slate-300 group-hover:text-indigo-400" />
                            )}
                          </div>
                          {brandingData.logo && (
                            <button
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setBrandingData({ ...brandingData, logo: '' })}
                            >
                              ×
                            </button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50 border-slate-200 text-indigo-600 font-semibold h-10 px-4">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload New Logo
                          </Button>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">PNG, SVG (Max 5MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-100" />

                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <Palette className="h-4 w-4 text-indigo-600" />
                      </div>
                      <h4 className="font-bold text-slate-800">Visual Styling</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-slate-700">Primary Color</Label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => setTheme({ primaryColor: color.value })}
                              className={cn(
                                'w-8 h-8 rounded-full transition-all duration-300 relative group',
                                color.class,
                                theme.primaryColor === color.value
                                  ? 'ring-4 ring-indigo-100 scale-125 z-10'
                                  : 'hover:scale-110'
                              )}
                              title={color.name}
                            >
                              {theme.primaryColor === color.value && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 italic">This color will be used for buttons, links, and accents.</p>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-slate-700">Typography</Label>
                        <Select
                          value={theme.fontFamily}
                          onValueChange={(value) => setTheme({ fontFamily: value })}
                        >
                          <SelectTrigger className="w-full bg-white/70 h-11 border-slate-200 font-medium">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-200">
                            {fontOptions.map((font) => (
                              <SelectItem key={font.value} value={font.value} className="focus:bg-indigo-50">
                                {font.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Label className="text-sm font-semibold text-slate-700">Interface Rounding</Label>
                      <div className="flex flex-wrap gap-2 p-1 bg-slate-100/50 rounded-xl border border-slate-200/40 w-fit">
                        {['none', 'sm', 'md', 'lg', 'xl', 'full'].map((radius) => (
                          <button
                            key={radius}
                            onClick={() => setTheme({ borderRadius: radius as any })}
                            className={cn(
                              'px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-200',
                              theme.borderRadius === radius
                                ? 'bg-white shadow-sm text-indigo-600'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                            )}
                          >
                            {radius === 'none' ? 'Square' : radius}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <Button onClick={handleSaveBranding} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 h-11 px-8 gap-2 font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                      <Save className="h-4 w-4" />
                      Push to Production
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Premium Preview */}
            <div className="space-y-6">
              <Card className="border-indigo-100 shadow-xl shadow-indigo-50/50 overflow-hidden bg-white/80 sticky top-6">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest">Live Preview</CardTitle>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-100 text-[10px] font-black uppercase">Real-time</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Mock UI Preview */}
                  <div className="bg-white aspect-[4/3] relative flex flex-col overflow-hidden">
                    {/* Mock Toolbar */}
                    <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-4 bg-slate-50/30">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                      {/* Mock Sidebar */}
                      <div className="w-16 border-r border-slate-100 bg-slate-900 flex flex-col items-center py-4 gap-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: theme.primaryColor }}>
                          <span className="text-white font-black text-xs">DF</span>
                        </div>
                        <div className="w-8 h-1 bg-slate-700 rounded-full" />
                        <div className="w-8 h-8 rounded-lg bg-slate-800" />
                        <div className="w-8 h-8 rounded-lg bg-slate-800" />
                      </div>

                      {/* Mock Content */}
                      <div className="flex-1 p-6 space-y-4" style={{ fontFamily: theme.fontFamily }}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-black text-slate-800 tracking-tight">
                            {brandingData.companyName || 'Your Brand'}
                          </h3>
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                          <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                          <Button
                            className="w-full text-xs font-bold h-9 shadow-md transition-all active:scale-95"
                            style={{
                              backgroundColor: theme.primaryColor,
                              borderRadius: theme.borderRadius === 'none' ? '0' :
                                theme.borderRadius === 'sm' ? '4px' :
                                  theme.borderRadius === 'md' ? '8px' :
                                    theme.borderRadius === 'lg' ? '12px' :
                                      theme.borderRadius === 'xl' ? '16px' : '9999px'
                            }}
                          >
                            Primary Action
                          </Button>
                          <div className="flex items-center gap-2">
                            <div className="h-px bg-slate-100 flex-1" />
                            <span className="text-[10px] text-slate-300 font-bold uppercase">Accent</span>
                            <div className="h-px bg-slate-100 flex-1" />
                          </div>
                          <div
                            className="text-[10px] text-center font-bold"
                            style={{ color: theme.primaryColor }}
                          >
                            Interactive link element
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-600">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-black text-sm">Design Tip</p>
                        <p className="text-indigo-100 text-xs font-medium">Use consistent primary colors and rounding for a cohesive enterprise feel.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
