'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Upload, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewContractPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    status: 'DRAFT',
    party1: '',
    party2: '',
    startDate: '',
    endDate: '',
    value: '',
    description: '',
    terms: '',
    jurisdiction: '',
    governingLaw: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.type || !formData.party1 || !formData.party2) {
        toast.error('Please fill in all required fields')
        setLoading(false)
        return
      }

      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create contract')
      }

      const contract = await response.json()
      toast.success('Contract created successfully')
      router.push(`/dashboard/contracts/${contract.id}`)
    } catch (error) {
      console.error('Error creating contract:', error)
      toast.error('Failed to create contract')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/contracts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Contract</h1>
          <p className="text-muted-foreground">
            Fill in the details to create a new contract
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Contract Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Service Agreement with ABC Corp"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">
                  Contract Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange('type', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SERVICE">Service Agreement</SelectItem>
                    <SelectItem value="EMPLOYMENT">Employment Contract</SelectItem>
                    <SelectItem value="NDA">Non-Disclosure Agreement</SelectItem>
                    <SelectItem value="LEASE">Lease Agreement</SelectItem>
                    <SelectItem value="PURCHASE">Purchase Agreement</SelectItem>
                    <SelectItem value="PARTNERSHIP">Partnership Agreement</SelectItem>
                    <SelectItem value="LICENSE">License Agreement</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="REVIEW">Under Review</SelectItem>
                    <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
                    <SelectItem value="APPROVAL">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the contract..."
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Parties */}
        <Card>
          <CardHeader>
            <CardTitle>Parties Involved</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="party1">
                Party 1 (Your Organization) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="party1"
                placeholder="Your company name"
                value={formData.party1}
                onChange={(e) => handleChange('party1', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="party2">
                Party 2 (Counterparty) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="party2"
                placeholder="Counterparty name"
                value={formData.party2}
                onChange={(e) => handleChange('party2', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Contract Dates and Value */}
        <Card>
          <CardHeader>
            <CardTitle>Dates and Value</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Contract Value (USD)</Label>
              <Input
                id="value"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Legal Details */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Input
                  id="jurisdiction"
                  placeholder="e.g., State of New York"
                  value={formData.jurisdiction}
                  onChange={(e) => handleChange('jurisdiction', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="governingLaw">Governing Law</Label>
                <Input
                  id="governingLaw"
                  placeholder="e.g., New York State Law"
                  value={formData.governingLaw}
                  onChange={(e) => handleChange('governingLaw', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="terms">Key Terms and Conditions</Label>
              <Textarea
                id="terms"
                placeholder="Enter key terms, clauses, and conditions..."
                rows={6}
                value={formData.terms}
                onChange={(e) => handleChange('terms', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Upload Contract Documents</p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, or DOCX up to 10MB
                </p>
                <Button type="button" variant="outline" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Creating...' : 'Create Contract'}
          </Button>
          <Link href="/dashboard/contracts">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
