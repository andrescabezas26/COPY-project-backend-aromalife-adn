import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ValidRoles } from '../interfaces/valid-roles';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
  @Matches(/^[a-zA-ZÀ-ÿ\s]{2,}$/, {
    message: 'Name can only contain letters and spaces',
  })
  readonly name: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name cannot be longer than 50 characters' })
  @Matches(/^[a-zA-ZÀ-ÿ\s]{2,}$/, {
    message: 'Last name can only contain letters and spaces',
  })
  readonly lastName: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Please enter a valid email' })
  @MaxLength(100, { message: 'Email cannot be longer than 100 characters' })
  readonly email: string;

  @ApiProperty({ description: 'Password for the user account' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(50, { message: 'Password cannot be longer than 50 characters' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(
    /[!@#$%^&*]/,
    { message: 'Password must contain at least one special character (!@#$%^&*)' },
  )
  readonly password: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be a string' })
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, {
    message: 'Please enter a valid phone number',
  })
  readonly phone: string;

  @ApiProperty({ description: 'Phone country code' })
  @IsNotEmpty({ message: 'Phone country code is required' })
  @IsString({ message: 'Phone country code must be a string' })
  @MaxLength(5, { message: 'Phone country code cannot be longer than 5 characters' })
  readonly phoneCountryCode: string;

  @ApiProperty({ description: 'City of the user' })
  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  @MinLength(2, { message: 'City must be at least 2 characters long' })
  @MaxLength(50, { message: 'City cannot be longer than 50 characters' })
  readonly city: string;

  @ApiProperty({ description: 'State or province of the user', required: false })
  @IsOptional()
  @IsString({ message: 'State must be a string' })
  @MinLength(2, { message: 'State must be at least 2 characters long' })
  @MaxLength(50, { message: 'State cannot be longer than 50 characters' })
  readonly state?: string;

  @ApiProperty({ description: 'Country of the user' })
  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  @MinLength(2, { message: 'Country must be at least 2 characters long' })
  @MaxLength(50, { message: 'Country cannot be longer than 50 characters' })
  readonly country: string;

  @ApiProperty({ description: 'Address of the user' })
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @MinLength(5, { message: 'Address must be at least 5 characters long' })
  @MaxLength(200, { message: 'Address cannot be longer than 200 characters' })
  readonly address: string;

  @ApiProperty({ description: 'Profile picture URL', required: false })
  @IsOptional()
  @IsString({ message: 'Profile picture must be a string' })
  @MaxLength(500, { message: 'Profile picture URL cannot be longer than 500 characters' })
  readonly profilePicture?: string;

  @ApiProperty({ description: 'User roles' })
  @IsArray({ message: 'Roles must be an array' })
  @IsEnum(ValidRoles, {
    each: true,
    message:
      'Each role must be one of the valid roles (admin, client, manager)',
  })
  @ArrayNotEmpty({ message: 'Roles cannot be empty' })
  @IsString({ each: true, message: 'Each role must be a string' })
  readonly roles: string[];
}
