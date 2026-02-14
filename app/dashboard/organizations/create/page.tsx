'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Landmark, Gavel, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateOrganizationPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setBody] = useState({
    name: '',
    type: 'LAW_FIRM_SMALL',
    email: '',
    agreementType: 'MONTHLY_SUBSCRIPTION',
    seatsLicensed: 5,
    pricePerSeat: 799
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/organizations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create organization');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Organization created successfully');
      queryClient.invalidateQueries({ queryKey: ['user-organizations'] });
      router.push('/dashboard/organizations');
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Register Organization</h1>
        <p className="text-muted-foreground">Setup your law firm or legal department on the platform.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>Enter the basic information about your entity.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(formData);
          }}>
            <div className="space-y-2">
              <Label htmlFor="name">Entity Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Tandon & Associates Law Firm"
                required
                value={formData.name}
                onChange={(e) => setBody({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Organization Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setBody({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LAW_FIRM_SMALL">Small Law Firm (1-10)</SelectItem>
                    <SelectItem value="LAW_FIRM_MEDIUM">Medium Law Firm (11-50)</SelectItem>
                    <SelectItem value="LAW_FIRM_LARGE">Large Law Firm (50+)</SelectItem>
                    <SelectItem value="CORPORATE">Corporate Legal Team</SelectItem>
                    <SelectItem value="GOVERNMENT">Government Dept</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="contact@firm.com"
                  required
                  value={formData.email}
                  onChange={(e) => setBody({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Subscription Plan</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agreement">Agreement Type</Label>
                  <Select 
                    value={formData.agreementType} 
                    onValueChange={(value) => setBody({...formData, agreementType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select agreement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MONTHLY_SUBSCRIPTION">Monthly Subscription</SelectItem>
                      <SelectItem value="ANNUAL_CONTRACT">Annual Contract</SelectItem>
                      <SelectItem value="PAY_PER_USE">Pay Per Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seats">Seats Licensed</Label>
                  <Input 
                    id="seats" 
                    type="number"
                    min="1"
                    required
                    value={formData.seatsLicensed}
                    onChange={(e) => setBody({...formData, seatsLicensed: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold uppercase text-primary">Estimated Total</p>
                <p className="text-2xl font-bold">₹{(formData.seatsLicensed * formData.pricePerSeat).toLocaleString()}<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
              </div>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Register & Pay'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
