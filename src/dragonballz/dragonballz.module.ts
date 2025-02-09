import { Module } from '@nestjs/common';
import { DragonballzService } from './dragonballz.service';
import { DragonballzController } from './dragonballz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dragonballz, DragonballzSchema } from './entities/dragonballz.entity';

@Module({
  controllers: [DragonballzController],
  providers: [DragonballzService],
  imports: [
    MongooseModule.forFeature([{ name: Dragonballz.name, schema: DragonballzSchema }])
  ],
  exports: [MongooseModule]
})
export class DragonballzModule {}
