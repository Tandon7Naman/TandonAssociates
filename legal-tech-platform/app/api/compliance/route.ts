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

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    const where: any = {
      userId: user.id,
    }

    if (status) {
      where.status = status
    }

    if (category) {
      where.category = category
    }

    const compliance = await prisma.compliance.findMany({
      where,
      orderBy: { dueDate: 'asc' },
      include: {
        audits: {
          orderBy: { completedAt: 'desc' },
          take: 1
        }
      }
    })

    return NextResponse.json(compliance)
  } catch (error) {
    console.error('Error fetching compliance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch compliance' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const data = await request.json()

    if (!data.title || !data.category || !data.requirement) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const compliance = await prisma.compliance.create({
      data: {
        title: data.title,
        category: data.category,
        requirement: data.requirement,
        status: data.status || 'PENDING',
        priority: data.priority || 'MEDIUM',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        description: data.description,
        regulation: data.regulation,
        jurisdiction: data.jurisdiction,
        userId: user.id
      }
    })

    await prisma.activity.create({
      data: {
        type: 'COMPLIANCE_CREATED',
        description: `Compliance item "${compliance.title}" created`,
        userId: user.id,
        complianceId: compliance.id
      }
    })

    return NextResponse.json(compliance, { status: 201 })
  } catch (error) {
    console.error('Error creating compliance:', error)
    return NextResponse.json(
      { error: 'Failed to create compliance' },
      { status: 500 }
    )
  }
}
