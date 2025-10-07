import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      const mailOptions = {
        from: this.configService.get<string>('EMAIL_FROM'),
        to,
        subject,
        html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendNewOrderNotification(
    managerEmails: string[],
    orderId: string,
    orderDetails: {
      customerName: string;
      totalAmount: number;
      itemsCount: number;
    }
  ): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000/';
    const orderUrl = `${frontendUrl}admin/management/orders/${orderId}`;

    const subject = '🕯️ Nueva Orden Creada - AromaLife';
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Orden - AromaLife</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
          }
          .header .icon {
            font-size: 48px;
            margin-bottom: 15px;
          }
          .content {
            padding: 30px 20px;
          }
          .order-info {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .order-info h3 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 18px;
          }
          .order-detail {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            padding: 5px 0;
            border-bottom: 1px solid #e9ecef;
          }
          .order-detail:last-child {
            border-bottom: none;
            font-weight: bold;
            font-size: 16px;
            color: #667eea;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 6px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
            transition: transform 0.2s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          .timestamp {
            color: #888;
            font-size: 12px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="icon">🕯️</div>
            <h1>Nueva Orden Recibida</h1>
          </div>
          
          <div class="content">
            <p>¡Hola Manager!</p>
            <p>Se ha creado una nueva orden en AromaLife que requiere tu atención.</p>
            
            <div class="order-info">
              <h3>📋 Detalles de la Orden</h3>
              <div class="order-detail">
                <span>ID de Orden:</span>
                <span><strong>${orderId}</strong></span>
              </div>
              <div class="order-detail">
                <span>Cliente:</span>
                <span>${orderDetails.customerName}</span>
              </div>
              <div class="order-detail">
                <span>Cantidad de Items:</span>
                <span>${orderDetails.itemsCount} producto(s)</span>
              </div>
              <div class="order-detail">
                <span>Total:</span>
                <span>$${orderDetails.totalAmount.toLocaleString('es-CO')} COP</span>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="${orderUrl}" class="cta-button">
                👀 Ver Detalles de la Orden
              </a>
            </div>
            
            <p>Puedes revisar todos los detalles de la orden, gestionar el estado del pedido y comenzar el proceso de preparación haciendo clic en el botón de arriba.</p>
            
            <div class="timestamp">
              📅 Recibido el ${new Date().toLocaleString('es-CO', { 
                timeZone: 'America/Bogota',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          
          <div class="footer">
            <p>Este es un correo automático de AromaLife</p>
            <p>Sistema de Gestión de Órdenes</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email a todos los managers
    for (const email of managerEmails) {
      try {
        await this.sendEmail(email, subject, html);
        console.log(`Order notification sent to manager: ${email}`);
      } catch (error) {
        console.error(`Failed to send notification to ${email}:`, error);
      }
    }
  }
}
