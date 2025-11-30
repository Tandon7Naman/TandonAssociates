import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const upcomingDeadlines = await prisma.compliance.findMany({
      where: {
        createdBy: user.id,
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        dueDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { dueDate: 'asc' },
      take: 10,
    })

    const expiringContracts = await prisma.contract.findMany({
      where: {
        createdBy: user.id,
        status: 'ACTIVE',
        endDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { endDate: 'asc' },
      take: 10,
    })

    const upcomingHearings = await prisma.case.findMany({
      where: {
        createdBy: user.id,
        status: { in: ['OPEN', 'IN_PROGRESS', 'HEARING_SCHEDULED'] },
        nextDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { nextDate: 'asc' },
      take: 10,
    })

    return NextResponse.json({
      upcomingDeadlines,
      expiringContracts,
      upcomingHearings,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
