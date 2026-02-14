import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { ZodError } from 'zod'

const complianceSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['REGULATORY', 'STATUTORY', 'CONTRACTUAL', 'INTERNAL_POLICY', 'INDUSTRY_STANDARD']),
  regulation: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  dueDate: z.string().datetime().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const where: any = {
      createdBy: user.id,
    }

    if (status && ['PENDING', 'IN_PROGRESS', 'COMPLIANT', 'NON_COMPLIANT', 'UNDER_REVIEW'].includes(status)) {
      where.status = status
    }

    const compliances = await prisma.compliance.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    return NextResponse.json(compliances)
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch compliance records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const data = await request.json()
    const validated = complianceSchema.parse(data)

    const compliance = await prisma.compliance.create({
      data: {
        title: validated.title,
        type: validated.type,
        regulation: validated.regulation,
        status: 'PENDING',
        description: validated.description || null,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        createdBy: user.id,
      },
    })

    await prisma.activity.create({
      data: {
        action: 'Created',
        entity: 'Compliance',
        entityId: compliance.id,
        description: `Compliance "${compliance.title}" created`,
        userId: user.id,
      },
    })

    return NextResponse.json(compliance, { status: 201 })
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
      { error: 'Failed to create compliance record' },
      { status: 500 }
    )
  }
}
