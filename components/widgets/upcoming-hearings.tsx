'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function UpcomingHearingsWidget() {
  const { data, isLoading } = useQuery({
    queryKey: ['upcoming-hearings'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard');
      return await response.json();
    }
  });

  if (isLoading) return <Card className="h-full w-full animate-pulse" />;

  const hearings = data?.upcomingDeadlines?.filter((d: any) => d.type === 'Case') || [];

  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Upcoming Hearings</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        {hearings.length === 0 ? (
          <div className="p-4 text-center text-xs text-muted-foreground">No upcoming hearings</div>
        ) : (
          <div className="divide-y">
            {hearings.map((hearing: any, i: number) => (
              <div key={i} className="p-3 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium line-clamp-1">{hearing.title}</p>
                  <Badge variant={hearing.priority === 'HIGH' ? 'destructive' : 'outline'} className="text-[10px] h-4">
                    {hearing.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(hearing.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
