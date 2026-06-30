import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    const { 
      companyId, 
      customerId, 
      type, 
      invoiceNumber, 
      issueDate,
      dueDate,
      subTotal,
      taxTotal,
      grandTotal,
      items 
    } = data;

    // Verify user has access to this company
    const access = await this.prisma.companyUser.findFirst({
      where: { userId, companyId },
      include: { company: true }
    });

    if (!access) {
      throw new ForbiddenException('You do not have access to this company');
    }

    const companyStateCode = '27'; // Default to Maharashtra if not set (for MVP). Should be access.company.stateCode or branch.stateCode
    let destinationStateCode = companyStateCode;

    if (customerId) {
      const customer = await this.prisma.customer.findUnique({ where: { id: customerId } });
      if (customer?.stateCode) destinationStateCode = customer.stateCode;
    } else if (data.vendorId) {
      const vendor = await this.prisma.vendor.findUnique({ where: { id: data.vendorId } });
      if (vendor?.stateCode) destinationStateCode = vendor.stateCode;
    }

    const isInterState = companyStateCode !== destinationStateCode;

    // Format items with precise GST split
    const formattedItems = (items || []).map((item: any) => {
      const rate = Number(item.unitPrice) || 0;
      const quantity = Number(item.quantity) || 0;
      const amount = Number(item.totalAmount) || (rate * quantity);
      const taxAmount = Number(item.taxAmount) || 0;

      let cgst = 0;
      let sgst = 0;
      let igst = 0;

      if (isInterState) {
        igst = Number(taxAmount.toFixed(2));
      } else {
        cgst = Number((taxAmount / 2).toFixed(2));
        sgst = Number((taxAmount / 2).toFixed(2));
      }

      return {
        itemId: item.itemId,
        quantity,
        rate,
        amount,
        cgst,
        sgst,
        igst
      };
    });

    // Use a Prisma transaction to ensure integrity
    return this.prisma.$transaction(async (tx) => {
      const invoice = await tx.invoice.create({
        data: {
          companyId,
          customerId,
          type: type || 'SALES_INVOICE',
          invoiceNumber: invoiceNumber || `INV-${Date.now()}`,
          issueDate: new Date(issueDate),
          dueDate: dueDate ? new Date(dueDate) : null,
          subTotal: Number(subTotal) || 0,
          taxTotal: Number(taxTotal) || 0,
          grandTotal: Number(grandTotal) || 0,
          status: 'UNPAID',
          items: {
            create: formattedItems
          }
        },
        include: {
          items: true,
          customer: true
        }
      });

      // Update inventory stock
      for (const item of formattedItems) {
        if (item.itemId) {
          if (type === 'PURCHASE_INVOICE') {
            await tx.item.update({
              where: { id: item.itemId },
              data: { stock: { increment: item.quantity } }
            });
          } else if (type === 'SALES_INVOICE' || type === 'DELIVERY_CHALLAN') {
            await tx.item.update({
              where: { id: item.itemId },
              data: { stock: { decrement: item.quantity } }
            });
          }
        }
      }

      return invoice;
    });
  }

  async findAllForUser(userId: string) {
    const userCompanies = await this.prisma.companyUser.findMany({
      where: { userId },
      select: { companyId: true }
    });
    
    const companyIds = userCompanies.map(uc => uc.companyId);

    return this.prisma.invoice.findMany({
      where: {
        companyId: {
          in: companyIds
        }
      },
      include: {
        customer: true,
        vendor: true
      },
      orderBy: {
        issueDate: 'desc'
      }
    });
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        vendor: true,
        items: {
          include: {
            item: true
          }
        }
      }
    });
  }

  remove(id: string) {
    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}
