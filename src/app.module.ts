import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { CandlesModule } from './candles/candles.module';
import { GiftsModule } from './gifts/gifts.module';
import { ReviewsModule } from './reviews/reviews.module';
import { IntendedImpactModule } from './intendedImpacts/intendedImpact.module';
import { MainOptionModule } from './mainOptions/mainOption.module';
import { AromasModule } from './aromas/aromas.module';
import { ContainersModule } from './containers/containers.module';
import { PlacesModule } from './places/places.module';
import { AiModule } from './ai/ai.module';
import { LabelsModule } from './labels/labels.module';
import { SpotifyModule } from './spotify/spotify.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderItemModule } from './order-items/order-items.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProd = process.env.NODE_ENV === 'production';

        if (isProd) {
          return {
            type: 'postgres',
            url: configService.get('DATABASE_URL'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            ssl: {
              rejectUnauthorized: false, // Necesario para algunas plataformas cloud
            },
            logging: true,
          };
        }

        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    OrdersModule,
    CandlesModule,
    GiftsModule,
    ReviewsModule,
    IntendedImpactModule,
    MainOptionModule,
    AromasModule,
    ContainersModule,
    PlacesModule,
    AiModule,
    LabelsModule,
    SpotifyModule,
    CartItemModule,
    OrderItemModule,
    CartModule,
    PaymentModule,
  ],
  providers: [AppService],
})
export class AppModule {}
