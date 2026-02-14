/**
 * Indian Kanoon Integration
 * Indian Kanoon is India's largest free legal research platform
 * Website: https://indiankanoon.org/
 * 
 * This service provides integration with Indian Kanoon for:
 * - Case law search
 * - Judgment retrieval
 * - Citation lookup
 * - Legal research
 */

import axios from 'axios'

const INDIAN_KANOON_BASE_URL = 'https://api.indiankanoon.org'

export interface IndianKanoonSearchResult {
  tid: string  // Document ID
  title: string
  headline: string
  court: string
  date: string
  judges?: string[]
  appellant?: string
  respondent?: string
  citation?: string
  url: string
  relevance_score?: number
}

export interface IndianKanoonDocument {
  tid: string
  title: string
  doc: string  // Full judgment text (HTML format)
  court: string
  date: string
  citation?: string
  judges?: string[]
  acts_mentioned?: string[]
  cases_cited?: Array<{
    title: string
    tid: string
  }>
}

export class IndianKanoonService {
  private apiKey: string | undefined

  constructor() {
    // API key is optional - without it, you get limited results
    this.apiKey = process.env.INDIAN_KANOON_API_KEY
  }

  /**
   * Search for judgments by query
   * @param query - Search query (case name, topic, section, etc.)
   * @param fromdate - Start date (format: DD-MM-YYYY)
   * @param todate - End date (format: DD-MM-YYYY)
   * @param court - Filter by court name
   */
  async searchJudgments(
    query: string,
    options?: {
      fromdate?: string
      todate?: string
      court?: string
      pagenum?: number
    }
  ): Promise<IndianKanoonSearchResult[]> {
    try {
      // Mock implementation - Replace with actual API call
      // In production, uncomment the following:
      /*
      const params: any = {
        formInput: query,
        pagenum: options?.pagenum || 0
      }
      
      if (options?.fromdate) params.fromdate = options.fromdate
      if (options?.todate) params.todate = options.todate
      if (options?.court) params.court = options.court
      if (this.apiKey) params.apikey = this.apiKey
      
      const response = await axios.get(`${INDIAN_KANOON_BASE_URL}/search/`, {
        params
      })
      
      return response.data.docs || []
      */

      // Mock data for demonstration
      const mockResults: IndianKanoonSearchResult[] = [
        {
          tid: '1973_SC_1461',
          title: 'Kesavananda Bharati vs State Of Kerala (1973)',
          headline: 'Basic Structure Doctrine established - Parliament cannot amend Constitution to destroy its basic features',
          court: 'Supreme Court of India',
          date: '24-04-1973',
          judges: ['Justice S.M. Sikri', 'Justice J.M. Shelat', 'Justice A.N. Grover'],
          appellant: 'Kesavananda Bharati',
          respondent: 'State of Kerala',
          citation: 'AIR 1973 SC 1461',
          url: 'https://indiankanoon.org/doc/257876/',
          relevance_score: 0.95
        },
        {
          tid: '1978_SC_215',
          title: 'Maneka Gandhi vs Union Of India (1978)',
          headline: 'Expanded interpretation of Article 21 - Right to Life includes right to live with dignity',
          court: 'Supreme Court of India',
          date: '25-01-1978',
          judges: ['Justice P.N. Bhagwati'],
          appellant: 'Maneka Gandhi',
          respondent: 'Union of India',
          citation: 'AIR 1978 SC 597',
          url: 'https://indiankanoon.org/doc/1766147/',
          relevance_score: 0.92
        }
      ]

      // Filter by court if specified
      if (options?.court) {
        return mockResults.filter(r => 
          r.court.toLowerCase().includes(options.court!.toLowerCase())
        )
      }

      return mockResults
    } catch (error) {
      console.error('Error searching Indian Kanoon:', error)
      return []
    }
  }

