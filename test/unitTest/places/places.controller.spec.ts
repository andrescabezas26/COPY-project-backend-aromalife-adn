import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from '../../../src/places/places.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Place } from '../../../src/entities/place.entity';
import { In, Repository } from 'typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

const mockPlace: Place = {
    id: '1',
    name: 'Test Place',
    icon: 'icon.png',
    intendedImpacts: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('PlacesService', () => {
    let service: PlacesService;
    let repo: Repository<Place>;

    const mockRepository = {
        create: jest.fn().mockImplementation(dto => ({ ...dto })),
        save: jest.fn().mockResolvedValue(mockPlace),
        find: jest.fn().mockResolvedValue([mockPlace]),
        findOne: jest.fn().mockResolvedValue(mockPlace),
        update: jest.fn().mockResolvedValue({ affected: 1 }),
        delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlacesService,
                {
                    provide: getRepositoryToken(Place),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<PlacesService>(PlacesService);
        repo = module.get<Repository<Place>>(getRepositoryToken(Place));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a place', async () => {
        const dto = { name: 'Test Place', icon: 'icon.png' };
        const result = await service.create(dto as any);
        expect(result).toEqual(mockPlace);
    });

    it('should throw if save fails', async () => {
        jest.spyOn(repo, 'save').mockRejectedValueOnce(new InternalServerErrorException());
        await expect(service.create({ name: 'Test', icon: 'i' } as any)).rejects.toThrow(InternalServerErrorException);

    });

    it('should return all places', async () => {
        const result = await service.findAll();
        expect(result).toEqual([mockPlace]);
    });

    it('should throw if no places are found', async () => {
        jest.spyOn(repo, 'find').mockResolvedValueOnce([]);
        await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });

    it('should return one place', async () => {
        const result = await service.findOne('1');
        expect(result).toEqual(mockPlace);
    });

    it('should throw if place not found', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
        await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });

    it('should update a place', async () => {
        const result = await service.update('1', { name: 'Updated' } as any);
        expect(result).toEqual(mockPlace);
    });

    it('should throw if updating non-existing place', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
        await expect(service.update('1', { name: 'Updated' } as any)).rejects.toThrow(NotFoundException);
    });

    it('should remove a place', async () => {
        const result = await service.remove('1');
        expect(result).toBeUndefined();
    });

    it('should throw if removing non-existing place', async () => {
        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
        await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
});
