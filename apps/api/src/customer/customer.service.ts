import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.customer.create({
      data: {
        ...data,
        businessId,
      },
    });
  }

  async findAll(businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.customer.findMany({
      where: { businessId },
    });
  }

  async findOne(id: string, businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.customer.findFirst({
      where: { id, businessId },
    });
  }

  private async verifyBusinessAccess(businessId: string, userId: string) {
    const access = await this.prisma.businessUser.findFirst({
      where: { businessId, userId },
    });
    if (!access) {
      throw new UnauthorizedException('You do not have access to this business');
    }
  }
}
