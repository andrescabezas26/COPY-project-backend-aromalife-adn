import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientWithFileDto } from './dto/create-client-with-file.dto';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserRolesDto } from './dto/update-user-role-dto';
import { CloudinaryService } from '../common/services/cloudinary.service';
import { ValidRoles } from './interfaces/valid-roles';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        password: bcrypt.hashSync(password, 10),
        ...userData,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error in createUser:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Error creating user');
    }
  }

  async createClient(createClientDto: CreateClientDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createClientDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const { password, ...userData } = createClientDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: ['client'],
      });
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error in createClient:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Error creating client');
    }
  }

  async createClientWithFile(
    createClientWithFileDto: CreateClientWithFileDto,
    file?: Express.Multer.File,
  ) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createClientWithFileDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      let profilePictureUrl: string | undefined;

      // Si hay un archivo, subirlo a Cloudinary
      if (file) {
        try {
          profilePictureUrl = await this.cloudinaryService.uploadImageProfile(
            file,
          );
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          // Continuar sin imagen si falla la subida
        }
      }

      const { password, ...userData } = createClientWithFileDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: ['client'],
        profilePicture: profilePictureUrl,
      });

      const savedUser = await this.userRepository.save(user);      // Retornar respuesta similar al login
      return {
        user_id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        profilePicture: savedUser.profilePicture,
        token: this.jwtService.sign({
          sub: savedUser.id,
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          roles: savedUser.roles,
        }),
      };
    } catch (error) {
      console.error('Error in createClientWithFile:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Error creating client with file');
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const user: User | null = await this.userRepository.findOne({
        where: { email },
        select: [
          'id',
          'email',
          'name',
          'password',
          'isActive',
          'roles',
          'profilePicture',
        ],
      });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return {
        user_id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        token: this.jwtService.sign({
          sub: user.id,
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles,
        }),
        profilePicture: user.profilePicture,
      };
    } catch (error) {
      console.error('Error in loginUser:', error);
      throw error;
    }
  }

  async findAll(isActive?: boolean): Promise<User[]> {
    try {
      const where = isActive !== undefined ? { isActive } : {};
      const users = await this.userRepository.find({ where });
      if (!users || users.length === 0) {
        throw new NotFoundException('No users found');
      }
      return users;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }
    return user;
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.isActive) {
        throw new UnauthorizedException('User is not active');
      }

      await this.userRepository.update(id, updateUserDto);
      return this.findOne(id);
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async deactivate(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }
    user.isActive = false;
    await this.userRepository.save(user);
    return user;
  }

  async activate(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }
    user.isActive = true;
    await this.userRepository.save(user);
    return user;
  }
  async remove(id: string): Promise<User> {
    console.log('Attempting to remove user with ID:', id);
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found');
      throw new NotFoundException('User not found');
    }
    if (!user.isActive) {
      console.log('User is not active');
      throw new UnauthorizedException('User is not active');
    }

    // Si el usuario tiene una imagen de perfil, eliminarla de Cloudinary
    if (user.profilePicture) {
      try {
        const publicId = this.cloudinaryService.extractPublicId(
          user.profilePicture,
        );
        if (publicId) {
          await this.cloudinaryService.deleteImage(publicId);
          console.log(`Imagen de perfil eliminada de Cloudinary: ${publicId}`);
        }
      } catch (deleteError) {
        console.warn(
          'Error al eliminar imagen de perfil de Cloudinary:',
          deleteError,
        );
        // Continuar con la eliminación del usuario aunque falle la eliminación de la imagen
      }
    }

    console.log('Deleting user...');
    await this.userRepository.delete(id);
    console.log('User deleted successfully');
    return user;
  }
  async updateUserRoles(
    id: string,
    updateUserRolesDto: UpdateUserRolesDto,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.isActive) {
        throw new UnauthorizedException('User is not active');
      }
      user.roles = updateUserRolesDto.roles;

      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error in updateUserRoles:', error);
      throw error;
    }
  }
  async updateProfilePicture(
    id: string,
    file: Express.Multer.File,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.isActive) {
        throw new UnauthorizedException('User is not active');
      }

      // Si el usuario ya tiene una imagen de perfil, eliminarla de Cloudinary
      if (user.profilePicture) {
        try {
          const publicId = this.cloudinaryService.extractPublicId(
            user.profilePicture,
          );
          if (publicId) {
            await this.cloudinaryService.deleteImage(publicId);
            console.log(`Imagen anterior eliminada de Cloudinary: ${publicId}`);
          }
        } catch (deleteError) {
          console.warn(
            'Error al eliminar imagen anterior de Cloudinary:',
            deleteError,
          );
          // Continuar con la subida de la nueva imagen aunque falle la eliminación
        }
      }

      // Subir nueva imagen a Cloudinary
      const profilePictureUrl = await this.cloudinaryService.uploadImageProfile(
        file,
      );

      // Actualizar el usuario con la nueva URL de imagen
      await this.userRepository.update(id, {
        profilePicture: profilePictureUrl,
      });

      return this.findOne(id);
    } catch (error) {
      console.error('Error in updateProfilePicture:', error);
      throw error;
    }
  }
  async removeProfilePicture(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.isActive) {
        throw new UnauthorizedException('User is not active');
      }

      // Si el usuario tiene una imagen de perfil, eliminarla de Cloudinary
      if (user.profilePicture) {
        try {
          const publicId = this.cloudinaryService.extractPublicId(
            user.profilePicture,
          );
          if (publicId) {
            await this.cloudinaryService.deleteImage(publicId);
            console.log(
              `Imagen de perfil eliminada de Cloudinary: ${publicId}`,
            );
          }
        } catch (deleteError) {
          console.warn(
            'Error al eliminar imagen de perfil de Cloudinary:',
            deleteError,
          );
          // Continuar con la actualización aunque falle la eliminación de Cloudinary
        } // Establecer profilePicture como undefined
        await this.userRepository.update(id, { profilePicture: undefined });
      }

      return this.findOne(id);
    } catch (error) {
      console.error('Error in removeProfilePicture:', error);
      throw error;
    }
  }
  async getAdminPhone(): Promise<{ phoneCountryCode: string; phone: string; fullPhone: string }> {
    try {
      const admin = await this.userRepository
        .createQueryBuilder('user')
        .where('user.isActive = :isActive', { isActive: true })
        .andWhere(':role = ANY(user.roles)', { role: ValidRoles.admin })
        .select(['user.phoneCountryCode', 'user.phone'])
        .getOne();

      if (!admin) {
        throw new NotFoundException('No admin found');
      }

      if (!admin.phone || !admin.phoneCountryCode) {
        throw new NotFoundException('Admin phone information not available');
      }

      const fullPhone = `${admin.phoneCountryCode}${admin.phone}`.replace(/\D/g, '');      return {
        phoneCountryCode: admin.phoneCountryCode,
        phone: admin.phone,
        fullPhone
      };
    } catch (error) {
      console.error('Error in getAdminPhone:', error);
      throw error;
    }
  }

  async getUsersCount(): Promise<{ count: number }> {
    try {
      const count = await this.userRepository.count();
      return { count };
    } catch (error) {
      console.error('Error in getUsersCount:', error);
      throw error;
    }
  }
}
