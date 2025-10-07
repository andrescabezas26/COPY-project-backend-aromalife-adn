import { Test, TestingModule } from '@nestjs/testing';
import { CandlesController } from '../../../src/candles/candles.controller';
import { CandlesService } from '../../../src/candles/candles.service';
import { Candle } from '../../../src/entities/candle.entity';
import { Container } from '../../../src/entities/container.entity';
import { Aroma } from '../../../src/entities/aroma.entity';
import { Gift } from '../../../src/entities/gift.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../src/auth/entity/user.entity';

describe('CandlesController', () => {
  let controller: CandlesController;
  let service: CandlesService;
  let userRepo: any;

  const mockCandle = {
    id: '1',
    name: 'Test Candle',
    description: 'Test Description',
    isActive: true,
  };

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(candle => Promise.resolve({ id: '1', ...candle })),
    find: jest.fn().mockImplementation(() => Promise.resolve([mockCandle])),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => 
      id === '1' ? Promise.resolve(mockCandle) : Promise.resolve(null)
    ),
    update: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
    delete: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
    
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandlesController],
      providers: [
        CandlesService,
        {
          provide: getRepositoryToken(Candle),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Container),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Aroma),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Gift),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CandlesController>(CandlesController);
    service = module.get<CandlesService>(CandlesService);
    userRepo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of candles', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockCandle]);
    });
  });

  describe('findOne', () => {
    it('should return a candle', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockCandle);
    });
  });

  describe('create', () => {
    it('should create a candle', async () => {
      const createCandleDto = {
        name: 'Test Candle',
        description: 'Test Description',
        isActive: true,
      };
      const result = await controller.create(createCandleDto);
      expect(result).toEqual({
        id: '1',
        ...createCandleDto,
      });
    });
  });

  describe('update', () => {
    it('should update a candle', async () => {
      const updateCandleDto = { name: 'Updated Candle' };
      const result = await controller.update('1', updateCandleDto);
      expect(result).toEqual(mockCandle);
    });
  });

  describe('remove', () => {
    it('should remove a candle', async () => {
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
    });
  });
}); 