'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FileText,
  Download,
  Printer,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Filter,
} from 'lucide-react'

const reportTemplates = [
  {
    id: '1',
    name: 'Contract Summary Report',
    description: 'Overview of all contracts with status, value, and expiration dates',
    category: 'Contracts',
    frequency: 'Monthly',
  },
  {
    id: '2',
    name: 'Case Progress Report',
    description: 'Detailed case updates, court dates, and litigation status',
    category: 'Cases',
    frequency: 'Weekly',
  },
  {
    id: '3',
    name: 'Compliance Audit Report',
    description: 'Compliance status, risk assessment, and audit findings',
    category: 'Compliance',
    frequency: 'Quarterly',
  },
  {
    id: '4',
    name: 'Financial Summary',
    description: 'Contract values, legal spending, and budget tracking',
    category: 'Financial',
    frequency: 'Monthly',
  },
  {
    id: '5',
    name: 'Team Performance Report',
    description: 'Team member activities, case load, and productivity metrics',
    category: 'Team',
    frequency: 'Monthly',
  },
]

const generatedReports = [
  {
    id: '1',
    name: 'November 2024 - Contract Summary',
    template: 'Contract Summary Report',
    generatedAt: '2024-11-27',
    generatedBy: 'John Smith',
    fileSize: '2.3 MB',
    format: 'PDF',
  },
  {
    id: '2',
    name: 'Q4 2024 - Compliance Audit',
    template: 'Compliance Audit Report',
    generatedAt: '2024-11-25',
    generatedBy: 'Sarah Johnson',
    fileSize: '4.1 MB',
    format: 'PDF',
  },
  {
    id: '3',
    name: 'Week 47 - Case Progress',
    template: 'Case Progress Report',
    generatedAt: '2024-11-23',
    generatedBy: 'Mike Davis',
    fileSize: '1.8 MB',
    format: 'PDF',
  },
]

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [dateRange, setDateRange] = useState('last-30-days')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          Generate and manage your legal operation reports
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
              <p className="text-2xl font-bold">34</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Shared</p>
              <p className="text-2xl font-bold">15</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Generate New Report */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Generate New Report</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Report Template</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {reportTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="this-quarter">This quarter</SelectItem>
                <SelectItem value="this-year">This year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </Card>

      {/* Report Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Report Templates</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {reportTemplates.map((template) => (
            <Card key={template.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {template.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge variant="secondary">{template.frequency}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recently Generated Reports</h2>
        <Card>
          <div className="divide-y">
            {generatedReports.map((report) => (
              <div key={report.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{report.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{report.template}</span>
                      <span>•</span>
                      <span>{report.format}</span>
                      <span>•</span>
                      <span>{report.fileSize}</span>
                      <span>•</span>
                      <span>Generated by {report.generatedBy}</span>
                      <span>•</span>
                      <span>{report.generatedAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
