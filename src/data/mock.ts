import type { User, CustomForm, Tenant, Reminder, Payment, ActivityLog, Notification } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@dataflow.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
    status: 'active',
    customData: {
      phone: '+1 555-0100',
      department: 'Management',
      employeeId: 'ADM001',
    },
  },
  {
    id: '2',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date('2024-02-10'),
    status: 'active',
    customData: {
      phone: '+1 555-0101',
      department: 'Sales',
      employeeId: 'EMP001',
      joinDate: '2024-01-01',
    },
  },
  {
    id: '3',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    createdAt: new Date('2024-02-05'),
    lastLogin: new Date('2024-02-12'),
    status: 'active',
    customData: {
      phone: '+1 555-0102',
      department: 'Marketing',
      employeeId: 'EMP002',
      joinDate: '2024-01-15',
    },
  },
  {
    id: '4',
    email: 'mike.wilson@example.com',
    name: 'Mike Wilson',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    createdAt: new Date('2024-02-10'),
    lastLogin: new Date('2024-02-11'),
    status: 'inactive',
    customData: {
      phone: '+1 555-0103',
      department: 'Engineering',
      employeeId: 'EMP003',
      joinDate: '2024-02-01',
    },
  },
  {
    id: '5',
    email: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date('2024-02-15'),
    status: 'active',
    customData: {
      phone: '+1 555-0104',
      department: 'HR',
      employeeId: 'EMP004',
      joinDate: '2024-02-10',
    },
  },
];

