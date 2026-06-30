import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    const { companyId, customerId, type, invoiceNumber, date, items } = data;

    // Verify user has access to this company
    const access = await this.prisma.companyUser.findFirst({
      where: { userId, companyId }
    });

    if (!access) {
      throw new ForbiddenException('You do not have access to this company');
    }

    // Calculate Totals based on items
    let totalAmount = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;

    const formattedItems = items.map((item: any) => {
      const quantity = Number(item.quantity) || 0;
      const rate = Number(item.rate) || 0;
      const amount = quantity * rate;
      const cgst = Number(item.cgst) || 0;
      const sgst = Number(item.sgst) || 0;
      const igst = Number(item.igst) || 0;

      totalAmount += amount + cgst + sgst + igst;
      totalCgst += cgst;
      totalSgst += sgst;
      totalIgst += igst;

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
          invoiceNumber,
          date: new Date(date),
          totalAmount,
          cgst: totalCgst,
          sgst: totalSgst,
          igst: totalIgst,
          items: {
            create: formattedItems
          }
        },
        include: {
          items: true,
          customer: true
        }
      });

      // Update inventory stock (Optional/Basic)
      for (const item of formattedItems) {
        await tx.item.update({
          where: { id: item.itemId },
          data: {
            stock: {
              decrement: type === 'PURCHASE_INVOICE' ? -item.quantity : item.quantity
            }
          }
        });
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
        date: 'desc'
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
