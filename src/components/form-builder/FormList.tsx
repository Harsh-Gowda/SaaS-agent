import { useState } from 'react';
import { useForms, useUI } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Eye,
  FileText,
  GraduationCap,
  Stethoscope,
  Briefcase,
  MessageSquare,
  BarChart3,
  ExternalLink,
  Users,
  Calendar
} from 'lucide-react';
import type { CustomForm } from '@/types';

const categoryIcons: Record<string, React.ElementType> = {
  Education: GraduationCap,
  Healthcare: Stethoscope,
  HR: Briefcase,
  'Customer Service': MessageSquare,
  General: FileText,
  Sales: BarChart3,
};

export default function FormList() {
  const { forms, deleteForm } = useForms();
  const { setCurrentView } = useUI();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<CustomForm | null>(null);
  const [viewForm, setViewForm] = useState<CustomForm | null>(null);

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (form: CustomForm) => {
    setFormToDelete(form);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (formToDelete) {
      deleteForm(formToDelete.id);
      toast.success('Form deleted successfully');
      setDeleteDialogOpen(false);
      setFormToDelete(null);
    }
  };

  const handleDuplicate = (_form: CustomForm) => {
    // In a real app, this would create a copy
    toast.success('Form duplicated (feature coming soon)');
  };

  const handleEdit = (_form: CustomForm) => {
    // Navigate to form builder with form data
    setCurrentView('form-builder');
    toast.info('Edit mode (feature coming soon)');
  };

  const handleView = (form: CustomForm) => {
    setViewForm(form);
  };

  const getCategoryIcon = (category?: string) => {
    const Icon = category ? categoryIcons[category] || FileText : FileText;
    return Icon;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Forms</h1>
          <p className="text-slate-500 mt-1">
            Manage your custom forms and collect data
          </p>
        </div>
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 gap-2"
          onClick={() => setCurrentView('form-builder')}
        >
          <Plus className="h-4 w-4" />
          Create Form
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Forms Grid */}
      {filteredForms.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {searchQuery ? 'No forms found' : 'No forms yet'}
          </h3>
          <p className="text-slate-500 mb-4">
            {searchQuery 
              ? 'Try adjusting your search query'
              : 'Create your first form to start collecting data'
            }
          </p>
          {!searchQuery && (
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 gap-2"
              onClick={() => setCurrentView('form-builder')}
            >
              <Plus className="h-4 w-4" />
              Create Form
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredForms.map((form) => {
            const CategoryIcon = getCategoryIcon(form.category);
            return (
              <Card 
                key={form.id} 
                className={cn(
                  'group hover:shadow-lg transition-all duration-200',
                  !form.isActive && 'opacity-75'
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <CategoryIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold line-clamp-1">
                          {form.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {form.category || 'General'}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(form)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(form)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(form)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(form)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {form.description || 'No description'}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{form.fields.length} fields</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>0 responses</span>
                      </div>
                    </div>
                    <Badge 
                      variant={form.isActive ? 'default' : 'secondary'}
                      className={cn(
                        form.isActive && 'bg-green-100 text-green-700 hover:bg-green-100'
                      )}
                    >
                      {form.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Updated {new Date(form.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{formToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Form Dialog */}
      <Dialog open={!!viewForm} onOpenChange={() => setViewForm(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{viewForm?.name}</DialogTitle>
            <DialogDescription>
              {viewForm?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary">{viewForm?.category}</Badge>
              <span className="text-slate-500">{viewForm?.fields.length} fields</span>
              <span className={cn(
                'px-2 py-0.5 rounded-full text-xs',
                viewForm?.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
              )}>
                {viewForm?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-slate-900">Form Fields</h4>
              {viewForm?.fields.map((field) => (
                <div key={field.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{field.label}</p>
                    <p className="text-xs text-slate-500 capitalize">{field.type}</p>
                  </div>
                  {field.required && (
                    <Badge variant="secondary" className="text-xs">Required</Badge>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 gap-2">
                <ExternalLink className="h-4 w-4" />
                Open Form
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <BarChart3 className="h-4 w-4" />
                View Responses
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