  /**
   * Get full judgment document by document ID
   */
  async getDocument(tid: string): Promise<IndianKanoonDocument | null> {
    try {
      // Mock implementation
      const mockDocument: IndianKanoonDocument = {
        tid,
        title: 'Kesavananda Bharati vs State Of Kerala (1973)',
        doc: `
          <div class="judgment">
            <h2>IN THE SUPREME COURT OF INDIA</h2>
            <p><strong>Kesavananda Bharati Sripadagalvaru and Ors. vs State Of Kerala And Anr on 24 April, 1973</strong></p>
            
            <h3>JUDGMENT</h3>
            <p>Sikri, C.J.</p>
            
            <p>This case raises fundamental questions regarding the amending power of Parliament under Article 368 of the Constitution...</p>
            
            <h3>HELD:</h3>
            <p>Parliament has the power to amend any provision of the Constitution including Fundamental Rights, but it cannot damage or destroy the basic structure or essential features of the Constitution.</p>
            
            <h3>BASIC STRUCTURE INCLUDES:</h3>
            <ul>
              <li>Supremacy of the Constitution</li>
              <li>Republican and democratic form of government</li>
              <li>Secular character of the Constitution</li>
              <li>Separation of powers between the legislature, executive and judiciary</li>
              <li>Federal character of the Constitution</li>
            </ul>
          </div>
        `,
        court: 'Supreme Court of India',
        date: '24-04-1973',
        citation: 'AIR 1973 SC 1461',
        judges: ['Justice S.M. Sikri', 'Justice J.M. Shelat', 'Justice A.N. Grover'],
        acts_mentioned: [
          'Constitution of India - Article 368',
          'Constitution of India - Article 13',
          'Constitution of India - Part III (Fundamental Rights)'
        ],
        cases_cited: [
          {
            title: 'Golaknath vs State Of Punjab (1967)',
            tid: '1967_SC_1643'
          },
          {
            title: 'Shankari Prasad vs Union of India (1951)',
            tid: '1951_SC_458'
          }
        ]
      }

      return mockDocument
    } catch (error) {
      console.error('Error fetching Indian Kanoon document:', error)
      return null
    }
  }

  /**
   * Search by citation
   * @param citation - Legal citation (e.g., "AIR 1973 SC 1461", "2015 (10) SCC 1")
   */
  async searchByCitation(citation: string): Promise<IndianKanoonDocument | null> {
    try {
      // In production, use actual API call
      // Mock implementation
      if (citation.includes('1973 SC 1461') || citation.includes('AIR 1973')) {
        return this.getDocument('1973_SC_1461')
      }

      return null
    } catch (error) {
      console.error('Error searching by citation:', error)
      return null
    }
  }

  /**
   * Get related judgments
   */
  async getRelatedJudgments(tid: string, limit: number = 5): Promise<IndianKanoonSearchResult[]> {
    try {
      // Mock implementation
      return [
        {
          tid: '1967_SC_1643',
          title: 'Golaknath vs State Of Punjab (1967)',
          headline: 'Parliament cannot amend Fundamental Rights',
          court: 'Supreme Court of India',
          date: '27-02-1967',
          citation: 'AIR 1967 SC 1643',
          url: 'https://indiankanoon.org/doc/120358/',
          relevance_score: 0.88
        }
      ]
    } catch (error) {
      console.error('Error fetching related judgments:', error)
      return []
    }
  }

  /**
   * Search judgments by IPC section
   * @param section - IPC section number (e.g., "420", "302")
   */
  async searchByIPCSection(section: string): Promise<IndianKanoonSearchResult[]> {
    const query = `Section ${section} Indian Penal Code`
    return this.searchJudgments(query)
  }

  /**
   * Search judgments by topic/subject
   */
  async searchByTopic(topic: string): Promise<IndianKanoonSearchResult[]> {
    return this.searchJudgments(topic)
  }

  /**
   * Get Supreme Court judgments only
   */
  async searchSupremeCourt(query: string): Promise<IndianKanoonSearchResult[]> {
    return this.searchJudgments(query, { court: 'Supreme Court' })
  }

  /**
   * Get High Court judgments
   */
  async searchHighCourt(
    query: string,
    highCourtName?: string
  ): Promise<IndianKanoonSearchResult[]> {
    const courtFilter = highCourtName || 'High Court'
    return this.searchJudgments(query, { court: courtFilter })
  }
}

export const indianKanoonService = new IndianKanoonService()
