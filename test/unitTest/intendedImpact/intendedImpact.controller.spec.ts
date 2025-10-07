import { Test, TestingModule } from '@nestjs/testing';
import { IntendedImpactController } from '../../../src/intendedImpacts/intendedImpact.controller';
import { IntendedImpactService } from '../../../src/intendedImpacts/intendedImpact.service';
import { IntendedImpact } from '../../../src/entities/intendedImpact.entity';
import { CreateIntendedImpactDto } from '../../../src/intendedImpacts/dto/create-intended-impact.dto';
import { UpdateIntendedImpactDto } from '../../../src/intendedImpacts/dto/update-intended-impact.dto';
import { MainOption } from '../../../src/entities/mainOption.entity';
import { Place } from '../../../src/entities/place.entity';

describe('IntendedImpactController', () => {
  let controller: IntendedImpactController;
  let service: IntendedImpactService;

  const mockIntendedImpact: IntendedImpact = {
    id: 'uuid-123',
    name: 'Relajación',
    icon: '🧘',
    description: 'Sensación de calma',
    aromas: [],
    place: {} as Place,
    mainOption: {} as MainOption,
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockIntendedImpact),
    findAll: jest.fn().mockResolvedValue([mockIntendedImpact]),
    findOne: jest.fn().mockResolvedValue(mockIntendedImpact),
    update: jest.fn().mockResolvedValue(mockIntendedImpact),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntendedImpactController],
      providers: [
        {
          provide: IntendedImpactService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<IntendedImpactController>(IntendedImpactController);
    service = module.get<IntendedImpactService>(IntendedImpactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an intended impact', async () => {
    const dto: CreateIntendedImpactDto = {
      name: 'Relajación',
      icon: '🧘',
      description: 'Sensación de calma',
      placeId: 'place-1',
      mainOptionId: 'main-1',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockIntendedImpact);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all intended impacts', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockIntendedImpact]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one intended impact by id', async () => {
    const result = await controller.findOne('uuid-123');
    expect(result).toEqual(mockIntendedImpact);
    expect(service.findOne).toHaveBeenCalledWith('uuid-123');
  });

  it('should update an intended impact', async () => {
    const dto: UpdateIntendedImpactDto = {
      name: 'Actualizado',
      icon: '✨',
      description: 'Nuevo impacto',
      placeId: 'place-2',
      mainOptionId: 'main-2',
    };
    const result = await controller.update('uuid-123', dto);
    expect(result).toEqual(mockIntendedImpact);
    expect(service.update).toHaveBeenCalledWith('uuid-123', dto);
  });

  it('should delete an intended impact', async () => {
    const result = await controller.remove('uuid-123');
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith('uuid-123');
  });
});
