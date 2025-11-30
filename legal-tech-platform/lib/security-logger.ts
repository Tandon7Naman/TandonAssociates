export enum SecurityEvent {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
}

export function logSecurityEvent(
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
  
  // In production, send to proper logging service
  console.log('[SECURITY]', JSON.stringify(logEntry))
  
  // Store critical events in database
  if ([SecurityEvent.UNAUTHORIZED_ACCESS, SecurityEvent.SUSPICIOUS_ACTIVITY].includes(event)) {
    // Store in audit log table
  }
}