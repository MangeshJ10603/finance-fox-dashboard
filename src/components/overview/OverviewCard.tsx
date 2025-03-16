
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OverviewCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function OverviewCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: OverviewCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 scale-transition", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-secondary text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-slide-up">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={cn(
            "text-xs font-medium mt-2 flex items-center",
            trend.isPositive ? "text-green-600" : "text-destructive"
          )}>
            <span className={cn(
              "inline-block mr-1",
              trend.isPositive ? "rotate-0" : "rotate-180"
            )}>
              ↑
            </span>
            {trend.value}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}
