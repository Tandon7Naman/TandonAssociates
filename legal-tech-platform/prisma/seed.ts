import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Hash password for demo accounts
  const hashedPassword = await bcrypt.hash('demo123', 10)

  // Create demo users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tandonassociates.com' },
    update: {},
    create: {
      email: 'admin@tandonassociates.com',
      name: 'Advocate Naman Tandon',
      password: hashedPassword,
      role: 'ADMIN',
      image: 'https://avatar.vercel.sh/admin'
    }
  })

  const user1 = await prisma.user.upsert({
    where: { email: 'priya.sharma@tandonassociates.com' },
    update: {},
    create: {
      email: 'priya.sharma@tandonassociates.com',
      name: 'Advocate Priya Sharma',
      password: hashedPassword,
      role: 'MANAGER',
      image: 'https://avatar.vercel.sh/priya'
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'rajesh.kumar@tandonassociates.com' },
    update: {},
    create: {
      email: 'rajesh.kumar@tandonassociates.com',
      name: 'Advocate Rajesh Kumar',
      password: hashedPassword,
      role: 'USER',
      image: 'https://avatar.vercel.sh/rajesh'
    }
  })

  console.log('✅ Created demo users:', { admin: admin.email, user1: user1.email, user2: user2.email })

  // Create sample contracts
  const contract1 = await prisma.contract.create({
    data: {
      title: 'Software Development Agreement - Tech Corp India',
      description: 'Agreement for development of custom ERP system for manufacturing client',
      type: 'SERVICE_AGREEMENT',
      status: 'UNDER_REVIEW',
      stage: 'NEGOTIATION',
      priority: 'HIGH',
      partyA: 'Tech Corp India Pvt Ltd',
      partyB: 'Tandon Associates LLP',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2025-01-14'),
      value: 2500000,
      currency: 'INR',
      riskScore: 25,
      complianceScore: 85,
      aiSummary: 'This is a comprehensive software development agreement with standard terms. Key obligations include milestone-based delivery, quality assurance, and maintenance support. No major red flags identified.',
      aiKeyTerms: JSON.stringify(['Fixed price contract', '12-month duration', 'Monthly milestone payments', 'IP ownership transfer', 'Confidentiality obligations']),
      aiObligations: JSON.stringify(['Deliver working software by agreed milestones', 'Provide 6 months warranty', 'Train client staff', 'Maintain documentation']),
      aiRedFlags: JSON.stringify(['Payment terms could be more favorable', 'Liability cap is low']),
      userId: admin.id
    }
  })

  const contract2 = await prisma.contract.create({
    data: {
      title: 'Commercial Lease Agreement - Office Space Mumbai',
      description: 'Lease agreement for corporate office space in Bandra Kurla Complex',
      type: 'LEASE',
      status: 'APPROVED',
      stage: 'EXECUTION',
      priority: 'MEDIUM',
      partyA: 'Mumbai Real Estate Holdings',
      partyB: 'Acme Consulting Services',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2027-01-31'),
      value: 4500000,
      currency: 'INR',
      riskScore: 15,
      complianceScore: 95,
      aiSummary: 'Standard commercial lease with 3-year lock-in. Includes escalation clause of 10% annually. Property tax and maintenance to be borne by lessee.',
      aiKeyTerms: JSON.stringify(['3-year lease', '10% annual escalation', 'Security deposit: 6 months rent', 'Commercial use only']),
      userId: user1.id
    }
  })

  const contract3 = await prisma.contract.create({
    data: {
      title: 'Non-Disclosure Agreement - Startup Investment',
      description: 'NDA for due diligence of fintech startup acquisition',
      type: 'NDA',
      status: 'DRAFT',
      stage: 'INITIATION',
      priority: 'URGENT',
      partyA: 'Investment Partners Fund',
      partyB: 'FinNext Technologies',
      value: 0,
      currency: 'INR',
      riskScore: 40,
      complianceScore: 70,
      aiSummary: 'Mutual NDA for investment due diligence. 5-year confidentiality period. Includes non-compete and non-solicitation clauses.',
      aiRedFlags: JSON.stringify(['Non-compete clause too broad', '5-year term may be excessive', 'Jurisdiction clause ambiguous']),
      userId: admin.id
    }
  })

  console.log('✅ Created 3 sample contracts')

  // Create sample cases
  const case1 = await prisma.case.create({
    data: {
      caseNumber: 'WP/12345/2024',
      title: 'Rajesh Enterprises vs. Income Tax Department',
      description: 'Writ Petition challenging tax assessment order under Section 143(3) of Income Tax Act',
      type: 'WRIT_PETITION',
      status: 'ACTIVE',
      priority: 'HIGH',
      courtName: 'Delhi High Court',
      courtType: 'HIGH_COURT',
      caseYear: 2024,
      filingDate: new Date('2024-03-15'),
      hearingDate: new Date('2024-12-20'),
      petitioner: 'Rajesh Enterprises Pvt Ltd',
      respondent: 'Income Tax Department, Government of India',
      advocate: 'Advocate Naman Tandon',
      cnrNumber: 'DLHC010123456782024',
      aiSummary: 'Challenge to tax assessment order. Grounds: violation of natural justice, non-application of mind, and arbitrary additions. Strong case based on procedural lapses.',
      aiPrecedents: JSON.stringify([
        'CIT vs. Vegetable Products Ltd. (1973) 88 ITR 192 (SC)',
        'GKN Driveshafts (India) Ltd. vs. ITO (2003) 259 ITR 19 (SC)'
      ]),
      aiLegalPoints: JSON.stringify([
        'Principles of natural justice must be followed',
        'Assessment order must show application of mind',
        'Additions must be based on material evidence'
      ]),
      userId: admin.id
    }
  })

  const case2 = await prisma.case.create({
    data: {
      caseNumber: 'CS/6789/2024',
      title: 'ABC Ltd vs. XYZ Suppliers',
      description: 'Civil suit for recovery of ₹50 lakhs due to breach of supply contract',
      type: 'CIVIL_SUIT',
      status: 'ACTIVE',
      priority: 'MEDIUM',
      courtName: 'Saket District Court',
      courtType: 'DISTRICT_COURT',
      caseYear: 2024,
      filingDate: new Date('2024-05-10'),
      hearingDate: new Date('2025-01-15'),
      petitioner: 'ABC Manufacturing Ltd',
      respondent: 'XYZ Suppliers Pvt Ltd',
      advocate: 'Advocate Priya Sharma',
      aiSummary: 'Breach of contract case. Client supplied defective raw materials causing production losses. Strong documentary evidence including email correspondence and quality reports.',
      userId: user1.id
    }
  })

  const case3 = await prisma.case.create({
    data: {
      caseNumber: 'CRL/2468/2024',
      title: 'State vs. Vikram Malhotra',
      description: 'Criminal case under Section 138 Negotiable Instruments Act (Cheque Bounce)',
      type: 'CRIMINAL',
      status: 'PENDING',
      priority: 'MEDIUM',
      courtName: 'Tis Hazari Court',
      courtType: 'DISTRICT_COURT',
      caseYear: 2024,
      filingDate: new Date('2024-07-20'),
      petitioner: 'Anil Kumar',
      respondent: 'Vikram Malhotra',
      advocate: 'Advocate Rajesh Kumar',
      cnrNumber: 'DLDC020987654322024',
      aiSummary: 'Cheque dishonour case. Amount: ₹15 lakhs. All statutory requirements fulfilled including legal notice. High probability of conviction.',
      userId: user2.id
    }
  })

  console.log('✅ Created 3 sample cases')

  // Create case proceedings
  await prisma.proceeding.createMany({
    data: [
      {
        caseId: case1.id,
        date: new Date('2024-03-20'),
        type: 'HEARING',
        description: 'First hearing. Matter listed for admission.',
        outcome: 'Notice issued to respondent',
        nextDate: new Date('2024-04-15')
      },
      {
        caseId: case1.id,
        date: new Date('2024-04-15'),
        type: 'HEARING',
        description: 'Respondent counsel appeared. Reply sought.',
        outcome: 'Reply to be filed in 4 weeks',
        nextDate: new Date('2024-05-20')
      },
      {
        caseId: case2.id,
        date: new Date('2024-05-15'),
        type: 'HEARING',
        description: 'Filing of plaint. Summons issued.',
        outcome: 'Defendant to appear',
        nextDate: new Date('2024-06-10')
      }
    ]
  })

  console.log('✅ Created case proceedings')

  // Create compliance items
  const compliance1 = await prisma.compliance.create({
    data: {
      title: 'Annual ROC Filing - Form AOC-4 & MGT-7',
      description: 'Annual filing of financial statements and annual return with Registrar of Companies',
      type: 'STATUTORY',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      regulation: 'Companies Act, 2013',
      authority: 'Ministry of Corporate Affairs',
      dueDate: new Date('2024-12-31'),
      riskLevel: 'HIGH',
      complianceScore: 60,
      requirements: JSON.stringify([
        'Audited financial statements',
        'Board report',
        'Annual return in Form MGT-7',
        'Form AOC-4 with attachments'
      ]),
      controls: JSON.stringify([
        'Internal audit completed',
        'Board approval obtained',
        'Documents prepared and reviewed'
      ]),
      evidence: JSON.stringify([
        'Board resolution dated 15-Nov-2024',
        'Auditor report',
        'Draft forms'
      ]),
      userId: admin.id
    }
  })

  const compliance2 = await prisma.compliance.create({
    data: {
      title: 'GST Returns Filing - GSTR-3B',
      description: 'Monthly GST return filing for November 2024',
      type: 'REGULATORY',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      regulation: 'Goods and Services Tax Act, 2017',
      authority: 'GST Council',
      dueDate: new Date('2024-12-20'),
      completionDate: new Date('2024-12-18'),
      riskLevel: 'LOW',
      complianceScore: 100,
      requirements: JSON.stringify([
        'Sales reconciliation',
        'Input tax credit computation',
        'Tax liability calculation'
      ]),
      userId: user1.id
    }
  })

  const compliance3 = await prisma.compliance.create({
    data: {
      title: 'PF & ESI Compliance Check',
      description: 'Quarterly compliance verification for Provident Fund and ESI contributions',
      type: 'STATUTORY',
      status: 'PENDING',
      priority: 'MEDIUM',
      regulation: 'EPF & ESI Acts',
      authority: 'EPFO & ESIC',
      dueDate: new Date('2025-01-15'),
      riskLevel: 'MEDIUM',
      complianceScore: 75,
      userId: user2.id
    }
  })

  console.log('✅ Created 3 compliance items')

  // Create sample activities
  await prisma.activity.createMany({
    data: [
      {
        action: 'CREATED',
        description: 'Created new contract: Software Development Agreement',
        userId: admin.id,
        entityType: 'CONTRACT',
        entityId: contract1.id,
        contractId: contract1.id
      },
      {
        action: 'UPDATED',
        description: 'Updated contract status to Under Review',
        userId: admin.id,
        entityType: 'CONTRACT',
        entityId: contract1.id,
        contractId: contract1.id
      },
      {
        action: 'CREATED',
        description: 'Filed new case: Rajesh Enterprises vs. Income Tax Dept',
        userId: admin.id,
        entityType: 'CASE',
        entityId: case1.id,
        caseId: case1.id
      },
      {
        action: 'COMPLETED',
        description: 'Completed GST return filing',
        userId: user1.id,
        entityType: 'COMPLIANCE',
        entityId: compliance2.id,
        complianceId: compliance2.id
      }
    ]
  })

  console.log('✅ Created activity logs')

  // Create sample comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'Need to review payment terms more carefully. Client wants milestone-based payments.',
        userId: user1.id,
        contractId: contract1.id
      },
      {
        content: 'Strong precedents available. We should cite GKN Driveshafts case prominently.',
        userId: admin.id,
        caseId: case1.id
      },
      {
        content: 'All documents ready for filing. Awaiting final approval from board.',
        userId: user2.id,
        complianceId: compliance1.id
      }
    ]
  })

  console.log('✅ Created comments')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📧 Demo Accounts Created:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('1. Admin Account')
  console.log('   Email: admin@tandonassociates.com')
  console.log('   Password: demo123')
  console.log('   Role: ADMIN')
  console.log('\n2. Manager Account')
  console.log('   Email: priya.sharma@tandonassociates.com')
  console.log('   Password: demo123')
  console.log('   Role: MANAGER')
  console.log('\n3. User Account')
  console.log('   Email: rajesh.kumar@tandonassociates.com')
  console.log('   Password: demo123')
  console.log('   Role: USER')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
