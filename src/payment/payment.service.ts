import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CartService } from '../cart/cart.service';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { AuthService } from '../auth/auth.service';
import { OrdersService } from '../orders/orders.service';
import { OrderItemService } from '../order-items/order-items.service';
import { OrderStatus, Order } from '../entities/order.entity';
import { NotificationService } from '../notifications/notification.service';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class PaymentService {
  private client: MercadoPagoConfig;  constructor(
    private readonly configService: ConfigService,
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService,
    private readonly orderItemService: OrderItemService,
    private readonly notificationService: NotificationService,
  ) {
    const accessToken = this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not defined');
    }
    this.client = new MercadoPagoConfig({
      accessToken,
    });
  }

  async createPaymentPreference(cartId: string) {
    try {
      const cart = await this.cartService.findOne(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      const frontendUrl = this.configService.get('FRONTEND_URL');
      if (!frontendUrl) {
        throw new Error('FRONTEND_URL is not defined');
      }

      const preference = new Preference(this.client);
      const response = await preference.create({
        body: {
          items: cart.cartItems.map(item => {
            const product = item.candle || item.gift;
            const type = item.candle ? 'Vela' : 'Regalo';
            
            return {
              id: item.id,
              title: `${type}: ${product?.name || 'Producto'}`,
              description: `Cantidad: ${item.quantity} - Precio unitario: $${Number(item.unitPrice).toLocaleString('es-CO')}`,
              unit_price: Number(item.unitPrice),
              quantity: item.quantity,
              currency_id: 'COP',
            };
          }),
          back_urls: {
            success: `${frontendUrl}/payment/success`,
            failure: `${frontendUrl}/payment/failure`,
            pending: `${frontendUrl}/payment/pending`,
          },
          external_reference: cartId,
        }
      });

      return response;
    } catch (error) {
      console.error('Error creating payment preference:', error);
      throw error;
    }
  }  async handleWebhook(data: any) {
    try {
      if (data.type === 'payment') {
        const payment = new Payment(this.client);
        const paymentInfo = await payment.get({ id: data.data.id });
        
        console.log('Payment info:', {
          id: paymentInfo.id,
          status: paymentInfo.status,
          external_reference: paymentInfo.external_reference,
          transaction_amount: paymentInfo.transaction_amount
        });
        
        const cartId = paymentInfo.external_reference;
        
        if (!cartId) {
          throw new Error('No cart reference found in payment');
        }

        if (paymentInfo.status === 'approved') {
          console.log('Payment approved, processing order creation...');
          
          // Obtener el carrito con todas sus relaciones completas
          const cart = await this.cartService.findOne(cartId);
          if (!cart) {
            throw new Error('Cart not found');
          }

          console.log('Cart found:', {
            id: cart.id,
            userId: cart.userId?.id,
            itemsCount: cart.cartItems?.length || 0
          });

          // Verificar que el carrito tenga items
          if (!cart.cartItems || cart.cartItems.length === 0) {
            throw new Error('Cart is empty, cannot create order');
          }          // Obtener información completa del usuario
          let user = cart.userId;
          if (!user || typeof user === 'string') {
            user = await this.authService.findOne(typeof cart.userId === 'string' ? cart.userId : cart.userId?.id);
          }
          if (!user) {
            throw new Error('User not found');
          }

          console.log('User found:', {
            id: user.id,
            email: user.email,
            name: user.name
          });

          // Calcular el total real del carrito
          const calculatedTotal = cart.cartItems.reduce((sum, item) => {
            return sum + (Number(item.totalPrice) || 0);
          }, 0);

          console.log('Cart totals:', {
            paymentAmount: paymentInfo.transaction_amount,
            calculatedTotal: calculatedTotal
          });          // Crear la orden con información más completa
          const orderData: Partial<Order> = {
            userId: user,
            totalAmount: paymentInfo.transaction_amount || calculatedTotal,
            status: OrderStatus.PENDING,
            paymentDetails: {
              method: 'MERCADO_PAGO',
              transactionId: paymentInfo.id?.toString() || '',
              status: paymentInfo.status || 'approved'
            },
            shippingAddress: {
              street: user.address || 'Por definir',
              city: user.city || 'Por definir',
              state: user.state || 'Por definir',
              country: user.country || 'Colombia',
              zipCode: '000000' // Valor por defecto ya que User no tiene zipCode
            }
          };

          console.log('Creating order with data:', orderData);

          // Crear la orden
          const order = await this.ordersService.createOrder(orderData);
          
          console.log('Order created:', {
            id: order.id,
            userId: order.userId,
            totalAmount: order.totalAmount
          });          // Crear los order items con validación mejorada
          const orderItemsCreated: OrderItem[] = [];
          for (const cartItem of cart.cartItems) {
            try {
              console.log('Creating order item for cart item:', {
                cartItemId: cartItem.id,
                candleId: cartItem.candle?.id,
                giftId: cartItem.gift?.id,
                quantity: cartItem.quantity,
                unitPrice: cartItem.unitPrice,
                totalPrice: cartItem.totalPrice
              });

              const orderItemData = {
                orderId: order.id,
                candleId: cartItem.candle?.id || undefined,
                giftId: cartItem.gift?.id || undefined,
                quantity: cartItem.quantity,
                unitPrice: Number(cartItem.unitPrice) || 0,
                totalPrice: Number(cartItem.totalPrice) || 0
              };

              const createdOrderItem = await this.orderItemService.create(orderItemData);
              orderItemsCreated.push(createdOrderItem);
              
              console.log('Order item created successfully:', createdOrderItem.id);
            } catch (itemError) {
              console.error('Error creating order item:', itemError);
              throw new Error(`Failed to create order item: ${itemError.message}`);
            }
          }          console.log(`Successfully created ${orderItemsCreated.length} order items`);

          // Enviar notificaciones a los managers
          try {
            console.log('Sending notifications to managers...');
            await this.notificationService.notifyManagersNewOrder(order);
            console.log('✅ Manager notifications sent successfully');
          } catch (notificationError) {
            console.error('❌ Failed to send manager notifications:', notificationError);
            // No lanzamos error porque la orden ya fue creada exitosamente
          }

          // Eliminar el carrito después de crear la orden exitosamente
          try {
            await this.cartService.remove(cartId);
            console.log('Cart removed successfully');
          } catch (removeError) {
            console.error('Error removing cart:', removeError);
            // No lanzamos error aquí porque la orden ya fue creada exitosamente
          }

          console.log('=== ORDER CREATION COMPLETED ===');
          return { 
            message: 'Order created and cart removed after successful payment',
            orderId: order.id,
            orderItemsCount: orderItemsCreated.length
          };
        }
        
        console.log('Payment not approved, status:', paymentInfo.status);
        return { message: 'Cart maintained due to payment status: ' + paymentInfo.status };
      }
      
      console.log('Webhook received but no action taken, type:', data.type);
      return { message: 'Webhook received but no action taken' };
    } catch (error) {
      console.error('=== WEBHOOK HANDLER ERROR ===');
      console.error('Error details:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async getPaymentStatus(paymentId: string) {
    try {
      const payment = new Payment(this.client);
      const paymentInfo = await payment.get({ id: paymentId });
      
      return {
        status: paymentInfo.status,
        external_reference: paymentInfo.external_reference,
      };
    } catch (error) {
      console.error('Error getting payment status:', error);
      throw error;
    }
  }

  async testManagerNotification(orderId: string) {
    try {
      console.log('=== TESTING MANAGER NOTIFICATION ===');
      console.log('Order ID:', orderId);

      // Obtener la orden con todas las relaciones
      const order = await this.ordersService.findOne(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      console.log('Order found:', {
        id: order.id,
        userId: order.userId?.id,
        totalAmount: order.totalAmount,
        itemsCount: order.items?.length || 0
      });

      // Enviar notificación de prueba
      await this.notificationService.notifyManagersNewOrder(order);

      return {
        message: 'Test notification sent successfully',
        orderId: order.id,
        userInfo: {
          id: order.userId?.id,
          name: order.userId?.name,
          email: order.userId?.email
        }
      };
    } catch (error) {
      console.error('Error in test notification:', error);
      throw error;
    }
  }
}