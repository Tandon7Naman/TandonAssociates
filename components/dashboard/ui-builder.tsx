'use client';

import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X, Settings, Save, Layout as LayoutIcon } from 'lucide-react';
import { toast } from 'sonner';

// Import widgets (placeholders for now)
import { CasesSummaryWidget } from '@/components/widgets/cases-summary';
import { UpcomingHearingsWidget } from '@/components/widgets/upcoming-hearings';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Widget {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: string;
  config?: any;
}

export function DashboardUIBuilder() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [layout, setLayout] = useState<any[]>([]);
  const queryClient = useQueryClient();

  // Fetch user's current layout
  const { data: userDashboard, isLoading } = useQuery({
    queryKey: ['dashboardLayout'],
    queryFn: async () => {
      const response = await fetch('/api/user/dashboard-layout');
      if (!response.ok) throw new Error('Failed to fetch layout');
      return response.json();
    }
  });

  useEffect(() => {
    if (userDashboard?.layout) {
      setLayout(userDashboard.layout);
    }
  }, [userDashboard]);

  // Save layout mutation
  const saveLayoutMutation = useMutation({
    mutationFn: async (newLayout: any[]) => {
      const response = await fetch('/api/user/dashboard-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: newLayout, widgets: newLayout.map(w => w.i) })
      });
      if (!response.ok) throw new Error('Failed to save layout');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Dashboard layout saved');
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['dashboardLayout'] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  const onLayoutChange = (currentLayout: any) => {
    if (isEditMode) {
      setLayout(currentLayout);
    }
  };

  const addWidget = (type: string) => {
    const id = `${type}-${Date.now()}`;
    const newWidget = {
      i: id,
      x: (layout.length * 2) % 12,
      y: Infinity, // puts it at the bottom
      w: 4,
      h: 4,
      component: type
    };
    setLayout([...layout, newWidget]);
  };

  const removeWidget = (id: string) => {
    setLayout(layout.filter(w => w.i !== id));
  };

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Custom Dashboard</h1>
          <p className="text-sm text-muted-foreground">Arrange your workspace exactly how you want it.</p>
        </div>
        <div className="flex gap-2">
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={() => setIsEditMode(false)}>Cancel</Button>
              <Button onClick={() => saveLayoutMutation.mutate(layout)}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditMode(true)}>
              <LayoutIcon className="mr-2 h-4 w-4" /> Customize
            </Button>
          )}
        </div>
      </div>

      {isEditMode && (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-4 flex gap-2 overflow-x-auto">
            <Button variant="outline" size="sm" onClick={() => addWidget('cases-summary')}>+ Cases Summary</Button>
            <Button variant="outline" size="sm" onClick={() => addWidget('upcoming-hearings')}>+ Upcoming Hearings</Button>
            <Button variant="outline" size="sm" onClick={() => addWidget('ai-insights')}>+ AI Insights</Button>
            <Button variant="outline" size="sm" onClick={() => addWidget('analytics')}>+ Analytics</Button>
          </CardContent>
        </Card>
      )}

      <div className="bg-background min-h-[600px] border rounded-lg p-4">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          onLayoutChange={onLayoutChange}
        >
          {layout.map((widget) => (
            <div key={widget.i} className="relative group">
              {isEditMode && (
                <button
                  onClick={() => removeWidget(widget.i)}
                  className="absolute -top-2 -right-2 z-10 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              <WidgetRenderer type={widget.i.split('-')[0]} />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}

function WidgetRenderer({ type }: { type: string }) {
  switch (type) {
    case 'cases':
    case 'cases-summary':
      return <CasesSummaryWidget />;
    case 'hearings':
    case 'upcoming-hearings':
      return <UpcomingHearingsWidget />;
    default:
      return (
        <Card className="h-full w-full">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">{type.replace(/-/g, ' ').toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground">Widget content for {type} coming soon...</p>
          </CardContent>
        </Card>
      );
  }
}
