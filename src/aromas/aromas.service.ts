import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aroma } from '../entities/aroma.entity';
import { IntendedImpact } from '../entities/intendedImpact.entity';

@Injectable()
export class AromasService {
  constructor(
    @InjectRepository(Aroma)
    private readonly aromaRepository: Repository<Aroma>,
    @InjectRepository(IntendedImpact)
    private readonly intendedImpactRepository: Repository<IntendedImpact>,
  ) {}

  async create(createAromaDto: Partial<Aroma>): Promise<Aroma> {
    try {
      const aroma = this.aromaRepository.create(createAromaDto);
      return await this.aromaRepository.save(aroma);
    } catch (error) {
      console.error('Error in create aroma:', error);
      throw error;
    }
  }  async findAll(relations?: string): Promise<Aroma[]> {
    try {
      const findOptions: any = {};
      
      // Add relations if specified
      if (relations) {
        const relationsArray = relations.split(',').map(rel => rel.trim());
        findOptions.relations = relationsArray;
      }

      const aromas = await this.aromaRepository.find(findOptions);
      // Return empty array instead of throwing exception when no aromas are found
      return aromas || [];
    } catch (error) {
      console.error('Error in findAll aromas:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Aroma> {
    try {
      const aroma = await this.aromaRepository.findOne({ where: { id } });
      if (!aroma) {
        throw new NotFoundException('Aroma not found');
      }
      return aroma;
    } catch (error) {
      console.error('Error in findOne aroma:', error);
      throw error;
    }
  }

  async update(id: string, updateAromaDto: Partial<Aroma>): Promise<Aroma> {
    try {
      await this.aromaRepository.update(id, updateAromaDto);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update aroma:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.aromaRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Aroma not found');
      }
    } catch (error) {
      console.error('Error in remove aroma:', error);
      throw error;
    }
  }

  async assignIntendedImpact(
    aromaId: string,
    intendedImpactId: string,
  ): Promise<Aroma> {
    try {
      const aroma = await this.aromaRepository.findOne({
        where: { id: aromaId },
        relations: ['intendedImpacts'], // Load existing intended impacts
      });
      if (!aroma) {
        throw new NotFoundException(`Aroma with ID ${aromaId} is not found`);
      }

      const intendedImpact = await this.intendedImpactRepository.findOne({
        where: { id: intendedImpactId },
      });
      if (!intendedImpact) {
        throw new NotFoundException(
          `IntendedImpact with ID ${intendedImpactId} not found`,
        );
      }      // Check if the intended impact is already associated with this aroma to avoid duplicates
      const isAlreadyAssociated = aroma.intendedImpacts.some(
        impact => impact.id === intendedImpactId
      );

      if (isAlreadyAssociated) {
        // Return the aroma as-is if the relation already exists
        return aroma;
      }

      // Add the intended impact to the aroma's intendedImpacts array
      aroma.intendedImpacts.push(intendedImpact);

      return this.aromaRepository.save(aroma);
    } catch (error) {
      console.error('Error in assignIntendedImpact:', error);
      throw error;
    }
  }

  async removeIntendedImpact(
    aromaId: string,
    intendedImpactId: string,
  ): Promise<Aroma> {
    try {
      const aroma = await this.aromaRepository.findOne({
        where: { id: aromaId },
        relations: ['intendedImpacts'], // Load existing intended impacts
      });
      if (!aroma) {
        throw new NotFoundException(`Aroma with ID ${aromaId} is not found`);
      }

      const intendedImpact = await this.intendedImpactRepository.findOne({
        where: { id: intendedImpactId },
      });
      if (!intendedImpact) {
        throw new NotFoundException(
          `IntendedImpact with ID ${intendedImpactId} not found`,
        );
      }

      // Check if the intended impact is actually associated with this aroma
      const impactIndex = aroma.intendedImpacts.findIndex(
        impact => impact.id === intendedImpactId
      );
      
      if (impactIndex === -1) {
        throw new NotFoundException(
          `IntendedImpact with ID ${intendedImpactId} is not associated with aroma ${aromaId}`,
        );
      }

      // Remove the intended impact from the aroma's intendedImpacts array
      aroma.intendedImpacts.splice(impactIndex, 1);

      return this.aromaRepository.save(aroma);
    } catch (error) {
      console.error('Error in removeIntendedImpact:', error);
      throw error;
    }
  }

  async findByMainOptionAndPlace(
    mainOptionId: string,
    placeId?: string,
  ): Promise<Aroma[]> {
    try {
      const query = this.aromaRepository
        .createQueryBuilder('aroma')
        .leftJoinAndSelect('aroma.intendedImpacts', 'intendedImpact')
        .leftJoinAndSelect('intendedImpact.mainOption', 'mainOption')
        .leftJoinAndSelect('intendedImpact.place', 'place')
        .where('intendedImpact.mainOptionId = :mainOptionId', { mainOptionId });

      if (placeId) {
        query.andWhere('intendedImpact.placeId = :placeId', { placeId });
      }      const aromas = await query.getMany();

      // Return empty array instead of throwing exception when no aromas are found
      return aromas || [];
    } catch (error) {
      console.error('Error in findByMainOptionAndPlace:', error);
      throw error;
    }
  }
  async findByIntendedImpact(intendedImpactId: string): Promise<Aroma[]> {
    try {
      const aromas = await this.aromaRepository
        .createQueryBuilder('aroma')
        .leftJoinAndSelect('aroma.intendedImpacts', 'intendedImpact')
        .where('intendedImpact.id = :intendedImpactId', { intendedImpactId })
        .getMany();

      // Return empty array instead of throwing exception when no aromas are found
      // This allows the frontend to handle empty relations gracefully
      return aromas || [];
    } catch (error) {
      console.error('Error in findByIntendedImpact:', error);
      throw error;
    }
  }

  async findByCompleteTestResults(
    intendedImpactId: string,
    mainOptionId?: string,
    placeId?: string,
  ): Promise<Aroma[]> {
    try {
      let query = this.aromaRepository
        .createQueryBuilder('aroma')
        .leftJoinAndSelect('aroma.intendedImpacts', 'intendedImpact')
        .where('intendedImpact.id = :intendedImpactId', { intendedImpactId });

      // If mainOption and place are provided, add additional filters through the intendedImpact relationships
      if (mainOptionId) {
        query = query
          .leftJoin('intendedImpact.mainOption', 'mainOption')
          .andWhere('mainOption.id = :mainOptionId', { mainOptionId });
      }

      if (placeId) {
        query = query
          .leftJoin('intendedImpact.place', 'place')
          .andWhere('place.id = :placeId', { placeId });
      }

      const aromas = await query.getMany();

      if (!aromas || aromas.length === 0) {
        throw new NotFoundException(
          `No aromas found for the specified test results`,
        );
      }      return aromas;
    } catch (error) {
      console.log('Error in findByCompleteTestResults:', error);
      console.error('Error in findByCompleteTestResults:', error);
      throw error;
    }
  }

  async getAromasCount(): Promise<{ count: number }> {
    try {
      const count = await this.aromaRepository.count();
      return { count };
    } catch (error) {
      console.error('Error in getAromasCount:', error);
      throw error;
    }
  }
}
