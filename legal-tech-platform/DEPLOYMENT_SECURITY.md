# Deployment Security Checklist

## 🚨 CRITICAL - Do This First

### 1. Rotate All Credentials (IMMEDIATELY)
```bash
# 1. Change database password in your database provider
# 2. Generate new NEXTAUTH_SECRET
openssl rand -base64 32

# 3. Update .env.local with new values
# 4. Verify .env.local is NOT in git
git check-ignore .env.local  # Should return .env.local

# 5. If .env.local was committed, remove it
git rm --cached .env.local
git commit -m "Remove .env.local from tracking"
```

### 2. Verify Environment Variables
```bash
# Create .env.local with ONLY these values:
DATABASE_URL="postgresql://new-user:new-password@host:5432/db"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-new-generated-secret"
OPENAI_API_KEY="sk-your-actual-key"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-key"
RESEND_API_KEY="re_your-key"
```

## 📋 Pre-Deployment Checklist

### Security
- [ ] All credentials rotated
- [ ] .env.local not in git history
- [ ] HTTPS/TLS enabled
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] Input validation tested
- [ ] Authorization checks verified

### Database
- [ ] Database backups configured
- [ ] Database encryption enabled
- [ ] Connection pooling configured
- [ ] Firewall rules set (only app server can connect)
- [ ] Database user has minimal permissions

### Application
- [ ] All dependencies updated
- [ ] No console.log statements with sensitive data
- [ ] Error messages don't expose internals
- [ ] API rate limits configured
- [ ] Session timeout set to 24 hours

### Infrastructure
- [ ] WAF (Web Application Firewall) enabled
- [ ] DDoS protection enabled
- [ ] Monitoring and alerts configured
- [ ] Log aggregation set up
- [ ] Backup strategy in place

## 🚀 Deployment Steps

### 1. Pre-Deployment Testing
```bash
# Run security checks
npm run lint

# Build the application
npm run build

# Test locally with production env
NODE_ENV=production npm start
```

### 2. Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Verify schema
npx prisma db push
```

### 3. Deploy to Production
```bash
# Deploy (using your deployment platform)
# Vercel: git push to main branch
# AWS: Use your deployment pipeline
# Docker: Build and push image
```

### 4. Post-Deployment Verification
- [ ] Application loads without errors
- [ ] Login works correctly
- [ ] API endpoints respond
- [ ] Database queries work
- [ ] File uploads work
- [ ] Security headers present
- [ ] Rate limiting active
- [ ] Logs show no errors

## 🔍 Monitoring Setup

### Essential Metrics
1. **Failed Login Attempts** - Alert if > 10 in 5 minutes
2. **Rate Limit Exceeded** - Alert if > 50 in 5 minutes
3. **Unauthorized Access** - Alert immediately
4. **Database Connection Errors** - Alert immediately
5. **API Response Time** - Alert if > 5 seconds
6. **Error Rate** - Alert if > 1%

### Log Aggregation
- Send all logs to centralized service (CloudWatch, Datadog, etc.)
- Set up alerts for security events
- Archive logs for 90 days minimum

## 🔐 Post-Deployment Security

### Daily
- [ ] Review security logs
- [ ] Check for failed login attempts
- [ ] Monitor error rates

### Weekly
- [ ] Review access patterns
- [ ] Check for suspicious activity
- [ ] Verify backups completed

### Monthly
- [ ] Update dependencies
- [ ] Review security patches
- [ ] Audit user access

### Quarterly
- [ ] Rotate secrets
- [ ] Review security policies
- [ ] Conduct security audit

## 🆘 Incident Response

### If Breach Detected
1. **Immediate Actions**
   - Revoke all sessions
   - Rotate all credentials
   - Enable enhanced logging
   - Notify security team

2. **Investigation**
   - Review access logs
   - Identify affected users
   - Determine scope of breach
   - Document timeline

3. **Remediation**
   - Patch vulnerability
   - Deploy fix
   - Verify fix works
   - Monitor for recurrence

4. **Communication**
   - Notify affected users
   - Provide remediation steps
   - Update security documentation

## 📞 Emergency Contacts

- Security Team: [contact info]
- Database Admin: [contact info]
- DevOps: [contact info]
- Legal: [contact info]

## 🔗 Useful Commands

```bash
# Check for exposed secrets
git log -p | grep -i "password\|secret\|key\|token"

# Verify environment variables
env | grep -E "DATABASE|AUTH|API|KEY"

# Test API security
curl -H "Authorization: Bearer invalid" https://yourdomain.com/api/contracts

# Check security headers
curl -I https://yourdomain.com | grep -E "X-Frame|X-Content|Strict-Transport"
```

## ✅ Final Verification

Before going live:
1. [ ] All credentials rotated
2. [ ] Security headers verified
3. [ ] Rate limiting tested
4. [ ] Authorization working
5. [ ] Logging configured
6. [ ] Backups working
7. [ ] Monitoring active
8. [ ] Team trained on security procedures
