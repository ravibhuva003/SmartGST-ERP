import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: any, @Query('businessId') businessId: string, @Request() req: any) {
    return this.itemService.create(createItemDto, businessId, req.user.id);
  }

  @Get()
  findAll(@Query('businessId') businessId: string, @Request() req: any) {
    return this.itemService.findAll(businessId, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('businessId') businessId: string, @Request() req: any) {
    return this.itemService.findOne(id, businessId, req.user.id);
  }
}
