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
import { FileText, Plus, Search, Filter, Download } from 'lucide-react'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock data - will be replaced with real API calls
const contracts = [
  {
    id: '1',
    title: 'Vendor Service Agreement',
    type: 'SERVICE_AGREEMENT',
    status: 'REVIEW',
    stage: 'INTERNAL_REVIEW',
    partyA: 'Our Company',
    partyB: 'Acme Corp',
    value: 50000,
    startDate: '2025-12-01',
    endDate: '2026-11-30',
    riskScore: 35,
    createdAt: '2025-11-20',
  },
  {
    id: '2',
    title: 'Employment Contract - John Smith',
    type: 'EMPLOYMENT',
    status: 'ACTIVE',
    stage: 'EXECUTION',
    partyA: 'Our Company',
    partyB: 'John Smith',
    value: 85000,
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    riskScore: 12,
    createdAt: '2025-11-18',
  },
  {
    id: '3',
    title: 'NDA - Project Phoenix',
    type: 'NDA',
    status: 'EXECUTED',
    stage: 'ANALYTICS',
    partyA: 'Our Company',
    partyB: 'Tech Solutions Inc',
    value: 0,
    startDate: '2025-11-15',
    endDate: '2026-11-15',
    riskScore: 8,
    createdAt: '2025-11-15',
  },
  {
    id: '4',
    title: 'Office Lease Agreement',
    type: 'LEASE',
    status: 'ACTIVE',
    stage: 'RENEWAL',
    partyA: 'Our Company',
    partyB: 'Property Management LLC',
    value: 120000,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    riskScore: 45,
    createdAt: '2024-01-01',
  },
  {
    id: '5',
    title: 'Partnership Agreement - Marketing',
    type: 'PARTNERSHIP',
    status: 'DRAFT',
    stage: 'CREATION',
    partyA: 'Our Company',
    partyB: 'Digital Marketing Pro',
    value: 75000,
    startDate: '2025-12-15',
    endDate: '2026-12-15',
    riskScore: 28,
    createdAt: '2025-11-22',
  },
]

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-800',
    REVIEW: 'bg-blue-100 text-blue-800',
    APPROVED: 'bg-green-100 text-green-800',
    EXECUTED: 'bg-purple-100 text-purple-800',
    ACTIVE: 'bg-green-100 text-green-800',
    EXPIRED: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

function getRiskColor(score: number) {
  if (score >= 75) return 'text-red-600'
  if (score >= 50) return 'text-orange-600'
  if (score >= 25) return 'text-yellow-600'
  return 'text-green-600'
}

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contracts</h1>
          <p className="text-muted-foreground">
            Manage your contract lifecycle from creation to expiry
          </p>
        </div>
        <Link href="/dashboard/contracts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search contracts..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="nda">NDA</SelectItem>
                <SelectItem value="service">Service Agreement</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="lease">Lease</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Total Contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Expiring Soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Parties</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/contracts/${contract.id}`}
                      className="font-medium hover:underline"
                    >
                      {contract.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {contract.type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{contract.partyB}</div>
                      <div className="text-muted-foreground">vs {contract.partyA}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {contract.stage.replace('_', ' ')}
                  </TableCell>
                  <TableCell className="text-right">
                    ${contract.value.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getRiskColor(contract.riskScore)}`}>
                      {contract.riskScore}%
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(contract.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/contracts/${contract.id}`}>
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
