import { useState } from 'react';
import { useApp } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import type { Reminder } from '@/types';
import {
  Plus,
  Search,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Calendar,
  Clock,
  Trash2,
  Repeat,
} from 'lucide-react';

export default function Reminders() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    userId: '',
    type: 'email' as 'email' | 'sms' | 'in-app' | 'whatsapp',
    scheduledAt: '',
    recurrence: 'once' as 'once' | 'daily' | 'weekly' | 'monthly',
  });

  const reminders = state.reminders;
  const users = state.users;

  const filteredReminders = reminders.filter(reminder =>
    reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reminder.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddReminder = () => {
    if (!formData.title || !formData.message || !formData.userId || !formData.scheduledAt) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newReminder: Reminder = {
      id: `reminder-${Date.now()}`,
      title: formData.title,
      message: formData.message,
      userId: formData.userId,
      type: formData.type,
      scheduledAt: new Date(formData.scheduledAt),
      status: 'pending',
      recurrence: formData.recurrence,
    };

    dispatch({ type: 'ADD_REMINDER', payload: newReminder });
    toast.success('Reminder scheduled successfully');
    setAddDialogOpen(false);
    setFormData({
      title: '',
      message: '',
      userId: '',
      type: 'email',
      scheduledAt: '',
      recurrence: 'once',
    });
  };

  const handleDeleteReminder = () => {
    if (!selectedReminder) return;
    dispatch({ 
      type: 'SET_REMINDERS', 
      payload: reminders.filter(r => r.id !== selectedReminder.id) 
    });
    toast.success('Reminder deleted');
    setDeleteDialogOpen(false);
    setSelectedReminder(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <Smartphone className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-700">Sent</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reminders</h1>
          <p className="text-slate-500 mt-1">
            Schedule and manage automated reminders
          </p>
        </div>
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 gap-2"
          onClick={() => setAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Schedule Reminder
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search reminders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Reminders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recurrence</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReminders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <Bell className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500">No reminders scheduled</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredReminders.map((reminder) => {
                  const user = users.find(u => u.id === reminder.userId);
                  return (
                    <TableRow key={reminder.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reminder.title}</p>
                          <p className="text-sm text-slate-500 line-clamp-1">{reminder.message}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(reminder.type)}
                          <span className="capitalize">{reminder.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{user?.name || 'Unknown'}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(reminder.scheduledAt).toLocaleDateString()}
                          <Clock className="h-4 w-4 ml-1" />
                          {new Date(reminder.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(reminder.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Repeat className="h-4 w-4 text-slate-400" />
                          <span className="capitalize text-sm">{reminder.recurrence}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-500"
                          onClick={() => {
                            setSelectedReminder(reminder);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Reminder Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Reminder</DialogTitle>
            <DialogDescription>
              Create a new reminder for a user
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Reminder title"
              />
            </div>
            
            <div>
              <Label>Message</Label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Reminder message"
                className="w-full min-h-[80px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <Label>Recipient</Label>
              <Select 
                value={formData.userId} 
                onValueChange={(value) => setFormData({ ...formData, userId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user..." />
                </SelectTrigger>
                <SelectContent>
                  {users.filter(u => u.status === 'active').map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="in-app">In-App</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Recurrence</Label>
                <Select 
                  value={formData.recurrence} 
                  onValueChange={(value: any) => setFormData({ ...formData, recurrence: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Schedule Date & Time</Label>
              <Input
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReminder} className="bg-indigo-600 hover:bg-indigo-700">
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Reminder</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this reminder?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteReminder}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
