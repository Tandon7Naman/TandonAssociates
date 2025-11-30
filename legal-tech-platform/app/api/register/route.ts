import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { name, email, password } = registerSchema.parse(body)

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        )
      }
    } catch (dbError) {
      console.error('Database error checking user:', dbError)
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    try {
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

      return NextResponse.json(
        { user, message: 'User created successfully' },
        { status: 201 }
      )
    } catch (createError) {
      console.error('Database error creating user:', createError)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input: ' + error.errors[0].message },
        { status: 400 }
      )
    }
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
