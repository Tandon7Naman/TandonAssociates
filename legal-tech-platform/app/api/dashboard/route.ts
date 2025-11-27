import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch all dashboard data in parallel
    const [
      stats,
      recentContracts,
      recentCases,
      upcomingDeadlines,
      recentActivities
    ] = await Promise.all([
      // Statistics
      prisma.$transaction([
        prisma.contract.count({ where: { createdBy: user.id } }),
        prisma.contract.count({ 
          where: { 
            createdBy: user.id, 
            status: { in: ['ACTIVE', 'REVIEW', 'APPROVED'] }
          } 
        }),
        prisma.case.count({ where: { createdBy: user.id } }),
        prisma.case.count({ 
          where: { 
            createdBy: user.id, 
            status: { in: ['OPEN', 'IN_PROGRESS'] }
          } 
        }),
        prisma.compliance.count({ 
          where: { 
            createdBy: user.id, 
            status: 'PENDING' 
          } 
        }),
        prisma.document.count({ where: { uploadedBy: user.id } })
      ]).then(([total, active, totalCases, activeCases, pending, docs]) => ({
        totalContracts: total,
        activeContracts: active,
        totalCases,
        activeCases,
        pendingCompliance: pending,
        totalDocuments: docs
      })),

      // Recent contracts
      prisma.contract.findMany({
        where: { createdBy: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          type: true,
          partyA: true,
          partyB: true,
          value: true,
          createdAt: true,
          endDate: true
        }
      }),

      // Recent cases
      prisma.case.findMany({
        where: { createdBy: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          caseNumber: true,
          status: true,
          type: true,
          court: true,
          nextDate: true,
          createdAt: true
        }
      }),

      // Upcoming deadlines
      prisma.compliance.findMany({
        where: {
          createdBy: user.id,
          status: { in: ['PENDING', 'IN_PROGRESS'] },
          dueDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
          }
        },
        orderBy: { dueDate: 'asc' },
        take: 10,
        select: {
          id: true,
          title: true,
          type: true,
          priority: true,
          dueDate: true,
          status: true
        }
      }),

      // Recent activities
      prisma.activity.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 15,
        include: {
          contract: {
            select: { title: true }
          },
          case: {
            select: { title: true }
          },
          compliance: {
            select: { title: true }
          }
        }
      })
    ])

    // Return dashboard data
    return NextResponse.json({
      stats,
      recentContracts,
      recentCases,
      upcomingDeadlines,
      recentActivities,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
