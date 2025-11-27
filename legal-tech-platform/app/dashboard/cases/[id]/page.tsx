import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Scale,
  Calendar,
  FileText,
  Users,
  Clock,
  ArrowLeft,
  Download,
  Share2,
} from 'lucide-react'
import Link from 'next/link'

const caseData = {
  id: '1',
  caseNumber: 'CIV-2023-12345',
  title: 'Smith Corp vs. ABC Industries',
  type: 'CIVIL',
  status: 'ACTIVE',
  priority: 'HIGH',
  court: 'District Court, Southern District',
  judge: 'Hon. Sarah Johnson',
  filingDate: '2023-06-15',
  hearingDate: '2025-12-03',
  plaintiff: 'Smith Corporation',
  defendant: 'ABC Industries Ltd.',
  attorney: 'John Anderson',
  description:
    'Contract dispute regarding breach of service agreement. Plaintiff claims damages of $500,000 due to failure to deliver agreed-upon services.',
}

const proceedings = [
  {
    id: '1',
    date: '2025-11-20',
    type: 'Motion Filed',
    title: 'Motion for Summary Judgment',
    description: 'Defendant filed motion for summary judgment',
    status: 'PENDING',
  },
  {
    id: '2',
    date: '2025-11-10',
    type: 'Discovery',
    title: 'Document Production Completed',
    description: 'All requested documents have been produced',
    status: 'COMPLETED',
  },
  {
    id: '3',
    date: '2025-10-25',
    type: 'Hearing',
    title: 'Pre-Trial Conference',
    description: 'Pre-trial conference held before Judge Johnson',
    status: 'COMPLETED',
  },
]

const documents = [
  {
    id: '1',
    name: 'Complaint.pdf',
    type: 'Complaint',
    uploadedBy: 'John Anderson',
    uploadedAt: '2023-06-15',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Answer_to_Complaint.pdf',
    type: 'Answer',
    uploadedBy: 'Defense Counsel',
    uploadedAt: '2023-07-01',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Discovery_Documents.zip',
    type: 'Discovery',
    uploadedBy: 'John Anderson',
    uploadedAt: '2025-11-10',
    size: '45.2 MB',
  },
]

const timeline = [
  {
    date: '2025-11-20',
    event: 'Motion for Summary Judgment Filed',
    party: 'Defendant',
  },
  {
    date: '2025-11-10',
    event: 'Document Production Completed',
    party: 'Both Parties',
  },
  {
    date: '2025-10-25',
    event: 'Pre-Trial Conference',
    party: 'Court',
  },
  {
    date: '2023-07-01',
    event: 'Answer Filed',
    party: 'Defendant',
  },
  {
    date: '2023-06-15',
    event: 'Complaint Filed',
    party: 'Plaintiff',
  },
]

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    ACTIVE: 'bg-blue-100 text-blue-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    CLOSED: 'bg-gray-100 text-gray-800',
    APPEAL: 'bg-purple-100 text-purple-800',
    SETTLED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-green-100 text-green-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

function getPriorityColor(priority: string) {
  const colors: Record<string, string> = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-blue-100 text-blue-800',
    HIGH: 'bg-orange-100 text-orange-800',
    CRITICAL: 'bg-red-100 text-red-800',
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/cases">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{caseData.caseNumber}</h1>
              <Badge className={getStatusColor(caseData.status)}>
                {caseData.status}
              </Badge>
              <Badge className={getPriorityColor(caseData.priority)}>
                {caseData.priority}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">{caseData.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Information */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Scale className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Case Type</p>
                <p className="font-semibold">{caseData.type}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Next Hearing</p>
                <p className="font-semibold">
                  {new Date(caseData.hearingDate).toLocaleDateString()}
                </p>
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">2 years 5 months</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="proceedings">Proceedings</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Case Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Court</p>
                    <p className="font-medium">{caseData.court}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Judge</p>
                    <p className="font-medium">{caseData.judge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Filing Date</p>
                    <p className="font-medium">
                      {new Date(caseData.filingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attorney</p>
                    <p className="font-medium">{caseData.attorney}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plaintiff</p>
                  <p className="font-medium">{caseData.plaintiff}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Defendant</p>
                  <p className="font-medium">{caseData.defendant}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{caseData.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Proceedings Tab */}
        <TabsContent value="proceedings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Proceedings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proceedings.map((proceeding) => (
                  <div
                    key={proceeding.id}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{proceeding.title}</p>
                        <Badge className={getStatusColor(proceeding.status)}>
                          {proceeding.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {proceeding.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{proceeding.type}</span>
                        <span>•</span>
                        <span>{new Date(proceeding.date).toLocaleDateString()}</span>
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
              <CardTitle>Case Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <FileText className="h-5 w-5 text-purple-600" />
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

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="h-full w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.event}</p>
                        <Badge variant="outline">{item.party}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
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
