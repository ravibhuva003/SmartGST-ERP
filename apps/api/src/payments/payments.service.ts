import { Injectable, InternalServerErrorException, NotFoundException, RawBodyRequest } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
const Razorpay = require('razorpay');
import * as crypto from 'crypto';
import { Request } from 'express';

@Injectable()
export class PaymentsService {
  private razorpay: any;

  constructor(private prisma: PrismaService) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_placeholder_secret',
    });
  }

  async createOrder(invoiceId: string, userId: string) {
    // 1. Validate the invoice belongs to a company the user has access to
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        company: {
          include: {
            users: { where: { userId } }
          }
        }
      }
    });

    if (!invoice || invoice.company.users.length === 0) {
      throw new NotFoundException('Invoice not found or access denied');
    }

    if (invoice.status === 'PAID') {
      throw new InternalServerErrorException('Invoice is already paid');
    }

    // 2. Initialize Razorpay Order
    const amountInPaise = Math.round(Number(invoice.grandTotal) * 100);
    
    try {
      const order = await this.razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_inv_${invoice.invoiceNumber}`,
        notes: {
          invoiceId: invoice.id
        }
      });

      return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key', // Required for frontend
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create Razorpay order');
    }
  }

  async handleWebhook(req: RawBodyRequest<Request>) {
    const signature = req.headers['x-razorpay-signature'] as string;
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'placeholder_webhook_secret';

    if (!req.rawBody) {
      throw new InternalServerErrorException('Raw body is missing');
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(req.rawBody.toString())
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new InternalServerErrorException('Invalid webhook signature');
    }

    const event = req.body;

    if (event.event === 'payment.captured') {
      const paymentEntity = event.payload.payment.entity;
      const invoiceId = paymentEntity.notes?.invoiceId;

      if (invoiceId) {
        await this.prisma.invoice.update({
          where: { id: invoiceId },
          data: { status: 'PAID' }
        });
      }
    }

    return { status: 'ok' };
  }
}
