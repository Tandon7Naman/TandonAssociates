# Backend API Documentation

## Authentication
All API endpoints require authentication via NextAuth session.

## Endpoints

### 1. Contracts API
- **GET** `/api/contracts` - List all contracts
  - Query params: `status`, `type`, `search`
  - Returns: Array of contracts with user details

- **POST** `/api/contracts` - Create new contract
  - Body: `{ title, type, party1, party2, startDate, endDate, value, description, terms, jurisdiction, governingLaw, status }`
  - Returns: Created contract

- **GET** `/api/contracts/[id]` - Get contract details
  - Returns: Contract with clauses, documents, comments, workflows

- **PUT** `/api/contracts/[id]` - Update contract
  - Body: Same as POST
  - Returns: Updated contract

- **DELETE** `/api/contracts/[id]` - Delete contract
  - Returns: Success message

### 2. Cases API
- **GET** `/api/cases` - List all cases
  - Query params: `status`, `search`
  - Returns: Array of cases with proceedings and documents

- **POST** `/api/cases` - Create new case
  - Body: `{ title, caseNumber, type, status, court, judge, filingDate, nextHearing, description, plaintiff, defendant }`
  - Returns: Created case

### 3. Compliance API
- **GET** `/api/compliance` - List compliance items
  - Query params: `status`, `category`
  - Returns: Array of compliance items with recent audits

- **POST** `/api/compliance` - Create compliance item
  - Body: `{ title, category, requirement, status, priority, dueDate, description, regulation, jurisdiction }`
  - Returns: Created compliance item

### 4. Documents API
- **GET** `/api/documents` - List all documents
  - Query params: `type`, `search`
  - Returns: Array of documents with related contract/case

- **POST** `/api/documents` - Upload document metadata
  - Body: `{ name, type, fileUrl, fileSize, mimeType, description, contractId, caseId }`
  - Returns: Created document record

### 5. Analytics API
- **GET** `/api/analytics` - Get analytics data
  - Returns: Overview stats, charts data, trends, activity feed

### 6. Dashboard API
- **GET** `/api/dashboard` - Get dashboard data
  - Returns: Stats, recent contracts, recent cases, upcoming deadlines, activities, notifications

### 7. Notifications API
- **GET** `/api/notifications` - Get notifications
  - Returns: Notifications array and unread count

- **PUT** `/api/notifications` - Mark as read
  - Body: `{ notificationId }` or `{ markAllAsRead: true }`
  - Returns: Success message

### 8. Activities API
- **GET** `/api/activities` - Get activity log
  - Returns: Array of activities with related entities

## Data Models

### Contract
- title, type, status, party1, party2
- startDate, endDate, value
- description, terms, jurisdiction, governingLaw
- currentStage, riskScore, complianceScore
- Related: clauses, documents, comments, workflows

### Case
- title, caseNumber, type, status
- court, judge, plaintiff, defendant
- filingDate, nextHearing
- Related: proceedings, documents

### Compliance
- title, category, requirement, status, priority
- dueDate, regulation, jurisdiction
- Related: audits

### Document
- name, type, fileUrl, fileSize, mimeType
- Related: contract, case

### Activity
- type, description, createdAt
- Related: user, contract, case, compliance, document

## Error Responses
- 401: Unauthorized (no session)
- 404: Resource not found
- 400: Bad request (missing required fields)
- 500: Server error

## Success Responses
- 200: Success with data
- 201: Resource created
