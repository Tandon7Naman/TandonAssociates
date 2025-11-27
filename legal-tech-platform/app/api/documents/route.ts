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
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    const where: any = {
      uploadedBy: user.id,
    }

    if (type) {
      where.type = type
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { uploadedAt: 'desc' },
      include: {
        contract: {
          select: {
            id: true,
            title: true
          }
        },
        case: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
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

    if (!data.name || !data.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const document = await prisma.document.create({
      data: {
        name: data.name,
        type: data.type,
        url: data.fileUrl || data.url || '',
        size: data.fileSize || data.size || 0,
        mimeType: data.mimeType || 'application/octet-stream',
        contractId: data.contractId || null,
        caseId: data.caseId || null,
        complianceId: data.complianceId || null,
        uploadedBy: user.id
      }
    })

    await prisma.activity.create({
      data: {
        action: 'Uploaded',
        entity: 'Document',
        entityId: document.id,
        description: `Document "${document.name}" uploaded`,
        userId: user.id
      }
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    )
  }
}
