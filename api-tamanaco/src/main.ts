import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');
  const app: any = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  logger.log(`------------------------------------------------------------------------`);
  logger.log(`------------------- SERVIDOR INICIADO CON ÉXITO -------------------`);
  logger.log(`------------------------------------------------------------------------`);
  logger.log(`Puerto: ${process.env.PORT ?? 3000}`);
  logger.log(`URL local: http://localhost:${process.env.PORT ?? 3000}`);

  
}
bootstrap();