// Mock Forms
export const mockForms: CustomForm[] = [
  {
    id: '1',
    name: 'Student Registration',
    description: 'Form for registering new students in the dormitory',
    fields: [
      { id: 'f1', type: 'text', label: 'Full Name', placeholder: 'Enter full name', required: true, order: 1 },
      { id: 'f2', type: 'email', label: 'Email Address', placeholder: 'student@email.com', required: true, order: 2 },
      { id: 'f3', type: 'tel', label: 'Phone Number', placeholder: '+1 555-0000', required: true, order: 3 },
      { id: 'f4', type: 'text', label: 'Student ID', placeholder: 'STU001', required: true, order: 4 },
      { id: 'f5', type: 'select', label: 'Room Number', required: true, options: ['101', '102', '103', '104', '105'], order: 5 },
      { id: 'f6', type: 'date', label: 'Check-in Date', required: true, order: 6 },
      { id: 'f7', type: 'date', label: 'Expected Check-out', required: true, order: 7 },
      { id: 'f8', type: 'textarea', label: 'Emergency Contact', placeholder: 'Name and phone number', required: true, order: 8 },
      { id: 'f9', type: 'switch', label: 'Active Status', required: false, defaultValue: true, order: 9 },
    ],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-01'),
    createdBy: '1',
    isActive: true,
    category: 'Education',
    icon: 'GraduationCap',
  },
  {
    id: '2',
    name: 'Patient Intake',
    description: 'Dental patient intake and appointment form',
    fields: [
      { id: 'p1', type: 'text', label: 'Patient Name', placeholder: 'Full name', required: true, order: 1 },
      { id: 'p2', type: 'email', label: 'Email', placeholder: 'patient@email.com', required: true, order: 2 },
      { id: 'p3', type: 'tel', label: 'Phone', placeholder: 'Contact number', required: true, order: 3 },
      { id: 'p4', type: 'date', label: 'Date of Birth', required: true, order: 4 },
      { id: 'p5', type: 'select', label: 'Gender', required: false, options: ['Male', 'Female', 'Other', 'Prefer not to say'], order: 5 },
      { id: 'p6', type: 'date', label: 'Appointment Date', required: true, order: 6 },
      { id: 'p7', type: 'select', label: 'Appointment Type', required: true, options: ['Checkup', 'Cleaning', 'Filling', 'Root Canal', 'Extraction', 'Consultation'], order: 7 },
      { id: 'p8', type: 'textarea', label: 'Medical History', placeholder: 'Any relevant medical conditions', required: false, order: 8 },
      { id: 'p9', type: 'switch', label: 'First Visit', required: false, defaultValue: false, order: 9 },
    ],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-05'),
    createdBy: '1',
    isActive: true,
    category: 'Healthcare',
    icon: 'Stethoscope',
  },
  {
    id: '3',
    name: 'Employee Onboarding',
    description: 'New employee onboarding information form',
    fields: [
      { id: 'e1', type: 'text', label: 'Employee Name', placeholder: 'Full name', required: true, order: 1 },
      { id: 'e2', type: 'email', label: 'Work Email', placeholder: 'name@company.com', required: true, order: 2 },
      { id: 'e3', type: 'text', label: 'Employee ID', placeholder: 'EMP001', required: true, order: 3 },
      { id: 'e4', type: 'select', label: 'Department', required: true, options: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'], order: 4 },
      { id: 'e5', type: 'text', label: 'Job Title', placeholder: 'Software Engineer', required: true, order: 5 },
      { id: 'e6', type: 'date', label: 'Start Date', required: true, order: 6 },
      { id: 'e7', type: 'currency', label: 'Salary', placeholder: '50000', required: true, order: 7 },
      { id: 'e8', type: 'select', label: 'Employment Type', required: true, options: ['Full-time', 'Part-time', 'Contract', 'Intern'], order: 8 },
      { id: 'e9', type: 'textarea', label: 'Notes', placeholder: 'Additional information', required: false, order: 9 },
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
    createdBy: '1',
    isActive: true,
    category: 'HR',
    icon: 'Briefcase',
  },
  {
    id: '4',
    name: 'Customer Feedback',
    description: 'Collect customer feedback and ratings',
    fields: [
      { id: 'c1', type: 'text', label: 'Customer Name', placeholder: 'Your name', required: true, order: 1 },
      { id: 'c2', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true, order: 2 },
      { id: 'c3', type: 'rating', label: 'Overall Rating', required: true, order: 3 },
      { id: 'c4', type: 'select', label: 'Product/Service', required: true, options: ['Product A', 'Product B', 'Product C', 'Service A', 'Service B'], order: 4 },
      { id: 'c5', type: 'textarea', label: 'Feedback', placeholder: 'Share your experience', required: true, order: 5 },
      { id: 'c6', type: 'checkbox', label: 'Would you recommend us?', required: false, options: ['Yes'], order: 6 },
      { id: 'c7', type: 'switch', label: 'Contact for follow-up', required: false, defaultValue: false, order: 7 },
    ],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-12'),
    createdBy: '1',
    isActive: true,
    category: 'Customer Service',
    icon: 'MessageSquare',
  },
];

// Mock Tenant
export const mockTenant: Tenant = {
  id: '1',
  name: 'DataFlow Demo',
  slug: 'demo',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  accentColor: '#ec4899',
  fontFamily: 'Inter',
  plan: 'pro',
  modules: ['analytics', 'exports', 'reminders'],
  createdAt: new Date('2024-01-01'),
  expiresAt: new Date('2025-01-01'),
  maxUsers: 50,
  maxForms: 20,
  maxResponses: 10000,
};

// Mock Reminders
export const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Monthly Rent Due',
    message: 'Reminder: Your monthly rent payment is due in 3 days.',
    userId: '2',
    type: 'email',
    scheduledAt: new Date('2024-02-25'),
    status: 'pending',
    recurrence: 'monthly',
  },
  {
    id: '2',
    title: 'Dental Appointment',
    message: 'Your dental checkup is scheduled for tomorrow at 2:00 PM.',
    userId: '3',
    type: 'sms',
    scheduledAt: new Date('2024-02-20'),
    sentAt: new Date('2024-02-20'),
    status: 'sent',
    recurrence: 'once',
  },
  {
    id: '3',
    title: 'Follow-up Visit',
    message: 'Time to schedule your 6-month follow-up appointment.',
    userId: '3',
    type: 'email',
    scheduledAt: new Date('2024-03-15'),
    status: 'pending',
    recurrence: 'once',
  },
  {
    id: '4',
    title: 'Form Submission Deadline',
    message: 'Complete your employee onboarding form before the deadline.',
    userId: '4',
    type: 'in-app',
    scheduledAt: new Date('2024-02-18'),
    sentAt: new Date('2024-02-18'),
    status: 'sent',
    recurrence: 'once',
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: '1',
    userId: '2',
    amount: 500,
    currency: 'USD',
    status: 'completed',
    description: 'Monthly Rent - February 2024',
    createdAt: new Date('2024-02-01'),
    paidAt: new Date('2024-02-01'),
    metadata: { roomNumber: '101', month: 'February' },
  },
  {
    id: '2',
    userId: '3',
    amount: 150,
    currency: 'USD',
    status: 'completed',
    description: 'Dental Cleaning',
    createdAt: new Date('2024-02-15'),
    paidAt: new Date('2024-02-15'),
    metadata: { service: 'Cleaning', dentist: 'Dr. Smith' },
  },
  {
    id: '3',
    userId: '2',
    amount: 500,
    currency: 'USD',
    status: 'pending',
    description: 'Monthly Rent - March 2024',
    createdAt: new Date('2024-03-01'),
    metadata: { roomNumber: '101', month: 'March' },
  },
  {
    id: '4',
    userId: '5',
    amount: 75,
    currency: 'USD',
    status: 'completed',
    description: 'Consultation Fee',
    createdAt: new Date('2024-02-10'),
    paidAt: new Date('2024-02-10'),
    metadata: { service: 'Consultation' },
  },
];

