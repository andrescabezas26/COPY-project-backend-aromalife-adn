import { PartialType } from '@nestjs/swagger';
import { CreateAromaDto } from './create-aroma.dto';

export class UpdateAromaDto extends PartialType(CreateAromaDto) {}
