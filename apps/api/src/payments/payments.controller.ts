import { Controller, Post, Body, UseGuards, Request, Req } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  createOrder(@Body('invoiceId') invoiceId: string, @Request() req: any) {
    return this.paymentsService.createOrder(invoiceId, req.user.sub);
  }

  // Webhook does not use JwtAuthGuard, it relies on Razorpay Signature verification
  @Post('webhook')
  handleWebhook(@Req() req: RawBodyRequest<ExpressRequest>) {
    return this.paymentsService.handleWebhook(req);
  }
}
