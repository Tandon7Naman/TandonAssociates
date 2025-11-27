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
    const search = searchParams.get('search')

    const where: any = {
      createdBy: user.id,
    }

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { caseNumber: { contains: search, mode: 'insensitive' } },
        { court: { contains: search, mode: 'insensitive' } }
      ]
    }

    const cases = await prisma.case.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        proceedings: true,
        documents: true,
        _count: {
          select: { proceedings: true, documents: true }
        }
      }
    })

    return NextResponse.json(cases)
  } catch (error) {
    console.error('Error fetching cases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
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

    if (!data.title || !data.caseNumber || !data.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const caseRecord = await prisma.case.create({
      data: {
        title: data.title,
        caseNumber: data.caseNumber,
        type: data.type,
        status: data.status || 'PENDING',
        court: data.court,
        judge: data.judge,
        filingDate: data.filingDate ? new Date(data.filingDate) : new Date(),
        nextDate: data.nextHearing ? new Date(data.nextHearing) : null,
        description: data.description,
        plaintiff: data.plaintiff,
        defendant: data.defendant,
        createdBy: user.id
      }
    })

    await prisma.activity.create({
      data: {
        action: 'Created',
        entity: 'Case',
        entityId: caseRecord.id,
        description: `Case "${caseRecord.title}" created`,
        userId: user.id
      }
    })

    return NextResponse.json(caseRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating case:', error)
    return NextResponse.json(
      { error: 'Failed to create case' },
      { status: 500 }
    )
  }
}
