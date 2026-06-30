import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async generateGstr1(companyId: string, month: number, year: number) {
    // Determine date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch all sales invoices for the period
    const invoices = await this.prisma.invoice.findMany({
      where: {
        companyId,
        type: 'SALES_INVOICE',
        issueDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        customer: true,
        items: true,
      },
    });

    let totalB2bTaxable = 0;
    let totalB2bTax = 0;
    let totalB2cTaxable = 0;
    let totalB2cTax = 0;

    const b2bInvoices = [];
    const b2cInvoices = [];

    for (const inv of invoices) {
      const taxableValue = Number(inv.subTotal);
      const taxAmount = Number(inv.taxTotal);
      
      const hasGstin = inv.customer?.gstin && inv.customer.gstin.trim() !== '';

      if (hasGstin) {
        totalB2bTaxable += taxableValue;
        totalB2bTax += taxAmount;
        b2bInvoices.push(inv);
      } else {
        totalB2cTaxable += taxableValue;
        totalB2cTax += taxAmount;
        b2cInvoices.push(inv);
      }
    }

    return {
      period: `${month.toString().padStart(2, '0')}-${year}`,
      summary: {
        totalInvoices: invoices.length,
        b2b: { count: b2bInvoices.length, taxableValue: totalB2bTaxable, taxAmount: totalB2bTax },
        b2c: { count: b2cInvoices.length, taxableValue: totalB2cTaxable, taxAmount: totalB2cTax },
        totalTaxableValue: totalB2bTaxable + totalB2cTaxable,
        totalTaxAmount: totalB2bTax + totalB2cTax,
      }
    };
  }

  async generateGstr3b(companyId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // 1. Outward Taxable Supplies (Sales Liability)
    const sales = await this.prisma.invoice.findMany({
      where: { companyId, type: 'SALES_INVOICE', issueDate: { gte: startDate, lte: endDate } },
      include: { items: true },
    });

    let totalOutwardTaxable = 0;
    let totalIgstLiability = 0;
    let totalCgstLiability = 0;
    let totalSgstLiability = 0;

    sales.forEach(inv => {
      totalOutwardTaxable += Number(inv.subTotal);
      inv.items.forEach(item => {
        totalIgstLiability += Number(item.igst);
        totalCgstLiability += Number(item.cgst);
        totalSgstLiability += Number(item.sgst);
      });
    });

    // 2. Eligible ITC (Purchase Input Tax Credit)
    const purchases = await this.prisma.invoice.findMany({
      where: { companyId, type: 'PURCHASE_INVOICE', issueDate: { gte: startDate, lte: endDate } },
      include: { items: true },
    });

    let totalItcIgst = 0;
    let totalItcCgst = 0;
    let totalItcSgst = 0;

    purchases.forEach(inv => {
      inv.items.forEach(item => {
        totalItcIgst += Number(item.igst);
        totalItcCgst += Number(item.cgst);
        totalItcSgst += Number(item.sgst);
      });
    });

    // 3. Net Tax Payable (Simplified for MVP, IGST offset rules apply in real life)
    const netIgst = Math.max(0, totalIgstLiability - totalItcIgst);
    const netCgst = Math.max(0, totalCgstLiability - totalItcCgst);
    const netSgst = Math.max(0, totalSgstLiability - totalItcSgst);

    return {
      period: `${month.toString().padStart(2, '0')}-${year}`,
      liability: {
        outwardTaxableValue: totalOutwardTaxable,
        igst: totalIgstLiability,
        cgst: totalCgstLiability,
        sgst: totalSgstLiability,
        totalLiability: totalIgstLiability + totalCgstLiability + totalSgstLiability
      },
      itc: {
        igst: totalItcIgst,
        cgst: totalItcCgst,
        sgst: totalItcSgst,
        totalItc: totalItcIgst + totalItcCgst + totalItcSgst
      },
      netPayable: {
        igst: netIgst,
        cgst: netCgst,
        sgst: netSgst,
        totalPayable: netIgst + netCgst + netSgst
      }
    };
  }
}
