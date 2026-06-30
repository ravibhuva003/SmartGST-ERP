import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getKpis(companyId: string) {
    const [invoices, customers, items, outstandingInvoices] = await Promise.all([
      this.prisma.invoice.aggregate({
        where: { companyId, type: 'SALES_INVOICE' },
        _count: { id: true },
        _sum: { grandTotal: true },
      }),
      this.prisma.customer.count({ where: { companyId } }),
      this.prisma.item.count({ where: { companyId } }),
      this.prisma.invoice.aggregate({
        where: { companyId, type: 'SALES_INVOICE', status: { not: 'PAID' } },
        _count: { id: true },
        _sum: { grandTotal: true },
      })
    ]);

    return {
      totalRevenue: invoices._sum.grandTotal || 0,
      totalInvoicesCount: invoices._count.id || 0,
      outstandingAmount: outstandingInvoices._sum.grandTotal || 0,
      outstandingInvoicesCount: outstandingInvoices._count.id || 0,
      totalCustomers: customers || 0,
      totalItems: items || 0,
    };
  }
}
