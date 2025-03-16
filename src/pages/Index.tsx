
import React, { useState } from 'react';
import { DollarSign, TrendingUp, Wallet, PieChart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/page-header';
import { OverviewCard } from '@/components/overview/OverviewCard';
import { OverviewCharts } from '@/components/overview/OverviewCharts';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Transaction, transactions as initialTransactions, categories, calculateTotalExpenses } from '@/lib/data';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  
  // Calculate insights
  const totalExpenses = calculateTotalExpenses(transactions);
  
  // Sort transactions by date (most recent first)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    setIsAddTransactionOpen(false);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <Layout>
      <PageHeader
        title="Dashboard"
        description="Overview of your financial health"
      >
        <Button onClick={() => setIsAddTransactionOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <OverviewCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          trend={{ value: 12, isPositive: false }}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <OverviewCard
          title="Income"
          value="$4,250.00"
          trend={{ value: 8, isPositive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <OverviewCard
          title="Balance"
          value={formatCurrency(4250 - totalExpenses)}
          description="Current month"
          icon={<Wallet className="h-5 w-5" />}
        />
        <OverviewCard
          title="Categories"
          value={categories.length.toString()}
          description="Active categories"
          icon={<PieChart className="h-5 w-5" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <OverviewCharts className="lg:col-span-2" />
        
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-soft p-5">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => {
                const category = categories.find(c => c.id === transaction.category);
                return (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg animate-fade-in"
                  >
                    <div className="flex items-center space-x-3">
                      {category && (
                        <div 
                          className="h-8 w-8 rounded-full flex items-center justify-center" 
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <div 
                            className="h-2 w-2 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                );
              })}
              
              {recentTransactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No recent transactions
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => window.location.href = '/transactions'}
              >
                View All Transactions
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm
            onSubmit={handleAddTransaction}
            onCancel={() => setIsAddTransactionOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
