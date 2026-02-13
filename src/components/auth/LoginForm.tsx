import { useState } from 'react';
import { useAuth, useApp } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '@/types';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { dispatch } = useApp();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - accept any email with password "password"
      if (loginData.password === 'password') {
        const mockUser: User = {
          id: '1',
          email: loginData.email,
          name: loginData.email.split('@')[0],
          role: loginData.email.includes('admin') ? 'admin' : 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginData.email}`,
          createdAt: new Date(),
          lastLogin: new Date(),
          status: 'active',
        };

        login(mockUser);

        // Load mock data
        const storedUsers = localStorage.getItem('dataflow_users');
        if (storedUsers) {
          dispatch({ type: 'SET_USERS', payload: JSON.parse(storedUsers) });
        }

        const storedForms = localStorage.getItem('dataflow_forms');
        if (storedForms) {
          dispatch({ type: 'SET_FORMS', payload: JSON.parse(storedForms) });
        }

        const storedNotifications = localStorage.getItem('dataflow_notifications');
        if (storedNotifications) {
          dispatch({ type: 'SET_NOTIFICATIONS', payload: JSON.parse(storedNotifications) });
        }

        toast.success('Welcome back!', {
          description: `Logged in as ${mockUser.role}`,
        });
      } else {
        toast.error('Invalid credentials', {
          description: 'Use any email with password "password"',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!registerData.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        email: registerData.email,
        name: registerData.name,
        role: 'admin',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${registerData.email}`,
        createdAt: new Date(),
        lastLogin: new Date(),
        status: 'active',
      };

      login(newUser);
      toast.success('Account created successfully!', {
        description: 'Welcome to DataFlow',
      });
      setIsLoading(false);
    }, 1500);
  };

  // Demo credentials helper
  const fillDemoCredentials = (type: 'admin' | 'user') => {
    setLoginData({
      email: type === 'admin' ? 'admin@dataflow.com' : 'user@example.com',
      password: 'password',
      rememberMe: false,
    });
  };

  return (
    <div className="w-full max-w-md relative">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Brand Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 mb-6 shadow-xl shadow-indigo-200/50 transform hover:scale-105 transition-transform duration-300">
          <span className="text-white font-black text-2xl tracking-tighter">DF</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Data<span className="text-indigo-600">Flow</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-slate-200" />
          <p className="text-slate-500 font-medium text-sm tracking-wide uppercase">Intelligent SaaS Solution</p>
          <span className="h-px w-8 bg-slate-200" />
        </div>
      </div>

      <Card className="w-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border-white/40 bg-white/70 backdrop-blur-xl relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-gradient-x" />

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Demo Credentials */}
              <div className="flex gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('admin')}
                  className="text-xs"
                >
                  Demo Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('user')}
                  className="text-xs"
                >
                  Demo User
                </Button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Hint: Use password "password"
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={loginData.rememberMe}
                      onCheckedChange={(checked) =>
                        setLoginData({ ...loginData, rememberMe: checked as boolean })
                      }
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="text-sm p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
              <CardDescription className="text-center">
                Start your free trial today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="name@company.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization (Optional)</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="organization"
                      placeholder="Company Name"
                      value={registerData.organization}
                      onChange={(e) => setRegisterData({ ...registerData, organization: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={registerData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setRegisterData({ ...registerData, agreeTerms: checked as boolean })
                    }
                  />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree to the{' '}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Terms
                    </Button>{' '}
                    and{' '}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
