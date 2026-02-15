import { NextResponse } from 'next/server'

// Mock data for demo purposes (when database is not configured)
export async function GET() {
  try {
    // Mock user data
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@tandonassociates.com',
      role: 'ADMIN'
    }

    // Mock statistics
    const mockStats = {
      totalContracts: 24,
      activeContracts: 15,
      totalCases: 18,
      activeCases: 12,
      pendingCompliance: 8,
      totalDocuments: 47
    }

    // Mock recent contracts
    const mockContracts = [
      {
        id: '1',
        title: 'Vendor Service Agreement',
        counterpartyName: 'Acme Corp',
        status: 'REVIEW',
        value: 50000,
        createdAt: '2024-11-20',
      },
      {
        id: '2',
        title: 'Employment Contract - John Smith',
        counterpartyName: 'John Smith',
        status: 'ACTIVE',
        value: 85000,
        createdAt: '2024-11-18',
      },
      {
        id: '3',
        title: 'NDA - Project Phoenix',
        counterpartyName: 'Tech Solutions Inc',
        status: 'EXECUTED',
        value: 0,
        createdAt: '2024-11-15',
      },
    ]

    // Mock upcoming deadlines
    const mockDeadlines = [
      {
        id: '1',
        title: 'Contract Renewal - Office Lease',
        dueDate: '2025-01-01',
        type: 'Contract',
        priority: 'HIGH',
      },
      {
        id: '2',
        title: 'GDPR Compliance Review',
        dueDate: '2025-01-05',
        type: 'Compliance',
        priority: 'MEDIUM',
      },
      {
        id: '3',
        title: 'Court Hearing - Case #2034',
        dueDate: '2025-01-08',
        type: 'Case',
        priority: 'HIGH',
      },
    ]

    return NextResponse.json({
      user: mockUser,
      stats: mockStats,
      recentContracts: mockContracts,
      upcomingDeadlines: mockDeadlines
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
