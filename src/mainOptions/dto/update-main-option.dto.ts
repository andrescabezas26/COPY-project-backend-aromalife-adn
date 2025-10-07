import { PartialType } from '@nestjs/mapped-types';
import { CreateMainOptionDto } from './create-main-option.dto';

export class UpdateMainOptionDto extends PartialType(CreateMainOptionDto) {}