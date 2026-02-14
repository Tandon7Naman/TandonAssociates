import { NextRequest, NextResponse } from 'next/server'
import { eCourtService } from '@/lib/ecourts-service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')
    const cnr = searchParams.get('cnr')
    const courtCode = searchParams.get('courtCode')
    const date = searchParams.get('date')
    const partyName = searchParams.get('partyName')
    const year = searchParams.get('year')

    switch (action) {
      case 'searchByCNR':
        if (!cnr) {
          return NextResponse.json(
            { error: 'CNR number is required' },
            { status: 400 }
          )
        }
        const caseDetails = await eCourtService.searchByCNR(cnr)
        return NextResponse.json(caseDetails)

      case 'getCauseList':
        if (!courtCode || !date) {
          return NextResponse.json(
            { error: 'Court code and date are required' },
            { status: 400 }
          )
        }
        const causeList = await eCourtService.getCauseList(courtCode, date)
        return NextResponse.json(causeList)

      case 'getCaseHistory':
        if (!cnr) {
          return NextResponse.json(
            { error: 'CNR number is required' },
            { status: 400 }
          )
        }
        const history = await eCourtService.getCaseHistory(cnr)
        return NextResponse.json(history)

      case 'searchByPartyName':
        if (!partyName || !courtCode) {
          return NextResponse.json(
            { error: 'Party name and court code are required' },
            { status: 400 }
          )
        }
        const cases = await eCourtService.searchByPartyName(
          partyName,
          courtCode,
          year ? parseInt(year) : undefined
        )
        return NextResponse.json(cases)

      case 'getCourtDetails':
        if (!courtCode) {
          return NextResponse.json(
            { error: 'Court code is required' },
            { status: 400 }
          )
        }
        const courtDetails = await eCourtService.getCourtDetails(courtCode)
        return NextResponse.json(courtDetails)

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: searchByCNR, getCauseList, getCaseHistory, searchByPartyName, getCourtDetails' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('eCourts API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...params } = body

    switch (action) {
      case 'bulkSearchCNR':
        if (!params.cnrNumbers || !Array.isArray(params.cnrNumbers)) {
          return NextResponse.json(
            { error: 'Array of CNR numbers is required' },
            { status: 400 }
          )
        }
        
        const results = await Promise.all(
          params.cnrNumbers.map((cnr: string) => eCourtService.searchByCNR(cnr))
        )
        
        return NextResponse.json(results)

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('eCourts API POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
