# 🎯 Action Plan - Critical Fixes & Improvements

## Overview
This document outlines the exact steps to implement all critical fixes and improvements identified in the deep-dive review.

---

## 🚨 CRITICAL FIXES (Do First)

### Fix #1: Rate Limit Memory Leak
**Time**: 30 minutes  
**File**: `lib/rate-limit.ts`  
**Status**: ⏳ TODO

**Steps**:
1. Add cleanup interval
2. Add type safety
3. Test with load
4. Deploy

**Code**:
```typescript
import { NextRequest } from 'next/server'

const rateLimitMap = new Map<string, number[]>()
const CLEANUP_INTERVAL = 60000

setInterval(() => {
  const now = Date.now()
  for (const [key, times] of rateLimitMap.entries()) {
    const validTimes = times.filter(t => now - t < 3600000)
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

### Fix #2: Path Traversal Vulnerability
**Time**: 20 minutes  
**File**: `app/api/documents/route.ts`  
**Status**: ⏳ TODO

**Steps**:
1. Import path module
2. Sanitize filename
3. Test with malicious names
4. Deploy

**Code Changes**:
```typescript
import path from 'path'

// In POST handler, replace:
// url: `/uploads/${user.id}/${Date.now()}-${file.name}`,

// With:
const sanitizedName = path.basename(file.name)
  .replace(/[^a-zA-Z0-9._-]/g, '_')
  .substring(0, 255)

const document = await prisma.document.create({
  data: {
    name: file.name,
    type: file.type,
    size: file.size,
    mimeType: file.type,
    url: `/uploads/${user.id}/${Date.now()}-${sanitizedName}`,
    uploadedBy: user.id,
    contractId: contractId || null,
    caseId: caseId || null,
    complianceId: complianceId || null,
  },
})
```

---

### Fix #3: Password Validation Regex
**Time**: 15 minutes  
**File**: `lib/validations.ts`  
**Status**: ⏳ TODO

**Steps**:
1. Replace regex with individual checks
2. Add error messages
3. Test with various passwords
4. Deploy

**Code Changes**:
```typescript
// Replace:
// password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),

// With:
password: z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/\d/, 'Password must contain number')
  .regex(/[@$!%*?&]/, 'Password must contain special character (@$!%*?&)'),
```

---

### Fix #4: Auth Utils Error Handling
**Time**: 15 minutes  
**File**: `lib/auth-utils.ts`  
**Status**: ⏳ TODO

**Steps**:
1. Add type safety
2. Add null checks
3. Test with invalid roles
4. Deploy

**Code Changes**:
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

### Fix #5: Remove Double Auth Check
**Time**: 10 minutes  
**File**: `middleware.ts`  
**Status**: ⏳ TODO

**Steps**:
1. Remove API auth check from middleware
2. Keep security headers
3. Test all endpoints
4. Deploy

**Code Changes**:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
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

### Fix #6: Add Event Persistence
**Time**: 30 minutes  
**File**: `lib/security-logger.ts`  
**Status**: ⏳ TODO

**Steps**:
1. Import prisma
2. Add async function
3. Add database storage
4. Test logging
5. Deploy

**Code Changes**:
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
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[SECURITY]', JSON.stringify(logEntry))
  }
  
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

## ⚠️ HIGH PRIORITY IMPROVEMENTS

### Improvement #1: Add Pagination
**Time**: 45 minutes  
**Files**: All API routes (contracts, cases, compliance, etc.)  
**Status**: ⏳ TODO

**Pattern**:
```typescript
const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'))
const skip = (page - 1) * limit

const [data, total] = await Promise.all([
  prisma.model.findMany({
    where,
    take: limit,
    skip,
    orderBy: { createdAt: 'desc' },
  }),
  prisma.model.count({ where }),
])

return NextResponse.json({
  data,
  pagination: { page, limit, total, pages: Math.ceil(total / limit) },
})
```

---

### Improvement #2: Fix Type Safety
**Time**: 30 minutes  
**File**: `lib/auth.ts`  
**Status**: ⏳ TODO

**Code Changes**:
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

## 🎓 BEST PRACTICE ENHANCEMENTS

### Enhancement #1: Response Wrapper
**Time**: 20 minutes  
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

### Enhancement #2: Input Sanitization
**Time**: 20 minutes  
**File**: Create `lib/sanitize.ts`

```typescript
import path from 'path'

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '').substring(0, 1000)
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

export function sanitizeFilename(filename: string): string {
  return path.basename(filename)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255)
}
```

---

### Enhancement #3: Health Check
**Time**: 15 minutes  
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

## 📋 Implementation Checklist

### Week 1: Critical Fixes
- [ ] Fix rate limit memory leak
- [ ] Fix path traversal vulnerability
- [ ] Fix password validation regex
- [ ] Add error handling to auth-utils
- [ ] Remove double auth check
- [ ] Add event persistence
- [ ] Test all changes
- [ ] Deploy to staging

### Week 2: High Priority
- [ ] Add pagination to all APIs
- [ ] Fix type safety issues
- [ ] Add response wrapper
- [ ] Add input sanitization
- [ ] Add health check endpoint
- [ ] Test all changes
- [ ] Deploy to production

### Week 3: Best Practices
- [ ] Add request logging
- [ ] Add error boundary
- [ ] Add CSRF protection
- [ ] Add request ID tracking
- [ ] Add database query logging
- [ ] Add API caching
- [ ] Add environment validation
- [ ] Add dependency injection

---

## 🧪 Testing Checklist

### For Each Fix
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done
- [ ] No console errors
- [ ] No performance regression
- [ ] Security verified

### Before Deployment
- [ ] All tests passing
- [ ] Code review approved
- [ ] Security review approved
- [ ] Performance tested
- [ ] Rollback plan ready

---

## 📊 Effort Estimation

| Phase | Fixes | Time | Priority |
|-------|-------|------|----------|
| Week 1 | 6 | 2 hours | CRITICAL |
| Week 2 | 5 | 3 hours | HIGH |
| Week 3 | 8 | 4 hours | MEDIUM |
| **Total** | **19** | **9 hours** | - |

---

## 🚀 Deployment Strategy

### Stage 1: Staging (Day 1)
1. Deploy critical fixes
2. Run full test suite
3. Performance testing
4. Security verification

### Stage 2: Production (Day 2)
1. Deploy to production
2. Monitor logs
3. Verify all endpoints
4. Check performance

### Stage 3: Monitoring (Ongoing)
1. Monitor error rates
2. Check security logs
3. Review performance metrics
4. Gather user feedback

---

## 📞 Support

**Questions?** Check `DEEP_DIVE_REVIEW.md` for detailed explanations.

**Need help?** See `SECURITY_QUICK_START.md` for quick answers.

---

**Status**: Ready to implement  
**Last Updated**: [Current Date]  
**Owner**: [Your Name]
