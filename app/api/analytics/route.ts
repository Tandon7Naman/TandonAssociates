import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const [
      contractsByStatus,
      contractsByType,
      casesByStatus,
      complianceByStatus,
      recentActivity,
    ] = await Promise.all([
      prisma.contract.groupBy({
        by: ['status'],
        where: { createdBy: user.id },
        _count: true,
      }),
      prisma.contract.groupBy({
        by: ['type'],
        where: { createdBy: user.id },
        _count: true,
      }),
      prisma.case.groupBy({
        by: ['status'],
        where: { createdBy: user.id },
        _count: true,
      }),
      prisma.compliance.groupBy({
        by: ['status'],
        where: { createdBy: user.id },
        _count: true,
      }),
      prisma.activity.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 30,
      }),
    ])

    return NextResponse.json({
      contractsByStatus,
      contractsByType,
      casesByStatus,
      complianceByStatus,
      recentActivity,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
