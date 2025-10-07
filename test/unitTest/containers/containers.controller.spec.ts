import { Test, TestingModule } from '@nestjs/testing';
import { ContainersController } from '../../../src/containers/containers.controller';
import { ContainersService } from '../../../src/containers/containers.service';
import { Container } from '../../../src/entities/container.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ContainersController', () => {
  let controller: ContainersController;
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
    find: jest.fn().mockImplementation(() => Promise.resolve([mockContainer])),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => 
      id === '1' ? Promise.resolve(mockContainer) : Promise.resolve(null)
    ),
    update: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
    delete: jest.fn().mockImplementation(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContainersController],
      providers: [
        ContainersService,
        {
          provide: getRepositoryToken(Container),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ContainersController>(ContainersController);
    service = module.get<ContainersService>(ContainersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of containers', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockContainer]);
    });
  });

  describe('findOne', () => {
    it('should return a container', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockContainer);
    });
  });

  describe('create', () => {
    it('should create a container', async () => {
      const createContainerDto = {
        name: 'Test Container',
        description: 'Test Description',
        isActive: true,
      };
      const result = await controller.create(createContainerDto);
      expect(result).toEqual({
        id: '1',
        ...createContainerDto,
      });
    });
  });

  describe('update', () => {
    it('should update a container', async () => {
      const updateContainerDto = { name: 'Updated Container' };
      const result = await controller.update('1', updateContainerDto);
      expect(result).toEqual(mockContainer);
    });
  });

  describe('remove', () => {
    it('should remove a container', async () => {
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
    });
  });
}); 