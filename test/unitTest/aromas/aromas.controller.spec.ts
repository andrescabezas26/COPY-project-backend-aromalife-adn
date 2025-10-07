import { Test, TestingModule } from '@nestjs/testing';
import { AromasController } from '../../../src/aromas/aromas.controller';
import { AromasService } from '../../../src/aromas/aromas.service';
import { Aroma } from '../../../src/entities/aroma.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IntendedImpact } from '../../../src/entities/intendedImpact.entity';

describe('AromasController', () => {
  let controller: AromasController;
  let service: AromasService;

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
      controllers: [AromasController],
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

    controller = module.get<AromasController>(AromasController);
    service = module.get<AromasService>(AromasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of aromas', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockAroma]);
    });
  });

  describe('findOne', () => {
    it('should return an aroma', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockAroma);
    });
  });

  describe('create', () => {
    it('should create an aroma', async () => {
      const createAromaDto = {
        name: 'Test Aroma',
        description: 'Test Description',
        isActive: true,
      };
      const result = await controller.create(createAromaDto);
      expect(result).toEqual({
        id: '1',
        ...createAromaDto,
      });
    });
  });

  describe('update', () => {
    it('should update an aroma', async () => {
      const updateAromaDto = { name: 'Updated Aroma' };
      const result = await controller.update('1', updateAromaDto);
      expect(result).toEqual(mockAroma);
    });
  });

  describe('remove', () => {
    it('should remove an aroma', async () => {
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
    });
  });
}); 