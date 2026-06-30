import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BusinessService } from './business.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() createBusinessDto: any, @Request() req: any) {
    return this.businessService.create(createBusinessDto, req.user.id);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.businessService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.businessService.findOne(id, req.user.id);
  }
}
