import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MainOption } from '../entities/mainOption.entity';
import { MainOptionsService } from './mainOption.service';
import { MainOptionsController } from './mainOption.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MainOption]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MainOptionsController],
  providers: [MainOptionsService],
  exports: [MainOptionsService, TypeOrmModule],
})
export class MainOptionModule {}
