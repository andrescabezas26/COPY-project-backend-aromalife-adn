import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    try {
      const place = this.placeRepository.create(createPlaceDto);
      const saved = await this.placeRepository.save(place);
      if (!saved) {
        throw new InternalServerErrorException('Place could not be created');
      }
      return saved;
    } catch (error) {
      console.error('Error in create place:', error);
      throw error;
    }
  }

  async findAll(): Promise<Place[]> {
    try {
      const places = await this.placeRepository.find({});
      if (!places || places.length === 0) {
        throw new NotFoundException('No places found');
      }
      return places;
    } catch (error) {
      console.error('Error in findAll places:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Place> {
    try {
      const place = await this.placeRepository.findOne({ where: { id } });
      if (!place) {
        throw new NotFoundException('Place not found');
      }
      return place;
    } catch (error) {
      console.error('Error in findOne place:', error);
      throw error;
    }
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    try {
      const exists = await this.placeRepository.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Place not found');
      }
      await this.placeRepository.update(id, updatePlaceDto);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update place:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const exists = await this.placeRepository.findOne({ where: { id } });      if (!exists) {
        throw new NotFoundException('Place not found');
      }
      await this.placeRepository.delete(id);
    } catch (error) {
      console.error('Error in remove place:', error);
      throw error;
    }
  }

  async getPlacesCount(): Promise<{ count: number }> {
    try {
      const count = await this.placeRepository.count();
      return { count };
    } catch (error) {
      console.error('Error in getPlacesCount:', error);
      throw error;
    }
  }
}
