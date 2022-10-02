import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import { QuestionsModule } from './modules/questions/questions.module';
import { CategoriesModule } from './modules/categories/categories.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For injecting services in class-validator constraint interface.
  useContainer(app.select(CategoriesModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // Explanation of problem with CORS.
  // https://tutorialmeta.com/question/nest-js-is-giving-cors-error-even-when-cors-is-enabled
  let whitelist = ['http://localhost:3000', 'https://test-code-knowledge.vercel.app', 'https://codeteko.vercel.app'];
  app.enableCors({
    origin: function (origin, callback) {
      // if (whitelist.indexOf(origin) !== -1) {
      //   console.log("allowed cors for:", origin)
      //   callback(null, true)
      // } else {
      //   console.log("blocked cors for:", origin)
      //   callback(new Error('Not allowed by CORS'))
      // }
      callback(null, true);
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });
  app.use(helmet());
  await app.listen(3010);
}
bootstrap();
