'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, CheckCircle2, AlertCircle, Clock, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function StudentVerificationPage() {
  const queryClient = useQueryClient();
  const [formData, setBody] = useState({
    institutionName: '',
    institutionEmail: '',
    enrollmentNumber: '',
    course: '',
    yearOfStudy: 1,
    expectedGraduation: ''
  });

  const { data: status, isLoading } = useQuery({
    queryKey: ['student-status'],
    queryFn: async () => {
      const response = await fetch('/api/user/student-status');
      return response.json();
    }
  });

  const verifyMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/user/student-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Verification request submitted');
      queryClient.invalidateQueries({ queryKey: ['student-status'] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  if (status?.isStudent && status.verification?.verificationStatus === 'VERIFIED') {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <Card className="border-green-500 bg-green-50/50">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Student Verified!</h2>
            <p className="text-green-700">
              You have full access to all legal research tools and basic case management until your graduation in 
              {new Date(status.verification.expiresAt).toLocaleDateString()}.
            </p>
            <div className="pt-4 border-t border-green-200 grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-xs font-semibold text-green-800 uppercase">Institution</p>
                <p className="text-sm">{status.verification.institutionName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-800 uppercase">Course</p>
                <p className="text-sm">{status.verification.course}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status?.isStudent && status.verification?.verificationStatus === 'PENDING') {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <Card className="border-blue-500 bg-blue-50/50">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-800">Verification Pending</h2>
            <p className="text-blue-700">
              We've received your documents and institution details. Our team is currently reviewing your application.
              This usually takes 24-48 hours.
            </p>
            <div className="flex justify-center">
              <Badge variant="secondary" className="bg-blue-200 text-blue-800 hover:bg-blue-200">
                PENDING REVIEW
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mb-8 text-center">
        <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Student Access Program</h1>
        <p className="text-muted-foreground mt-2">
          Get free access to India's most advanced legal tech platform until you graduate.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Your Status</CardTitle>
          <CardDescription>Please provide your academic details to unlock free access.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            verifyMutation.mutate(formData);
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institutionName">College/University Name</Label>
                <Input 
                  id="institutionName" 
                  placeholder="e.g. National Law School of India University"
                  required
                  value={formData.institutionName}
                  onChange={(e) => setBody({...formData, institutionName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institutionEmail">Institutional Email (.edu or .ac.in)</Label>
                <Input 
                  id="institutionEmail" 
                  type="email"
                  placeholder="name@college.ac.in"
                  required
                  value={formData.institutionEmail}
                  onChange={(e) => setBody({...formData, institutionEmail: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollmentNumber">Enrollment/Roll Number</Label>
                <Input 
                  id="enrollmentNumber" 
                  placeholder="e.g. 2021-LLB-042"
                  required
                  value={formData.enrollmentNumber}
                  onChange={(e) => setBody({...formData, enrollmentNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course Name</Label>
                <Input 
                  id="course" 
                  placeholder="e.g. 5-Year BA LLB (Hons)"
                  required
                  value={formData.course}
                  onChange={(e) => setBody({...formData, course: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearOfStudy">Current Year of Study</Label>
                <Input 
                  id="yearOfStudy" 
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={formData.yearOfStudy}
                  onChange={(e) => setBody({...formData, yearOfStudy: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedGraduation">Expected Graduation Date</Label>
                <Input 
                  id="expectedGraduation" 
                  type="date"
                  required
                  value={formData.expectedGraduation}
                  onChange={(e) => setBody({...formData, expectedGraduation: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Upload Documents (Required)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Student ID Card</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG or PNG</p>
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Bonafide Certificate</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF or JPG</p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={verifyMutation.isPending}>
              {verifyMutation.isPending ? 'Submitting...' : 'Submit Verification Request'}
            </Button>
            
            <div className="flex items-start gap-2 bg-muted/50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-[10px] text-muted-foreground">
                By submitting, you agree to our Student Program terms. Fraudulent applications will lead to permanent ban from the platform.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
