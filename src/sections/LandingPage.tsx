import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Check,
  ArrowRight,
  Star,
  Users,
  FileText,
  BarChart3,
  Shield,
  Zap,
  Menu,
  X,
  ChevronRight,
  Bell,
  Plus,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Customizable Forms',
    description: 'Build dynamic forms with our intuitive drag-and-drop builder. Add fields, set validations, and customize layouts.',
    color: 'bg-indigo-500',
  },
  {
    icon: Users,
    title: 'User Management',
    description: 'Easily manage users, permissions, and roles. Track activity and maintain secure access control.',
    color: 'bg-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Get insights with powerful analytics. Visualize trends, generate reports, and make data-driven decisions.',
    color: 'bg-green-500',
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Enterprise-grade security for your data. Encryption, backups, and compliance built-in.',
    color: 'bg-blue-500',
  },
  {
    icon: Zap,
    title: 'API Integration',
    description: 'Connect with your favorite tools. RESTful API with comprehensive documentation.',
    color: 'bg-amber-500',
  },
  {
    icon: Bell,
    title: 'Automated Reminders',
    description: 'Streamline processes with automation. Set triggers, create actions, and save time.',
    color: 'bg-pink-500',
  },
];

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in seconds. No credit card required to start your free trial.',
  },
  {
    number: '02',
    title: 'Build Your Forms',
    description: 'Use our drag-and-drop builder to create custom forms tailored to your needs.',
  },
  {
    number: '03',
    title: 'Collect Data',
    description: 'Share your forms and start collecting responses immediately.',
  },
  {
    number: '04',
    title: 'Analyze & Grow',
    description: 'Get insights, generate reports, and make data-driven decisions.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    content: 'DataFlow transformed how we handle customer data. The customizable forms are incredible!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director, GlobalCorp',
    content: 'The best investment we\'ve made. Our team productivity increased by 40%.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, GrowthLabs',
    content: 'Finally, a platform that adapts to our needs instead of the other way around.',
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 forms',
      '100 responses/month',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 79,
    description: 'For growing businesses with advanced needs',
    features: [
      'Unlimited forms',
      '10,000 responses/month',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'For large organizations with custom requirements',
    features: [
      'Everything in Pro',
      'Unlimited responses',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'Start with a 14-day free trial with full access to all Pro features. No credit card required.',
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption, regular backups, and comply with GDPR, HIPAA, and SOC 2.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <span className="font-semibold text-slate-800 text-lg">DataFlow</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-slate-600 hover:text-indigo-600 transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-slate-600 hover:text-indigo-600 transition-colors">
                How It Works
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-slate-600 hover:text-indigo-600 transition-colors">
                Pricing
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-slate-600 hover:text-indigo-600 transition-colors">
                FAQ
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost">Sign In</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-slate-600">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2 text-slate-600">
                How It Works
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-slate-600">
                Pricing
              </button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-slate-600">
                FAQ
              </button>
              <div className="pt-3 border-t space-y-2">
                <Button variant="outline" className="w-full">Sign In</Button>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        
        {/* Animated Shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
              🚀 Now with AI-powered analytics
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Manage Your Data{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              The all-in-one platform that adapts to your business. Build custom forms, 
              manage users, and scale effortlessly with our intelligent SaaS solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Watch Demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Trusted by 10,000+ companies worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-medium mb-2">POWERFUL FEATURES</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to manage, analyze, and grow your business data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110',
                      feature.color
                    )}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-medium mb-2">SIMPLE PROCESS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How DataFlow Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Get started in minutes with our simple four-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-indigo-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 transform translate-x-1/2">
                    <ChevronRight className="h-8 w-8 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-medium mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-medium mb-2">PRICING PLANS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={cn(
                  'relative',
                  plan.popular && 'border-indigo-500 shadow-xl scale-105'
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    {plan.price ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                        <span className="text-slate-500 ml-2">/month</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-slate-900">Custom</div>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={cn(
                      'w-full',
                      plan.popular 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    )}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-medium mb-2">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Everything you need to know about DataFlow
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-slate-900">{faq.question}</span>
                  {openFaq === index ? (
                    <X className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Plus className="h-5 w-5 text-slate-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Data Management?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using DataFlow. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DF</span>
                </div>
                <span className="font-semibold text-white text-lg">DataFlow</span>
              </div>
              <p className="text-sm text-slate-400">
                Empowering businesses with intelligent data management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white">Pricing</button></li>
                <li><button className="hover:text-white">Integrations</button></li>
                <li><button className="hover:text-white">API</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white">Documentation</button></li>
                <li><button className="hover:text-white">Tutorials</button></li>
                <li><button className="hover:text-white">Blog</button></li>
                <li><button className="hover:text-white">Support</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white">About</button></li>
                <li><button className="hover:text-white">Careers</button></li>
                <li><button className="hover:text-white">Privacy</button></li>
                <li><button className="hover:text-white">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © 2024 DataFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
