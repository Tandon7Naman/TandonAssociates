import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const [
      stats,
      recentContracts,
      recentCases,
      upcomingDeadlines,
      recentActivities
    ] = await Promise.all([
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

      prisma.compliance.findMany({
        where: {
          createdBy: user.id,
          status: { in: ['PENDING', 'IN_PROGRESS'] },
          dueDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
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
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
