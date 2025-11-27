import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET /api/contracts/[id] - Get a specific contract
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contract = await prisma.contract.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        documents: true,
        clauses: true,
        comments: true,
        activities: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    })

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    return NextResponse.json(contract)
  } catch (error) {
    console.error('Error fetching contract:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contract' },
      { status: 500 }
    )
  }
}

// PUT /api/contracts/[id] - Update a contract
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
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

    // Check if contract exists and user has permission
    const existingContract = await prisma.contract.findUnique({
      where: { id: params.id },
    })

    if (!existingContract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    if (existingContract.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Update the contract
    const contract = await prisma.contract.update({
      where: { id: params.id },
      data: {
        title: data.title,
        type: data.type,
        status: data.status,
        party1: data.party1,
        party2: data.party2,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        value: data.value ? parseFloat(data.value) : null,
        description: data.description,
        terms: data.terms,
        jurisdiction: data.jurisdiction,
        governingLaw: data.governingLaw,
        currentStage: data.currentStage,
        riskScore: data.riskScore,
        complianceScore: data.complianceScore,
      },
    })

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'CONTRACT_UPDATED',
        description: `Contract "${contract.title}" updated`,
        userId: user.id,
        contractId: contract.id,
      },
    })

    return NextResponse.json(contract)
  } catch (error) {
    console.error('Error updating contract:', error)
    return NextResponse.json(
      { error: 'Failed to update contract' },
      { status: 500 }
    )
  }
}

// DELETE /api/contracts/[id] - Delete a contract
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if contract exists and user has permission
    const existingContract = await prisma.contract.findUnique({
      where: { id: params.id },
    })

    if (!existingContract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    if (existingContract.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete the contract
    await prisma.contract.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Contract deleted successfully' })
  } catch (error) {
    console.error('Error deleting contract:', error)
    return NextResponse.json(
      { error: 'Failed to delete contract' },
      { status: 500 }
    )
  }
}
