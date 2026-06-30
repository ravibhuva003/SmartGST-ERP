import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
// Legacy modules to be rewritten in Phase 2+
import { CustomerModule } from './customer/customer.module';
import { ItemModule } from './item/item.module';
import { InvoiceModule } from './invoice/invoice.module';
import { VendorModule } from './vendor/vendor.module';
import { CategoryModule } from './category/category.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CompaniesModule,
    CustomerModule,
    ItemModule,
    InvoiceModule,
    VendorModule,
    CategoryModule,
    PaymentsModule,
    ReportsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
