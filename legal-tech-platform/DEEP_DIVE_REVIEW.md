# 🔍 Deep-Dive Code Review & Actionable Suggestions

## Executive Summary

Your security implementation is **solid and production-ready**, but there are **8 critical improvements** and **12 best practice enhancements** that will significantly strengthen the system.

---

## 🚨 CRITICAL ISSUES (Fix Immediately)

### 1. **Rate Limiting: Memory Leak Risk**
**Severity**: HIGH  
**File**: `lib/rate-limit.ts`  
**Issue**: The `rateLimitMap` grows indefinitely and never cleans up old entries.

**Current Code**:
```typescript
const rateLimitMap = new Map()

export function rateLimit(request: NextRequest, limit: number = 5, window: number = 60000) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const key = `${ip}-${request.nextUrl.pathname}`
  
  const now = Date.now()
  const windowStart = now - window
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, [])
  }
  
  const requests = rateLimitMap.get(key)
  const validRequests = requests.filter((time: number) => time > windowStart)
  
  if (validRequests.length >= limit) {
    return false
  }
  
  validRequests.push(now)
  rateLimitMap.set(key, validRequests)  // ❌ Never deletes old keys
  
  return true
}
```

**Problem**: After 1 week, you'll have millions of entries consuming gigabytes of memory.

**Fix**:
```typescript
import { NextRequest } from 'next/server'

const rateLimitMap = new Map<string, number[]>()
const CLEANUP_INTERVAL = 60000 // 1 minute

// Cleanup old entries every minute
setInterval(() => {
  const now = Date.now()
  for (const [key, times] of rateLimitMap.entries()) {
    const validTimes = times.filter(t => now - t < 3600000) // Keep 1 hour
    if (validTimes.length === 0) {
      rateLimitMap.delete(key)
    } else {
      rateLimitMap.set(key, validTimes)
    }
  }
}, CLEANUP_INTERVAL)

export function rateLimit(request: NextRequest, limit: number = 5, window: number = 60000): boolean {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const key = `${ip}-${request.nextUrl.pathname}`
  
  const now = Date.now()
  const windowStart = now - window
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, [])
  }
  
  const requests = rateLimitMap.get(key) || []
  const validRequests = requests.filter((time: number) => time > windowStart)
  
  if (validRequests.length >= limit) {
    return false
  }
  
  validRequests.push(now)
  rateLimitMap.set(key, validRequests)
  
  return true
}
```

---

### 2. **Middleware: Double Authentication Check**
**Severity**: HIGH  
**File**: `middleware.ts`  
**Issue**: API routes are checked twice - once in middleware, once in route handlers.

**Current Code**:
```typescript
// Protect API routes
if (request.nextUrl.pathname.startsWith('/api/') && 
    !request.nextUrl.pathname.startsWith('/api/auth')) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
```

**Problem**: 
- Redundant database calls
- Performance hit on every request
- Inconsistent error handling

**Fix**: Remove from middleware, keep only in route handlers:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Security headers only
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
```

---

### 3. **Password Validation: Regex Too Strict**
**Severity**: MEDIUM  
**File**: `lib/validations.ts`  
**Issue**: Password regex requires special character but doesn't validate properly.

**Current Code**:
```typescript
password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
```

**Problem**: 
- Regex is incomplete (missing `+` at end)
- Only allows specific special characters
- Doesn't match the lookahead requirements

**Fix**:
```typescript
password: z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/\d/, 'Password must contain number')
  .regex(/[@$!%*?&]/, 'Password must contain special character (@$!%*?&)'),
```

---

### 4. **File Upload: Path Traversal Vulnerability**
**Severity**: CRITICAL  
**File**: `app/api/documents/route.ts`  
**Issue**: File name not sanitized before storing in URL.

**Current Code**:
```typescript
url: `/uploads/${user.id}/${Date.now()}-${file.name}`,
```

**Problem**: Attacker can upload file named `../../admin/config.json` and traverse directories.

**Fix**:
```typescript
import path from 'path'

// Sanitize filename
const sanitizedName = path.basename(file.name)
  .replace(/[^a-zA-Z0-9._-]/g, '_')
  .substring(0, 255)

