import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { caseSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'
import { ZodError } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    const where: any = {
      createdBy: user.id,
    }

    if (status && ['OPEN', 'IN_PROGRESS', 'HEARING_SCHEDULED', 'AWAITING_JUDGMENT', 'CLOSED', 'ARCHIVED'].includes(status)) {
      where.status = status
    }

    if (type && ['CIVIL', 'CRIMINAL', 'CORPORATE', 'LABOR', 'INTELLECTUAL_PROPERTY', 'TAX', 'REGULATORY', 'OTHER'].includes(type)) {
      where.type = type
    }

    if (search && search.length > 0 && search.length < 100) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { caseNumber: { contains: search, mode: 'insensitive' } },
        { court: { contains: search, mode: 'insensitive' } },
      ]
    }

    const cases = await prisma.case.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    return NextResponse.json(cases)
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const data = await request.json()
    const validated = caseSchema.parse(data)

    const caseRecord = await prisma.case.create({
      data: {
        title: validated.title,
        caseNumber: validated.caseNumber,
        type: validated.type,
        status: 'OPEN',
        description: validated.description || null,
        court: validated.court || null,
        plaintiff: validated.plaintiff || null,
        defendant: validated.defendant || null,
        createdBy: user.id,
      },
    })

    await prisma.activity.create({
      data: {
        action: 'Created',
        entity: 'Case',
        entityId: caseRecord.id,
        description: `Case "${caseRecord.title}" created`,
        userId: user.id,
      },
    })

    return NextResponse.json(caseRecord, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to create case' },
      { status: 500 }
    )
  }
}
