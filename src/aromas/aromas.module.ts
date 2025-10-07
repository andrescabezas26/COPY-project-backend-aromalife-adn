import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aroma } from '../entities/aroma.entity';
import { AromasService } from './aromas.service';
import { AromasController } from './aromas.controller';
import { PassportModule } from '@nestjs/passport';
import { IntendedImpactModule } from '../intendedImpacts/intendedImpact.module';

@Module({
  imports: [TypeOrmModule.forFeature([Aroma]), PassportModule.register({ defaultStrategy: 'jwt' }), IntendedImpactModule],
  controllers: [AromasController],
  providers: [AromasService],
  exports: [AromasService, TypeOrmModule],
})
export class AromasModule {}
