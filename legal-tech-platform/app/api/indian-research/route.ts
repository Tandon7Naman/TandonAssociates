import { NextRequest, NextResponse } from 'next/server'
import { indianKanoonService } from '@/lib/indian-kanoon-service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')
    const query = searchParams.get('query')
    const tid = searchParams.get('tid')
    const citation = searchParams.get('citation')
    const fromdate = searchParams.get('fromdate')
    const todate = searchParams.get('todate')
    const court = searchParams.get('court')
    const section = searchParams.get('section')
    const topic = searchParams.get('topic')

    switch (action) {
      case 'search':
        if (!query) {
          return NextResponse.json(
            { error: 'Query is required' },
            { status: 400 }
          )
        }
        
        const searchResults = await indianKanoonService.searchJudgments(query, {
          fromdate: fromdate || undefined,
          todate: todate || undefined,
          court: court || undefined
        })
        
        return NextResponse.json(searchResults)

      case 'getDocument':
        if (!tid) {
          return NextResponse.json(
            { error: 'Document ID (tid) is required' },
            { status: 400 }
          )
        }
        
        const document = await indianKanoonService.getDocument(tid)
        
        if (!document) {
          return NextResponse.json(
            { error: 'Document not found' },
            { status: 404 }
          )
        }
        
        return NextResponse.json(document)

      case 'searchByCitation':
        if (!citation) {
          return NextResponse.json(
            { error: 'Citation is required' },
            { status: 400 }
          )
        }
        
        const citationResult = await indianKanoonService.searchByCitation(citation)
        
        if (!citationResult) {
          return NextResponse.json(
            { error: 'Case not found' },
            { status: 404 }
          )
        }
        
        return NextResponse.json(citationResult)

      case 'searchByIPCSection':
        if (!section) {
          return NextResponse.json(
            { error: 'IPC section number is required' },
            { status: 400 }
          )
        }
        
        const ipcResults = await indianKanoonService.searchByIPCSection(section)
        return NextResponse.json(ipcResults)

      case 'searchByTopic':
        if (!topic) {
          return NextResponse.json(
            { error: 'Topic is required' },
            { status: 400 }
          )
        }
        
        const topicResults = await indianKanoonService.searchByTopic(topic)
        return NextResponse.json(topicResults)

      case 'searchSupremeCourt':
        if (!query) {
          return NextResponse.json(
            { error: 'Query is required' },
            { status: 400 }
          )
        }
        
        const scResults = await indianKanoonService.searchSupremeCourt(query)
        return NextResponse.json(scResults)

      case 'searchHighCourt':
        if (!query) {
          return NextResponse.json(
            { error: 'Query is required' },
            { status: 400 }
          )
        }
        
        const hcName = searchParams.get('highCourtName') || undefined
        const hcResults = await indianKanoonService.searchHighCourt(query, hcName)
        return NextResponse.json(hcResults)

      case 'getRelated':
        if (!tid) {
          return NextResponse.json(
            { error: 'Document ID (tid) is required' },
            { status: 400 }
          )
        }
        
        const limitStr = searchParams.get('limit')
        const limit = limitStr ? parseInt(limitStr) : 5
        const relatedCases = await indianKanoonService.getRelatedJudgments(tid, limit)
        return NextResponse.json(relatedCases)

      default:
        return NextResponse.json(
          { 
            error: 'Invalid action. Supported actions: search, getDocument, searchByCitation, searchByIPCSection, searchByTopic, searchSupremeCourt, searchHighCourt, getRelated'
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Indian Kanoon API error:', error)
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
      case 'advancedSearch':
        const results = await indianKanoonService.searchJudgments(
          params.query,
          {
            fromdate: params.fromdate,
            todate: params.todate,
            court: params.court,
            pagenum: params.pagenum
          }
        )
        return NextResponse.json(results)

      case 'bulkGetDocuments':
        if (!params.tids || !Array.isArray(params.tids)) {
          return NextResponse.json(
            { error: 'Array of document IDs is required' },
            { status: 400 }
          )
        }
        
        const documents = await Promise.all(
          params.tids.map((tid: string) => indianKanoonService.getDocument(tid))
        )
        
        return NextResponse.json(documents.filter(doc => doc !== null))

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Indian Kanoon API POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
