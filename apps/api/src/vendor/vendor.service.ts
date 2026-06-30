import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService) {}

  create(companyId: string, data: any) {
    return this.prisma.vendor.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async findAllForUser(userId: string) {
    const userCompanies = await this.prisma.companyUser.findMany({
      where: { userId },
      select: { companyId: true }
    });
    
    const companyIds = userCompanies.map(uc => uc.companyId);

    return this.prisma.vendor.findMany({
      where: {
        companyId: {
          in: companyIds
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.vendor.findUnique({
      where: { id },
    });
  }

  update(id: string, data: any) {
    return this.prisma.vendor.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.vendor.delete({
      where: { id },
    });
  }
}
