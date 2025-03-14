import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { ExceptionCustomFilter } from './common/exception/rpc-exception.filter';

async function bootstrap() {

  const logger = new Logger('Main-Gateway')
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
    })
   );

   app.useGlobalFilters( new ExceptionCustomFilter())
   
  await app.listen(envs.port);

  logger.log(`Gateway running port ${ envs.port }`)
}
bootstrap();
