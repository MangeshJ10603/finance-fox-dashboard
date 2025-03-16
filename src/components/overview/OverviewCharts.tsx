
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';

// Mock data for the charts
const monthlyData = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 900 },
  { name: 'Mar', value: 1600 },
  { name: 'Apr', value: 1400 },
  { name: 'May', value: 2000 },
  { name: 'Jun', value: 800 },
];

const categoryData = [
  { name: 'Housing', value: 1000, color: '#A78BFA' },
  { name: 'Food', value: 500, color: '#60A5FA' },
  { name: 'Transport', value: 300, color: '#34D399' },
  { name: 'Shopping', value: 400, color: '#FBBF24' },
  { name: 'Entertainment', value: 200, color: '#F87171' },
];

const budgetData = [
  { name: 'Housing', budget: 1200, actual: 1000 },
  { name: 'Food', budget: 600, actual: 500 },
  { name: 'Transport', budget: 350, actual: 300 },
  { name: 'Shopping', budget: 300, actual: 400 },
  { name: 'Entertainment', budget: 150, actual: 200 },
];

interface OverviewChartsProps {
  className?: string;
}

export function OverviewCharts({ className }: OverviewChartsProps) {
  return (
    <Card className={cn("col-span-1 md:col-span-2", className)}>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="h-full">
          <TabsList className="mb-4">
            <TabsTrigger value="monthly">Monthly Expenses</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="budget">Budget vs Actual</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="h-[300px] animate-fade-in">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => [`$${value}`, 'Expenses']}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="category" className="h-[300px] animate-fade-in">
            <div className="flex items-center justify-center h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="budget" className="h-[300px] animate-fade-in">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={budgetData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Bar dataKey="budget" name="Budget" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="#A78BFA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
