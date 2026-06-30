import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  create(companyId: string, data: any) {
    return this.prisma.item.create({
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

    return this.prisma.item.findMany({
      where: {
        companyId: {
          in: companyIds
        }
      },
      include: {
        category: true,
      }
    });
  }

  findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
      }
    });
  }

  update(id: string, data: any) {
    return this.prisma.item.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
