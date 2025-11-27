import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Briefcase, Shield, Clock, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

async function getDashboardData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3003')
    const response = await fetch(`${baseUrl}/api/dashboard`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('Failed to fetch')
    return await response.json()
  } catch (error) {
    console.error('Dashboard fetch error:', error)
    return null
  }
}

const recentContracts = [
  {
    id: '1',
    title: 'Vendor Service Agreement',
    type: 'SERVICE_AGREEMENT',
    status: 'REVIEW',
    party: 'Acme Corp',
    value: 50000,
    date: '2025-11-20',
  },
  {
    id: '2',
    title: 'Employment Contract - John Smith',
    type: 'EMPLOYMENT',
    status: 'ACTIVE',
    party: 'John Smith',
    value: 85000,
    date: '2025-11-18',
  },
  {
    id: '3',
    title: 'NDA - Project Phoenix',
    type: 'NDA',
    status: 'EXECUTED',
    party: 'Tech Solutions Inc',
    value: 0,
    date: '2025-11-15',
  },
]

const upcomingDeadlines = [
  {
    title: 'Contract Renewal - Office Lease',
    date: '2025-12-01',
    type: 'Contract',
    priority: 'high',
  },
  {
    title: 'GDPR Compliance Review',
    date: '2025-12-05',
    type: 'Compliance',
    priority: 'medium',
  },
  {
    title: 'Court Hearing - Case #2034',
    date: '2025-12-08',
    type: 'Case',
    priority: 'high',
  },
]

function getStatusBadge(status: string) {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    DRAFT: 'outline',
    UNDER_REVIEW: 'default',
    PENDING_SIGNATURE: 'default',
    ACTIVE: 'secondary',
    EXECUTED: 'outline',
    EXPIRED: 'destructive',
    TERMINATED: 'destructive',
    PENDING: 'default',
    IN_PROGRESS: 'default',
    COMPLETED: 'secondary',
  }
  return <Badge variant={variants[status] || 'default'}>{status.replace(/_/g, ' ')}</Badge>
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Unable to load dashboard</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Total Contracts',
      value: data.stats.totalContracts,
      subtitle: `${data.stats.activeContracts} active`,
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      name: 'Total Cases',
      value: data.stats.totalCases,
      subtitle: `${data.stats.activeCases} active`,
      icon: Briefcase,
      color: 'text-green-600',
    },
    {
      name: 'Compliance',
      value: data.stats.pendingCompliance,
      subtitle: 'pending items',
      icon: Shield,
      color: 'text-purple-600',
    },
    {
      name: 'Documents',
      value: data.stats.totalDocuments,
      subtitle: 'uploaded',
      icon: FileCheck,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {data.user.name}! Here's an overview of your legal operations.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/contracts/new">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Contract
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Contracts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Contracts</CardTitle>
              <Link href="/dashboard/contracts">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {data.recentContracts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No contracts yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentContracts.map((contract: any) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.title}</TableCell>
                      <TableCell>{contract.counterpartyName}</TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell className="text-right">
                        ${contract.value ? contract.value.toLocaleString() : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {data.upcomingDeadlines.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No upcoming deadlines</p>
            ) : (
              <div className="space-y-4">
                {data.upcomingDeadlines.map((deadline: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`mt-1 h-2 w-2 rounded-full ${
                        deadline.priority === 'HIGH' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{deadline.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(deadline.dueDate).toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {deadline.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/dashboard/contracts/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Create Contract</span>
              </Button>
            </Link>
            <Link href="/dashboard/cases/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Briefcase className="h-6 w-6" />
                <span>New Case</span>
              </Button>
            </Link>
            <Link href="/dashboard/compliance/new">
              <Button variant="outline" className="h-20 w-full flex-col gap-2">
                <Shield className="h-6 w-6" />
                <span>Add Compliance</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
