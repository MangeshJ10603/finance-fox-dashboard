
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Budget, categories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  id: z.string().optional(),
  categoryId: z.string().min(1, { message: 'Please select a category' }),
  amount: z.coerce.number().positive({ message: 'Amount must be a positive number' }),
  month: z.string().min(1, { message: 'Please select a month' }),
  year: z.coerce.number().min(2020, { message: 'Year must be 2020 or later' }).max(2030, { message: 'Year must be 2030 or earlier' }),
});

type BudgetFormValues = z.infer<typeof formSchema>;

interface BudgetFormProps {
  onSubmit: (data: Budget) => void;
  defaultValues?: Partial<Budget>;
  onCancel: () => void;
}

export function BudgetForm({ onSubmit, defaultValues, onCancel }: BudgetFormProps) {
  const { toast } = useToast();
  
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: defaultValues?.id || undefined,
      categoryId: defaultValues?.categoryId || '',
      amount: defaultValues?.amount || undefined,
      month: defaultValues?.month || getDefaultMonth(),
      year: defaultValues?.year || new Date().getFullYear(),
    },
  });
  
  function getDefaultMonth() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[new Date().getMonth()];
  }
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  function handleSubmit(data: BudgetFormValues) {
    onSubmit({
      id: data.id || crypto.randomUUID(),
      categoryId: data.categoryId,
      amount: data.amount,
      month: data.month,
      year: data.year,
    });
    
    toast({
      title: defaultValues ? "Budget updated" : "Budget added",
      description: defaultValues 
        ? "Your budget has been updated successfully." 
        : "Your budget has been added successfully.",
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-accent">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Amount ($)</FormLabel>
              <FormControl>
                <Input
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  {...field}
                  className="focus-visible:ring-2 focus-visible:ring-accent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-accent">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
            {defaultValues ? 'Update' : 'Add'} Budget
          </Button>
        </div>
      </form>
    </Form>
  );
}
