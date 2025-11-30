import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-zA-Z\s]+$/),
  email: z.string().email().toLowerCase(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/\d/, 'Password must contain number')
    .regex(/[@$!%*?&]/, 'Password must contain special character (@$!%*?&)'),
})

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
})

export const contractSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['NDA', 'SERVICE_AGREEMENT', 'EMPLOYMENT', 'VENDOR', 'PARTNERSHIP', 'LEASE', 'PROCUREMENT', 'OTHER']),
  partyA: z.string().min(1).max(100),
  partyB: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  value: z.number().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

export const caseSchema = z.object({
  title: z.string().min(1).max(200),
  caseNumber: z.string().min(1).max(50).regex(/^[A-Z0-9-]+$/),
  type: z.enum(['CIVIL', 'CRIMINAL', 'CORPORATE', 'LABOR', 'INTELLECTUAL_PROPERTY', 'TAX', 'REGULATORY', 'OTHER']),
  description: z.string().max(1000).optional(),
  court: z.string().max(100).optional(),
  plaintiff: z.string().max(100).optional(),
  defendant: z.string().max(100).optional(),
})
