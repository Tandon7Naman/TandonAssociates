import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Test user credentials
    const testEmail = 'test@tandonassociates.com'
    const testPassword = 'TestPassword@123'
    const testName = 'Test User'

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail },
    })

    if (existingUser) {
      console.log('✅ Test user already exists')
      console.log(`Email: ${testEmail}`)
      console.log(`Password: ${testPassword}`)
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 12)

    // Create test user
    const user = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        password: hashedPassword,
        role: 'USER',
      },
    })

    console.log('✅ Test user created successfully!')
    console.log('')
    console.log('📧 Test Account Credentials:')
    console.log('─'.repeat(50))
    console.log(`Email:    ${testEmail}`)
    console.log(`Password: ${testPassword}`)
    console.log('─'.repeat(50))
    console.log('')
    console.log('🔗 Login URL: https://tandon-associates-bmtjyzkwi-tandon7namans-projects.vercel.app/login')
    console.log('')
    console.log('User ID:', user.id)
    console.log('Created At:', user.createdAt)
  } catch (error) {
    console.error('❌ Error creating test user:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
