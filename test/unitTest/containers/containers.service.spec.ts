import { Test, TestingModule } from '@nestjs/testing';
import { ContainersService } from '../../../src/containers/containers.service';
import { Container } from '../../../src/entities/container.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ContainersService', () => {
  let service: ContainersService;

  const mockContainer = {
    id: '1',
    name: 'Test Container',
    description: 'Test Description',
    isActive: true,
  };

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(container => Promise.resolve({ id: '1', ...container })),
    find: jest.fn().mockImplementation(({ where }) => {
      if (where?.isActive !== undefined) {
        return Promise.resolve([{ ...mockContainer, isActive: where.isActive }]);
      }
      return Promise.resolve([mockContainer]);
    }),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => 
      id === '1' ? Promise.resolve(mockContainer) : Promise.resolve(null)
    ),
    update: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
    delete: jest.fn().mockImplementation((id) => 
      id === '1' ? Promise.resolve({ affected: 1 }) : Promise.resolve({ affected: 0 })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContainersService,
        {
          provide: getRepositoryToken(Container),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContainersService>(ContainersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a container', async () => {
      const createContainerDto = {
        name: 'Test Container',
        description: 'Test Description',
        isActive: true,
      };
      const result = await service.create(createContainerDto);
      expect(result).toEqual({
        id: '1',
        ...createContainerDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of containers', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockContainer]);
    });
  });

  describe('findOne', () => {
    it('should return a container', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockContainer);
    });

    it('should throw NotFoundException if container not found', async () => {
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a container', async () => {
      const updateContainerDto = { name: 'Updated Container' };
      const result = await service.update('1', updateContainerDto);
      expect(result).toEqual(mockContainer);
    });

    it('should throw NotFoundException if container not found', async () => {
      await expect(service.update('2', { name: 'Updated Container' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a container', async () => {
      await expect(service.remove('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if container not found', async () => {
      await expect(service.remove('2')).rejects.toThrow(NotFoundException);
    });
  });
}); 