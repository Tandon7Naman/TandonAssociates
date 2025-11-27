import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Download,
  Upload,
} from 'lucide-react'
import Link from 'next/link'

const complianceData = {
  id: '1',
  title: 'GDPR Data Protection Review',
  regulation: 'GDPR',
  type: 'REGULATORY',
  status: 'COMPLIANT',
  priority: 'HIGH',
  dueDate: '2025-12-31',
  lastReviewDate: '2025-11-15',
  nextReviewDate: '2026-11-15',
  complianceScore: 95,
  responsible: 'Sarah Johnson',
  department: 'Compliance',
  description:
    'Annual GDPR compliance review covering data protection, privacy policies, data subject rights, and data processing agreements.',
}

const requirements = [
  {
    id: '1',
    requirement: 'Data Protection Policy',
    status: 'COMPLIANT',
    lastChecked: '2025-11-15',
    notes: 'Policy reviewed and updated with latest GDPR requirements',
  },
  {
    id: '2',
    requirement: 'Privacy Notice',
    status: 'COMPLIANT',
    lastChecked: '2025-11-15',
    notes: 'Privacy notice published on website and accessible to users',
  },
  {
    id: '3',
    requirement: 'Data Subject Rights',
    status: 'COMPLIANT',
    lastChecked: '2025-11-10',
    notes: 'Procedures in place for access, rectification, and erasure requests',
  },
  {
    id: '4',
    requirement: 'Data Processing Agreements',
    status: 'IN_PROGRESS',
    lastChecked: '2025-11-05',
    notes: 'Reviewing agreements with third-party processors',
  },
]

const auditHistory = [
  {
    id: '1',
    date: '2025-11-15',
    auditor: 'Sarah Johnson',
    type: 'Annual Review',
    result: 'PASSED',
    score: 95,
    findings: 'Minor improvements needed in documentation',
  },
  {
    id: '2',
    date: '2024-11-20',
    auditor: 'Michael Brown',
    type: 'Annual Review',
    result: 'PASSED',
    score: 92,
    findings: 'All requirements met, recommend updating privacy policy',
  },
  {
    id: '3',
    date: '2024-05-10',
    auditor: 'Sarah Johnson',
    type: 'Mid-Year Review',
    result: 'PASSED',
    score: 90,
    findings: 'Good progress, continue monitoring data processing agreements',
  },
]

const documents = [
  {
    id: '1',
    name: 'GDPR_Compliance_Report_2025.pdf',
    type: 'Report',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2025-11-15',
    size: '3.2 MB',
  },
  {
    id: '2',
    name: 'Data_Protection_Policy.pdf',
    type: 'Policy',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2025-11-01',
    size: '1.5 MB',
  },
  {
    id: '3',
    name: 'Privacy_Notice.pdf',
    type: 'Notice',
    uploadedBy: 'Legal Team',
    uploadedAt: '2025-10-15',
    size: '850 KB',
  },
]

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    COMPLIANT: 'bg-green-100 text-green-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    NON_COMPLIANT: 'bg-red-100 text-red-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    PASSED: 'bg-green-100 text-green-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-600'
  if (score >= 75) return 'text-blue-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export default async function ComplianceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/compliance">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{complianceData.title}</h1>
              <Badge className={getStatusColor(complianceData.status)}>
                {complianceData.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {complianceData.regulation} • {complianceData.department}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Compliance Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(complianceData.complianceScore)}`}>
                  {complianceData.complianceScore}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Next Review</p>
                <p className="font-semibold">
                  {new Date(complianceData.nextReviewDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Requirements</p>
                <p className="font-semibold">{requirements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="font-semibold">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="audit">Audit History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Regulation</p>
                    <p className="font-medium">{complianceData.regulation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{complianceData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <Badge variant="outline">{complianceData.priority}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">
                      {new Date(complianceData.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Responsible</p>
                    <p className="font-medium">{complianceData.responsible}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{complianceData.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Last Review</p>
                  <p className="font-medium">
                    {new Date(complianceData.lastReviewDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Review</p>
                  <p className="font-medium">
                    {new Date(complianceData.nextReviewDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Review Frequency</p>
                  <p className="font-medium">Annual</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{complianceData.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requirements.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      {req.status === 'COMPLIANT' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{req.requirement}</p>
                        <Badge className={getStatusColor(req.status)}>
                          {req.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{req.notes}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Last checked: {new Date(req.lastChecked).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit History Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditHistory.map((audit) => (
                  <div
                    key={audit.id}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{audit.type}</p>
                        <Badge className={getStatusColor(audit.result)}>
                          {audit.result}
                        </Badge>
                        <span className={`text-sm font-semibold ${getScoreColor(audit.score)}`}>
                          Score: {audit.score}%
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{audit.findings}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Auditor: {audit.auditor}</span>
                        <span>•</span>
                        <span>{new Date(audit.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded by {doc.uploadedBy}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
