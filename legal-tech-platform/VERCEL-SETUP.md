# Vercel Deployment Configuration for Tandon Associates

## 🚀 Your Deployment URL
https://website1-git-main-tandon7namans-projects.vercel.app/

## ⚠️ CRITICAL: Environment Variables Setup

Go to your Vercel project dashboard and add these environment variables:

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/tandon7namans-projects/website1
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar

### Step 2: Add These Variables

```bash
# Database Connection (Required)
DATABASE_URL=postgresql://postgres:Kameshseema07@db.xlqkucixisobljfhdpfu.supabase.co:5432/postgres

# NextAuth Configuration (Required)
NEXTAUTH_URL=https://website1-git-main-tandon7namans-projects.vercel.app
NEXTAUTH_SECRET=YOUR_GENERATED_SECRET_HERE
AUTH_TRUST_HOST=true

# Optional: For better performance
NEXT_PUBLIC_APP_URL=https://website1-git-main-tandon7namans-projects.vercel.app
```

### Step 3: Generate NEXTAUTH_SECRET

Run this command in your terminal to generate a secure secret:

**PowerShell:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and use it as your `NEXTAUTH_SECRET`

### Step 4: Redeploy

After adding all environment variables:
1. Go to "Deployments" tab
2. Click the three dots (...) on the latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache" (optional, makes it faster)
5. Click "Redeploy"

## 🔧 Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Your Supabase PostgreSQL connection string | Already provided above |
| `NEXTAUTH_URL` | Your production URL (must match exactly) | https://your-app.vercel.app |
| `NEXTAUTH_SECRET` | Secret key for session encryption | Generate using command above |
| `AUTH_TRUST_HOST` | Required for Vercel deployment | Must be `true` |
| `NEXT_PUBLIC_APP_URL` | Optional - public app URL for client-side | Same as NEXTAUTH_URL |

## ✅ Post-Deployment Testing

After redeploying with environment variables, test these:

1. **Homepage**: https://website1-git-main-tandon7namans-projects.vercel.app/
   - Should show landing page with Tandon Associates branding

2. **Login**: https://website1-git-main-tandon7namans-projects.vercel.app/login
   - Try logging in with: tandonkamesh@gmail.com / Kamesh123
   - Should redirect to dashboard

3. **Dashboard**: https://website1-git-main-tandon7namans-projects.vercel.app/dashboard
   - Should show real data from database
   - Check stats, recent contracts, deadlines

4. **Sign Out**: Click your name → Sign Out
   - Should redirect to login page

## 🐛 Troubleshooting

### Error: "NEXTAUTH_URL is not set"
**Fix:** Add `NEXTAUTH_URL` to environment variables and redeploy

### Error: "Database connection failed"
**Fix:** 
1. Check Supabase is online: https://supabase.com/dashboard
2. Verify DATABASE_URL is correct
3. Check Supabase allows external connections

### Error: "CSRF token mismatch"
**Fix:** Add `AUTH_TRUST_HOST=true` to environment variables

### Build Failed
**Fix:** 
1. Check build logs in Vercel
2. Make sure all dependencies are in package.json
3. Run `npm install` locally to verify

### API Routes Return 404
**Fix:** 
1. Check if build completed successfully
2. Verify all files are in `/app/api/` directory
3. Redeploy from scratch

## 📊 Database Management

Your Supabase database is already set up at:
- Host: db.xlqkucixisobljfhdpfu.supabase.co
- Database: postgres
- Port: 5432

To manage your database:
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Use Table Editor or SQL Editor

## 🔐 Security Checklist

- [ ] NEXTAUTH_SECRET is set and strong (32+ characters)
- [ ] DATABASE_URL contains correct password
- [ ] All environment variables are set in Vercel
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] Test login/logout functionality
- [ ] Change default passwords for production users
- [ ] Review Supabase security settings

## 🚀 Next Steps After Deployment

1. **Test thoroughly on production URL**
2. **Share with team members to get feedback**
3. **Consider custom domain** (can add in Vercel settings)
4. **Monitor performance** using Vercel Analytics
5. **Implement remaining features** from todo list:
   - OpenAI integration
   - Document uploads
   - Detail pages
   - Charts and analytics

## 📈 Vercel Features to Explore

- **Custom Domain**: Add your own domain (e.g., tandonassociates.com)
- **Analytics**: Enable Vercel Analytics for traffic insights
- **Speed Insights**: Monitor Core Web Vitals
- **Preview Deployments**: Automatic for every git push
- **Logs**: Real-time function logs for debugging

## 🔄 Automatic Deployments

Your project is connected to GitHub. Every time you push to the `main` branch:
- Vercel automatically builds and deploys
- You get a new preview URL
- Production URL updates if build succeeds

To push changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## 💡 Pro Tips

1. **Environment Variables per Branch**: 
   - Set different values for Production/Preview/Development
   - Use "Environment" dropdown when adding variables

2. **Edge Functions**: 
   - Your API routes are already optimized for Vercel Edge
   - They run close to users for better performance

3. **Build Time**: 
   - First build: ~2-3 minutes
   - Subsequent builds: ~1-2 minutes (with cache)

4. **Logs**: 
   - Real-time logs available in Functions tab
   - Useful for debugging production issues

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Your Project: https://vercel.com/tandon7namans-projects/website1
