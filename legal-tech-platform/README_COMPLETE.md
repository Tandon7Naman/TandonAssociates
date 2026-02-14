# 🏛️ Tandon Associates - Indian Legal Management Platform

## 🌟 Overview

**Tandon Associates** is a comprehensive AI-powered legal management platform specifically designed for the **Indian legal ecosystem**. Unlike generic legal tech platforms, this system is built from the ground up with features tailored for Indian lawyers, law firms, corporate legal departments, and legal professionals.

## 🇮🇳 **INDIAN LEGAL SYSTEM FEATURES** (Unique Selling Points)

### **1. eCourts Integration** 
- ✅ **CNR-based Case Tracking** - Track cases using 16-digit Case Number Record
- ✅ **Automated Causelist Fetching** - Get daily cause lists from Indian courts
- ✅ **Court Hierarchy Support** - Supreme Court → High Courts → District Courts
- ✅ **Real-time Case Status** - Sync case status from eCourts Services

### **2. Indian Legal Research** 
- ✅ **Indian Kanoon Integration** - Search India's largest free case law database
- ✅ **Citation Search** - Find cases by AIR, SCC, citation format
- ✅ **IPC Section Search** - Search judgments by Indian Penal Code sections
- ✅ **Judgment Analysis** - AI-powered analysis of court judgments
- ✅ **Precedent Discovery** - Find related case laws automatically

### **3. Indian Compliance Automation** 
- ✅ **Companies Act 2013** compliance tracking
- ✅ **GST Compliance** calendar and form management
- ✅ **SEBI Regulations** for listed companies
- ✅ **RBI Guidelines** for financial compliance
- ✅ **Labour Law Compliance** (PF, ESI, Shops & Establishments)
- ✅ **State-wise Compliance** - Different rules for each state

### **4. Indian Legal Documents**
- ✅ **Vakalatnama** - Power of Attorney for court proceedings
- ✅ **Affidavits** - Proper Indian court format
- ✅ **Writ Petitions** - Habeas Corpus, Mandamus, Certiorari, etc.
- ✅ **Stamp Duty Calculator** - State-wise stamp duty calculation
- ✅ **Notarization Tracking** - Track notarized documents

### **5. Advocate Management**
- ✅ **Bar Council Enrollment** tracking
- ✅ **AOR Status** - Advocate on Record for Supreme Court
- ✅ **Practice Areas** management
- ✅ **Court Enrollment** - Track which courts advocate can practice in

## 🚀 **Complete Feature Set**

### **Core Modules**

#### **1. Contract Lifecycle Management (CLM)**
- 8-stage contract workflow (Initiation → Expiry)
- AI-powered contract analysis
- Risk scoring and compliance checking
- Digital signatures (e-Sign integration ready)
- Template library with Indian contract formats
- Renewal and expiry notifications
- Version control and audit trail

#### **2. Case Management & Litigation**
- Complete case lifecycle tracking
- Digital case files
- Court proceeding records
- Document management
- Hearing reminders
- Judgment tracking
- **Indian-specific**: CNR integration, eCourts sync, Vakalatnama tracking

#### **3. Compliance Management**
- Regulatory compliance tracking
- Audit management (Internal/External)
- Compliance calendar
- Evidence documentation
- Risk assessment
- **Indian-specific**: MCA, GST, SEBI, RBI, Labour Laws

#### **4. Legal Research**
- **Indian Kanoon** search integration
- **eCourts** case search
- Citation lookup
- IPC section-based search
- Supreme Court & High Court judgments
- Case law database
- Precedent analysis

#### **5. Document Management**
- Centralized document repository
- AI-powered document extraction
- OCR for scanned documents
- Version control
- Secure storage
- Document categorization

#### **6. AI Legal Assistant** (Coming Soon)
- Contract review and analysis
- Risk identification
- Legal research assistance
- Document summarization
- Precedent suggestions
- Compliance recommendations

