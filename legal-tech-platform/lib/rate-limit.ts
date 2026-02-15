import { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function rateLimit(request: NextRequest, limit: number = 5, window: number = 60000) {
  const ip = (request as any).ip || request.headers.get('x-forwarded-for') || 'unknown'
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
  rateLimitMap.set(key, validRequests)
  
  return true
}