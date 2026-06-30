import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(companyId: string, data: any) {
    return this.prisma.customer.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async findAllForUser(userId: string) {
    // Get all companies the user belongs to
    const userCompanies = await this.prisma.companyUser.findMany({
      where: { userId },
      select: { companyId: true }
    });
    
    const companyIds = userCompanies.map(uc => uc.companyId);

    return this.prisma.customer.findMany({
      where: {
        companyId: {
          in: companyIds
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  update(id: string, data: any) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
