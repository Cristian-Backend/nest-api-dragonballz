import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DragonballzModule } from 'src/dragonballz/dragonballz.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DragonballzModule, CommonModule],
  
})
export class SeedModule {}
