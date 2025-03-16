
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/data';

const PRESET_COLORS = [
  '#A78BFA', // Purple
  '#60A5FA', // Blue
  '#34D399', // Green
  '#FBBF24', // Yellow
  '#F87171', // Red
  '#FB923C', // Orange
  '#38BDF8', // Sky
  '#4ADE80', // Lime
  '#A3E635', // Light Green
  '#E879F9', // Pink
];

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  color: z.string().min(1, { message: 'Please select a color' }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  onSubmit: (data: Category) => void;
  defaultValues?: Partial<Category>;
  onCancel: () => void;
}

export function CategoryForm({ onSubmit, defaultValues, onCancel }: CategoryFormProps) {
  const { toast } = useToast();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: defaultValues?.id || undefined,
      name: defaultValues?.name || '',
      color: defaultValues?.color || PRESET_COLORS[0],
    },
  });
  
  function handleSubmit(data: CategoryFormValues) {
    onSubmit({
      id: data.id || crypto.randomUUID(),
      name: data.name,
      color: data.color,
    });
    
    toast({
      title: defaultValues ? "Category updated" : "Category added",
      description: defaultValues 
        ? "Your category has been updated successfully." 
        : "Your category has been added successfully.",
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category name"
                  {...field}
                  className="focus-visible:ring-2 focus-visible:ring-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_COLORS.map((color) => (
                    <div
                      key={color}
                      onClick={() => form.setValue('color', color)}
                      className={cn(
                        "h-8 w-8 rounded-full cursor-pointer transition-all",
                        "hover:scale-110 hover:shadow-md",
                        field.value === color && "ring-2 ring-primary ring-offset-2"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="transition-transform active:scale-95"
          >
            {defaultValues ? 'Update' : 'Add'} Category
          </Button>
        </div>
      </form>
    </Form>
  );
}
