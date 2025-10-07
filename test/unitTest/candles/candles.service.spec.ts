import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandlesService } from '../../../src/candles/candles.service';
import { Candle } from '../../../src/entities/candle.entity';
import { Container } from '../../../src/entities/container.entity';
import { Aroma } from '../../../src/entities/aroma.entity';
import { Gift } from '../../../src/entities/gift.entity';
import { User } from '../../../src/auth/entity/user.entity';

describe('CandlesService', () => {
  let service: CandlesService;
  let candleRepository;
  let containerRepository;
  let aromaRepository;
  let giftRepository;
  let userRepository;

  const mockCandle = {
    id: '1',
    name: 'Test Candle',
    description: 'Test Description',
    price: 50,
    isActive: true,
    container: { id: '1', name: 'Test Container' },
    aroma: { id: '1', name: 'Test Aroma' },
    gift: { id: '1', name: 'Test Gift' }
  };

  const mockRepositories = {
    candle: {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      preload: jest.fn(),
    },
    container: {
      find: jest.fn(),
    },
    aroma: {
      findOne: jest.fn(),
    },
    gift: {
      find: jest.fn(),
    },
    user: {
      findOne: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandlesService,
        {
          provide: getRepositoryToken(Candle),
          useValue: mockRepositories.candle,
        },
        {
          provide: getRepositoryToken(Container),
          useValue: mockRepositories.container,
        },
        {
          provide: getRepositoryToken(Aroma),
          useValue: mockRepositories.aroma,
        },
        {
          provide: getRepositoryToken(Gift),
          useValue: mockRepositories.gift,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepositories.user,
        },
      ],
    }).compile();

    service = module.get<CandlesService>(CandlesService);
    candleRepository = module.get(getRepositoryToken(Candle));
    containerRepository = module.get(getRepositoryToken(Container));
    aromaRepository = module.get(getRepositoryToken(Aroma));
    giftRepository = module.get(getRepositoryToken(Gift));
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCandle', () => {
    it('should create a new candle', async () => {
      candleRepository.create.mockReturnValueOnce(mockCandle); // Mock para crear la vela
      candleRepository.save.mockResolvedValueOnce(mockCandle); // Mock para guardar la vela

      const createCandleDto = {
        name: 'Test Candle',
        description: 'Test Description',
        price: 50,
        containerId: '1',
        aromaId: '1',
        giftId: '1',
        isActive: true,
      };

      const result = await service.createCandle(createCandleDto);
      expect(result).toEqual(mockCandle);
      expect(candleRepository.create).toHaveBeenCalledWith(createCandleDto);
      expect(candleRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if container not found', async () => {
      containerRepository.find.mockResolvedValueOnce([]);
      const createCandleDto = {
        name: 'Test Candle',
        description: 'Test Description',
        price: 50,
        containerId: '2',
        aromaId: '1',
        giftId: '1',
        isActive: true,
      };

      await expect(service.createCandle(createCandleDto)).rejects.toThrow('Candle could not be created');
    });

    it('should throw NotFoundException if aroma not found', async () => {
      aromaRepository.findOne.mockResolvedValueOnce(null);
      const createCandleDto = {
        name: 'Test Candle',
        description: 'Test Description',
        price: 50,
        containerId: '1',
        aromaId: '2',
        giftId: '1',
        isActive: true,
      };

      await expect(service.createCandle(createCandleDto)).rejects.toThrow('Candle could not be created');
    });
  });

  describe('findAll', () => {
    it('should return an array of candles', async () => {
      candleRepository.find.mockResolvedValueOnce([mockCandle]); // 👈 mock válido
      const result = await service.findAll();
      expect(result).toEqual([mockCandle]);
      expect(candleRepository.find).toHaveBeenCalledWith({});
    });

    it('should throw NotFoundException if no candles found', async () => {
      candleRepository.find.mockResolvedValueOnce([]);
      await expect(service.findAll()).rejects.toThrow('No candles found');
    });
  });

  describe('findOne', () => {
    it('should return a single candle', async () => {
      candleRepository.findOne.mockResolvedValueOnce(mockCandle); // 👈 mock correcto
      const result = await service.findOne('1');
      expect(result).toEqual(mockCandle);
      expect(candleRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw error when candle not found', async () => {
      candleRepository.findOne.mockResolvedValueOnce(null); // 👈 asegurar que no lo encuentra
      await expect(service.findOne('2')).rejects.toThrow('Candle not found');
    });
  });

  describe('update', () => {
    /*
    it('should update a candle', async () => {
      const updateCandleDto = { name: 'Updated Candle', aromaId: '1' };

      candleRepository.findOne.mockResolvedValueOnce(mockCandle); // Mock para encontrar la vela
      aromaRepository.findOne.mockResolvedValueOnce({ id: '1', name: 'Test Aroma' }); // Mock para encontrar el aroma
      candleRepository.update.mockResolvedValueOnce({ affected: 1 }); // Mock para actualizar la vela
      candleRepository.findOne.mockResolvedValueOnce(mockCandle); // Mock para devolver la vela actualizada

      const result = await service.update('1', updateCandleDto);

      expect(result).toEqual(mockCandle);
      expect(candleRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(aromaRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(candleRepository.update).toHaveBeenCalledWith('1', updateCandleDto);
    });


    it('should throw NotFoundException if aroma not found for update', async () => {
      candleRepository.findOne.mockResolvedValueOnce(mockCandle); // Mock para encontrar la vela
      aromaRepository.findOne.mockResolvedValueOnce(null); // Simula que no se encuentra el aroma

      const updateCandleDto = { name: 'Updated Candle', aromaId: '2' };

      await expect(service.update('1', updateCandleDto)).rejects.toThrow('Candle not found');
      expect(aromaRepository.findOne).toHaveBeenCalledWith({ where: { id: '2' } });
    });
    */

    it('should throw NotFoundException if candle not found for update', async () => {
      candleRepository.findOne.mockResolvedValueOnce(null); // Simula que no se encuentra la vela

      const updateCandleDto = { name: 'Updated Candle' };

      await expect(service.update('2', updateCandleDto)).rejects.toThrow('Candle not found');
      expect(candleRepository.findOne).toHaveBeenCalledWith({ where: { id: '2' } });
    });
  });

  describe('remove', () => {
    it('should remove a candle', async () => {
      candleRepository.findOne.mockResolvedValueOnce(mockCandle); // Mock válido para encontrar la vela
      candleRepository.delete.mockResolvedValueOnce({ affected: 1 }); // Mock para eliminar la vela

      await service.remove('1');
      expect(candleRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(candleRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if candle not found', async () => {
      candleRepository.findOne.mockResolvedValueOnce(null); // Simula que no se encuentra la vela

      await expect(service.remove('1')).rejects.toThrow('Candle not found');
      expect(candleRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  /*describe('getContainers', () => {
    it('should return an array of containers', async () => {
      const mockContainer = { id: '1', name: 'Test Container' }; 
      containerRepository.find.mockResolvedValueOnce(mockContainer); // Mock válido
      const result = await service.getContainers();
      expect(result).toEqual([mockContainer]);
      expect(containerRepository.findOne).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no containers found', async () => {
      containerRepository.find.mockResolvedValueOnce([]);
      await expect(service.getContainers()).rejects.toThrow('No containers found');
    });
  });*/

  describe('getGifts', () => {
    it('should return an array of gifts', async () => {
      giftRepository.find.mockResolvedValueOnce([{ id: '1', name: 'Test Gift' }]); // Mock válido
      const result = await service.getGifts();
      expect(result).toEqual([{ id: '1', name: 'Test Gift' }]);
      expect(giftRepository.find).toHaveBeenCalled();
    });
  });
});