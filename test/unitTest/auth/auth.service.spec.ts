import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../src/auth/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let jwtService: JwtService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: bcrypt.hashSync('password123', 10),
    isActive: true,
    roles: ['user'],
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: '1', ...user })),
    findOne: jest
      .fn()
      .mockImplementation(({ where: { email } }) =>
        email === mockUser.email
          ? Promise.resolve(mockUser)
          : Promise.resolve(null),
      ),
  };

  const mockJwtService = {
    sign: jest.fn().mockImplementation(() => 'mock.jwt.token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password123',
        roles: ['user'],
      };

      const result = await service.createUser(createUserDto);
      expect(result).toEqual({
        id: '1',
        ...createUserDto,
        password: expect.any(String),
      });
      expect(userRepository.create).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw error when user creation fails', async () => {
      mockRepository.save.mockRejectedValueOnce(new Error('Error creating user'));

      const createUserDto = {
        email: 'new@example.com',
        name: 'New User',
        password: 'password123',
        roles: ['user'],
      };

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        'Error creating user',
      );
    });

    it('should throw ConflictException when email already exists', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockUser); // Simula que el usuario ya existe

      const createUserDto = {
        email: 'test@example.com',
        name: 'New User',
        password: 'password123',
        roles: ['user'],
      };

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

  });

  describe('loginUser', () => {
    it('should login user with valid credentials', async () => {
      const loginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await service.loginUser(loginUserDto);
      expect(result).toEqual({
        user_id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        token: 'mock.jwt.token',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ user_id: mockUser.id });
    });

    it('should throw UnauthorizedException with invalid email', async () => {
      const loginUserDto = {
        email: 'wrong@example.com',
        password: 'password123',
      };

      await expect(service.loginUser(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException with invalid password', async () => {
      const loginUserDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await expect(service.loginUser(loginUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

  });
});
