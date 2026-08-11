import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');
  const app: any = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        
      forbidNonWhitelisted: true,  
      transform: true,
    }),
  );

  logger.log(`------------------------------------------------------------------------`);
  logger.log(`------------------- SERVIDOR INICIADO CON ÉXITO -------------------`);
  logger.log(`------------------------------------------------------------------------`);
  logger.log(`- Port: ${process.env.PORT ?? 3000}`);
  logger.log(`- Local url: http://localhost:${process.env.PORT ?? 3000}`);
  logger.log(`- By: Freddy Alejandro Fernández Tovar`);

  
}
bootstrap();
