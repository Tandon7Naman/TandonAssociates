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
      userId: user.id,
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
        { party1: { contains: search, mode: 'insensitive' } },
        { party2: { contains: search, mode: 'insensitive' } },
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
    if (!data.title || !data.type || !data.party1 || !data.party2) {
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
        party1: data.party1,
        party2: data.party2,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        value: data.value ? parseFloat(data.value) : null,
        description: data.description || null,
        terms: data.terms || null,
        jurisdiction: data.jurisdiction || null,
        governingLaw: data.governingLaw || null,
        userId: user.id,
        currentStage: 'DRAFTING',
        riskScore: 0,
        complianceScore: 0,
      },
    })

    // Create initial activity log
    await prisma.activity.create({
      data: {
        type: 'CONTRACT_CREATED',
        description: `Contract "${contract.title}" created`,
        userId: user.id,
        contractId: contract.id,
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
