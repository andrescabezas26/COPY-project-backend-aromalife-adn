import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IntendedImpactService } from '../../../src/intendedImpacts/intendedImpact.service';
import { IntendedImpact } from '../../../src/entities/intendedImpact.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateIntendedImpactDto } from '../../../src/intendedImpacts/dto/create-intended-impact.dto';
import { UpdateIntendedImpactDto } from '../../../src/intendedImpacts/dto/update-intended-impact.dto';
import { MainOption } from '../../../src/entities/mainOption.entity';
import { Place } from '../../../src/entities/place.entity';

describe('IntendedImpactService', () => {
  let service: IntendedImpactService;
  let repository: jest.Mocked<Repository<IntendedImpact>>;

  const mockIntendedImpact: IntendedImpact = {
    id: 'uuid-123',
    name: 'Relajación',
    icon: '🧘',
    description: 'Sensación de calma',
    aromas: [],
    place: {} as any,
    mainOption: {} as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntendedImpactService,
        {
          provide: getRepositoryToken(IntendedImpact),
          useValue: {
            create: jest.fn().mockReturnValue(mockIntendedImpact),
            save: jest.fn().mockResolvedValue(mockIntendedImpact),
            find: jest.fn().mockResolvedValue([mockIntendedImpact]),
            findOne: jest.fn().mockResolvedValue(mockIntendedImpact),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: getRepositoryToken(MainOption),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Place),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<IntendedImpactService>(IntendedImpactService);
    repository = module.get(getRepositoryToken(IntendedImpact));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an intended impact', async () => {
      const dto: CreateIntendedImpactDto = {
        name: 'Relajación',
        icon: '🧘',
        description: 'Calma',
        placeId: 'place-1',
        mainOptionId: 'main-1',
      };
      const result = await service.create(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(mockIntendedImpact);
      expect(result).toEqual(mockIntendedImpact);
    });
  });

  describe('findAll', () => {
    it('should return all intended impacts', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockIntendedImpact]);
    });

    it('should throw if no intended impacts found', async () => {
      repository.find.mockResolvedValue([]);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return one intended impact', async () => {
      const result = await service.findOne('uuid-123');
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-123' } });
      expect(result).toEqual(mockIntendedImpact);
    });

    it('should throw if intended impact not found', async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne('uuid-123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the intended impact', async () => {
      const dto: UpdateIntendedImpactDto = {
        name: 'Nuevo nombre',
        icon: '✨',
        description: 'Otro texto',
        placeId: 'nuevo-place',
        mainOptionId: 'nuevo-main',
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockIntendedImpact);
      const result = await service.update('uuid-123', dto);

      expect(result).toEqual(mockIntendedImpact);
      expect(repository.save).toHaveBeenCalledWith(mockIntendedImpact);
    });
  });

  describe('remove', () => {
    it('should delete the intended impact', async () => {
      const result = await service.remove('uuid-123');
      expect(repository.delete).toHaveBeenCalledWith('uuid-123');
      expect(result).toBeUndefined();
    });
  });
});
