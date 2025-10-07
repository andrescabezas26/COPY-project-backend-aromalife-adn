import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AromasService } from '../../../src/aromas/aromas.service';
import { Aroma } from '../../../src/entities/aroma.entity';
import { NotFoundException } from '@nestjs/common';
import { IntendedImpact } from '../../../src/entities/intendedImpact.entity';

describe('AromasService', () => {
  let service: AromasService;
  let repository: Repository<Aroma>;

  const mockAroma = {
    id: '1',
    name: 'Test Aroma',
    description: 'Test Description',
    isActive: true,
  };

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(aroma => Promise.resolve({ id: '1', ...aroma })),
    find: jest.fn().mockImplementation(() => Promise.resolve([mockAroma])),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => 
      id === '1' ? Promise.resolve(mockAroma) : Promise.resolve(null)
    ),
    update: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
    delete: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AromasService,
        {
          provide: getRepositoryToken(Aroma),
          useValue: mockRepository,
        },
        {
    provide: getRepositoryToken(IntendedImpact),
    useValue: {}, // mock vacío por ahora
  },
      ],
    }).compile();

    service = module.get<AromasService>(AromasService);
    repository = module.get<Repository<Aroma>>(getRepositoryToken(Aroma));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new aroma', async () => {
      const createAromaDto = {
        name: 'Test Aroma',
        description: 'Test Description',
        isActive: true,
      };

      const result = await service.create(createAromaDto);
      expect(result).toEqual({
        id: '1',
        ...createAromaDto,
      });
      expect(repository.create).toHaveBeenCalledWith(createAromaDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of aromas', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockAroma]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single aroma', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockAroma);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when aroma not found', async () => {
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an aroma', async () => {
      const updateAromaDto = { name: 'Updated Aroma' };
      const result = await service.update('1', updateAromaDto);
      expect(result).toEqual(mockAroma);
      expect(repository.update).toHaveBeenCalledWith('1', updateAromaDto);
    });

    it('should throw NotFoundException when updating non-existent aroma', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.update('2', { name: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an aroma', async () => {
      await service.remove('1');
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when removing non-existent aroma', async () => {
      mockRepository.delete.mockResolvedValueOnce({ affected: 0 });
      await expect(service.remove('2')).rejects.toThrow(NotFoundException);
    });
  });
}); 