import { Test, TestingModule } from '@nestjs/testing';
import { GiftsController } from '../../../src/gifts/gifts.controller';
import { GiftsService } from '../../../src/gifts/gifts.service';
import { Gift } from '../../../src/entities/gift.entity';
import { Order } from '../../../src/entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGiftDto } from '../../../src/gifts/dto/create-gift.dto';

describe('GiftsController', () => {
  let controller: GiftsController;
  let service: GiftsService;

  const mockGift = {
    id: '1',
    name: 'Test Gift',
    description: 'Test Description',
    price: 50,
    isActive: true,
    includedItems: [{ orderId: '1', quantity: 1 }],
    giftOptions: {
      wrapping: true,
      message: false,
      card: true,
    },
  };

  const mockOrder = {
    id: '1',
    status: 'PENDING',
    totalAmount: 100,
  };

  const mockRepositories = {
    gift: {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((gift) => Promise.resolve({ id: '1', ...gift })),
      find: jest.fn().mockImplementation(() => Promise.resolve([mockGift])),
      findOne: jest.fn().mockImplementation(({ where: { id } }) =>
        id === '1' ? Promise.resolve(mockGift) : Promise.resolve(null),
      ),
      update: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
      delete: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
    },
    order: {
      findByIds: jest.fn().mockImplementation((ids) =>
        ids.includes('1') ? Promise.resolve([mockOrder]) : Promise.resolve([]),
      ),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftsController],
      providers: [
        GiftsService,
        {
          provide: getRepositoryToken(Gift),
          useValue: mockRepositories.gift,
        },
        {
          provide: getRepositoryToken(Order),
          useValue: mockRepositories.order,
        },
      ],
    }).compile();

    controller = module.get<GiftsController>(GiftsController);
    service = module.get<GiftsService>(GiftsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of gifts', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockGift]);
    });
  });

  describe('findOne', () => {
    it('should return a gift', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockGift);
    });
  });

  describe('create', () => {
    it('should create a gift', async () => {
      const createGiftDto: CreateGiftDto = {
        name: 'Test Gift',
        description: 'Test Description',
        price: 50,
        includedItems: [{ orderId: '1', quantity: 1 }],
        giftOptions: {
          wrapping: true,
          message: false,
          card: true,
        },
      };
      const result = await controller.create(createGiftDto);
      expect(result).toEqual({
        id: '1',
        ...createGiftDto,
      });
    });
  });

  describe('update', () => {
    it('should update a gift', async () => {
      const updateGiftDto = { name: 'Updated Gift' };
      const result = await controller.update('1', updateGiftDto);
      expect(result).toEqual(mockGift);
    });
  });

  describe('remove', () => {
    it('should remove a gift', async () => {
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
    });
  });
});