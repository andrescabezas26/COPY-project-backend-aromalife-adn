import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientWithFileDto } from './dto/create-client-with-file.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entity/user.entity';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { ImageValidationPipe } from '../common/pipes/image-validation.pipe';
import { OptionalImageValidationPipe } from '../common/pipes/optional-image-validation.pipe';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('register-client')
  @ApiOperation({ summary: 'Register a new client' })
  @ApiResponse({ status: 201, description: 'Client successfully registered', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.authService.createClient(createClientDto);
  }  @Post('register-client-with-file')
  @ApiOperation({ summary: 'Register a new client with profile picture' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Client successfully registered with profile picture' })
  @ApiResponse({ status: 400, description: 'Bad request or invalid file' })
  @UseInterceptors(FileInterceptor('profilePicture', {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  }))
  async createClientWithFile(
    @Body() createClientWithFileDto: CreateClientWithFileDto,
    @UploadedFile(new OptionalImageValidationPipe()) file?: Express.Multer.File,
  ) {
    return this.authService.createClientWithFile(createClientWithFileDto, file);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async logout(@GetUser() user: User) {
    return {
      ok: true,
      message: 'Logout successful',
      user,
    };
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
  @Auth(ValidRoles.admin)
  async findAll(@Query('isActive') isActive?: boolean) {
    return this.authService.findAll(isActive);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin, ValidRoles.client, ValidRoles.manager)
  async findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin)
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Deactivate a user' })
  @ApiResponse({ status: 200, description: 'User deactivated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin)
  async remove(@Param('id') id: string) {
    return this.authService.deactivate(id);
  }

  @Put('users/:id/activate')
  @ApiOperation({ summary: 'Activate a user' })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin)
  async activate(@Param('id') id: string) {
    return this.authService.activate(id);
  }

  @Delete('users/:id/remove')
  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({ status: 200, description: 'User removed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin)
  async removeUser(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  @Put('users/:id/deactivate')
  @ApiOperation({ summary: 'Deactivate a user' })
  @ApiResponse({ status: 200, description: 'User deactivated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin)
  async deactivate(@Param('id') id: string) {
    return this.authService.deactivate(id);
  }
  @Put('users/:id/roles')
  @ApiOperation({ summary: 'Update user roles' })
  @ApiResponse({ status: 200, description: 'User roles updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin)
  async updateUserRoles(
    @Param('id') id: string,
    @Body() updateUserRolesDto: { roles: ValidRoles[] },
  ) {
    return this.authService.updateUserRoles(id, updateUserRolesDto);
  }
  @Put('users/:id/profile-picture')
  @ApiOperation({ summary: 'Update user profile picture' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Profile picture updated successfully', type: User })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  }))
  async updateProfilePicture(
    @Param('id') id: string,
    @UploadedFile(new ImageValidationPipe()) file: Express.Multer.File,
  ) {
    return this.authService.updateProfilePicture(id, file);
  }
  @Delete('users/:id/profile-picture')
  @ApiOperation({ summary: 'Remove user profile picture' })
  @ApiResponse({ status: 200, description: 'Profile picture removed successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager ,ValidRoles.client)
  async removeProfilePicture(@Param('id') id: string) {
    return this.authService.removeProfilePicture(id);
  }
  @Get('users/count/number')
  @ApiOperation({ summary: 'Get total count of users' })
  @ApiResponse({ 
    status: 200, 
    description: 'Total count of users retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', example: 25 }
      }
    }
  })
  @Auth(ValidRoles.admin, ValidRoles.manager)
  async getUsersCount(): Promise<{ count: number }> {
    console.log('Fetching users count');
    return this.authService.getUsersCount();
  }

  @Get('admin/phone')
  @ApiOperation({ summary: 'Get admin phone number for WhatsApp contact' })
  @ApiResponse({ 
    status: 200, 
    description: 'Admin phone number retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        phoneCountryCode: { type: 'string', example: '+57' },
        phone: { type: 'string', example: '3053000000' },
        fullPhone: { type: 'string', example: '573053000000' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'No admin found' })
  async getAdminPhone() {
    return this.authService.getAdminPhone();
  }
}
