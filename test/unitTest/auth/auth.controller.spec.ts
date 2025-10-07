import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { CreateUserDto } from '../../../src/auth/dto/create-user.dto';
import { LoginUserDto } from '../../../src/auth/dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    createUser: jest.fn().mockImplementation(dto => Promise.resolve({
      id: '1',
      ...dto,
      password: expect.any(String),
    })),
    loginUser: jest.fn().mockImplementation(dto => Promise.resolve({
      user_id: '1',
      name: 'Test User',
      email: dto.email,
      token: 'mock.jwt.token'
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'new@example.com',
        name: 'New User',
        roles: ['user'],
        password: 'password123'
      };

      const result = await controller.createUser(createUserDto);
      expect(result).toEqual({
        id: '1',
        ...createUserDto,
        password: expect.any(String),
      });
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('loginUser', () => {
    it('should login user with valid credentials', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = await controller.loginUser(loginUserDto);
      expect(result).toEqual({
        user_id: '1',
        name: 'Test User',
        email: loginUserDto.email,
        token: 'mock.jwt.token'
      });
      expect(service.loginUser).toHaveBeenCalledWith(loginUserDto);
    });
  });

}); 