import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../../../src/cart/cart.controller';
import { CartService } from '../../../src/cart/cart.service';
import { CreateCartDto } from '../../../src/cart/dto/create-cart.dto';
import { UpdateCartDto } from '../../../src/cart/dto/update-cart.dto';
import { AddCartItemDto } from '../../../src/cart/dto/add-cart-item.dto';
import { UpdateCartItemDto } from '../../../src/cart/dto/update-cart-item.dto';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            addItem: jest.fn(),
            updateItem: jest.fn(),
            removeItem: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create', async () => {
    const dto: CreateCartDto = { userId: 'user1' } as any;
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findOne on findOne', async () => {
    await controller.findOne('cart1');
    expect(service.findOne).toHaveBeenCalledWith('cart1');
  });

  it('should call service.update on update', async () => {
    const dto: UpdateCartDto = { userId: 'user1' } as any;
    await controller.update('cart1', dto);
    expect(service.update).toHaveBeenCalledWith('cart1', dto);
  });

  it('should call service.remove on remove', async () => {
    await controller.remove('cart1');
    expect(service.remove).toHaveBeenCalledWith('cart1');
  });

  it('should call service.addItem on addItem', async () => {
    const dto: AddCartItemDto = { quantity: 1 } as any;
    await controller.addItem('cart1', dto);
    expect(service.addItem).toHaveBeenCalledWith('cart1', dto);
  });

  it('should call service.updateItem on updateItem', async () => {
    const dto: UpdateCartItemDto = { quantity: 2 } as any;
    await controller.updateItem('cart1', 'item1', dto);
    expect(service.updateItem).toHaveBeenCalledWith('cart1', 'item1', dto);
  });

  it('should call service.removeItem on removeItem', async () => {
    await controller.removeItem('cart1', 'item1');
    expect(service.removeItem).toHaveBeenCalledWith('cart1', 'item1');
  });
}); 