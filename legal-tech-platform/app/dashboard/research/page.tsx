'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Scale, BookOpen, Gavel, FileText, ExternalLink, Calendar } from 'lucide-react'
import { toast } from 'sonner'

interface SearchResult {
  tid: string
  title: string
  headline: string
  court: string
  date: string
  citation?: string
  url: string
  relevance_score?: number
}

export default function IndianResearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [citation, setCitation] = useState('')
  const [ipcSection, setIpcSection] = useState('')
  const [cnrNumber, setCnrNumber] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCase, setSelectedCase] = useState<any>(null)

  const handleGeneralSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/indian-research?action=search&query=${encodeURIComponent(searchQuery)}`
      )
      const data = await response.json()
      setSearchResults(data)
      toast.success(`Found ${data.length} results`)
    } catch (error) {
      toast.error('Error searching cases')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCitationSearch = async () => {
    if (!citation.trim()) {
      toast.error('Please enter a citation')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/indian-research?action=searchByCitation&citation=${encodeURIComponent(citation)}`
      )
      
      if (response.ok) {
        const data = await response.json()
        setSelectedCase(data)
        toast.success('Case found')
      } else {
        toast.error('Case not found')
      }
    } catch (error) {
      toast.error('Error searching citation')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleIPCSearch = async () => {
    if (!ipcSection.trim()) {
      toast.error('Please enter IPC section number')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/indian-research?action=searchByIPCSection&section=${encodeURIComponent(ipcSection)}`
      )
      const data = await response.json()
      setSearchResults(data)
      toast.success(`Found ${data.length} results for IPC Section ${ipcSection}`)
    } catch (error) {
      toast.error('Error searching IPC section')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCNRSearch = async () => {
    if (!cnrNumber.trim()) {
      toast.error('Please enter CNR number')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/ecourts?action=searchByCNR&cnr=${encodeURIComponent(cnrNumber)}`
      )
      const data = await response.json()
      setSelectedCase(data)
      toast.success('Case details fetched from eCourts')
    } catch (error) {
      toast.error('Error fetching case from eCourts')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const viewCaseDetails = async (tid: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/indian-research?action=getDocument&tid=${tid}`)
      const data = await response.json()
      setSelectedCase(data)
    } catch (error) {
      toast.error('Error fetching case details')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Scale className="h-8 w-8 text-blue-600" />
            Indian Legal Research
          </h1>
          <p className="text-muted-foreground mt-1">
            Search Indian case laws, judgments, and court records from Supreme Court, High Courts, and eCourts
          </p>
        </div>
      </div>

      {/* Search Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Legal Research & Case Search
          </CardTitle>
          <CardDescription>
            Search by case name, citation, IPC section, or CNR number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">
                <BookOpen className="h-4 w-4 mr-2" />
                General Search
              </TabsTrigger>
              <TabsTrigger value="citation">
                <FileText className="h-4 w-4 mr-2" />
                Citation
              </TabsTrigger>
              <TabsTrigger value="ipc">
                <Gavel className="h-4 w-4 mr-2" />
                IPC Section
              </TabsTrigger>
              <TabsTrigger value="cnr">
                <Calendar className="h-4 w-4 mr-2" />
                CNR/eCourts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search cases, judgments, topics (e.g., 'Kesavananda Bharati', 'Article 21', 'Right to Privacy')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGeneralSearch()}
                  className="flex-1"
                />
                <Button onClick={handleGeneralSearch} disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Search Indian Kanoon's database of Supreme Court and High Court judgments</p>
              </div>
            </TabsContent>

            <TabsContent value="citation" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter citation (e.g., 'AIR 1973 SC 1461', '2015 (10) SCC 1')"
                  value={citation}
                  onChange={(e) => setCitation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCitationSearch()}
                  className="flex-1"
                />
                <Button onClick={handleCitationSearch} disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Search by legal citation: AIR, SCC, SC, etc.</p>
              </div>
            </TabsContent>

            <TabsContent value="ipc" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter IPC section (e.g., '420', '302', '498A')"
                  value={ipcSection}
                  onChange={(e) => setIpcSection(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleIPCSearch()}
                  className="flex-1"
                />
                <Button onClick={handleIPCSearch} disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Find judgments related to specific IPC sections</p>
              </div>
            </TabsContent>

            <TabsContent value="cnr" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter CNR Number (16-digit alphanumeric)"
                  value={cnrNumber}
                  onChange={(e) => setCnrNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCNRSearch()}
                  className="flex-1"
                  maxLength={16}
                />
                <Button onClick={handleCNRSearch} disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Search Indian court records using CNR (Case Number Record) from eCourts Services</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result.tid}
                  className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => viewCaseDetails(result.tid)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        {result.title}
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {result.headline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Gavel className="h-3 w-3 mr-1" />
                          {result.court}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {result.date}
                        </Badge>
                        {result.citation && (
                          <Badge variant="secondary" className="text-xs">
                            {result.citation}
                          </Badge>
                        )}
                        {result.relevance_score && (
                          <Badge variant="default" className="text-xs">
                            Relevance: {(result.relevance_score * 100).toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Case Details */}
      {selectedCase && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedCase.title || 'Case Details'}
            </CardTitle>
            {selectedCase.citation && (
              <CardDescription>Citation: {selectedCase.citation}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Court:</p>
                <p className="text-sm text-muted-foreground">{selectedCase.court || selectedCase.court_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date:</p>
                <p className="text-sm text-muted-foreground">{selectedCase.date || selectedCase.filing_date || 'N/A'}</p>
              </div>
              {selectedCase.petitioner && (
                <div>
                  <p className="text-sm font-medium">Petitioner:</p>
                  <p className="text-sm text-muted-foreground">{selectedCase.petitioner}</p>
                </div>
              )}
              {selectedCase.respondent && (
                <div>
                  <p className="text-sm font-medium">Respondent:</p>
                  <p className="text-sm text-muted-foreground">{selectedCase.respondent}</p>
                </div>
              )}
              {selectedCase.cnr_number && (
                <div>
                  <p className="text-sm font-medium">CNR Number:</p>
                  <p className="text-sm text-muted-foreground font-mono">{selectedCase.cnr_number}</p>
                </div>
              )}
              {selectedCase.case_status && (
                <div>
                  <p className="text-sm font-medium">Status:</p>
                  <Badge>{selectedCase.case_status}</Badge>
                </div>
              )}
              {selectedCase.next_hearing_date && (
                <div>
                  <p className="text-sm font-medium">Next Hearing:</p>
                  <p className="text-sm text-muted-foreground">{selectedCase.next_hearing_date}</p>
                </div>
              )}
            </div>

            {selectedCase.doc && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Judgment:</p>
                <div 
                  className="prose prose-sm max-w-none text-sm bg-muted/30 p-4 rounded-lg max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: selectedCase.doc }}
                />
              </div>
            )}

            {selectedCase.url && (
              <div className="flex justify-end">
                <Button variant="outline" asChild>
                  <a href={selectedCase.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Indian Kanoon
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Useful Indian legal resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <a href="https://indiankanoon.org/" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-5 w-5 mb-2" />
                <div className="text-left">
                  <p className="font-semibold">Indian Kanoon</p>
                  <p className="text-xs text-muted-foreground">Free Case Law</p>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <a href="https://services.ecourts.gov.in/" target="_blank" rel="noopener noreferrer">
                <Gavel className="h-5 w-5 mb-2" />
                <div className="text-left">
                  <p className="font-semibold">eCourts</p>
                  <p className="text-xs text-muted-foreground">Court Records</p>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <a href="https://main.sci.gov.in/" target="_blank" rel="noopener noreferrer">
                <Scale className="h-5 w-5 mb-2" />
                <div className="text-left">
                  <p className="font-semibold">Supreme Court</p>
                  <p className="text-xs text-muted-foreground">Official Website</p>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
              <a href="https://legislative.gov.in/" target="_blank" rel="noopener noreferrer">
                <FileText className="h-5 w-5 mb-2" />
                <div className="text-left">
                  <p className="font-semibold">Bare Acts</p>
                  <p className="text-xs text-muted-foreground">Indian Laws</p>
                </div>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
