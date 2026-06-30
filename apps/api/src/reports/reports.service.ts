import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getGstr1(businessId: string, userId: string, month: number, year: number) {
    await this.verifyBusinessAccess(businessId, userId);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const invoices = await this.prisma.invoice.findMany({
      where: {
        businessId,
        date: {
          gte: startDate,
          lte: endDate,
        },
        type: 'SALES',
      },
      include: {
        customer: true,
      },
    });

    // Aggregate B2B and B2C based on customer GSTIN presence
    const b2b = invoices.filter(inv => inv.customer.gstin);
    const b2c = invoices.filter(inv => !inv.customer.gstin);

    const calculateTotals = (invs: any[]) => {
      return invs.reduce((acc, curr) => {
        acc.totalAmount += Number(curr.totalAmount);
        acc.cgst += Number(curr.cgst);
        acc.sgst += Number(curr.sgst);
        acc.igst += Number(curr.igst);
        return acc;
      }, { totalAmount: 0, cgst: 0, sgst: 0, igst: 0 });
    };

    return {
      period: `${month}-${year}`,
      b2b: { count: b2b.length, ...calculateTotals(b2b) },
      b2c: { count: b2c.length, ...calculateTotals(b2c) },
      invoices,
    };
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
