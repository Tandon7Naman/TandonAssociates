import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, FileText, Scale, Shield, Users, CheckCircle2 } from 'lucide-react'

const notifications = [
  {
    id: '1',
    type: 'DEADLINE',
    title: 'Contract Expiry Warning',
    message: 'ABC Corp contract expires in 7 days',
    time: '2 hours ago',
    read: false,
    priority: 'HIGH',
  },
  {
    id: '2',
    type: 'HEARING',
    title: 'Court Hearing Tomorrow',
    message: 'Civil Case #2023-456 hearing scheduled at 14:00',
    time: '3 hours ago',
    read: false,
    priority: 'CRITICAL',
  },
  {
    id: '3',
    type: 'COMPLIANCE',
    title: 'Compliance Review Due',
    message: 'GDPR annual review due in 5 days',
    time: '5 hours ago',
    read: false,
    priority: 'MEDIUM',
  },
  {
    id: '4',
    type: 'DOCUMENT',
    title: 'Document Uploaded',
    message: 'New document added to Case #2023-789',
    time: '1 day ago',
    read: true,
    priority: 'LOW',
  },
  {
    id: '5',
    type: 'TEAM',
    title: 'Team Member Added',
    message: 'John Smith joined your team',
    time: '1 day ago',
    read: true,
    priority: 'LOW',
  },
  {
    id: '6',
    type: 'CONTRACT',
    title: 'Contract Signed',
    message: 'XYZ Services contract has been signed',
    time: '2 days ago',
    read: true,
    priority: 'MEDIUM',
  },
]

function getNotificationIcon(type: string) {
  const icons: Record<string, any> = {
    DEADLINE: Bell,
    HEARING: Scale,
    COMPLIANCE: Shield,
    DOCUMENT: FileText,
    TEAM: Users,
    CONTRACT: FileText,
  }
  const Icon = icons[type] || Bell
  return <Icon className="h-5 w-5" />
}

function getNotificationColor(type: string) {
  const colors: Record<string, string> = {
    DEADLINE: 'bg-red-100 text-red-600',
    HEARING: 'bg-purple-100 text-purple-600',
    COMPLIANCE: 'bg-green-100 text-green-600',
    DOCUMENT: 'bg-blue-100 text-blue-600',
    TEAM: 'bg-yellow-100 text-yellow-600',
    CONTRACT: 'bg-indigo-100 text-indigo-600',
  }
  return colors[type] || 'bg-gray-100 text-gray-600'
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with all important activities
          </p>
        </div>
        <Button variant="outline">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{notifications.length}</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                <p className="text-xs text-muted-foreground">Unread</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">1</div>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">5</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 ${
                  !notification.read ? 'bg-muted/30' : ''
                }`}
              >
                <div
                  className={`mt-1 rounded-full p-3 ${getNotificationColor(
                    notification.type
                  )}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{notification.title}</p>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className={getNotificationColor(notification.type)}>
                      {notification.type}
                    </Badge>
                    <Badge
                      variant={
                        notification.priority === 'CRITICAL'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {notification.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {notification.read ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Button variant="ghost" size="sm">
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive browser notifications
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notification Frequency</p>
                <p className="text-sm text-muted-foreground">
                  How often to receive notifications
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