const document = await prisma.document.create({
  data: {
    name: file.name, // Store original for display
    type: file.type,
    size: file.size,
    mimeType: file.type,
    url: `/uploads/${user.id}/${Date.now()}-${sanitizedName}`, // Use sanitized
    uploadedBy: user.id,
    contractId: contractId || null,
    caseId: caseId || null,
    complianceId: complianceId || null,
  },
})
```

---

### 5. **Auth Utils: Missing Error Handling**
**Severity**: HIGH  
**File**: `lib/auth-utils.ts`  
**Issue**: `hasPermission` crashes if role doesn't exist in hierarchy.

**Current Code**:
```typescript
export function hasPermission(userRole: string, requiredRole: string) {
  const roleHierarchy = { 'VIEWER': 1, 'USER': 2, 'ADMIN': 3 }
  return roleHierarchy[userRole as keyof typeof roleHierarchy] >= 
         roleHierarchy[requiredRole as keyof typeof roleHierarchy]
}
```

**Problem**: Returns `undefined >= undefined` if role is invalid.

**Fix**:
```typescript
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy: Record<string, number> = { 'VIEWER': 1, 'USER': 2, 'ADMIN': 3 }
  
  const userLevel = roleHierarchy[userRole]
  const requiredLevel = roleHierarchy[requiredRole]
  
  if (userLevel === undefined || requiredLevel === undefined) {
    return false
  }
  
  return userLevel >= requiredLevel
}
```

---

### 6. **Security Logger: No Persistence**
**Severity**: MEDIUM  
**File**: `lib/security-logger.ts`  
**Issue**: Critical security events only logged to console, not persisted.

**Current Code**:
```typescript
export function logSecurityEvent(
  event: SecurityEvent,
  details: { userId?: string; ip?: string; userAgent?: string; resource?: string; metadata?: Record<string, any> }
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  }
  
  console.log('[SECURITY]', JSON.stringify(logEntry))
  
  // Store critical events in database
  if ([SecurityEvent.UNAUTHORIZED_ACCESS, SecurityEvent.SUSPICIOUS_ACTIVITY].includes(event)) {
    // Store in audit log table ❌ NOT IMPLEMENTED
  }
}
```

**Fix**:
```typescript
import { prisma } from '@/lib/prisma'

export enum SecurityEvent {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
}

export async function logSecurityEvent(
  event: SecurityEvent,
  details: {
    userId?: string
    ip?: string
    userAgent?: string
    resource?: string
    metadata?: Record<string, any>
  }
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  }
  
  // Always log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[SECURITY]', JSON.stringify(logEntry))
  }
  
  // Store critical events in database
  try {
    if ([SecurityEvent.UNAUTHORIZED_ACCESS, SecurityEvent.SUSPICIOUS_ACTIVITY, SecurityEvent.LOGIN_FAILED].includes(event)) {
      await prisma.activity.create({
        data: {
          action: 'SECURITY_EVENT',
          entity: 'SECURITY',
          entityId: event,
          description: JSON.stringify(details),
          userId: details.userId || 'SYSTEM',
          metadata: { event, ...details },
        },
      })
    }
  } catch (error) {
    console.error('[SECURITY_LOG_ERROR]', error)
  }
}
```

---

### 7. **Contracts API: No Pagination**
**Severity**: MEDIUM  
**File**: `app/api/contracts/route.ts`  
**Issue**: Returns ALL contracts without pagination - could be thousands.

**Current Code**:
```typescript
const contracts = await prisma.contract.findMany({
  where,
  orderBy: { createdAt: 'desc' },
  include: { user: { select: { name: true, email: true } } },
})

return NextResponse.json(contracts)
```

**Problem**: 
- Large response payloads
- Slow queries
- Memory issues
- Poor UX

**Fix**:
```typescript
const searchParams = request.nextUrl.searchParams
const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'))
const skip = (page - 1) * limit

const [contracts, total] = await Promise.all([
  prisma.contract.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
    take: limit,
    skip,
  }),
  prisma.contract.count({ where }),
])

return NextResponse.json({
  data: contracts,
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  },
})
```

---

### 8. **Auth Callbacks: Type Safety Issues**
**Severity**: MEDIUM  
**File**: `lib/auth.ts`  
**Issue**: Using `any` type in callbacks defeats TypeScript benefits.

**Current Code**:
```typescript
callbacks: {
  async jwt({ token, user }: any) {  // ❌ any
    if (user) {
      token.role = user.role
      token.id = user.id
    }
    return token
  },
  async session({ session, token }: any) {  // ❌ any
    if (session.user) {
      session.user.role = token.role
      session.user.id = token.id
    }
    return session
  },
}
```

**Fix**:
```typescript
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

callbacks: {
  async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
    if (user) {
      token.role = user.role
      token.id = user.id
    }
    return token
  },
  async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
    if (session.user) {
      session.user.role = token.role as string
      session.user.id = token.id as string
    }
    return session
  },
}
```

---

## ⚠️ BEST PRACTICE IMPROVEMENTS (High Priority)

### 9. **Add Request Validation Middleware**
**File**: Create `lib/request-validator.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function validateRequest(
  request: NextRequest,
  schema: any
): Promise<{ valid: boolean; data?: any; error?: string }> {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    return { valid: true, data }
  } catch (error) {
    return { valid: false, error: 'Invalid request body' }
  }
}
```

---

### 10. **Add Response Wrapper**
**File**: Create `lib/response.ts`

```typescript
import { NextResponse } from 'next/server'

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export function unauthorizedResponse() {
  return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
}
```

---

### 11. **Add Request Logging Middleware**
**File**: Create `lib/request-logger.ts`

```typescript
import { NextRequest } from 'next/server'

