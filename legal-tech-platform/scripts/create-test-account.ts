import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const prisma = new PrismaClient()

async function createTestAccount(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.error(`❌ User with email "${email}" already exists`)
      console.log(`   To reset password, use: npm run reset-password ${email} <new-password>`)
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    console.log(`✅ Test account created successfully!`)
    console.log(`   Name: ${user.name}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Password: ${password}`)
    console.log(`\n🔗 Login at: http://localhost:3001/login`)
  } catch (error) {
    console.error('Error creating test account:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get command line arguments
const name = process.argv[2]
const email = process.argv[3]
const password = process.argv[4]

if (!name || !email || !password) {
  console.log('Usage: npm run create-test-account <name> <email> <password>')
  console.log('Example: npm run create-test-account "John Doe" john@example.com Password123')
  process.exit(1)
}

createTestAccount(name, email, password)
