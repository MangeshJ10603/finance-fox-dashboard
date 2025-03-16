
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/data';
import { CategoryForm } from './CategoryForm';
import { useToast } from '@/hooks/use-toast';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully.",
    });
  };

  const handleEditSubmit = (data: Category) => {
    onEdit(data);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {categories.map((category) => (
        <Card key={category.id} className="overflow-hidden transform transition-all duration-200 scale-transition">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(category)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(category.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {currentCategory && (
            <CategoryForm
              onSubmit={handleEditSubmit}
              defaultValues={currentCategory}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
