import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, createUnauthorizedResponse } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'

const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const searchParams = request.nextUrl.searchParams
    const contractId = searchParams.get('contractId')
    const caseId = searchParams.get('caseId')
    const complianceId = searchParams.get('complianceId')

    const where: any = {
      uploadedBy: user.id,
    }

    if (contractId) {
      where.contractId = contractId
    }
    if (caseId) {
      where.caseId = caseId
    }
    if (complianceId) {
      where.complianceId = complianceId
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { uploadedAt: 'desc' },
    })

    return NextResponse.json(documents)
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    const formData = await request.formData()
    const file = formData.get('file') as File
    const contractId = formData.get('contractId') as string | null
    const caseId = formData.get('caseId') as string | null
    const complianceId = formData.get('complianceId') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      )
    }

    // Verify ownership if linking to existing records
    if (contractId) {
      const contract = await prisma.contract.findUnique({
        where: { id: contractId }
      })
      if (!contract || contract.createdBy !== user.id) {
        return createUnauthorizedResponse()
      }
    }

    if (caseId) {
      const caseRecord = await prisma.case.findUnique({
        where: { id: caseId }
      })
      if (!caseRecord || caseRecord.createdBy !== user.id) {
        return createUnauthorizedResponse()
      }
    }

    if (complianceId) {
      const compliance = await prisma.compliance.findUnique({
        where: { id: complianceId }
      })
      if (!compliance || compliance.createdBy !== user.id) {
        return createUnauthorizedResponse()
      }
    }

    const document = await prisma.document.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        mimeType: file.type,
        url: `/uploads/${user.id}/${Date.now()}-${file.name}`,
        uploadedBy: user.id,
        contractId: contractId || null,
        caseId: caseId || null,
        complianceId: complianceId || null,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return createUnauthorizedResponse()
    }
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    )
  }
}
