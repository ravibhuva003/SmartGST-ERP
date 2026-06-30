import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: any, @Query('businessId') businessId: string, @Request() req: any) {
    return this.invoiceService.create(createInvoiceDto, businessId, req.user.id);
  }

  @Get()
  findAll(@Query('businessId') businessId: string, @Request() req: any) {
    return this.invoiceService.findAll(businessId, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('businessId') businessId: string, @Request() req: any) {
    return this.invoiceService.findOne(id, businessId, req.user.id);
  }
}
