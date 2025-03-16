
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/page-header';
import { BudgetList } from '@/components/budget/BudgetList';
import { BudgetForm } from '@/components/budget/BudgetForm';
import { Budget, budgets as initialBudgets, categories as initialCategories, transactions as initialTransactions } from '@/lib/data';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  
  const handleAddBudget = (budget: Budget) => {
    setBudgets([...budgets, budget]);
    setIsAddBudgetOpen(false);
  };
  
  const handleEditBudget = (updatedBudget: Budget) => {
    setBudgets(
      budgets.map((b) => (b.id === updatedBudget.id ? updatedBudget : b))
    );
  };
  
  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };
  
  return (
    <Layout>
      <PageHeader
        title="Budget"
        description="Manage your monthly budget limits"
      >
        <Button onClick={() => setIsAddBudgetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </PageHeader>
      
      <div className="mt-6">
        <BudgetList
          budgets={budgets}
          categories={initialCategories}
          transactions={initialTransactions}
          onEdit={handleEditBudget}
          onDelete={handleDeleteBudget}
        />
      </div>
      
      <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Budget</DialogTitle>
          </DialogHeader>
          <BudgetForm
            onSubmit={handleAddBudget}
            onCancel={() => setIsAddBudgetOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BudgetPage;
