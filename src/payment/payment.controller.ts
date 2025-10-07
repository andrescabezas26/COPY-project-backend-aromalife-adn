import { Controller, Post, Param, Body, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-preference')
  async createPaymentPreference(@Body() body: { cartId: string }) {
    return this.paymentService.createPaymentPreference(body.cartId);
  }

  @Public()
  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    return this.paymentService.handleWebhook(body);
  }
  @Get('payment-status/:paymentId')
  async getPaymentStatus(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentStatus(paymentId);
  }

  @Public()
  @Post('test-notification/:orderId')
  async testNotification(@Param('orderId') orderId: string) {
    return this.paymentService.testManagerNotification(orderId);
  }
} 