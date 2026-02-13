import { useState, useMemo } from 'react';
import { useApp, useUsers } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { ActivityLog } from '@/types';
import {
  Search,
  Filter,
  Download,
  User,
  FileText,
  CreditCard,
  Settings,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const actionIcons: Record<string, React.ElementType> = {
  created: Plus,
  updated: Edit,
  deleted: Trash2,
  viewed: Check,
  login: User,
  logout: X,
};

const actionColors: Record<string, string> = {
  created: 'bg-green-100 text-green-700',
  updated: 'bg-blue-100 text-blue-700',
  deleted: 'bg-red-100 text-red-700',
  viewed: 'bg-slate-100 text-slate-700',
  login: 'bg-purple-100 text-purple-700',
  logout: 'bg-orange-100 text-orange-700',
};

const entityIcons: Record<string, React.ElementType> = {
  user: User,
  form: FileText,
  payment: CreditCard,
  setting: Settings,
  reminder: Clock,
};

export default function ActivityLog() {
  const { state } = useApp();
  const { users } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const activityLogs = state.activityLogs;

  // Filter logs
  const filteredLogs = useMemo(() => {
    return activityLogs.filter(log => {
      const user = users.find(u => u.id === log.userId);
      const matchesSearch = 
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        JSON.stringify(log.details).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesEntity = entityFilter === 'all' || log.entityType === entityFilter;
      return matchesSearch && matchesAction && matchesEntity;
    });
  }, [activityLogs, users, searchQuery, actionFilter, entityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique actions and entities for filters
  const uniqueActions = [...new Set(activityLogs.map(log => log.action))];
  const uniqueEntities = [...new Set(activityLogs.map(log => log.entityType))];

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    // Less than 24 hours
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      if (hours < 1) {
        const minutes = Math.floor(diff / (60 * 1000));
        return minutes < 1 ? 'Just now' : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    }
    
    // Less than 7 days
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days}d ago`;
    }
    
    return d.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activity Log</h1>
          <p className="text-slate-500 mt-1">
            Track all actions performed in your account
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search activity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action} className="capitalize">
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  {uniqueEntities.map(entity => (
                    <SelectItem key={entity} value={entity} className="capitalize">
                      {entity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500">No activity found</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLogs.map((log) => {
                  const user = users.find(u => u.id === log.userId);
                  const ActionIcon = actionIcons[log.action] || Check;
                  const EntityIcon = entityIcons[log.entityType] || FileText;
                  
                  return (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center',
                            actionColors[log.action] || 'bg-slate-100 text-slate-700'
                          )}>
                            <ActionIcon className="h-4 w-4" />
                          </div>
                          <span className="font-medium capitalize">{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <EntityIcon className="h-4 w-4 text-slate-400" />
                          <Badge variant="secondary" className="capitalize">
                            {log.entityType}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 text-xs">
                                {user?.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="text-sm">{user?.name || 'System'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.details?.name && (
                          <span className="text-sm text-slate-600">{log.details.name}</span>
                        )}
                        {log.details?.field && (
                          <span className="text-sm text-slate-500">
                            {log.details.field}: {log.details.oldValue} → {log.details.newValue}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-500" title={new Date(log.createdAt).toLocaleString()}>
                          {formatDate(log.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-400 font-mono">
                          {log.ipAddress || '-'}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of{' '}
            {filteredLogs.length} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
