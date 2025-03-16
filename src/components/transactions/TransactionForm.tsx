
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Popover,
  PopoverContent, 
  PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Transaction, categories } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  id: z.string().optional(),
  amount: z.coerce.number().positive({ message: 'Amount must be a positive number' }),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
  date: z.date(),
  category: z.string().min(1, { message: 'Please select a category' }),
});

type TransactionFormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onSubmit: (data: Transaction) => void;
  defaultValues?: Partial<Transaction>;
  onCancel: () => void;
}

export function TransactionForm({ onSubmit, defaultValues, onCancel }: TransactionFormProps) {
  const { toast } = useToast();
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: defaultValues?.id || undefined,
      amount: defaultValues?.amount || undefined,
      description: defaultValues?.description || '',
      category: defaultValues?.category || '',
      date: defaultValues?.date ? new Date(defaultValues.date) : new Date(),
    },
  });
  
  function handleSubmit(data: TransactionFormValues) {
    onSubmit({
      id: data.id || crypto.randomUUID(),
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: data.date.toISOString(),
    });
    
    toast({
      title: defaultValues ? "Transaction updated" : "Transaction added",
      description: defaultValues 
        ? "Your transaction has been updated successfully." 
        : "Your transaction has been added successfully.",
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($)</FormLabel>
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
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter description"
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
          name="category"
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
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
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
            {defaultValues ? 'Update' : 'Add'} Transaction
          </Button>
        </div>
      </form>
    </Form>
  );
}
