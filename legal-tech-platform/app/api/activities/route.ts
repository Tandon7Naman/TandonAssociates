import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0)

    const activities = await prisma.activity.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        contract: { select: { title: true } },
        case: { select: { title: true } },
        compliance: { select: { title: true } },
      },
    })

    const total = await prisma.activity.count({
      where: { userId: user.id },
    })

    return NextResponse.json({
      activities,
      total,
      limit,
      offset,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}
