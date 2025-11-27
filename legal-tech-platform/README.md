# 🏛️ LegalTech Platform

**AI-Powered Legal Operations Platform** for Contract Management, Case Tracking, and Compliance Automation

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
# Copy .env.local and add your credentials

# Start development server
npm run dev
```

Visit **http://localhost:3000**

## ✨ Features

### ✅ Implemented
- 🔐 **Authentication** - Secure login/register with NextAuth.js
- 🎨 **Modern UI** - Tailwind CSS + shadcn/ui components
- 🗄️ **Database** - Prisma ORM with PostgreSQL
- 📱 **Responsive** - Mobile-first design

### 🚧 In Progress
- 📄 **Contract Management** - 8-stage lifecycle management
- 💼 **Case Tracking** - Legal case management
- ✅ **Compliance** - Regulatory tracking
- 🤖 **AI Assistant** - OpenAI-powered analysis

### 📋 Planned
- 📊 **Analytics Dashboard**
- 📧 **Email Notifications**
- 📎 **Document Upload**
- 🔍 **Advanced Search**
- 👥 **Team Collaboration**

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Database:** PostgreSQL + Prisma
- **Auth:** NextAuth.js
- **AI:** OpenAI API (planned)

## 📁 Project Structure

```
legal-tech-platform/
├── app/              # Next.js App Router
│   ├── login/        # Login page
│   ├── register/     # Registration
│   ├── api/          # API routes
│   └── page.tsx      # Homepage
├── components/       # React components
│   └── ui/           # shadcn/ui components
├── lib/              # Utilities
│   ├── prisma.ts     # Database client
│   ├── auth.ts       # Auth config
│   └── utils.ts      # Helpers
├── prisma/
│   └── schema.prisma # Database schema
└── .env.local        # Environment variables
```

## 🗄️ Database Schema

**Core Models:**
- User - Authentication & profiles
- Contract - 8-stage contract lifecycle
- Case - Legal case management
- Compliance - Regulatory tracking
- Document - File management
- Activity - Audit trail

## 🔐 Environment Setup

Create `.env.local`:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/legaltech"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
OPENAI_API_KEY="sk-your-key" # optional
```

## 📦 Commands

```bash
npm run dev          # Start development
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code

npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open database GUI
```

## 🌐 Free Services (Recommended)

1. **Supabase** - Database + Storage (500MB free)
2. **Vercel** - Hosting (unlimited)
3. **OpenAI** - AI API ($5 free credit)
4. **Resend** - Email (3K/month free)

## 📚 Documentation

- [Setup Guide](../SETUP_GUIDE.md) - Detailed installation
- [Business Analysis](../CaseDocker_Business_Analysis.md) - Market research
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)

## 🐛 Troubleshooting

**Port in use?**
```bash
npm run dev -- -p 3001
```

**Database issues?**
```bash
npx prisma generate
npx prisma db push
```

**Module not found?**
```bash
npm install
```

## 🎯 Roadmap

- [x] Phase 1: Project Setup
- [x] Phase 2: Authentication
- [ ] Phase 3: Contract Management
- [ ] Phase 4: AI Integration
- [ ] Phase 5: Case Management
- [ ] Phase 6: Compliance Tracking
- [ ] Phase 7: Production Deployment

## 📄 License

MIT License - Free for personal and commercial use

---

**Status:** 🚧 Active Development  
**Version:** 0.1.0  
**Last Updated:** November 27, 2025

**Live Demo:** Coming soon  
**Server:** http://localhost:3000
