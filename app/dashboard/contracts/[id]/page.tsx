import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Calendar,
  DollarSign,
  AlertTriangle,
  Edit,
  Download,
  Send,
  CheckCircle2,
  Clock,
  Users,
} from 'lucide-react'
import Link from 'next/link'

// Mock contract data
const contract = {
  id: '1',
  title: 'Vendor Service Agreement',
  type: 'SERVICE_AGREEMENT',
  status: 'REVIEW',
  stage: 'INTERNAL_REVIEW',
  priority: 'MEDIUM',
  partyA: 'Our Company',
  partyB: 'Acme Corp',
  value: 50000,
  currency: 'USD',
  startDate: '2025-12-01',
  endDate: '2026-11-30',
  executionDate: null,
  renewalDate: '2026-11-01',
  riskScore: 35,
  complianceScore: 85,
  description:
    'This service agreement outlines the terms and conditions for IT support services provided by Acme Corp.',
  aiSummary:
    'Standard service agreement with 12-month term. Moderate risk identified in termination clauses. Payment terms are net-30.',
  keyTerms: [
    { term: 'Payment Terms', value: 'Net 30 days' },
    { term: 'Service Level', value: '99.9% uptime' },
    { term: 'Termination', value: '30 days notice' },
    { term: 'Renewal', value: 'Automatic unless notified' },
  ],
  redFlags: [
    {
      type: 'warning',
      description: 'Termination clause may be too restrictive',
      severity: 'MEDIUM',
    },
    {
      type: 'info',
      description: 'Consider adding performance penalty clauses',
      severity: 'LOW',
    },
  ],
  activities: [
    {
      id: '1',
      action: 'Created',
      user: 'John Doe',
      date: '2025-11-20',
      description: 'Contract created from template',
    },
    {
      id: '2',
      action: 'Updated',
      user: 'John Doe',
      date: '2025-11-21',
      description: 'Added party B details',
    },
    {
      id: '3',
      action: 'AI Analysis',
      user: 'System',
      date: '2025-11-21',
      description: 'AI contract review completed',
    },
  ],
}

const stages = [
  { name: 'Initiation', completed: true },
  { name: 'Creation', completed: true },
  { name: 'Internal Review', completed: false, current: true },
  { name: 'External Review', completed: false },
  { name: 'Approval', completed: false },
  { name: 'Execution', completed: false },
  { name: 'Analytics', completed: false },
  { name: 'Renewal', completed: false },
]

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-800',
    REVIEW: 'bg-blue-100 text-blue-800',
    APPROVED: 'bg-green-100 text-green-800',
    EXECUTED: 'bg-purple-100 text-purple-800',
    ACTIVE: 'bg-green-100 text-green-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export default function ContractDetailPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{contract.title}</h1>
            <Badge className={getStatusColor(contract.status)}>
              {contract.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">Contract ID: {contract.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* 8-Stage Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Contract Lifecycle Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => (
              <div key={stage.name} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      stage.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : stage.current
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {stage.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      stage.current ? 'font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    {stage.name}
                  </p>
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 w-12 ${
                      stage.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {contract.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {contract.keyTerms.map((term, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b pb-2 last:border-0"
                      >
                        <span className="font-medium">{term.term}</span>
                        <span className="text-muted-foreground">{term.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {contract.redFlags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      Potential Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contract.redFlags.map((flag, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-lg border p-3"
                        >
                          <AlertTriangle
                            className={`mt-0.5 h-4 w-4 ${
                              flag.severity === 'MEDIUM'
                                ? 'text-orange-600'
                                : 'text-blue-600'
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {flag.description}
                            </p>
                            <Badge
                              variant="outline"
                              className="mt-1 text-xs"
                            >
                              {flag.severity} Risk
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium">Party A</p>
                      <p className="text-sm text-muted-foreground">
                        {contract.partyA}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Party B</p>
                      <p className="text-sm text-muted-foreground">
                        {contract.partyB}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Start Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(contract.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(contract.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contract Value</p>
                      <p className="text-sm text-muted-foreground">
                        ${contract.value.toLocaleString()} {contract.currency}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Renewal Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(contract.renewalDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <CardTitle>AI Contract Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      {contract.aiSummary}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium">Risk Score</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-yellow-500"
                            style={{ width: `${contract.riskScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">
                          {contract.riskScore}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Compliance Score</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${contract.complianceScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">
                          {contract.complianceScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Attached Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="mx-auto h-12 w-12 mb-4" />
                    <p>No documents uploaded yet</p>
                    <Button variant="outline" className="mt-4">
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contract.activities.map((activity) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div className="w-px flex-1 bg-border" />
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {activity.user}
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <p className="text-sm text-muted-foreground">
                    {contract.type.replace('_', ' ')}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Value</p>
                  <p className="text-sm text-muted-foreground">
                    ${contract.value.toLocaleString()}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">12 months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Send for Review
              </Button>
              <Button className="w-full" variant="outline">
                Request Approval
              </Button>
              <Button className="w-full" variant="outline">
                Generate Summary
              </Button>
              <Button className="w-full" variant="destructive">
                Terminate Contract
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
