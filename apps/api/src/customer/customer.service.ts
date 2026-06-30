import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(companyId: string, data: any) {
    return this.prisma.customer.create({
      data: {
        ...data,
        companyId,
      },
    });
  }

  async findAllForUser(userId: string) {
    // Get all companies the user belongs to
    const userCompanies = await this.prisma.companyUser.findMany({
      where: { userId },
      select: { companyId: true }
    });
    
    const companyIds = userCompanies.map(uc => uc.companyId);

    return this.prisma.customer.findMany({
      where: {
        companyId: {
          in: companyIds
        }
      }
    });
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        invoices: {
          orderBy: { issueDate: 'desc' },
          take: 50 // Recent transactions
        }
      }
    });

    if (!customer) return null;

    // Calculate CRM Profile Metrics
    let totalOutstanding = 0;
    let totalRevenue = 0;
    for (const inv of customer.invoices) {
      if (inv.status === 'UNPAID' || inv.status === 'OVERDUE') {
        totalOutstanding += Number(inv.grandTotal);
      }
      if (inv.status === 'PAID') {
        totalRevenue += Number(inv.grandTotal);
      }
    }

    return {
      ...customer,
      crmMetrics: {
        totalOutstanding,
        totalRevenue,
        invoiceCount: customer.invoices.length
      }
    };
  }

  update(id: string, data: any) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  // --- Phase 3: Advanced Features ---
  
  async validateGstin(gstin: string) {
    // Mocking an external API call to NIC/ClearTax for GSTIN validation
    // Format: 2 digits (state), 10 char PAN, 1 entity num, Z, 1 check digit
    if (!gstin || gstin.length !== 15) {
      return { valid: false, message: 'Invalid GSTIN format' };
    }
    
    // Simulated enrichment data
    return {
      valid: true,
      data: {
        legalName: 'MOCK COMPANY PRIVATE LIMITED',
        tradeName: 'Mock Corp',
        stateCode: gstin.substring(0, 2),
        status: 'Active',
        taxpayerType: 'Regular'
      }
    };
  }

  async sendPaymentReminder(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: { invoices: { where: { status: 'UNPAID' } } }
    });

    if (!customer) throw new Error('Customer not found');

    const overdueCount = customer.invoices.length;
    if (overdueCount === 0) return { message: 'No pending invoices for this customer.' };

    // Simulate sending an Email/SMS
    console.log(`[Phase 3 Communication] Sending SMS & Email to ${customer.email} / ${customer.phone}. Overdue Invoices: ${overdueCount}`);
    
    return { 
      success: true, 
      message: `Reminder sent successfully to ${customer.email || customer.phone}` 
    };
  }
}
