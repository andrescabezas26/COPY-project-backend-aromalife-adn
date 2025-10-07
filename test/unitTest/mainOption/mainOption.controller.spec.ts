import { Test, TestingModule } from '@nestjs/testing';
import { MainOptionsController } from '../../../src/mainOptions/mainOption.controller';
import { MainOptionsService } from '../../../src/mainOptions/mainOption.service';
import { CreateMainOptionDto } from '../../../src/mainOptions/dto/create-main-option.dto';
import { UpdateMainOptionDto } from '../../../src/mainOptions/dto/update-main-option.dto';
import { MainOption } from '../../../src/entities/mainOption.entity';

describe('MainOptionsController', () => {
  let controller: MainOptionsController;
  let service: MainOptionsService;

  const mockMainOption: MainOption = {
    id: 'uuid-123',
    name: 'Opción A',
    description: 'Descripción de prueba',
    emoji: '🔥',
    intendedImpacts: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockMainOption),
    findAll: jest.fn().mockResolvedValue([mockMainOption]),
    findOne: jest.fn().mockResolvedValue(mockMainOption),
    update: jest.fn().mockResolvedValue(mockMainOption),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainOptionsController],
      providers: [
        {
          provide: MainOptionsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MainOptionsController>(MainOptionsController);
    service = module.get<MainOptionsService>(MainOptionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a main option', async () => {
    const dto: CreateMainOptionDto = {
      name: 'Opción A',
      description: 'Descripción de prueba',
      emoji: '🔥',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockMainOption);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all main options', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockMainOption]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single main option by id', async () => {
    const result = await controller.findOne('uuid-123');
    expect(result).toEqual(mockMainOption);
    expect(service.findOne).toHaveBeenCalledWith('uuid-123');
  });

  it('should update a main option', async () => {
    const dto: UpdateMainOptionDto = {
      name: 'Opción A modificada',
      description: 'Nueva descripción',
      emoji: '🌟',
    };
    const result = await controller.update('uuid-123', dto);
    expect(result).toEqual(mockMainOption);
    expect(service.update).toHaveBeenCalledWith('uuid-123', dto);
  });

  it('should delete a main option', async () => {
    const result = await controller.remove('uuid-123');
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith('uuid-123');
  });
});
