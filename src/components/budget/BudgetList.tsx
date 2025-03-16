import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Budget, Category, Transaction, getCategoryById } from '@/lib/data';
import { BudgetForm } from './BudgetForm';
import { useToast } from '@/hooks/use-toast';

interface BudgetListProps {
  budgets: Budget[];
  categories: Category[];
  transactions: Transaction[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

export function BudgetList({ budgets, categories, transactions, onEdit, onDelete }: BudgetListProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);

  const handleEdit = (budget: Budget) => {
    setCurrentBudget(budget);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Budget deleted",
      description: "The budget has been deleted successfully.",
    });
  };

  const handleEditSubmit = (data: Budget) => {
    onEdit(data);
    setIsEditDialogOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const calculateSpent = (categoryId: string, month: string, year: number) => {
    return transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return (
          t.category === categoryId &&
          monthNames[tDate.getMonth()] === month &&
          tDate.getFullYear() === year
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return 'bg-destructive';
    if (percentage > 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <Card className="w-full overflow-hidden animate-fade-in">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Month/Year</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    No budgets found
                  </TableCell>
                </TableRow>
              ) : (
                budgets.map((budget) => {
                  const category = getCategoryById(budget.categoryId);
                  const spent = calculateSpent(budget.categoryId, budget.month, budget.year);
                  const remaining = budget.amount - spent;
                  const percentage = Math.min(Math.round((spent / budget.amount) * 100), 100);
                  
                  return (
                    <TableRow key={budget.id} className="animate-fade-in">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {category && (
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                          )}
                          <span>{category ? category.name : 'Unknown'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{`${budget.month} ${budget.year}`}</TableCell>
                      <TableCell>{formatCurrency(budget.amount)}</TableCell>
                      <TableCell>{formatCurrency(spent)}</TableCell>
                      <TableCell className={remaining < 0 ? "text-destructive" : ""}>
                        {formatCurrency(remaining)}
                      </TableCell>
                      <TableCell>
                        <div className="w-full max-w-24">
                          <div className="flex items-center">
                            <Progress
                              value={percentage}
                              className="h-2"
                              indicatorClassName={getProgressColor(spent, budget.amount)}
                            />
                            <span className="ml-2 text-xs font-medium">{percentage}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleEdit(budget)}
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(budget.id)}
                              className="cursor-pointer text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
          </DialogHeader>
          {currentBudget && (
            <BudgetForm
              onSubmit={handleEditSubmit}
              defaultValues={currentBudget}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
