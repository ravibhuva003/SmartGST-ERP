import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    const userCompanies = await this.prisma.companyUser.findMany({
      where: { userId },
      include: {
        company: true,
        branch: true,
      },
    });

    return userCompanies;
  }

  async findOne(id: string, userId: string) {
    const access = await this.prisma.companyUser.findFirst({
      where: { userId, companyId: id },
    });

    if (!access) {
      throw new ForbiddenException('You do not have access to this company');
    }

    return this.prisma.company.findUnique({
      where: { id },
      include: {
        branches: true,
        users: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            branch: true,
          }
        }
      }
    });
  }

  async createBranch(companyId: string, branchData: any, userId: string) {
    const access = await this.prisma.companyUser.findFirst({
      where: { userId, companyId },
    });

    if (!access || access.role !== 'COMPANY_OWNER') {
      throw new ForbiddenException('Only Company Owners can create branches');
    }

    return this.prisma.branch.create({
      data: {
        companyId,
        name: branchData.name,
        address: branchData.address,
        gstin: branchData.gstin,
        stateCode: branchData.stateCode,
      }
    });
  }

  async getBranches(companyId: string, userId: string) {
    const access = await this.prisma.companyUser.findFirst({
      where: { userId, companyId },
    });

    if (!access) {
      throw new ForbiddenException('You do not have access to this company');
    }

    if (access.branchId) {
      // User is restricted to a specific branch
      return this.prisma.branch.findMany({
        where: { id: access.branchId }
      });
    }

    // User has company-wide access
    return this.prisma.branch.findMany({
      where: { companyId }
    });
  }
}
