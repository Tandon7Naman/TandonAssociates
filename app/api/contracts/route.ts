import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { contractSchema } from '@/lib/validations'
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

    if (status && ['DRAFT', 'REVIEW', 'APPROVED', 'EXECUTED', 'ACTIVE', 'EXPIRED', 'TERMINATED'].includes(status)) {
      where.status = status
    }

    if (type && ['NDA', 'SERVICE_AGREEMENT', 'EMPLOYMENT', 'VENDOR', 'PARTNERSHIP', 'LEASE', 'PROCUREMENT', 'OTHER'].includes(type)) {
      where.type = type
    }

    if (search && search.length > 0 && search.length < 100) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { partyA: { contains: search, mode: 'insensitive' } },
        { partyB: { contains: search, mode: 'insensitive' } },
      ]
    }

    const contracts = await prisma.contract.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(contracts)
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch contracts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const data = await request.json()
    const validated = contractSchema.parse(data)

    const contract = await prisma.contract.create({
      data: {
        title: validated.title,
        type: validated.type,
        status: 'DRAFT',
        stage: 'INITIATION',
        partyA: validated.partyA,
        partyB: validated.partyB,
        startDate: validated.startDate ? new Date(validated.startDate) : null,
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        value: validated.value || null,
        description: validated.description || null,
        createdBy: user.id,
      },
    })

    await prisma.activity.create({
      data: {
        action: 'Created',
        entity: 'Contract',
        entityId: contract.id,
        description: `Contract "${contract.title}" created`,
        userId: user.id,
      },
    })

    return NextResponse.json(contract, { status: 201 })
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
      { error: 'Failed to create contract' },
      { status: 500 }
    )
  }
}
