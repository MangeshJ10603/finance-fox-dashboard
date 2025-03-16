
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/page-header';
import { CategoryList } from '@/components/categories/CategoryList';
import { CategoryForm } from '@/components/categories/CategoryForm';
import { Category, categories as initialCategories } from '@/lib/data';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  
  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
    setIsAddCategoryOpen(false);
  };
  
  const handleEditCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
  };
  
  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };
  
  return (
    <Layout>
      <PageHeader
        title="Categories"
        description="Manage your transaction categories"
      >
        <Button onClick={() => setIsAddCategoryOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </PageHeader>
      
      <div className="mt-6">
        <CategoryList
          categories={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </div>
      
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <CategoryForm
            onSubmit={handleAddCategory}
            onCancel={() => setIsAddCategoryOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CategoriesPage;
