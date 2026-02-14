'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export function CasesSummaryWidget() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['cases-stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      return data.stats;
    }
  });

  if (isLoading) return <Card className="h-full w-full animate-pulse" />;

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Cases Summary</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">{stats?.totalCases || 0}</div>
            <p className="text-xs text-muted-foreground">Total Cases</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{stats?.activeCases || 0}</div>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