### **Dashboard Features**
- Real-time statistics
- Upcoming deadlines
- Recent activities
- Court calendar
- Compliance status
- Quick actions

### **User Management**
- Role-based access control (ADMIN, USER, VIEWER)
- Team collaboration
- Activity logging
- Secure authentication

## 🏗️ **Technology Stack**

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library

### **Backend**
- **Next.js API Routes** - Serverless API
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Primary database

### **AI & Integration**
- **OpenAI API** - AI-powered features
- **LangChain** - AI orchestration
- **Indian Kanoon API** - Legal research
- **eCourts Services** - Court integration

### **Authentication & Security**
- **NextAuth.js v5** - Secure authentication
- **bcryptjs** - Password hashing
- **JWT** - Token-based auth

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ installed
- PostgreSQL database (or Supabase account)
- Git installed

### **Quick Start**

```bash
# 1. Clone repository
cd /home/user/webapp/legal-tech-platform

# 2. Install dependencies (with 300s timeout)
npm install

# 3. Setup environment variables
cp .env.example .env.local

# Edit .env.local with your credentials:
# DATABASE_URL="postgresql://user:password@localhost:5432/legaltech"
# NEXTAUTH_SECRET="your-secret-here"
# NEXTAUTH_URL="http://localhost:3000"
# OPENAI_API_KEY="sk-your-key" # Optional
# INDIAN_KANOON_API_KEY="your-key" # Optional

# 4. Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# 5. Run development server
npm run dev
```

Visit: **http://localhost:3000**

### **Using Supabase (Recommended for Quick Start)**

1. **Create Supabase Account**: https://supabase.com
2. **Create New Project**
3. **Get Database URL**: Settings → Database → Connection String (URI)
4. **Update `.env.local`**:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

## 📚 **Database Schema**

### **Core Models**
- **User** - Authentication and user management
- **Contract** - Contract lifecycle management
- **Case** - Legal case management
- **Compliance** - Regulatory compliance tracking
- **Document** - File management

### **Indian-Specific Models**
- **IndianCourt** - Court hierarchy (SC, HC, District Courts)
- **IndianCourtCase** - Indian court case with CNR tracking
- **CauseList** - Daily court cause lists
- **IndianCourtProceeding** - Court proceedings and orders
- **CourtOrder** - Court orders and judgments
- **IndianCaseLaw** - Case law database
- **BareAct** - Indian Acts and legislation
- **ActSection** - Specific act sections with penalties
- **IndianCompliance** - Indian-specific compliance
- **IndianLegalDocument** - Indian legal document templates
- **Advocate** - Lawyer/Advocate management
- **LegalTemplate** - Legal document templates

## 🔌 **API Endpoints**

### **Indian Legal Research**
```typescript
// General Search
GET /api/indian-research?action=search&query=kesavananda+bharati

// Citation Search
GET /api/indian-research?action=searchByCitation&citation=AIR+1973+SC+1461

// IPC Section Search
GET /api/indian-research?action=searchByIPCSection&section=420

// Get Full Judgment
GET /api/indian-research?action=getDocument&tid=1973_SC_1461
```

### **eCourts Integration**
```typescript
// Search by CNR
GET /api/ecourts?action=searchByCNR&cnr=DLCT010123456789

// Get Cause List
GET /api/ecourts?action=getCauseList&courtCode=DL01&date=2024-12-15

// Get Case History
GET /api/ecourts?action=getCaseHistory&cnr=DLCT010123456789

// Search by Party Name
GET /api/ecourts?action=searchByPartyName&partyName=John+Doe&courtCode=DL01
```

### **Dashboard API**
```typescript
GET /api/dashboard - Get dashboard statistics
GET /api/contracts - List all contracts
GET /api/cases - List all cases
GET /api/compliance - List compliance items
```

## 🎯 **Usage Guide**

