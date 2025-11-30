# 🚀 Supabase Setup - Step by Step

## Step 1: Create Supabase Account

### 1.1 Go to Supabase
- Open: https://supabase.com
- Click "Start your project"

### 1.2 Sign Up
- Click "Sign up"
- Use email or GitHub
- Verify email

### 1.3 Create Organization
- Enter organization name
- Click "Create organization"

---

## Step 2: Create New Project

### 2.1 Create Project
- Click "New project"
- Select your organization

### 2.2 Configure Project
- **Project name**: legal-tech-db
- **Database password**: Create strong password (save it!)
- **Region**: Choose closest to you
- Click "Create new project"

### 2.3 Wait for Setup
- Wait 2-3 minutes for database to initialize
- You'll see "Your project is ready"

---

## Step 3: Get Connection String

### 3.1 Go to Settings
- Click "Settings" (bottom left)
- Click "Database"

### 3.2 Find Connection String
- Look for "Connection string"
- Click "URI" tab
- Copy the connection string

### 3.3 Connection String Format
```
postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
```

**Example:**
```
postgresql://postgres:MyPassword123@db.supabase.co:5432/postgres
```

---

## Step 4: Update .env.local

### 4.1 Open .env.local
- File location: `N:\Website\legal-tech-platform\.env.local`

### 4.2 Update DATABASE_URL
Replace:
```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

With your Supabase connection string:
```
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:5432/postgres"
```

### 4.3 Verify Other Variables
```
NEXTAUTH_URL="https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="sk-your-key"
```

### 4.4 Save File
- Save .env.local

---

## Step 5: Run Migrations

### 5.1 Open Terminal
- Open command prompt/terminal
- Navigate to project:
```bash
cd N:\Website\legal-tech-platform
```

### 5.2 Generate Prisma Client
```bash
npx prisma generate
```

### 5.3 Run Migrations
```bash
npx prisma migrate deploy
```

### 5.4 Expected Output
```
✓ Ran 1 migration
```

---

## Step 6: Verify Database

### 6.1 Check Supabase
- Go back to Supabase dashboard
- Click "SQL Editor"
- Run query:
```sql
SELECT * FROM "User";
```

### 6.2 Should Show
- Empty table (no users yet)
- This means database is connected!

---

## Step 7: Push to GitHub

### 7.1 Commit Changes
```bash
git add .env.local
git commit -m "🔧 Update database connection to Supabase"
```

### 7.2 Push to GitHub
```bash
git push origin main
```

### 7.3 Vercel Auto-Deploys
- Vercel will automatically redeploy
- Wait 2-3 minutes
- Check deployment status

---

## Step 8: Test Registration

### 8.1 Go to Registration
- https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/register

### 8.2 Fill Form
```
Name:     Test User
Email:    test@tandonassociates.com
Password: Test@1234
```

### 8.3 Click "Sign Up"
- Should succeed!
- You'll be redirected to login

### 8.4 Login
- https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/login
- Email: test@tandonassociates.com
- Password: Test@1234
- Click "Sign In"

### 8.5 Dashboard Loads
- You're in! 🎉

---

## ✅ Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Got connection string
- [ ] Updated .env.local
- [ ] Ran migrations
- [ ] Pushed to GitHub
- [ ] Vercel deployed
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard loads

---

## 🆘 Troubleshooting

### "Connection refused"
- Check DATABASE_URL is correct
- Check password is correct
- Wait 5 minutes for Supabase to initialize

### "Migration failed"
- Check DATABASE_URL format
- Check password has no special characters that need escaping
- Try running: `npx prisma db push`

### "Still getting 500 error"
- Clear browser cache
- Wait 5 minutes for Vercel to redeploy
- Check Vercel deployment logs

### "Can't login after registration"
- Check email is correct
- Check password is correct
- Try registering again with different email

---

## 📊 Summary

| Step | Action | Status |
|------|--------|--------|
| 1 | Create Supabase account | ✅ |
| 2 | Create project | ✅ |
| 3 | Get connection string | ✅ |
| 4 | Update .env.local | ✅ |
| 5 | Run migrations | ✅ |
| 6 | Verify database | ✅ |
| 7 | Push to GitHub | ✅ |
| 8 | Test registration | ✅ |

---

## 🔗 Links

- **Supabase**: https://supabase.com
- **Registration**: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/register
- **Login**: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/login
- **GitHub**: https://github.com/Tandon7Naman/TandonAssociates

---

**Follow these steps and your database will be connected! 🚀**
