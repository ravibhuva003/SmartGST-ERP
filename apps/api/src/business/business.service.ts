import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: string) {
    return this.prisma.business.create({
      data: {
        ...data,
        users: {
          create: {
            userId,
            role: 'OWNER',
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.business.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.business.findFirst({
      where: {
        id,
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