export function logRequest(request: NextRequest) {
  const method = request.method
  const path = request.nextUrl.pathname
  const ip = request.ip || 'unknown'
  
  console.log(`[${new Date().toISOString()}] ${method} ${path} - ${ip}`)
}
```

---

### 12. **Add Error Boundary**
**File**: Create `lib/error-handler.ts`

```typescript
import { NextResponse } from 'next/server'

export function handleError(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error.message === 'Not found') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
  }
  
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
```

---

### 13. **Add CSRF Protection**
**File**: Create `lib/csrf.ts`

```typescript
import crypto from 'crypto'

const csrfTokens = new Map<string, { token: string; expires: number }>()

export function generateCSRFToken(): string {
  const token = crypto.randomBytes(32).toString('hex')
  csrfTokens.set(token, { token, expires: Date.now() + 3600000 })
  return token
}

export function validateCSRFToken(token: string): boolean {
  const entry = csrfTokens.get(token)
  if (!entry || entry.expires < Date.now()) {
    csrfTokens.delete(token)
    return false
  }
  csrfTokens.delete(token)
  return true
}
```

---

### 14. **Add Request ID Tracking**
**File**: Create `lib/request-id.ts`

```typescript
import { NextRequest } from 'next/server'
import crypto from 'crypto'

export function getOrCreateRequestId(request: NextRequest): string {
  const existing = request.headers.get('x-request-id')
  if (existing) return existing
  return crypto.randomUUID()
}
```

---

### 15. **Add Database Query Logging**
**File**: Modify `lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma
```

---

### 16. **Add API Response Caching**
**File**: Create `lib/cache.ts`

```typescript
const cache = new Map<string, { data: any; expires: number }>()

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry || entry.expires < Date.now()) {
    cache.delete(key)
    return null
  }
  return entry.data
}

export function setCached<T>(key: string, data: T, ttl: number = 60000): void {
  cache.set(key, { data, expires: Date.now() + ttl })
}

export function clearCache(pattern?: string): void {
  if (!pattern) {
    cache.clear()
    return
  }
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  }
}
```

---

### 17. **Add Input Sanitization**
**File**: Create `lib/sanitize.ts`

```typescript
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 1000) // Limit length
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255)
}
```

---

### 18. **Add Dependency Injection Pattern**
**File**: Create `lib/container.ts`

```typescript
export class Container {
  private services = new Map<string, any>()

  register(name: string, service: any): void {
    this.services.set(name, service)
  }

  get<T>(name: string): T {
    const service = this.services.get(name)
    if (!service) throw new Error(`Service ${name} not found`)
    return service
  }
}

export const container = new Container()
```

---

### 19. **Add Environment Validation**
**File**: Create `lib/env.ts`

```typescript
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

export const env = envSchema.parse(process.env)
```

---

### 20. **Add Health Check Endpoint**
**File**: Create `app/api/health/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: 'healthy', timestamp: new Date() })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: 'Database connection failed' },
      { status: 503 }
    )
  }
}
```

---

## 📊 Summary of Issues

| Issue | Severity | Type | Impact |
|-------|----------|------|--------|
| Rate Limit Memory Leak | CRITICAL | Performance | System crash after 1 week |
| Double Auth Check | HIGH | Performance | 2x database calls |
| Password Regex | MEDIUM | Security | Invalid validation |
| Path Traversal | CRITICAL | Security | Directory traversal attack |
| Missing Error Handling | HIGH | Reliability | Runtime crashes |
| No Event Persistence | MEDIUM | Compliance | Lost audit trail |
| No Pagination | MEDIUM | Performance | Large payloads |
| Type Safety | MEDIUM | Maintainability | Runtime errors |

---

## 🎯 Implementation Priority

### Week 1 (Critical)
1. Fix rate limit memory leak
2. Fix path traversal vulnerability
3. Fix password validation regex
4. Add error handling to auth-utils

### Week 2 (High)
5. Remove double auth check
6. Add event persistence
7. Add pagination to APIs
8. Fix type safety issues

### Week 3 (Best Practices)
9-20. Implement best practice improvements

---

## ✅ Verification Checklist

- [ ] Rate limit cleanup implemented
- [ ] Path traversal fixed
- [ ] Password regex corrected
- [ ] Error handling added
- [ ] Double auth removed
- [ ] Event persistence working
- [ ] Pagination implemented
- [ ] Type safety improved
- [ ] All tests passing
- [ ] No console errors

---

## 📝 Next Steps

1. **Review** this document with your team
2. **Prioritize** fixes based on severity
3. **Implement** critical fixes first
4. **Test** thoroughly before deployment
5. **Monitor** for any issues post-deployment

Your implementation is strong. These improvements will make it enterprise-grade. 🚀
