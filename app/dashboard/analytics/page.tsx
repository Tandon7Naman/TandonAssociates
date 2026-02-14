'use client'

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
  TrendingUp,
  TrendingDown,
  FileText,
  Briefcase,
  Shield,
  DollarSign,
  Clock,
  AlertCircle,
} from 'lucide-react'

const contractStats = [
  { month: 'Jan', draft: 12, review: 8, active: 45, completed: 5 },
  { month: 'Feb', draft: 15, review: 10, active: 48, completed: 7 },
  { month: 'Mar', draft: 18, review: 12, active: 50, completed: 6 },
  { month: 'Apr', draft: 14, review: 9, active: 52, completed: 8 },
  { month: 'May', draft: 20, review: 15, active: 55, completed: 9 },
  { month: 'Jun', draft: 16, review: 11, active: 58, completed: 10 },
]

const contractTypes = [
  { type: 'Service Agreement', count: 45, value: 2500000, growth: 12 },
  { type: 'NDA', count: 32, value: 0, growth: -5 },
  { type: 'Employment', count: 28, value: 1200000, growth: 8 },
  { type: 'Partnership', count: 15, value: 5000000, growth: 25 },
  { type: 'Licensing', count: 12, value: 800000, growth: 15 },
]

const caseMetrics = [
  { status: 'Active', count: 18, percentage: 45 },
  { status: 'Pending', count: 12, percentage: 30 },
  { status: 'Settled', count: 8, percentage: 20 },
  { status: 'Closed', count: 2, percentage: 5 },
]

const complianceMetrics = [
  { area: 'Data Privacy (GDPR)', score: 95, status: 'compliant' },
  { area: 'Financial Regulations', score: 88, status: 'compliant' },
  { area: 'Labor Laws', score: 92, status: 'compliant' },
  { area: 'Environmental', score: 75, status: 'needs-attention' },
  { area: 'Industry Standards', score: 85, status: 'compliant' },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your legal operations
          </p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="h-8 w-8 text-blue-500" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Total Contracts</p>
          <p className="text-3xl font-bold">132</p>
          <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4" />
            +12% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-green-500" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Contract Value</p>
          <p className="text-3xl font-bold">$9.5M</p>
          <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4" />
            +18% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Briefcase className="h-8 w-8 text-orange-500" />
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-sm text-muted-foreground">Active Cases</p>
          <p className="text-3xl font-bold">40</p>
          <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
            <TrendingDown className="h-4 w-4" />
            -5% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-8 w-8 text-purple-500" />
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Compliance Score</p>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="h-4 w-4" />
            +3% from last month
          </p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contract Status Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contract Status (Last 6 Months)</h3>
          <div className="space-y-4">
            {contractStats.map((stat) => (
              <div key={stat.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{stat.month}</span>
                  <span className="text-sm text-muted-foreground">
                    Total: {stat.draft + stat.review + stat.active + stat.completed}
                  </span>
                </div>
                <div className="flex h-8 rounded overflow-hidden">
                  <div
                    className="bg-gray-400 flex items-center justify-center text-xs text-white"
                    style={{ width: `${(stat.draft / (stat.draft + stat.review + stat.active + stat.completed)) * 100}%` }}
                  >
                    {stat.draft > 0 && stat.draft}
                  </div>
                  <div
                    className="bg-blue-500 flex items-center justify-center text-xs text-white"
                    style={{ width: `${(stat.review / (stat.draft + stat.review + stat.active + stat.completed)) * 100}%` }}
                  >
                    {stat.review > 0 && stat.review}
                  </div>
                  <div
                    className="bg-green-500 flex items-center justify-center text-xs text-white"
                    style={{ width: `${(stat.active / (stat.draft + stat.review + stat.active + stat.completed)) * 100}%` }}
                  >
                    {stat.active}
                  </div>
                  <div
                    className="bg-green-700 flex items-center justify-center text-xs text-white"
                    style={{ width: `${(stat.completed / (stat.draft + stat.review + stat.active + stat.completed)) * 100}%` }}
                  >
                    {stat.completed > 0 && stat.completed}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded" />
                <span>Draft</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span>Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-700 rounded" />
                <span>Completed</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Contract Types */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contract Types Performance</h3>
          <div className="space-y-4">
            {contractTypes.map((type) => (
              <div key={type.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{type.type}</span>
                    <Badge variant={type.growth > 0 ? 'default' : 'secondary'}>
                      {type.growth > 0 ? '+' : ''}{type.growth}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{type.count} contracts</span>
                    {type.value > 0 && (
                      <>
                        <span>•</span>
                        <span>${(type.value / 1000000).toFixed(1)}M value</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cases and Compliance */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Case Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Case Status Distribution</h3>
          <div className="space-y-4">
            {caseMetrics.map((metric) => (
              <div key={metric.status}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.status}</span>
                  <span className="text-sm text-muted-foreground">
                    {metric.count} ({metric.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${metric.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance Overview</h3>
          <div className="space-y-4">
            {complianceMetrics.map((metric) => (
              <div
                key={metric.area}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{metric.area}</span>
                    {metric.status === 'needs-attention' && (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          metric.score >= 90
                            ? 'bg-green-500'
                            : metric.score >= 75
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {metric.score}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Average Processing Times */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Average Processing Times</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <Clock className="h-10 w-10 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Contract Review</p>
              <p className="text-2xl font-bold">5.2 days</p>
              <p className="text-sm text-green-600">-1.2 days vs last month</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-10 w-10 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Case Resolution</p>
              <p className="text-2xl font-bold">45 days</p>
              <p className="text-sm text-green-600">-5 days vs last month</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-10 w-10 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Compliance Audit</p>
              <p className="text-2xl font-bold">3.8 days</p>
              <p className="text-sm text-red-600">+0.5 days vs last month</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
