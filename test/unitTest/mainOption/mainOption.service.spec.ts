import { Test, TestingModule } from '@nestjs/testing';
import { MainOptionsService } from '../../../src/mainOptions/mainOption.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MainOption } from '../../../src/entities/mainOption.entity';
import { Repository } from 'typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

const mockMainOptionArray: MainOption[] = [
  {
    id: 'uuid-1',
    name: 'Option 1',
    description: 'Desc 1',
    emoji: '🔥',
    intendedImpacts: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockMainOption: MainOption = mockMainOptionArray[0];

describe('MainOptionsService', () => {
  let service: MainOptionsService;
  let repo: Repository<MainOption>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainOptionsService,
        {
          provide: getRepositoryToken(MainOption),
          useValue: {
            create: jest.fn().mockReturnValue(mockMainOption),
            save: jest.fn().mockResolvedValue(mockMainOption),
            find: jest.fn().mockResolvedValue(mockMainOptionArray),
            findOne: jest.fn().mockResolvedValue(mockMainOption),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MainOptionsService>(MainOptionsService);
    repo = module.get<Repository<MainOption>>(getRepositoryToken(MainOption));
  });

  it('should create a MainOption', async () => {
    const dto = { name: 'Option 1', description: 'Desc 1', emoji: '🔥' };
    const result = await service.create(dto as any);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(mockMainOption);
    expect(result).toEqual(mockMainOption);
  });

  it('should throw InternalServerErrorException on failed save', async () => {
    jest.spyOn(repo, 'save').mockRejectedValueOnce(new InternalServerErrorException());
    await expect(service.create({} as any)).rejects.toThrow(InternalServerErrorException);
  });

  it('should return all main options', async () => {
    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(mockMainOptionArray);
  });

  it('should throw NotFoundException when no main options found', async () => {
    jest.spyOn(repo, 'find').mockResolvedValue([]);
    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('should find one main option', async () => {
    const result = await service.findOne('uuid-1');
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1' } });
    expect(result).toEqual(mockMainOption);
  });

  it('should throw NotFoundException when main option not found', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);
    await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a main option', async () => {
    const dto = { name: 'Updated' };
    const updated = await service.update('uuid-1', dto as any);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1' } });
    expect(repo.update).toHaveBeenCalledWith('uuid-1', dto);
    expect(updated).toEqual(mockMainOption);
  });

  it('should throw NotFoundException when updating non-existent option', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    await expect(service.update('invalid-id', {} as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a main option', async () => {
    await service.remove('uuid-1');
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1' } });
    expect(repo.delete).toHaveBeenCalledWith('uuid-1');
  });

  it('should throw NotFoundException when removing non-existent option', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    await expect(service.remove('invalid-id')).rejects.toThrow(NotFoundException);
  });
});
