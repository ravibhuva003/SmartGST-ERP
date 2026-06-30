import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.companiesService.findAllForUser(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.companiesService.findOne(id, req.user.sub);
  }

  @Post(':id/branches')
  createBranch(
    @Param('id') id: string,
    @Body() branchData: any,
    @Request() req: any,
  ) {
    return this.companiesService.createBranch(id, branchData, req.user.sub);
  }

  @Get(':id/branches')
  getBranches(@Param('id') id: string, @Request() req: any) {
    return this.companiesService.getBranches(id, req.user.sub);
  }
}
