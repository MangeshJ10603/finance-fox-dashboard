
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/page-header';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Transaction, transactions as initialTransactions } from '@/lib/data';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    setIsAddTransactionOpen(false);
  };
  
  const handleEditTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  
  return (
    <Layout>
      <PageHeader
        title="Transactions"
        description="Manage your financial transactions"
      >
        <Button onClick={() => setIsAddTransactionOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </PageHeader>
      
      <div className="mt-6">
        <TransactionList
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
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

export default TransactionsPage;
