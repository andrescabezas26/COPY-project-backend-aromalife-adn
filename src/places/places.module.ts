import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../entities/place.entity';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService, TypeOrmModule],
})
export class PlacesModule {}