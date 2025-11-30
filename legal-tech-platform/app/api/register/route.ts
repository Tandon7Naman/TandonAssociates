import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { logSecurityEvent, SecurityEvent } from '@/lib/security-logger'

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(req, 3, 60000)) {
      logSecurityEvent(SecurityEvent.RATE_LIMIT_EXCEEDED, {
        ip: req.ip,
        resource: '/api/register',
      })
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, email, password } = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    logSecurityEvent(SecurityEvent.LOGIN_SUCCESS, {
      userId: user.id,
      resource: '/api/register',
    })

    return NextResponse.json(
      { user, message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
