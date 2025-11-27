# Legal Tech Platform - Complete Setup Guide

## Prerequisites Installation

### Step 1: Install Node.js (Required)

**Option A: Using Official Installer (Recommended)**
1. Visit: https://nodejs.org/
2. Download: **LTS version** (Long Term Support)
3. Run the installer (.msi file)
4. Accept all defaults
5. Restart PowerShell/Terminal
6. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

**Option B: Using Winget (Windows Package Manager)**
```powershell
winget install OpenJS.NodeJS.LTS
```

### Step 2: Install Git (If not installed)
```powershell
winget install Git.Git
```

---

## Project Setup (After Node.js is Installed)

### 1. Create Next.js Project
```powershell
cd N:\Website
npx create-next-app@latest legal-tech-platform --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted, answer:
- ✔ Would you like to use Turbopack? **No**
- ✔ Would you like to customize the import alias? **No** (we already set it)

### 2. Navigate to Project
```powershell
cd legal-tech-platform
```

### 3. Install shadcn/ui Components
```powershell
# Initialize shadcn/ui
npx shadcn@latest init

# When prompted:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
```

### 4. Install Essential Dependencies
```powershell
# Install core packages
npm install @prisma/client @tanstack/react-query axios date-fns zod react-hook-form @hookform/resolvers

# Install dev dependencies
npm install -D prisma @types/node

# Install shadcn components
npx shadcn@latest add button card input label form select textarea table dropdown-menu dialog sheet badge avatar separator tabs calendar
```

### 5. Install AI & Document Processing
```powershell
npm install openai langchain @langchain/openai pdf-parse pdfjs-dist
```

### 6. Install Authentication
```powershell
npm install next-auth bcryptjs @auth/prisma-adapter
npm install -D @types/bcryptjs
```

### 7. Install Supabase Client (Optional - if using Supabase)
```powershell
npm install @supabase/supabase-js
```

### 8. Initialize Prisma
```powershell
npx prisma init
```

### 9. Setup Environment Variables
Create `.env.local` file in project root:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/legaltech"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OpenAI (for AI features)
OPENAI_API_KEY="your-openai-api-key"

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
```

### 10. Run Development Server
```powershell
npm run dev
```

Visit: http://localhost:3000

---

## Quick Setup Commands (Copy & Paste)

**After Node.js is installed, run these commands:**

```powershell
# Navigate to workspace
cd N:\Website

# Create Next.js project
npx create-next-app@latest legal-tech-platform --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

# Enter project
cd legal-tech-platform

# Initialize shadcn/ui
npx shadcn@latest init -d

# Install all dependencies at once
npm install @prisma/client @tanstack/react-query axios date-fns zod react-hook-form @hookform/resolvers next-auth bcryptjs @auth/prisma-adapter openai langchain @langchain/openai pdf-parse pdfjs-dist @supabase/supabase-js

# Install dev dependencies
npm install -D prisma @types/node @types/bcryptjs

# Initialize Prisma
npx prisma init

# Install essential shadcn components
npx shadcn@latest add button card input label form select textarea table dropdown-menu dialog sheet badge avatar separator tabs calendar toast

# Start dev server
npm run dev
```

---

## Alternative: Using Supabase (Simpler Backend)

If you want to skip local database setup:

1. Visit https://supabase.com/
2. Create free account
3. Create new project
4. Get your connection string from Settings → Database
5. Use Supabase connection string in `.env.local`

**Supabase gives you:**
- PostgreSQL database (500MB free)
- Authentication built-in
- File storage (1GB free)
- Real-time subscriptions
- Auto-generated APIs

---

## Troubleshooting

### "npx is not recognized"
- Node.js is not installed or not in PATH
- Restart PowerShell after installing Node.js

### "prisma command not found"
```powershell
npm install -D prisma
npx prisma --version
```

### Port 3000 already in use
```powershell
# Use different port
npm run dev -- -p 3001
```

### Database connection errors
- Make sure PostgreSQL is running
- Or use Supabase (easier)
- Check DATABASE_URL in `.env.local`

---

## Next Steps After Setup

1. **Design Database Schema** (see schema.prisma file we'll create)
2. **Build Authentication** (login/signup pages)
3. **Create Dashboard** (main layout)
4. **Add Contract Management** (CRUD operations)
5. **Integrate AI** (OpenAI for contract analysis)
6. **Add Document Upload** (PDF parsing)
7. **Deploy** (Vercel - free)

---

## Project Structure

```
legal-tech-platform/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, register)
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── contracts/       # Contract management
│   │   ├── cases/           # Case management
│   │   ├── compliance/      # Compliance tracking
│   │   └── layout.tsx       # Dashboard layout
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── contracts/       # Contract APIs
│   │   └── ai/              # AI endpoints
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn components
│   ├── contracts/           # Contract components
│   ├── dashboard/           # Dashboard components
│   └── layout/              # Layout components
├── lib/                     # Utilities
│   ├── db.ts               # Prisma client
│   ├── auth.ts             # Auth config
│   ├── openai.ts           # OpenAI client
│   └── utils.ts            # Helper functions
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                  # Static files
├── .env.local              # Environment variables
├── next.config.js          # Next.js config
├── tailwind.config.ts      # Tailwind config
└── package.json            # Dependencies
```

---

## Free Services to Sign Up For

1. **Supabase** - https://supabase.com/ (Database + Auth + Storage)
2. **Vercel** - https://vercel.com/ (Hosting)
3. **OpenAI** - https://platform.openai.com/ (AI features, $5 free credit)
4. **Resend** - https://resend.com/ (Email, 3K/month free)
5. **GitHub** - https://github.com/ (Version control)

---

## Estimated Setup Time
- **Prerequisites installation:** 10-15 minutes
- **Project setup:** 5-10 minutes
- **Dependencies installation:** 5 minutes
- **Configuration:** 10 minutes
- **Total:** 30-40 minutes

---

**Ready to continue? Install Node.js first, then we'll build the entire application!**
