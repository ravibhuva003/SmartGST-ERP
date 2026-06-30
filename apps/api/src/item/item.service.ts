import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.item.create({
      data: {
        ...data,
        businessId,
      },
    });
  }

  async findAll(businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.item.findMany({
      where: { businessId },
    });
  }

  async findOne(id: string, businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.item.findFirst({
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
