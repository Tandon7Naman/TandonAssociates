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
    const type = searchParams.get('type')

    const where: any = {
      createdBy: user.id,
    }

    if (status) {
      where.status = status
    }

    if (type) {
      where.type = type
    }

    const compliance = await prisma.compliance.findMany({
      where,
      orderBy: { dueDate: 'asc' },
      include: {
        audits: {
          orderBy: { createdAt: 'desc' },
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

    if (!data.title || !data.type || !data.regulation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const compliance = await prisma.compliance.create({
      data: {
        title: data.title,
        type: data.type,
        regulation: data.regulation,
        status: data.status || 'PENDING',
        priority: data.priority || 'MEDIUM',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        description: data.description,
        jurisdiction: data.jurisdiction,
        requirements: data.requirements,
        createdBy: user.id
      }
    })

    await prisma.activity.create({
      data: {
        action: 'Created',
        entity: 'Compliance',
        entityId: compliance.id,
        description: `Compliance item "${compliance.title}" created`,
        userId: user.id
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
