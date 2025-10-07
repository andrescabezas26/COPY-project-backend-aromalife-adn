import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientWithFileDto {
  @ApiProperty({ description: 'First name of the client' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
  @Matches(/^[a-zA-ZÀ-ÿ\s]{2,}$/, { 
    message: 'Name can only contain letters and spaces' 
  })
  readonly name: string;

  @ApiProperty({ description: 'Last name of the client' })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name cannot be longer than 50 characters' })
  @Matches(/^[a-zA-ZÀ-ÿ\s]{2,}$/, { 
    message: 'Last name can only contain letters and spaces' 
  })
  readonly lastName: string;

  @ApiProperty({ description: 'Email of the client' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please enter a valid email' })
  @MaxLength(100, { message: 'Email cannot be longer than 100 characters' })
  readonly email: string;

  @ApiProperty({ description: 'Password for the client account' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(50, { message: 'Password cannot be longer than 50 characters' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[!@#$%^&*]/, { message: 'Password must contain at least one special character (!@#$%^&*)' })
  readonly password: string;

  @ApiProperty({ description: 'Phone number of the client' })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, { 
    message: 'Please enter a valid phone number' 
  })
  readonly phone: string;

  @ApiProperty({ description: 'Phone country code' })
  @IsNotEmpty({ message: 'Phone country code is required' })
  @IsString({ message: 'Phone country code must be a string' })
  @MaxLength(5, { message: 'Phone country code cannot be longer than 5 characters' })
  readonly phoneCountryCode: string;

  @ApiProperty({ description: 'City of the client' })
  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  @MinLength(2, { message: 'City must be at least 2 characters long' })
  @MaxLength(50, { message: 'City cannot be longer than 50 characters' })
  readonly city: string;

  @ApiProperty({ description: 'State or province of the client', required: false })
  @IsOptional()
  @IsString({ message: 'State must be a string' })
  @MinLength(2, { message: 'State must be at least 2 characters long' })
  @MaxLength(50, { message: 'State cannot be longer than 50 characters' })
  readonly state?: string;

  @ApiProperty({ description: 'Country of the client' })
  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  @MinLength(2, { message: 'Country must be at least 2 characters long' })
  @MaxLength(50, { message: 'Country cannot be longer than 50 characters' })
  readonly country: string;

  @ApiProperty({ description: 'Address of the client' })
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @MinLength(5, { message: 'Address must be at least 5 characters long' })
  @MaxLength(200, { message: 'Address cannot be longer than 200 characters' })
  readonly address: string;

  @ApiProperty({ 
    description: 'Profile picture file', 
    type: 'string', 
    format: 'binary',
    required: false 
  })
  @IsOptional()
  profilePicture?: Express.Multer.File;
}
