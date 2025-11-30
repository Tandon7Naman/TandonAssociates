# Security Testing Guide

## 🧪 Manual Security Tests

### 1. Authentication Tests

#### Test: Invalid Credentials
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"wrong"}'
# Expected: 401 Unauthorized
```

#### Test: Missing Credentials
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
# Expected: 400 Bad Request
```

#### Test: SQL Injection
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin\"; DROP TABLE users; --","password":"test"}'
# Expected: 400 Bad Request (validation error)
```

### 2. Authorization Tests

#### Test: Access Without Token
```bash
curl http://localhost:3000/api/contracts
# Expected: 401 Unauthorized
```

#### Test: Access Other User's Data
```bash
# Login as user1, get their contract ID
# Login as user2, try to access user1's contract
curl -H "Authorization: Bearer user2-token" \
  http://localhost:3000/api/contracts/user1-contract-id
# Expected: 404 Not Found or 401 Unauthorized
```

#### Test: Admin Endpoint Without Admin Role
```bash
# Login as regular user
curl -H "Authorization: Bearer user-token" \
  http://localhost:3000/api/admin/users
# Expected: 401 Unauthorized
```

### 3. Input Validation Tests

#### Test: Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid-email","password":"Test@123456"}'
# Expected: 400 Bad Request
```

#### Test: Weak Password
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"weak"}'
# Expected: 400 Bad Request
```

#### Test: XSS Payload
```bash
curl -X POST http://localhost:3000/api/contracts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"title":"<script>alert(1)</script>","type":"NDA","partyA":"A","partyB":"B"}'
# Expected: 400 Bad Request (validation error)
```

### 4. Rate Limiting Tests

#### Test: Rate Limit on Registration
```bash
# Run 5 times in quick succession
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/register \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test'$i'@example.com","password":"Test@123456"}'
done
# Expected: 5th request returns 429 Too Many Requests
```

### 5. Security Headers Tests

#### Test: Security Headers Present
```bash
curl -I http://localhost:3000
# Expected headers:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
# X-XSS-Protection: 1; mode=block
# Strict-Transport-Security: max-age=31536000
```

### 6. File Upload Tests

#### Test: Invalid File Type
```bash
curl -X POST http://localhost:3000/api/documents \
  -H "Authorization: Bearer token" \
  -F "file=@malicious.exe"
# Expected: 400 Bad Request
```

#### Test: File Too Large
```bash
# Create 11MB file
dd if=/dev/zero of=large.pdf bs=1M count=11

curl -X POST http://localhost:3000/api/documents \
  -H "Authorization: Bearer token" \
  -F "file=@large.pdf"
# Expected: 400 Bad Request
```

### 7. CSRF Tests

#### Test: Cross-Origin Request
```bash
# From different origin
curl -X POST http://localhost:3000/api/contracts \
  -H "Content-Type: application/json" \
  -H "Origin: http://attacker.com" \
  -d '{"title":"Test","type":"NDA","partyA":"A","partyB":"B"}'
# Expected: Request blocked or requires valid session
```

## 🤖 Automated Security Testing

### Using OWASP ZAP
```bash
# Install ZAP
# Run baseline scan
zaproxy -cmd -quickurl http://localhost:3000 -quickout report.html

# Review report for vulnerabilities
```

### Using npm audit
```bash
# Check for vulnerable dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Fix with breaking changes
npm audit fix --force
```

## 📊 Security Test Checklist

### Authentication & Authorization
- [ ] Invalid credentials rejected
- [ ] Missing credentials rejected
- [ ] SQL injection attempts blocked
- [ ] Unauthorized access denied
- [ ] Admin endpoints protected
- [ ] User data isolation verified

### Input Validation
- [ ] Invalid email rejected
- [ ] Weak passwords rejected
- [ ] XSS payloads blocked
- [ ] SQL injection blocked
- [ ] File type validation works
- [ ] File size validation works

### Rate Limiting
- [ ] Registration rate limited
- [ ] Login rate limited
- [ ] API endpoints rate limited
- [ ] Rate limit headers present

### Security Headers
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set
- [ ] Referrer-Policy set
- [ ] X-XSS-Protection set
- [ ] Strict-Transport-Security set

### Data Protection
- [ ] User data isolated
- [ ] Passwords hashed
- [ ] Sensitive data not logged
- [ ] Audit trail working
- [ ] File uploads secure

## 🔍 Penetration Testing Checklist

### Phase 1: Reconnaissance
- [ ] Identify all endpoints
- [ ] Map data flows
- [ ] Document authentication methods
- [ ] List all user roles

### Phase 2: Scanning
- [ ] Port scanning
- [ ] Service enumeration
- [ ] Vulnerability scanning
- [ ] Configuration review

### Phase 3: Exploitation
- [ ] Test authentication bypass
- [ ] Test authorization bypass
- [ ] Test injection vulnerabilities
- [ ] Test file upload vulnerabilities

### Phase 4: Reporting
- [ ] Document findings
- [ ] Assign severity levels
- [ ] Provide remediation steps
- [ ] Create action plan

## 📝 Test Results Template

```markdown
# Security Test Results - [Date]

## Test Environment
- URL: http://localhost:3000
- Version: 0.1.0
- Tester: [Name]

## Results Summary
- Total Tests: X
- Passed: X
- Failed: X
- Critical Issues: X

## Critical Issues
1. [Issue 1]
   - Severity: Critical
   - Description: [Details]
   - Remediation: [Steps]

## Medium Issues
1. [Issue 1]
   - Severity: Medium
   - Description: [Details]
   - Remediation: [Steps]

## Low Issues
1. [Issue 1]
   - Severity: Low
   - Description: [Details]
   - Remediation: [Steps]

## Recommendations
- [Recommendation 1]
- [Recommendation 2]

## Sign-off
- Tested by: [Name]
- Date: [Date]
- Status: [Pass/Fail]
```

## 🔄 Continuous Security Testing

### Weekly
- [ ] Run npm audit
- [ ] Check for new CVEs
- [ ] Review security logs

### Monthly
- [ ] Full security test suite
- [ ] Dependency updates
- [ ] Security header verification

### Quarterly
- [ ] Penetration testing
- [ ] Code review
- [ ] Security audit

### Annually
- [ ] Third-party security assessment
- [ ] Compliance audit
- [ ] Disaster recovery test
