# 🔒 Security Quick Start

## ⚡ Critical Actions (Do Now)

### 1. Rotate Credentials
```bash
# Generate new secret
openssl rand -base64 32

# Update .env.local
DATABASE_URL="postgresql://new-user:new-password@host:5432/db"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-new-secret"
```

### 2. Verify .env.local Not in Git
```bash
git check-ignore .env.local
# Should output: .env.local
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Test Locally
```bash
npm run dev
# Test login at http://localhost:3000/login
```

## 🔐 Security Features Implemented

| Feature | Status | Details |
|---------|--------|---------|
| JWT Authentication | ✅ | 24-hour session timeout |
| Password Hashing | ✅ | Bcrypt 12 rounds |
| Input Validation | ✅ | Zod schemas on all APIs |
| Rate Limiting | ✅ | 3 requests/min on registration |
| Authorization | ✅ | Role-based access control |
| Security Headers | ✅ | OWASP recommended headers |
| Data Isolation | ✅ | Users see only their data |
| Audit Logging | ✅ | All actions logged |
| File Validation | ✅ | Type & size checks |

## 📋 Pre-Deployment Checklist

```bash
# 1. Update dependencies
npm audit fix

# 2. Build application
npm run build

# 3. Run linter
npm run lint

# 4. Test API endpoints
curl http://localhost:3000/api/contracts
# Should return 401 Unauthorized (no token)

# 5. Verify security headers
curl -I http://localhost:3000 | grep X-Frame
# Should show: X-Frame-Options: DENY
```

## 🚀 Deployment

### Environment Variables Required
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret
OPENAI_API_KEY=sk-...
```

### Deploy Steps
1. Rotate all credentials
2. Update environment variables
3. Run `npm run build`
4. Deploy to production
5. Verify security headers
6. Test login flow

## 🔍 Verify Security

### Check Security Headers
```bash
curl -I https://yourdomain.com | grep -E "X-Frame|X-Content|Strict"
```

### Test Authentication
```bash
# Should fail
curl https://yourdomain.com/api/contracts

# Should succeed with token
curl -H "Authorization: Bearer token" https://yourdomain.com/api/contracts
```

### Check Rate Limiting
```bash
# Run 5 times quickly
for i in {1..5}; do
  curl -X POST https://yourdomain.com/api/register \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test'$i'@example.com","password":"Test@123456"}'
done
# 5th should return 429
```

## 📊 API Endpoints

### Public (No Auth Required)
- `POST /api/register` - Create account
- `POST /api/auth/signin` - Login

### Protected (Auth Required)
- `GET /api/contracts` - List contracts
- `POST /api/contracts` - Create contract
- `GET /api/cases` - List cases
- `POST /api/cases` - Create case
- `GET /api/compliance` - List compliance
- `POST /api/compliance` - Create compliance
- `GET /api/documents` - List documents
- `POST /api/documents` - Upload document
- `GET /api/activities` - List activities
- `GET /api/analytics` - Get analytics
- `GET /api/notifications` - Get notifications

### Admin Only
- `GET /api/admin/users` - List all users

## 🆘 Troubleshooting

### "Unauthorized" Error
- Check token is valid
- Verify session not expired
- Check user role has permission

### "Invalid Input" Error
- Check email format
- Verify password strength
- Validate required fields

### "Too Many Requests" Error
- Wait 1 minute
- Rate limit resets automatically

### "File Too Large" Error
- Max file size is 10MB
- Compress file and try again

## 📞 Security Issues

If you find a security vulnerability:
1. Do NOT post publicly
2. Email security team
3. Include detailed description
4. Provide reproduction steps

## 🔗 Documentation

- Full Security Guide: `SECURITY.md`
- Deployment Checklist: `DEPLOYMENT_SECURITY.md`
- Testing Guide: `SECURITY_TESTING.md`
- API Documentation: `docs/API.md`

## ✅ Daily Security Tasks

- [ ] Review security logs
- [ ] Check for failed logins
- [ ] Monitor error rates
- [ ] Verify backups completed

## 🎯 Monthly Security Tasks

- [ ] Update dependencies
- [ ] Review access logs
- [ ] Audit user permissions
- [ ] Test disaster recovery

## 📈 Quarterly Security Tasks

- [ ] Rotate secrets
- [ ] Security audit
- [ ] Penetration testing
- [ ] Update security policies
