'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  FileText,
  Briefcase,
  Shield,
  LayoutDashboard,
  Bell,
  Settings,
  Users,
  CalendarDays,
  FolderOpen,
  BarChart3,
  FileBarChart,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contracts', href: '/dashboard/contracts', icon: FileText },
  { name: 'Cases', href: '/dashboard/cases', icon: Briefcase },
  { name: 'Compliance', href: '/dashboard/compliance', icon: Shield },
  { name: 'Documents', href: '/dashboard/documents', icon: FolderOpen },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/dashboard/reports', icon: FileBarChart },
  { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarDays },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-gradient-to-b from-slate-50 to-white">
      {/* Logo */}
      <div className="flex h-20 items-center border-b px-6 bg-white">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Tandon Associates
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4 bg-white">
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 border border-blue-100">
          <p className="font-semibold text-sm text-gray-900 mb-1">Need help?</p>
          <p className="text-xs text-gray-600">Check our documentation</p>
        </div>
      </div>
    </div>
  )
}
