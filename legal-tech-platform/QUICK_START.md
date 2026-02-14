# 🚀 QUICK START GUIDE - Tandon Associates

## ⚡ Get Started in 5 Minutes

### **Step 1: Database Setup** (2 minutes)

**Option A: Supabase (Recommended - Free & Easy)**

1. Go to https://supabase.com and create account
2. Create new project (choose any name)
3. Wait 2 minutes for project to be ready
4. Go to: **Settings → Database → Connection String**
5. Copy the **URI** (not Transaction or Session)
6. Your URL looks like: `postgresql://postgres.xxx:[PASSWORD]@xxx.supabase.co:5432/postgres`

**Option B: Local PostgreSQL**
```bash
# Install PostgreSQL
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt install postgresql-15
sudo systemctl start postgresql

# Create database
createdb legaltech
```

### **Step 2: Environment Variables** (1 minute)

```bash
# In /home/user/webapp/legal-tech-platform directory
cp .env.example .env.local

# Edit .env.local - Add these values:
```

```env
# REQUIRED - Get from Supabase or use local PostgreSQL
DATABASE_URL="postgresql://postgres:[PASSWORD]@xxx.supabase.co:5432/postgres"

# REQUIRED - Generate random string
NEXTAUTH_SECRET="run-this-command-to-generate: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# OPTIONAL - For AI features (can add later)
OPENAI_API_KEY="sk-your-key-here"
INDIAN_KANOON_API_KEY="your-key-here"
```

### **Step 3: Install & Run** (2 minutes)

```bash
cd /home/user/webapp/legal-tech-platform

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema (creates all tables)
npx prisma db push

# Start development server
npm run dev
```

### **Step 4: Open Browser**

Visit: **http://localhost:3000**

---

## 🎯 **What to Test First**

### **1. Create Account**
- Click "Get Started" or "Register"
- Enter: name, email, password
- Login with credentials

### **2. Explore Dashboard**
- See overview statistics
- Quick action buttons

### **3. Try Legal Research** 🆕 (NEW FEATURE)
- Click **"Legal Research"** in sidebar (NEW badge)
- Try these searches:

**General Search**:
- Search: `Kesavananda Bharati`
- Search: `Article 21 Right to Life`
- Search: `Right to Privacy`

**Citation Search**:
- Enter: `AIR 1973 SC 1461`
- Enter: `2015 (10) SCC 1`

**IPC Section Search**:
- Enter: `420` (cheating)
- Enter: `302` (murder)
- Enter: `498A` (dowry harassment)

**CNR Search** (eCourts):
- Enter any 16-digit CNR: `DLCT010123456789`
- (Mock data for demo)

### **4. Create a Contract**
- Dashboard → Contracts → New Contract
- Fill in details
- Save

### **5. Create a Case**
- Dashboard → Cases → New Case
- Fill in details
- **TIP**: Add CNR number for Indian court integration
- Save

---

## 📚 **Key Features to Explore**

### **Indian Legal Research** 🇮🇳
- **4 search types**: General, Citation, IPC, CNR
- **Indian Kanoon** integration: 10M+ judgments
- **eCourts** integration: Live court data
- **Full judgment viewer**: Read complete judgments
- **Quick links**: Indian Kanoon, eCourts, Supreme Court

### **Contract Management**
- 8-stage lifecycle
- AI analysis (coming soon)
- Risk scoring
- Renewal tracking

### **Case Management**
- Indian court tracking
- CNR integration
- Hearing reminders
- Document management

### **Compliance Tracking**
- Indian regulations (GST, Companies Act, SEBI)
- Due date tracking
- Automated reminders

---

## 🐛 **Troubleshooting**

### **Database Connection Error**
```bash
# Verify DATABASE_URL in .env.local
# Make sure it's a valid PostgreSQL URL
# Try: npx prisma db push --force-reset
```

