import { useState } from 'react';
import { useApp, useForms } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import type { FormField, FieldType, CustomForm } from '@/types';
import {
  Type,
  Mail,
  Hash,
  Phone,
  Calendar,
  List,
  CheckSquare,
  CircleDot,
  AlignLeft,
  FileUp,
  Link,
  DollarSign,
  Percent,
  Star,
  ToggleLeft,
  GripVertical,
  Trash2,
  Copy,
  Settings,
  Eye,
  Save,
  X,
  Plus,
  ArrowLeft
} from 'lucide-react';

const fieldTypes: { type: FieldType; label: string; icon: React.ElementType; description: string }[] = [
  { type: 'text', label: 'Text', icon: Type, description: 'Single line text input' },
  { type: 'email', label: 'Email', icon: Mail, description: 'Email address input' },
  { type: 'number', label: 'Number', icon: Hash, description: 'Numeric input' },
  { type: 'tel', label: 'Phone', icon: Phone, description: 'Phone number input' },
  { type: 'date', label: 'Date', icon: Calendar, description: 'Date picker' },
  { type: 'datetime', label: 'Date & Time', icon: Calendar, description: 'Date and time picker' },
  { type: 'select', label: 'Dropdown', icon: List, description: 'Single select dropdown' },
  { type: 'multiselect', label: 'Multi Select', icon: CheckSquare, description: 'Multiple select dropdown' },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'Checkbox options' },
  { type: 'radio', label: 'Radio', icon: CircleDot, description: 'Radio button options' },
  { type: 'textarea', label: 'Text Area', icon: AlignLeft, description: 'Multi-line text input' },
  { type: 'file', label: 'File Upload', icon: FileUp, description: 'File upload field' },
  { type: 'url', label: 'URL', icon: Link, description: 'Website URL input' },
  { type: 'currency', label: 'Currency', icon: DollarSign, description: 'Currency amount' },
  { type: 'percentage', label: 'Percentage', icon: Percent, description: 'Percentage value' },
  { type: 'rating', label: 'Rating', icon: Star, description: 'Star rating' },
  { type: 'switch', label: 'Switch', icon: ToggleLeft, description: 'Toggle switch' },
];

interface FieldEditorProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

