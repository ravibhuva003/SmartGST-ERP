import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
// Legacy modules to be rewritten in Phase 2+
import { CustomerModule } from './customer/customer.module';
import { ItemModule } from './item/item.module';
// import { InvoiceModule } from './invoice/invoice.module';
// import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CompaniesModule,
    CustomerModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