### **Port 3000 Already in Use**
```bash
# Kill existing process
fuser -k 3000/tcp

# Or use different port
npm run dev -- -p 3001
```

### **Module Not Found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### **Prisma Client Not Generated**
```bash
npx prisma generate
```

---

## 🎨 **UI Overview**

### **Homepage** (`/`)
- Beautiful landing page
- Feature showcase
- Call-to-action buttons

### **Dashboard** (`/dashboard`)
- Statistics cards
- Recent contracts
- Upcoming deadlines
- Quick actions

### **Legal Research** (`/dashboard/research`) 🆕
- Multi-tab search interface
- Real-time results
- Case details viewer
- Quick resource links

### **Contracts** (`/dashboard/contracts`)
- List all contracts
- Create new
- 8-stage workflow

### **Cases** (`/dashboard/cases`)
- List all cases
- Indian court integration
- CNR tracking

### **Compliance** (`/dashboard/compliance`)
- Indian regulatory tracking
- GST, Companies Act, SEBI
- Due date calendar

---

## 📊 **Sample Data to Test**

### **Test Contract**
- Title: "Vendor Service Agreement"
- Type: SERVICE_AGREEMENT
- Party A: "Your Company"
- Party B: "Acme Corp"
- Value: 50000
- Currency: INR

### **Test Case**
- Case Number: "CS 123/2024"
- Title: "Contract Dispute"
- Type: CIVIL
- Court: "Delhi High Court"
- CNR: "DLHC010234567890123"
- Petitioner: "ABC Corp"
- Respondent: "XYZ Ltd"

### **Test Compliance**
- Title: "Annual GST Return GSTR-9"
- Type: GST
- Regulation: "GST Act"
- Authority: "GST Council"
- Due Date: "31-Dec-2024"

---

## 🔑 **Environment Variables Explained**

```env
# === REQUIRED ===

# PostgreSQL database connection
DATABASE_URL="postgresql://user:password@host:5432/database"

# Secret for JWT tokens (generate random 32-char string)
NEXTAUTH_SECRET="your-secret-here"

# Your app URL
NEXTAUTH_URL="http://localhost:3000"  # Dev
# NEXTAUTH_URL="https://yourdomain.com"  # Production


# === OPTIONAL ===

# OpenAI for AI features (contract analysis, summarization)
OPENAI_API_KEY="sk-..."

# Indian Kanoon for legal research (free tier available)
INDIAN_KANOON_API_KEY="..."

# eCourts API (register at services.ecourts.gov.in)
ECOURTS_API_KEY="..."

# Email service (for notifications)
RESEND_API_KEY="..."
```

---

## 🚢 **Production Deployment**

### **Vercel (Recommended - 5 minutes)**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Follow prompts
# 5. Add environment variables in Vercel dashboard

# 6. Redeploy
vercel --prod
```

### **Environment Variables in Vercel**
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all variables from `.env.local`
5. Redeploy

---

## 📖 **Documentation**

- **Complete Guide**: `README_COMPLETE.md`
- **Expert Analysis**: `EXPERT_ANALYSIS_REPORT.md`
- **Database Schema**: `prisma/schema.prisma`
- **API Routes**: `app/api/*/route.ts`

---

## 🆘 **Get Help**

### **Documentation**
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Supabase: https://supabase.com/docs

### **Indian Legal Resources**
- Indian Kanoon: https://indiankanoon.org/
- eCourts: https://services.ecourts.gov.in/
- Supreme Court: https://main.sci.gov.in/

---

## ✅ **Checklist**

Before launching:

- [ ] Database setup completed
- [ ] Environment variables configured
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Development server running (`npm run dev`)
- [ ] Can create account and login
- [ ] Legal research working
- [ ] Can create contracts
- [ ] Can create cases
- [ ] UI looks good on mobile

---

**🎉 You're Ready to Go!**

Visit: **http://localhost:3000** and start exploring!

---

*Last Updated: December 2025*  
*Version: 1.0.0*
