import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from '../../../src/places/places.controller';
import { PlacesService } from '../../../src/places/places.service';
import { Place } from '../../../src/entities/place.entity';
import { NotFoundException } from '@nestjs/common';

const mockPlace: Place = {
  id: '1',
  name: 'Test Place',
  icon: 'icon.png',
  intendedImpacts: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockCreatePlaceDto = {
  name: 'Test Place',
  icon: 'icon.png',
};

const mockUpdatePlaceDto = {
  name: 'Updated Place',
};

describe('PlacesController', () => {
  let controller: PlacesController;
  let service: PlacesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        { provide: PlacesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
    service = module.get<PlacesService>(PlacesService);

    jest.clearAllMocks(); // Limpia mocks antes de cada test
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a place', async () => {
      mockService.create.mockResolvedValueOnce(mockPlace);
      const result = await controller.create(mockCreatePlaceDto);
      expect(result).toEqual(mockPlace);
      expect(mockService.create).toHaveBeenCalledWith(mockCreatePlaceDto);
    });
  });

  describe('findAll', () => {
    it('should return all places', async () => {
      mockService.findAll.mockResolvedValueOnce([mockPlace]);
      const result = await controller.findAll();
      expect(result).toEqual([mockPlace]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a place by id', async () => {
      mockService.findOne.mockResolvedValueOnce(mockPlace);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockPlace);
      expect(mockService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if place not found', async () => {
      mockService.findOne.mockRejectedValueOnce(new NotFoundException('Place not found'));

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      expect(mockService.findOne).toHaveBeenCalledWith('999');
    });
  });

  describe('update', () => {
    it('should update a place', async () => {
      mockService.update.mockResolvedValueOnce(mockPlace);
      const result = await controller.update('1', mockUpdatePlaceDto);
      expect(result).toEqual(mockPlace);
      expect(mockService.update).toHaveBeenCalledWith('1', mockUpdatePlaceDto);
    });
  });

  describe('remove', () => {
    it('should remove a place', async () => {
      mockService.remove.mockResolvedValueOnce(undefined);
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
      expect(mockService.remove).toHaveBeenCalledWith('1');
    });
  });
});
