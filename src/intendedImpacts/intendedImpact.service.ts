import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntendedImpact } from '../entities/intendedImpact.entity';
import { CreateIntendedImpactDto } from './dto/create-intended-impact.dto';
import { UpdateIntendedImpactDto } from './dto/update-intended-impact.dto';
import { MainOption } from '../entities/mainOption.entity';
import { Place } from '../entities/place.entity';

@Injectable()
export class IntendedImpactService {
  constructor(
    @InjectRepository(IntendedImpact)
    private readonly intendedImpactRepository: Repository<IntendedImpact>,
    @InjectRepository(MainOption)
    private readonly mainOptionRepo: Repository<MainOption>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async create(
    createIntendedImpactDto: CreateIntendedImpactDto,
  ): Promise<IntendedImpact> {

    console.log('Creating IntendedImpact with DTO:', createIntendedImpactDto);

    const intendedImpact = this.intendedImpactRepository.create(
      createIntendedImpactDto,
    );
    if (createIntendedImpactDto.mainOptionId) {
      const mainOption = await this.mainOptionRepo.findOne({
        where: { id: createIntendedImpactDto.mainOptionId },
      });
      if (!mainOption) {
        throw new NotFoundException(
          `MainOption with ID ${createIntendedImpactDto.mainOptionId} not found`,
        );
      }
      intendedImpact.mainOption = mainOption;
    }
    return this.intendedImpactRepository.save(intendedImpact);
  }

  async findAll(): Promise<IntendedImpact[]> {
    const intendedImpacts = await this.intendedImpactRepository.find();
    if (!intendedImpacts || intendedImpacts.length === 0) {
      throw new NotFoundException('No intended impacts found');
    }
    return intendedImpacts;
  }

  async findAllWithMainOption(): Promise<any[]> {
    const intendedImpacts = await this.intendedImpactRepository.find({
      relations: ['mainOption']
    });
    
    if (!intendedImpacts || intendedImpacts.length === 0) {
      throw new NotFoundException('No intended impacts found');
    }

    return intendedImpacts.map(impact => ({
      id: impact.id,
      name: impact.name,
      description: impact.description,
      icon: impact.icon,
      mainOptionName: impact.mainOption ? impact.mainOption.name : null,
      mainOptionEmoji: impact.mainOption ? impact.mainOption.emoji : null
    }));
  }

  async findOne(id: string, relations?: string): Promise<IntendedImpact> {
    const findOptions: any = {
      where: { id },
    };

    // Add relations if specified
    if (relations) {
      const relationsArray = relations.split(',').map(rel => rel.trim());
      findOptions.relations = relationsArray;
    }

    const intendedImpact = await this.intendedImpactRepository.findOne(findOptions);
    if (!intendedImpact) {
      throw new NotFoundException(`IntendedImpact with ID ${id} not found`);
    }
    return intendedImpact;
  }

  async update(
    id: string,
    updateIntendedImpactDto: UpdateIntendedImpactDto,
  ): Promise<IntendedImpact> {
    const intendedImpact = await this.findOne(id);
    Object.assign(intendedImpact, updateIntendedImpactDto);
    if (updateIntendedImpactDto.mainOptionId) {
      const mainOption = await this.mainOptionRepo.findOne({
        where: { id: updateIntendedImpactDto.mainOptionId },
      });
      if (!mainOption) {
        throw new NotFoundException(
          `MainOption with ID ${updateIntendedImpactDto.mainOptionId} not found`,
        );
      }
      intendedImpact.mainOption = mainOption;
    }
    return this.intendedImpactRepository.save(intendedImpact);
  }

  async remove(id: string): Promise<void> {
    const result = await this.intendedImpactRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`IntendedImpact with ID ${id} not found`);
    }
  }

  async assignMainOption(
    intendedImpactId: string,
    mainOptionId: string,
  ): Promise<IntendedImpact> {
    const intendedImpact = await this.intendedImpactRepository.findOne({
      where: { id: intendedImpactId },
    });
    if (!intendedImpact) {
      throw new NotFoundException(
        `IntendedImpact with ID ${intendedImpactId} not found`,
      );
    }

    const mainOption = await this.mainOptionRepo.findOne({
      where: { id: mainOptionId },
    });
    if (!mainOption) {
      throw new NotFoundException(
        `MainOption with ID ${mainOptionId} not found`,
      );
    }

    intendedImpact.mainOption = mainOption;
    return this.intendedImpactRepository.save(intendedImpact);
  }

  async assignPlace(
    intendedImpactId: string,
    placeId: string,
  ): Promise<IntendedImpact> {
    const intendedImpact = await this.intendedImpactRepository.findOne({
      where: { id: intendedImpactId },
    });
    if (!intendedImpact) {
      throw new NotFoundException(
        `IntendedImpact with ID ${intendedImpactId} not found`,
      );
    }

    const place = await this.placeRepository.findOne({
      where: { id: placeId },
    });
    if (!place) {
      throw new NotFoundException(`Place with ID ${placeId} not found`);
    }

    intendedImpact.place = place;
    return this.intendedImpactRepository.save(intendedImpact);
  }

  async findByMainOptionAndPlace(
    mainOptionId: string,
    placeId?: string,
  ): Promise<IntendedImpact[]> {
    const query = this.intendedImpactRepository
      .createQueryBuilder('intendedImpact')
      .leftJoinAndSelect('intendedImpact.mainOption', 'mainOption')
      .leftJoinAndSelect('intendedImpact.place', 'place')
      .where('intendedImpact.mainOptionId = :mainOptionId', { mainOptionId });

    if (placeId) {
      query.andWhere('intendedImpact.placeId = :placeId', { placeId });
    }

    const intendedImpacts = await query.getMany();    if (!intendedImpacts || intendedImpacts.length === 0) {
      throw new NotFoundException(
        `No intended impacts found for main option ${mainOptionId}${
          placeId ? ` and place ${placeId}` : ''
        }`,
      );
    }

    return intendedImpacts;
  }

  async getIntendedImpactsCount(): Promise<{ count: number }> {
    try {
      const count = await this.intendedImpactRepository.count();
      return { count };
    } catch (error) {
      console.error('Error in getIntendedImpactsCount:', error);
      throw error;
    }
  }
}
