import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('gstr1')
  getGstr1(
    @Query('businessId') businessId: string,
    @Query('month') month: string,
    @Query('year') year: string,
    @Request() req: any,
  ) {
    return this.reportsService.getGstr1(businessId, req.user.id, parseInt(month), parseInt(year));
  }
}
