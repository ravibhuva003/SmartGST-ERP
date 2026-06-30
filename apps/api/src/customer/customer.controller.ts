import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: any, @Query('businessId') businessId: string, @Request() req: any) {
    return this.customerService.create(createCustomerDto, businessId, req.user.id);
  }

  @Get()
  findAll(@Query('businessId') businessId: string, @Request() req: any) {
    return this.customerService.findAll(businessId, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('businessId') businessId: string, @Request() req: any) {
    return this.customerService.findOne(id, businessId, req.user.id);
  }
}