### **1. Legal Research**
1. Navigate to **Dashboard → Legal Research**
2. Choose search type:
   - **General Search**: Case name, topic, article
   - **Citation**: AIR, SCC citations
   - **IPC Section**: Criminal law sections
   - **CNR**: eCourts case number
3. View results with AI-powered relevance ranking
4. Click on case to view full judgment

### **2. Case Management**
1. Go to **Dashboard → Cases**
2. Click "New Case"
3. **For Indian Court Cases**:
   - Enter CNR number
   - System auto-fetches case details from eCourts
   - Track hearings with automated causelist updates
   - Record proceedings and orders
4. Attach documents and track activities

### **3. Contract Management**
1. Navigate to **Dashboard → Contracts**
2. Create new contract
3. AI analyzes for:
   - Key terms and obligations
   - Risk factors
   - Compliance requirements
   - Red flags
4. Track through 8-stage lifecycle

### **4. Compliance Tracking**
1. Go to **Dashboard → Compliance**
2. Add Indian compliance requirements:
   - Companies Act forms (MGT-7, ADT-1, etc.)
   - GST returns (GSTR-1, GSTR-3B)
   - RBI/SEBI filings
3. Set due dates and get automated reminders
4. Track filing status and acknowledgments

## 🔐 **Security Features**

- **NextAuth.js** - Industry-standard authentication
- **Password Hashing** - bcryptjs with salt
- **Role-Based Access** - ADMIN, USER, VIEWER roles
- **Activity Logging** - Complete audit trail
- **Secure API Routes** - Protected endpoints
- **CSRF Protection** - Built-in Next.js security
- **SQL Injection Prevention** - Prisma ORM parameterized queries

## 🚀 **Deployment**

### **Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### **Option 2: Docker**
```bash
# Build image
docker build -t tandon-associates .

# Run container
docker run -p 3000:3000 tandon-associates
```

### **Option 3: Traditional Hosting**
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🌐 **Environment Variables**

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI Features (Optional)
OPENAI_API_KEY="sk-..."

# Indian Legal APIs (Optional)
INDIAN_KANOON_API_KEY="..."
ECOURTS_API_KEY="..."

# Email (Optional)
RESEND_API_KEY="..."
```

## 📈 **Roadmap**

### **Phase 1: Core Platform** ✅ COMPLETED
- [x] Authentication system
- [x] Database schema
- [x] Basic CRUD operations
- [x] Dashboard UI

### **Phase 2: Indian Legal Integration** ✅ COMPLETED
- [x] eCourts integration
- [x] Indian Kanoon search
- [x] CNR tracking
- [x] Indian compliance models

### **Phase 3: AI Features** 🚧 IN PROGRESS
- [ ] Contract analysis AI
- [ ] Legal document summarization
- [ ] Precedent recommendation
- [ ] Risk assessment AI

### **Phase 4: Advanced Features** 📋 PLANNED
- [ ] Bilingual support (English + Hindi)
- [ ] Mobile app (React Native)
- [ ] WhatsApp notifications
- [ ] Voice-to-text for dictation
- [ ] Blockchain-based document verification

### **Phase 5: Scaling** 📋 PLANNED
- [ ] Multi-tenancy
- [ ] API marketplace
- [ ] Third-party integrations
- [ ] White-label solution

## 🆘 **Support & Resources**

### **Indian Legal Resources**
- **Indian Kanoon**: https://indiankanoon.org/
- **eCourts Services**: https://services.ecourts.gov.in/
- **Supreme Court of India**: https://main.sci.gov.in/
- **Bare Acts**: https://legislative.gov.in/

### **Technical Documentation**
- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **shadcn/ui**: https://ui.shadcn.com/

### **Contact**
- **GitHub**: [Your Repository URL]
- **Email**: support@tandonassociates.com
- **Website**: https://tandonassociates.com

## 📄 **License**

MIT License - Free for personal and commercial use

---

**Built with ❤️ for the Indian Legal Community**

*Last Updated: December 2025*
*Version: 1.0.0*
