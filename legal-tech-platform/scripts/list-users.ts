import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const prisma = new PrismaClient()

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    })

    console.log(`\n📋 Total users in database: ${users.length}\n`)
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Created: ${user.createdAt.toLocaleDateString()}`)
      console.log('')
    })
  } catch (error) {
    console.error('Error listing users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listUsers()
