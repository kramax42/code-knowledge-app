import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // Explanation of problem with CORS.
  // https://tutorialmeta.com/question/nest-js-is-giving-cors-error-even-when-cors-is-enabled
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(helmet());
  await app.listen(3010);
}
bootstrap();
