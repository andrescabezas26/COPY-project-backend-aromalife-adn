import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { MainOption } from '../entities/mainOption.entity';
  import { CreateMainOptionDto } from './dto/create-main-option.dto';
  import { UpdateMainOptionDto } from './dto/update-main-option.dto';
  
  @Injectable()
  export class MainOptionsService {
    constructor(
      @InjectRepository(MainOption)
      private readonly mainOptionRepo: Repository<MainOption>,
    ) {}
  
    async create(dto: CreateMainOptionDto): Promise<MainOption> {
      const mainOption = this.mainOptionRepo.create(dto);
      const saved = await this.mainOptionRepo.save(mainOption);
      if (!saved) {
        throw new InternalServerErrorException('Main option could not be created');
      }
      return saved;
    }
  
    async findAll(): Promise<MainOption[]> {
      const result = await this.mainOptionRepo.find();
      if (!result || result.length === 0) {
        throw new NotFoundException('No main options found');
      }
      return result;
    }
  
    async findOne(id: string): Promise<MainOption> {
      const found = await this.mainOptionRepo.findOne({ where: { id } });
      if (!found) {
        throw new NotFoundException('Main option not found');
      }
      return found;
    }
  
    async update(id: string, dto: UpdateMainOptionDto): Promise<MainOption> {
      const exists = await this.mainOptionRepo.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Main option not found');
      }
      await this.mainOptionRepo.update(id, dto);
      return this.findOne(id);
    }
  
    async remove(id: string): Promise<void> {
      const exists = await this.mainOptionRepo.findOne({ where: { id } });
      if (!exists) {
        throw new NotFoundException('Main option not found');
      }
      await this.mainOptionRepo.delete(id);
    }

    async getMainOptionsCount(): Promise<{ count: number }> {
      try {
        const count = await this.mainOptionRepo.count();
        return { count };
      } catch (error) {
        console.error('Error in getMainOptionsCount:', error);
        throw error;
      }
    }
  }
  