import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entity/user.entity';
import { Order } from '../entities/order.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async notifyManagersNewOrder(order: Order): Promise<void> {
    try {
      console.log('=== NOTIFYING MANAGERS OF NEW ORDER ===');
      console.log('Order ID:', order.id);      // Obtener todos los usuarios con rol de manager
      const managers = await this.userRepository
        .createQueryBuilder('user')
        .where(':role = ANY(user.roles)', { role: 'manager' })
        .andWhere('user.isActive = :isActive', { isActive: true })
        .getMany();

        console.log("MANAGER")

      console.log(`Found ${managers.length} active managers`);

      if (managers.length === 0) {
        console.log('No managers found to notify');
        return;
      }

      // Extraer emails de los managers
      const managerEmails = managers.map(manager => manager.email);
      console.log('Manager emails:', managerEmails);

      // Preparar detalles de la orden para el email
      const orderDetails = {
        customerName: `${order.userId.name} ${order.userId.lastName}`,
        totalAmount: Number(order.totalAmount),
        itemsCount: order.items?.length || 0,
      };

      console.log('Order details for notification:', orderDetails);

      // Enviar notificación por email
      await this.emailService.sendNewOrderNotification(
        managerEmails,
        order.id,
        orderDetails
      );

      console.log('✅ Manager notifications sent successfully');
    } catch (error) {
      console.error('❌ Error notifying managers:', error);
      // No lanzamos el error para no afectar el flujo principal del webhook
    }
  }

  async notifyOrderStatusChange(
    orderId: string,
    newStatus: string,
    customerEmail: string
  ): Promise<void> {
    try {
      console.log(`Notifying customer of order status change: ${orderId} -> ${newStatus}`);
      
      // Aquí puedes implementar notificaciones al cliente si es necesario
      // Por ahora solo loggeamos
      console.log(`Would notify ${customerEmail} about status change to ${newStatus}`);
      
    } catch (error) {
      console.error('Error notifying customer of status change:', error);
    }
  }
}
