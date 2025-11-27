'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Clock, FileText, Scale } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const events = [
  {
    id: '1',
    title: 'Contract Renewal - ABC Corp',
    type: 'CONTRACT',
    date: '2025-12-01',
    time: '09:00',
    priority: 'HIGH',
  },
  {
    id: '2',
    title: 'Court Hearing - Civil Case #2023-456',
    type: 'HEARING',
    date: '2025-12-03',
    time: '14:00',
    priority: 'CRITICAL',
  },
  {
    id: '3',
    title: 'Compliance Audit - GDPR Review',
    type: 'COMPLIANCE',
    date: '2025-12-05',
    time: '10:00',
    priority: 'MEDIUM',
  },
  {
    id: '4',
    title: 'Contract Expiry - XYZ Services',
    type: 'CONTRACT',
    date: '2025-12-10',
    time: '23:59',
    priority: 'HIGH',
  },
  {
    id: '5',
    title: 'Appeal Deadline - Case #2023-789',
    type: 'DEADLINE',
    date: '2025-12-12',
    time: '17:00',
    priority: 'CRITICAL',
  },
]

function getEventIcon(type: string) {
  const icons: Record<string, any> = {
    CONTRACT: FileText,
    HEARING: Scale,
    COMPLIANCE: FileText,
    DEADLINE: Clock,
  }
  const Icon = icons[type] || CalendarIcon
  return <Icon className="h-4 w-4" />
}

function getEventColor(type: string) {
  const colors: Record<string, string> = {
    CONTRACT: 'bg-blue-100 text-blue-800',
    HEARING: 'bg-purple-100 text-purple-800',
    COMPLIANCE: 'bg-green-100 text-green-800',
    DEADLINE: 'bg-red-100 text-red-800',
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Track deadlines, hearings, and important dates
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">5</div>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">3</div>
                <p className="text-xs text-muted-foreground">Hearings</p>
              </div>
              <Scale className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">7</div>
                <p className="text-xs text-muted-foreground">Contracts</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50"
                >
                  <div className={`mt-1 rounded-full p-2 ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className={getEventColor(event.type)}>
                        {event.type}
                      </Badge>
                      <Badge
                        variant={
                          event.priority === 'CRITICAL' ? 'destructive' : 'outline'
                        }
                      >
                        {event.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* This Week */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <div key={day} className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-muted">
                  <p className="text-xs font-medium text-muted-foreground">{day}</p>
                  <p className="text-lg font-bold">{25 + index}</p>
                </div>
                <div className="flex-1">
                  {index === 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          CONTRACT
                        </Badge>
                        <p className="text-sm">09:00 - Contract Renewal - ABC Corp</p>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-800">
                          HEARING
                        </Badge>
                        <p className="text-sm">14:00 - Court Hearing</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">
                          COMPLIANCE
                        </Badge>
                        <p className="text-sm">10:00 - GDPR Review</p>
                      </div>
                    </div>
                  )}
                  {index !== 0 && index !== 2 && (
                    <p className="text-sm text-muted-foreground">No events scheduled</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
