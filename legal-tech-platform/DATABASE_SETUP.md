# Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: legal-tech-platform
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to you
   - **Plan**: Free tier is perfect for development

## Step 2: Get Database Connection String

1. Once project is created, go to **Settings** → **Database**
2. Scroll down to **Connection String** section
3. Select **URI** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

## Step 3: Configure Environment Variables

Create or update `.env.local` file in your project root with:

```env
# Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI (optional for now)
OPENAI_API_KEY="your-openai-key-here"
```

**To generate NEXTAUTH_SECRET:**
Run this command in terminal:
```bash
openssl rand -base64 32
```

Or use Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 4: Push Database Schema to Supabase

Once you've configured `.env.local`, run:

```bash
npx prisma db push
```

This will:
- Connect to your Supabase database
- Create all tables from your Prisma schema
- Set up relationships and indexes

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

## Step 6: (Optional) View Database in Prisma Studio

```bash
npx prisma studio
```

This opens a visual database browser at http://localhost:5555

## Step 7: Test Database Connection

Try creating a contract through the UI:
1. Go to http://localhost:3000/dashboard/contracts/new
2. Fill in the form
3. Click "Create Contract"
4. Should redirect to the contract detail page

## Troubleshooting

### Connection Timeout
- Check your DATABASE_URL is correct
- Ensure your IP is allowed (Supabase: Settings → Database → Connection Pooling)

### SSL Error
Add `?sslmode=require` to end of DATABASE_URL:
```
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?sslmode=require"
```

### Schema Sync Issues
If you make changes to `prisma/schema.prisma`:
```bash
npx prisma db push
npx prisma generate
```

## Alternative: Local PostgreSQL

If you prefer local development:

1. Install PostgreSQL locally
2. Create database: `createdb legal_tech`
3. Update `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/legal_tech"
   ```
4. Run `npx prisma db push`

## Next Steps

Once database is connected:
1. ✅ Test contract creation
2. ✅ Test user registration/login
3. ✅ Verify data appears in Supabase dashboard
4. 🚀 Ready for OpenAI integration!
