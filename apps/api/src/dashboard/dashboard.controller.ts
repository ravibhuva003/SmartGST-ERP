import { Controller, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  async getKpis(@Req() req: any) {
    const companyId = req.cookies?.companyId;
    if (!companyId) throw new UnauthorizedException('No company selected');
    
    return this.dashboardService.getKpis(companyId);
  }
}
