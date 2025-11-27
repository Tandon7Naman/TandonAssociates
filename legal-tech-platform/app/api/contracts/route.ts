import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/contracts - List all contracts with optional filters
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

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    // Build filter object
    const where: any = {
      createdBy: user.id,
    }

    if (status) {
      where.status = status
    }

    if (type) {
      where.type = type
    }

    if (search) {
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
    console.error('Error fetching contracts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contracts' },
      { status: 500 }
    )
  }
}

// POST /api/contracts - Create a new contract
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

    // Validate required fields
    if (!data.title || !data.type || !(data.party1 || data.partyA) || !(data.party2 || data.partyB)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the contract
    const contract = await prisma.contract.create({
      data: {
        title: data.title,
        type: data.type,
        status: data.status || 'DRAFT',
        stage: data.stage || 'INITIATION',
        partyA: data.party1 || data.partyA,
        partyB: data.party2 || data.partyB,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        value: data.value ? parseFloat(data.value) : null,
        description: data.description || null,
        createdBy: user.id,
      },
    })

    // Create initial activity log
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
    console.error('Error creating contract:', error)
    return NextResponse.json(
      { error: 'Failed to create contract' },
      { status: 500 }
    )
  }
}
