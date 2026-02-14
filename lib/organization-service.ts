import { prisma } from './prisma';
import { OrgType, AgreementType, PlanType, OrgUserRole } from '@prisma/client';

export class OrganizationService {
  async createOrganization(data: {
    name: string;
    type: OrgType;
    email: string;
    phone?: string;
    address?: string;
    gstin?: string;
    pan?: string;
    cinNumber?: string;
    agreementType: AgreementType;
    seatsLicensed: number;
    pricePerSeat: number;
    adminUserId: string;
  }) {
    const totalAmount = data.seatsLicensed * data.pricePerSeat;

    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        type: data.type,
        email: data.email,
        phone: data.phone,
        address: data.address,
        gstin: data.gstin,
        pan: data.pan,
        cinNumber: data.cinNumber,
        agreementType: data.agreementType,
        seatsLicensed: data.seatsLicensed,
        pricePerSeat: data.pricePerSeat,
        totalAmount: totalAmount,
        features: {},
        users: {
          create: {
            userId: data.adminUserId,
            role: 'SUPER_ADMIN'
          }
        }
      }
    });

    return organization;
  }

  async inviteUser(organizationId: string, email: string, role: OrgUserRole) {
    // In a real app, check if user exists, if not send invite email
    // For now, assume user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found. They must register first.');
    }

    const orgUser = await prisma.organizationUser.create({
      data: {
        organizationId,
        userId: user.id,
        role
      }
    });

    // Update organization current seats
    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        currentSeats: { increment: 1 }
      }
    });

    return orgUser;
  }

  async getOrganizationDetails(orgId: string) {
    return await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        },
        subscriptions: true,
        invoices: true
      }
    });
  }

  async getUserOrganizations(userId: string) {
    return await prisma.organizationUser.findMany({
      where: { userId },
      include: {
        organization: true
      }
    });
  }
}

export const organizationService = new OrganizationService();
