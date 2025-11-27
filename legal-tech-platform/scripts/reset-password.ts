import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const prisma = new PrismaClient()

async function resetPassword(email: string, newPassword: string) {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.error(`❌ User with email "${email}" not found`)
      return
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the password in database
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    console.log(`✅ Password successfully reset for user: ${email}`)
    console.log(`   Name: ${user.name}`)
    console.log(`   New Password: ${newPassword}`)
  } catch (error) {
    console.error('Error resetting password:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get command line arguments
const email = process.argv[2]
const newPassword = process.argv[3]

if (!email || !newPassword) {
  console.log('Usage: npm run reset-password <email> <new-password>')
  console.log('Example: npm run reset-password tandonkamesh@gmail.com MyNewPassword123')
  process.exit(1)
}

resetPassword(email, newPassword)
