import { Test, TestingModule } from '@nestjs/testing';
import { GiftsService } from '../../../src/gifts/gifts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from '../../../src/entities/gift.entity';
import { CreateGiftDto } from '../../../src/gifts/dto/create-gift.dto';
import { NotFoundException } from '@nestjs/common';

describe('GiftsService', () => {
  let service: GiftsService;
  let giftRepository: jest.Mocked<Repository<Gift>>;

  const mockGift = {
    id: '1',
    name: 'Test Gift',
    description: 'Test Description',
    price: 50,
    imageUrl: 'http://example.com/image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    cartItems: [],
    orderItems: [],
  };

  const mockGiftRepository = {
    create: jest.fn().mockImplementation((dto) => ({ id: '1', ...dto })),
    save: jest.fn().mockResolvedValue(mockGift),
    find: jest.fn().mockResolvedValue([mockGift]),
    findOne: jest.fn().mockResolvedValue(mockGift),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiftsService,
        {
          provide: getRepositoryToken(Gift),
          useValue: mockGiftRepository,
        },
      ],
    }).compile();

    service = module.get<GiftsService>(GiftsService);
    giftRepository = module.get(getRepositoryToken(Gift));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new gift', async () => {
      const createGiftDto: CreateGiftDto = {
        name: 'Test Gift',
        description: 'Test Description',
        price: 50,
        imageUrl: 'http://example.com/image.jpg',
      };

      const result = await service.create(createGiftDto);
      expect(result).toEqual(mockGift);
      expect(giftRepository.create).toHaveBeenCalledWith(createGiftDto);
      expect(giftRepository.save).toHaveBeenCalledWith({
        id: '1',
        ...createGiftDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of gifts', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockGift]);
      expect(giftRepository.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no gifts are found', async () => {
      giftRepository.find.mockResolvedValueOnce([]);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a single gift', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockGift);
      expect(giftRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException if gift is not found', async () => {
      giftRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a gift', async () => {
      const updateGiftDto = { name: 'Updated Gift' };
      const result = await service.update('1', updateGiftDto);
      expect(result).toEqual(mockGift);
      expect(giftRepository.save).toHaveBeenCalledWith({
        ...mockGift,
        ...updateGiftDto,
      });
    });

    it('should throw NotFoundException if gift is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());
      await expect(service.update('2', { name: 'Updated Gift' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a gift', async () => {
      await service.remove('1');
      expect(giftRepository.delete).toHaveBeenCalledWith('1');
    });

  });
});