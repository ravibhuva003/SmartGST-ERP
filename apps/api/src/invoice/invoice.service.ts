import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    
    // Calculate totals
    let totalAmount = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;

    const itemsData = data.items.map((item: any) => {
      const amount = item.quantity * item.rate;
      // Assuming intrastate by default for now (CGST/SGST = taxRate / 2)
      const isInterState = data.isInterState || false;
      const cgst = isInterState ? 0 : amount * (item.taxRate / 2 / 100);
      const sgst = isInterState ? 0 : amount * (item.taxRate / 2 / 100);
      const igst = isInterState ? amount * (item.taxRate / 100) : 0;

      totalAmount += amount + cgst + sgst + igst;
      totalCgst += cgst;
      totalSgst += sgst;
      totalIgst += igst;

      return {
        itemId: item.itemId,
        quantity: item.quantity,
        rate: item.rate,
        amount,
        cgst,
        sgst,
        igst,
      };
    });

    return this.prisma.invoice.create({
      data: {
        businessId,
        customerId: data.customerId,
        type: data.type || 'SALES',
        invoiceNumber: data.invoiceNumber,
        date: new Date(data.date),
        totalAmount,
        cgst: totalCgst,
        sgst: totalSgst,
        igst: totalIgst,
        items: {
          create: itemsData,
        },
      },
      include: {
        items: true,
        customer: true,
      },
    });
  }

  async findAll(businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.invoice.findMany({
      where: { businessId },
      include: { customer: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, businessId: string, userId: string) {
    await this.verifyBusinessAccess(businessId, userId);
    return this.prisma.invoice.findFirst({
      where: { id, businessId },
      include: { items: { include: { item: true } }, customer: true },
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
