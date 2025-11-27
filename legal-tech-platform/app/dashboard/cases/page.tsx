import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { Briefcase, Plus, Search, Filter, Calendar, Download } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock data
const cases = [
  {
    id: '1',
    caseNumber: 'CASE-2025-001',
    title: 'Contract Dispute - Vendor Services',
    type: 'CIVIL',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    court: 'District Court',
    plaintiff: 'Our Company',
    defendant: 'Acme Corp',
    filingDate: '2025-10-15',
    hearingDate: '2025-12-10',
    nextDate: '2025-12-10',
  },
  {
    id: '2',
    caseNumber: 'CASE-2025-002',
    title: 'Employment Dispute - Wrongful Termination',
    type: 'LABOR',
    status: 'HEARING_SCHEDULED',
    priority: 'MEDIUM',
    court: 'Labor Court',
    plaintiff: 'John Smith',
    defendant: 'Our Company',
    filingDate: '2025-09-20',
    hearingDate: '2025-11-30',
    nextDate: '2025-11-30',
  },
  {
    id: '3',
    caseNumber: 'CASE-2025-003',
    title: 'Intellectual Property - Patent Infringement',
    type: 'INTELLECTUAL_PROPERTY',
    status: 'OPEN',
    priority: 'HIGH',
    court: 'Federal Court',
    plaintiff: 'Our Company',
    defendant: 'Tech Innovations Inc',
    filingDate: '2025-11-01',
    hearingDate: null,
    nextDate: '2025-12-15',
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-087',
    title: 'Tax Assessment Appeal',
    type: 'TAX',
    status: 'CLOSED',
    priority: 'LOW',
    court: 'Tax Court',
    plaintiff: 'Our Company',
    defendant: 'Tax Authority',
    filingDate: '2024-06-10',
    hearingDate: '2025-03-15',
    nextDate: null,
  },
]

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    OPEN: 'bg-blue-100 text-blue-800',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    HEARING_SCHEDULED: 'bg-purple-100 text-purple-800',
    AWAITING_JUDGMENT: 'bg-orange-100 text-orange-800',
    CLOSED: 'bg-gray-100 text-gray-800',
    ARCHIVED: 'bg-gray-100 text-gray-600',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

function getPriorityColor(priority: string) {
  const colors: Record<string, string> = {
    LOW: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800',
    CRITICAL: 'bg-red-600 text-white',
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

export default function CasesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cases</h1>
          <p className="text-muted-foreground">
            Track and manage your legal cases and litigation
          </p>
        </div>
        <Link href="/dashboard/cases/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search cases..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="labor">Labor</SelectItem>
                <SelectItem value="ip">Intellectual Property</SelectItem>
                <SelectItem value="tax">Tax</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Total Cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Hearings This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Closed This Year</p>
          </CardContent>
        </Card>
      </div>

      {/* Cases Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case Number</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Court</TableHead>
                <TableHead>Next Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/cases/${caseItem.id}`}
                      className="font-medium hover:underline"
                    >
                      {caseItem.caseNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px]">
                      <p className="font-medium">{caseItem.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {caseItem.plaintiff} vs {caseItem.defendant}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {caseItem.type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(caseItem.status)}>
                      {caseItem.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(caseItem.priority)}>
                      {caseItem.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{caseItem.court}</TableCell>
                  <TableCell>
                    {caseItem.nextDate ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(caseItem.nextDate).toLocaleDateString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/cases/${caseItem.id}`}>
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
    </div>
  )
}
