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

    // Get statistics
    const [
      totalContracts,
      activeContracts,
      totalCases,
      activeCases,
      pendingCompliance,
      overdueCompliance,
      totalDocuments,
      recentActivities
    ] = await Promise.all([
      prisma.contract.count({ where: { userId: user.id } }),
      prisma.contract.count({ 
        where: { 
          userId: user.id, 
          status: { in: ['ACTIVE', 'UNDER_REVIEW', 'PENDING_SIGNATURE'] }
        } 
      }),
      prisma.case.count({ where: { userId: user.id } }),
      prisma.case.count({ 
        where: { 
          userId: user.id, 
          status: { in: ['PENDING', 'IN_PROGRESS'] }
        } 
      }),
      prisma.compliance.count({ 
        where: { 
          userId: user.id, 
          status: 'PENDING' 
        } 
      }),
      prisma.compliance.count({ 
        where: { 
          userId: user.id, 
          status: 'OVERDUE' 
        } 
      }),
      prisma.document.count({ where: { userId: user.id } }),
      prisma.activity.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          contract: {
            select: { title: true }
          },
          case: {
            select: { title: true }
          }
        }
      })
    ])

    // Get contract statistics by status
    const contractsByStatus = await prisma.contract.groupBy({
      by: ['status'],
      where: { userId: user.id },
      _count: true
    })

    // Get case statistics by type
    const casesByType = await prisma.case.groupBy({
      by: ['type'],
      where: { userId: user.id },
      _count: true
    })

    // Get compliance by category
    const complianceByCategory = await prisma.compliance.groupBy({
      by: ['category'],
      where: { userId: user.id },
      _count: true
    })

    // Get monthly contract trends (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const contractTrends = await prisma.contract.groupBy({
      by: ['createdAt'],
      where: {
        userId: user.id,
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      _count: true
    })

    return NextResponse.json({
      overview: {
        totalContracts,
        activeContracts,
        totalCases,
        activeCases,
        pendingCompliance,
        overdueCompliance,
        totalDocuments
      },
      contractsByStatus,
      casesByType,
      complianceByCategory,
      contractTrends,
      recentActivities
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
