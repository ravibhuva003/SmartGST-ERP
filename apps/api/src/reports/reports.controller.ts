import { Controller, Get, Query, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('gstr1')
  async getGstr1(@Query('month') month: string, @Query('year') year: string, @Req() req: any) {
    const companyId = req.cookies?.companyId;
    if (!companyId) throw new UnauthorizedException('No company selected');

    const m = month ? parseInt(month) : new Date().getMonth() + 1;
    const y = year ? parseInt(year) : new Date().getFullYear();

    return this.reportsService.generateGstr1(companyId, m, y);
  }

  @Get('gstr3b')
  async getGstr3b(@Query('month') month: string, @Query('year') year: string, @Req() req: any) {
    const companyId = req.cookies?.companyId;
    if (!companyId) throw new UnauthorizedException('No company selected');

    const m = month ? parseInt(month) : new Date().getMonth() + 1;
    const y = year ? parseInt(year) : new Date().getFullYear();

    return this.reportsService.generateGstr3b(companyId, m, y);
  }
}
