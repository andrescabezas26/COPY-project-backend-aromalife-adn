import { PartialType } from '@nestjs/swagger';
import { CreateIntendedImpactDto } from './create-intended-impact.dto';

export class UpdateIntendedImpactDto extends PartialType(CreateIntendedImpactDto) {}
