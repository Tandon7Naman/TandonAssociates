import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Shield, Plus, Search, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const complianceItems = [
  {
    id: '1',
    title: 'GDPR Data Protection Review',
    type: 'REGULATORY',
    status: 'COMPLIANT',
    regulation: 'GDPR',
    dueDate: '2025-12-31',
    complianceScore: 95,
    priority: 'HIGH',
  },
  {
    id: '2',
    title: 'SOX Financial Controls Audit',
    type: 'REGULATORY',
    status: 'IN_PROGRESS',
    regulation: 'SOX',
    dueDate: '2025-12-15',
    complianceScore: 78,
    priority: 'CRITICAL',
  },
  {
    id: '3',
    title: 'ISO 27001 Information Security',
    type: 'INDUSTRY_STANDARD',
    status: 'PENDING',
    regulation: 'ISO 27001',
    dueDate: '2026-01-31',
    complianceScore: 65,
    priority: 'MEDIUM',
  },
  {
    id: '4',
    title: 'Employment Law Compliance Check',
    type: 'STATUTORY',
    status: 'COMPLIANT',
    regulation: 'Labor Law',
    dueDate: '2025-11-30',
    complianceScore: 92,
    priority: 'MEDIUM',
  },
]

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLIANT: 'bg-green-100 text-green-800',
    NON_COMPLIANT: 'bg-red-100 text-red-800',
    UNDER_REVIEW: 'bg-purple-100 text-purple-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-600'
  if (score >= 75) return 'text-blue-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance</h1>
          <p className="text-muted-foreground">
            Track regulatory compliance and audit requirements
          </p>
        </div>
        <Link href="/dashboard/compliance/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Compliance Item
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Total Items</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">12</div>
                <p className="text-xs text-muted-foreground">Compliant</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-xs text-muted-foreground">At Risk</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search compliance items..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Compliance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Regulation</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/compliance/${item.id}`}
                      className="font-medium hover:underline"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.regulation}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.type.replace('_', ' ')}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${
                            item.complianceScore >= 90
                              ? 'bg-green-500'
                              : item.complianceScore >= 75
                              ? 'bg-blue-500'
                              : item.complianceScore >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${item.complianceScore}%` }}
                        />
                      </div>
                      <span
                        className={`text-sm font-semibold ${getScoreColor(
                          item.complianceScore
                        )}`}
                      >
                        {item.complianceScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(item.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.priority === 'CRITICAL' ? 'destructive' : 'outline'}
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/compliance/${item.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">SOX Compliance Audit</p>
                <p className="text-sm text-muted-foreground">Due in 18 days</p>
              </div>
              <Button size="sm">Review</Button>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">GDPR Annual Review</p>
                <p className="text-sm text-muted-foreground">Due in 34 days</p>
              </div>
              <Button size="sm">Review</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