function FieldEditor({ field, onUpdate, onDelete, onDuplicate }: FieldEditorProps) {
  const [showSettings, setShowSettings] = useState(false);
  const fieldType = fieldTypes.find(ft => ft.type === field.type);
  const Icon = fieldType?.icon || Type;

  const handleOptionAdd = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    onUpdate({ ...field, options: newOptions });
  };

  const handleOptionUpdate = (index: number, value: string) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = value;
    onUpdate({ ...field, options: newOptions });
  };

  const handleOptionDelete = (index: number) => {
    const newOptions = (field.options || []).filter((_, i) => i !== index);
    onUpdate({ ...field, options: newOptions });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-slate-400 cursor-move">
          <GripVertical className="h-5 w-5" />
        </div>
        
        <div className="flex-1 space-y-3">
          {/* Field Header */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Icon className="h-4 w-4 text-indigo-600" />
            </div>
            <span className="font-medium text-slate-700">{fieldType?.label}</span>
            {field.required && (
              <Badge variant="secondary" className="text-xs">Required</Badge>
            )}
          </div>

          {/* Field Preview */}
          <div className="space-y-2">
            <Input
              value={field.label}
              onChange={(e) => onUpdate({ ...field, label: e.target.value })}
              placeholder="Field Label"
              className="font-medium"
            />
            <Input
              value={field.placeholder || ''}
              onChange={(e) => onUpdate({ ...field, placeholder: e.target.value })}
              placeholder="Placeholder text (optional)"
              className="text-sm"
            />
            
            {/* Options for select/multiselect/checkbox/radio */}
            {(field.type === 'select' || field.type === 'multiselect' || field.type === 'checkbox' || field.type === 'radio') && (
              <div className="space-y-2 pl-4 border-l-2 border-slate-100">
                <p className="text-xs font-medium text-slate-500">Options</p>
                {field.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionUpdate(index, e.target.value)}
                      className="text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-red-500"
                      onClick={() => handleOptionDelete(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={handleOptionAdd}
                >
                  <Plus className="h-3 w-3" />
                  Add Option
                </Button>
              </div>
            )}
          </div>

          {/* Field Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={field.required}
                  onCheckedChange={(checked) => onUpdate({ ...field, required: checked })}
                  id={`required-${field.id}`}
                />
                <Label htmlFor={`required-${field.id}`} className="text-sm cursor-pointer">
                  Required
                </Label>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-1 text-slate-500',
                  showSettings && 'text-indigo-600 bg-indigo-50'
                )}
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-indigo-600"
                onClick={onDuplicate}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-500"
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Settings */}
          {showSettings && (
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Default Value</Label>
                  <Input
                    value={field.defaultValue || ''}
                    onChange={(e) => onUpdate({ ...field, defaultValue: e.target.value })}
                    placeholder="Default value"
                    className="text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Help Text</Label>
                  <Input
                    value={field.helpText || ''}
                    onChange={(e) => onUpdate({ ...field, helpText: e.target.value })}
                    placeholder="Help text"
                    className="text-sm mt-1"
                  />
                </div>
              </div>
              
              {(field.type === 'text' || field.type === 'textarea') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Min Length</Label>
                    <Input
                      type="number"
                      value={field.validation?.min || ''}
                      onChange={(e) => onUpdate({
                        ...field,
                        validation: { ...field.validation, min: parseInt(e.target.value) }
                      })}
                      placeholder="Min"
                      className="text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Max Length</Label>
                    <Input
                      type="number"
                      value={field.validation?.max || ''}
                      onChange={(e) => onUpdate({
                        ...field,
                        validation: { ...field.validation, max: parseInt(e.target.value) }
                      })}
                      placeholder="Max"
                      className="text-sm mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FormBuilder() {
  const { dispatch } = useApp();
  const { addForm, updateForm } = useForms();
  const [editingForm, setEditingForm] = useState<CustomForm | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('builder');

  // Initialize new form if not editing
  const [formData, setFormData] = useState<Partial<CustomForm>>({
    name: '',
    description: '',
    fields: [],
    isActive: true,
    category: 'General',
  });

  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${fieldTypes.find(ft => ft.type === type)?.label || 'Field'}`,
      required: false,
      order: (formData.fields?.length || 0) + 1,
      options: ['select', 'multiselect', 'checkbox', 'radio'].includes(type) ? ['Option 1'] : undefined,
    };
    
    setFormData({
      ...formData,
      fields: [...(formData.fields || []), newField],
    });
    
    toast.success('Field added');
  };

  const handleUpdateField = (updatedField: FormField) => {
    setFormData({
      ...formData,
      fields: formData.fields?.map(f => f.id === updatedField.id ? updatedField : f) || [],
    });
  };

  const handleDeleteField = (fieldId: string) => {
    setFormData({
      ...formData,
      fields: formData.fields?.filter(f => f.id !== fieldId) || [],
    });
    toast.success('Field removed');
  };

  const handleDuplicateField = (field: FormField) => {
    const duplicatedField: FormField = {
      ...field,
      id: `field-${Date.now()}`,
      label: `${field.label} (Copy)`,
      order: (formData.fields?.length || 0) + 1,
    };
    
    setFormData({
      ...formData,
      fields: [...(formData.fields || []), duplicatedField],
    });
    toast.success('Field duplicated');
  };

  const handleSave = () => {
    if (!formData.name?.trim()) {
      toast.error('Please enter a form name');
      return;
    }

    if (!formData.fields?.length) {
      toast.error('Please add at least one field');
      return;
    }

    const newForm: CustomForm = {
      id: editingForm?.id || `form-${Date.now()}`,
      name: formData.name,
      description: formData.description || '',
      fields: formData.fields,
      createdAt: editingForm?.createdAt || new Date(),
      updatedAt: new Date(),
      createdBy: editingForm?.createdBy || '1',
      isActive: formData.isActive ?? true,
      category: formData.category,
      icon: formData.icon,
    };

    if (editingForm) {
      updateForm(newForm);
      toast.success('Form updated successfully');
    } else {
      addForm(newForm);
      toast.success('Form created successfully');
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      fields: [],
      isActive: true,
      category: 'General',
    });
    setEditingForm(null);
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'forms' });
  };

  const handleCancel = () => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'forms' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {editingForm ? 'Edit Form' : 'Create Form'}
            </h1>
            <p className="text-slate-500">
              Build custom forms with drag-and-drop fields
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            Save Form
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="builder">Form Builder</TabsTrigger>
          <TabsTrigger value="settings">Form Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Field Palette */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Field Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {fieldTypes.map((fieldType) => {
                      const Icon = fieldType.icon;
                      return (
                        <button
                          key={fieldType.type}
                          onClick={() => handleAddField(fieldType.type)}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-center"
                        >
                          <Icon className="h-5 w-5 text-indigo-600" />
                          <span className="text-xs font-medium text-slate-700">{fieldType.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form Canvas */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Form Canvas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Form Header */}
                    <div className="space-y-3 pb-4 border-b border-slate-100">
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Form Name"
                        className="text-xl font-semibold border-0 px-0 focus-visible:ring-0 placeholder:text-slate-400"
                      />
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Form description (optional)"
                        className="border-0 px-0 resize-none focus-visible:ring-0 placeholder:text-slate-400"
                        rows={2}
                      />
                    </div>

                    {/* Fields */}
                    {formData.fields?.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                          <Plus className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500">Click a field type to add it to your form</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.fields?.map((field) => (
                          <FieldEditor
                            key={field.id}
                            field={field}
                            onUpdate={handleUpdateField}
                            onDelete={() => handleDeleteField(field.id)}
                            onDuplicate={() => handleDuplicateField(field)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Form Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Form Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Active Status</Label>
                  <p className="text-sm text-slate-500">Enable or disable this form</p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Form Preview</DialogTitle>
            <DialogDescription>
              This is how your form will appear to users
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center pb-4 border-b">
              <h2 className="text-xl font-semibold">{formData.name || 'Untitled Form'}</h2>
              {formData.description && (
                <p className="text-slate-500 mt-1">{formData.description}</p>
              )}
            </div>
            
            {formData.fields?.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.helpText && (
                  <p className="text-sm text-slate-500">{field.helpText}</p>
                )}
                
                {field.type === 'textarea' ? (
                  <Textarea placeholder={field.placeholder} />
                ) : field.type === 'select' ? (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || 'Select...'} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option, i) => (
                        <SelectItem key={i} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === 'checkbox' ? (
                  <div className="space-y-2">
                    {field.options?.map((option, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="checkbox" id={`preview-${field.id}-${i}`} />
                        <label htmlFor={`preview-${field.id}-${i}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                ) : field.type === 'radio' ? (
                  <div className="space-y-2">
                    {field.options?.map((option, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="radio" name={field.id} id={`preview-${field.id}-${i}`} />
                        <label htmlFor={`preview-${field.id}-${i}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                ) : field.type === 'switch' ? (
                  <div className="flex items-center gap-2">
                    <Switch />
                    <span className="text-sm text-slate-600">{field.placeholder}</span>
                  </div>
                ) : field.type === 'rating' ? (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 text-slate-300" />
                    ))}
                  </div>
                ) : (
                  <Input 
                    type={field.type} 
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            
            {formData.fields && formData.fields.length > 0 && (
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Submit
              </Button>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
