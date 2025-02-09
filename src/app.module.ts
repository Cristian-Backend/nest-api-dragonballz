import { Module } from '@nestjs/common';
import { DragonballzModule } from './dragonballz/dragonballz.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

dotenv.config();

@Module({
  imports: [
    DragonballzModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'], // Excluye rutas que empiecen con /api
    }),

    MongooseModule.forRoot(process.env.MONGODB,{
      family: 4, 
   
  
      
    }),

    CommonModule,

    SeedModule,
   

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}