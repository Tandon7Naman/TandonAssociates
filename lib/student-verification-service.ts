import { PrismaClient } from '@prisma/client';
import { prisma } from './prisma';

export class StudentVerificationService {
  async verifyStudent(data: {
    userId: string;
    institutionName: string;
    institutionEmail: string;
    enrollmentNumber: string;
    course: string;
    yearOfStudy: number;
    expectedGraduation: Date;
    idCardUrl?: string;
    bonafideUrl?: string;
  }) {
    // Step 1: Validate institution email domain
    const validDomains = ['.edu', '.ac.in', '.edu.in'];
    const isValidDomain = validDomains.some(domain => 
      data.institutionEmail.endsWith(domain)
    );

    if (!isValidDomain) {
      throw new Error('Please use your official college email (e.g., .edu, .ac.in)');
    }

    // Step 2: Create pending verification
    const verification = await prisma.studentVerification.upsert({
      where: { userId: data.userId },
      update: {
        ...data,
        verificationStatus: 'PENDING',
        expiresAt: data.expectedGraduation
      },
      create: {
        ...data,
        verificationStatus: 'PENDING',
        expiresAt: data.expectedGraduation
      }
    });

    // Step 3: Update user role
    await prisma.user.update({
      where: { id: data.userId },
      data: { role: 'STUDENT' }
    });

    return verification;
  }

  async checkStudentStatus(userId: string) {
    const verification = await prisma.studentVerification.findUnique({
      where: { userId }
    });

    if (!verification) return { isStudent: false };

    // Check if expired
    if (verification.expiresAt < new Date()) {
      await this.convertToRegularUser(userId);
      return { isStudent: false, reason: 'GRADUATED' };
    }

    return { isStudent: true, verification };
  }

  async convertToRegularUser(userId: string) {
    // Graceful transition after graduation
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'USER' }
    });

    // In a real app, send an email here
    console.log(`User ${userId} has graduated and converted to regular user.`);
  }

  async approveVerification(userId: string) {
    return await prisma.studentVerification.update({
      where: { userId },
      data: {
        verificationStatus: 'VERIFIED',
        verifiedAt: new Date()
      }
    });
  }
}

export const studentVerificationService = new StudentVerificationService();
