'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FileText,
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  Filter,
  FileArchive,
  FileImage,
  FileSpreadsheet,
} from 'lucide-react'

const mockDocuments = [
  {
    id: '1',
    name: 'Software Development Agreement.pdf',
    type: 'Contract',
    category: 'SERVICE_AGREEMENT',
    size: '245 KB',
    uploadedBy: 'John Smith',
    uploadedAt: '2024-11-27',
    relatedTo: 'Contract #1234',
    tags: ['software', 'development', 'agreement'],
  },
  {
    id: '2',
    name: 'Case Evidence - Photos.zip',
    type: 'Evidence',
    category: 'CASE_DOCUMENTS',
    size: '12.3 MB',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-11-26',
    relatedTo: 'Case #5678',
    tags: ['evidence', 'photos', 'litigation'],
  },
  {
    id: '3',
    name: 'GDPR Compliance Checklist.xlsx',
    type: 'Compliance',
    category: 'COMPLIANCE',
    size: '89 KB',
    uploadedBy: 'Mike Davis',
    uploadedAt: '2024-11-25',
    relatedTo: 'Compliance #GDPR-2024',
    tags: ['gdpr', 'compliance', 'privacy'],
  },
  {
    id: '4',
    name: 'Employment Contract Template.docx',
    type: 'Template',
    category: 'TEMPLATE',
    size: '156 KB',
    uploadedBy: 'John Smith',
    uploadedAt: '2024-11-24',
    relatedTo: null,
    tags: ['template', 'employment', 'hr'],
  },
  {
    id: '5',
    name: 'Court Filing - Motion to Dismiss.pdf',
    type: 'Court Filing',
    category: 'CASE_DOCUMENTS',
    size: '320 KB',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-11-23',
    relatedTo: 'Case #5678',
    tags: ['court', 'motion', 'filing'],
  },
]

const documentCategories = [
  'All Documents',
  'Contracts',
  'Case Documents',
  'Compliance',
  'Templates',
  'Evidence',
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Documents')
  const [documents] = useState(mockDocuments)

  const getFileIcon = (type: string) => {
    if (type.includes('zip')) return <FileArchive className="h-8 w-8 text-orange-500" />
    if (type.includes('xlsx')) return <FileSpreadsheet className="h-8 w-8 text-green-500" />
    if (type.includes('jpg') || type.includes('png')) return <FileImage className="h-8 w-8 text-purple-500" />
    return <FileText className="h-8 w-8 text-blue-500" />
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'All Documents' || doc.type === selectedCategory.slice(0, -1)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Manage all your legal documents in one place
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Documents</p>
              <p className="text-2xl font-bold">{documents.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contracts</p>
              <p className="text-2xl font-bold">
                {documents.filter(d => d.type === 'Contract').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Case Documents</p>
              <p className="text-2xl font-bold">
                {documents.filter(d => d.category === 'CASE_DOCUMENTS').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Storage</p>
              <p className="text-2xl font-bold">13.1 MB</p>
            </div>
            <FileArchive className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents by name or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {documentCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <Card>
        <div className="divide-y">
          {filteredDocuments.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(doc.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{doc.name}</h3>
                      <Badge variant="outline">{doc.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Uploaded by {doc.uploadedBy}</span>
                      <span>•</span>
                      <span>{doc.uploadedAt}</span>
                      {doc.relatedTo && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600">{doc.relatedTo}</span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
