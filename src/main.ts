import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(  
    new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true, 
  transform: true, // se agregaron esta opcion
  transformOptions: { enableImplicitConversion: true } // y esta para la transformacion de la paginacion y el limit
    }) 
  );


  //Habilitar cors
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Permite solicitudes solo desde tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  });
  


  await app.listen(process.env.PORT || 3001);
}
bootstrap();
