import { PartialType } from '@nestjs/mapped-types';
import { CreateDragonballzDto } from './create-dragonballz.dto';

export class UpdateDragonballzDto extends PartialType(CreateDragonballzDto) {}