// Mock Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'created',
    entityType: 'user',
    entityId: '2',
    details: { name: 'John Doe' },
    createdAt: new Date('2024-02-01T10:00:00'),
    ipAddress: '192.168.1.1',
  },
  {
    id: '2',
    userId: '1',
    action: 'created',
    entityType: 'form',
    entityId: '1',
    details: { name: 'Student Registration' },
    createdAt: new Date('2024-01-20T14:30:00'),
    ipAddress: '192.168.1.1',
  },
  {
    id: '3',
    userId: '2',
    action: 'updated',
    entityType: 'user',
    entityId: '2',
    details: { field: 'phone', oldValue: '+1 555-0100', newValue: '+1 555-0101' },
    createdAt: new Date('2024-02-05T09:15:00'),
    ipAddress: '192.168.1.2',
  },
  {
    id: '4',
    userId: '1',
    action: 'deleted',
    entityType: 'form',
    entityId: '5',
    details: { name: 'Old Form' },
    createdAt: new Date('2024-02-10T16:45:00'),
    ipAddress: '192.168.1.1',
  },
  {
    id: '5',
    userId: '3',
    action: 'created',
    entityType: 'payment',
    entityId: '2',
    details: { amount: 150, description: 'Dental Cleaning' },
    createdAt: new Date('2024-02-15T11:20:00'),
    ipAddress: '192.168.1.3',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New User Registered',
    message: 'Sarah Johnson has successfully registered.',
    type: 'info',
    read: false,
    createdAt: new Date('2024-02-15T10:00:00'),
    link: '/users/5',
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Payment of $150 received from Jane Smith.',
    type: 'success',
    read: true,
    createdAt: new Date('2024-02-15T11:20:00'),
    link: '/payments/2',
  },
  {
    id: '3',
    title: 'Form Submission',
    message: 'New submission received for "Patient Intake" form.',
    type: 'info',
    read: false,
    createdAt: new Date('2024-02-16T09:30:00'),
    link: '/forms/2',
  },
  {
    id: '4',
    title: 'Reminder Sent',
    message: 'Monthly rent reminder sent to 3 users.',
    type: 'success',
    read: true,
    createdAt: new Date('2024-02-20T08:00:00'),
  },
  {
    id: '5',
    title: 'System Update',
    message: 'System will undergo maintenance tonight at 2 AM.',
    type: 'warning',
    read: false,
    createdAt: new Date('2024-02-18T15:00:00'),
  },
];

// Initialize mock data in localStorage
export function initializeMockData() {
  if (!localStorage.getItem('dataflow_users')) {
    localStorage.setItem('dataflow_users', JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem('dataflow_forms')) {
    localStorage.setItem('dataflow_forms', JSON.stringify(mockForms));
  }
  if (!localStorage.getItem('dataflow_tenant')) {
    localStorage.setItem('dataflow_tenant', JSON.stringify(mockTenant));
  }
  if (!localStorage.getItem('dataflow_reminders')) {
    localStorage.setItem('dataflow_reminders', JSON.stringify(mockReminders));
  }
  if (!localStorage.getItem('dataflow_payments')) {
    localStorage.setItem('dataflow_payments', JSON.stringify(mockPayments));
  }
  if (!localStorage.getItem('dataflow_activity_logs')) {
    localStorage.setItem('dataflow_activity_logs', JSON.stringify(mockActivityLogs));
  }
  if (!localStorage.getItem('dataflow_notifications')) {
    localStorage.setItem('dataflow_notifications', JSON.stringify(mockNotifications));
  }
}

// Get data from localStorage
export function getStoredData<T>(key: string): T[] {
  const data = localStorage.getItem(`dataflow_${key}`);
  return data ? JSON.parse(data) : [];
}

// Save data to localStorage
export function setStoredData<T>(key: string, data: T[]) {
  localStorage.setItem(`dataflow_${key}`, JSON.stringify(data));
}
