'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, Building2, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function OrganizationsPage() {
  const { data: orgs, isLoading } = useQuery({
    queryKey: ['user-organizations'],
    queryFn: async () => {
      const response = await fetch('/api/organizations/list'); // I need to create this API
      if (!response.ok) return [];
      return response.json();
    }
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizations</h1>
          <p className="text-muted-foreground">Manage your law firm or corporate legal teams.</p>
        </div>
        <Link href="/dashboard/organizations/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Organization
          </Button>
        </Link>
      </div>

      {!orgs || orgs.length === 0 ? (
        <Card className="bg-muted/30 border-dashed py-12">
          <CardContent className="text-center space-y-4">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-semibold">No Organizations Found</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              You haven't joined or created any organizations yet. Start by creating one for your team.
            </p>
            <Link href="/dashboard/organizations/create">
              <Button variant="outline">Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orgs.map((item: any) => (
            <Card key={item.organization.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-bold">{item.organization.name}</CardTitle>
                <Badge>{item.role}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{item.organization.currentSeats} / {item.organization.seatsLicensed} Seats</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{item.organization.agreementType.replace(/_/g, ' ')}</span>
                </div>
                <div className="pt-2 border-t flex justify-between">
                  <span className="text-[10px] text-muted-foreground">Valid until: {item.organization.validUntil ? new Date(item.organization.validUntil).toLocaleDateString() : 'N/A'}</span>
                  <Link href={`/dashboard/organizations/${item.organization.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Manage <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
