export async function fetchDashboardData() {
  const response = await fetch('/api/dashboard')
  if (!response.ok) throw new Error('Failed to fetch dashboard data')
  return response.json()
}

export async function fetchContracts(params?: { status?: string; type?: string; search?: string }) {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.append('status', params.status)
  if (params?.type) searchParams.append('type', params.type)
  if (params?.search) searchParams.append('search', params.search)
  
  const response = await fetch(`/api/contracts?${searchParams}`)
  if (!response.ok) throw new Error('Failed to fetch contracts')
  return response.json()
}

export async function createContract(data: any) {
  const response = await fetch('/api/contracts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to create contract')
  return response.json()
}

export async function fetchCases(params?: { status?: string; search?: string }) {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.append('status', params.status)
  if (params?.search) searchParams.append('search', params.search)
  
  const response = await fetch(`/api/cases?${searchParams}`)
  if (!response.ok) throw new Error('Failed to fetch cases')
  return response.json()
}

export async function createCase(data: any) {
  const response = await fetch('/api/cases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to create case')
  return response.json()
}

export async function fetchCompliance(params?: { status?: string; category?: string }) {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.append('status', params.status)
  if (params?.category) searchParams.append('category', params.category)
  
  const response = await fetch(`/api/compliance?${searchParams}`)
  if (!response.ok) throw new Error('Failed to fetch compliance')
  return response.json()
}

export async function createCompliance(data: any) {
  const response = await fetch('/api/compliance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to create compliance item')
  return response.json()
}

export async function fetchDocuments(params?: { type?: string; search?: string }) {
  const searchParams = new URLSearchParams()
  if (params?.type) searchParams.append('type', params.type)
  if (params?.search) searchParams.append('search', params.search)
  
  const response = await fetch(`/api/documents?${searchParams}`)
  if (!response.ok) throw new Error('Failed to fetch documents')
  return response.json()
}

export async function fetchAnalytics() {
  const response = await fetch('/api/analytics')
  if (!response.ok) throw new Error('Failed to fetch analytics')
  return response.json()
}

export async function fetchActivities() {
  const response = await fetch('/api/activities')
  if (!response.ok) throw new Error('Failed to fetch activities')
  return response.json()
}

export async function fetchNotifications() {
  const response = await fetch('/api/notifications')
  if (!response.ok) throw new Error('Failed to fetch notifications')
  return response.json()
}

export async function markNotificationRead(notificationId: string) {
  const response = await fetch('/api/notifications', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notificationId })
  })
  if (!response.ok) throw new Error('Failed to mark notification as read')
  return response.json()
}

export async function markAllNotificationsRead() {
  const response = await fetch('/api/notifications', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ markAllAsRead: true })
  })
  if (!response.ok) throw new Error('Failed to mark all notifications as read')
  return response.json()
}
