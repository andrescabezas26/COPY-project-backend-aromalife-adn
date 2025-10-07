import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../common/config/multer.config';
import passport from 'passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CloudinaryService, MulterConfigService],

  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') as string | 'secret',
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') | 6000 },
      }),
   
    }), 
  ],  exports: [
    TypeOrmModule,
    AuthService,
    JwtStrategy,
    PassportModule
  ],
})
export class AuthModule {}
