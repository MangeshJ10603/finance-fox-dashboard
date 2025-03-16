
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center justify-between pb-6 pt-2 gap-4",
      className
    )}>
      <div className="space-y-1 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center space-x-2 animate-slide-up">
          {children}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
