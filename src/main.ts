import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './modules/auth-super-tokens/auth-super-tokens.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // For injecting services in class-validator constraint interface.
  useContainer(app.select(CategoriesModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // Explanation of problem with CORS.
  // https://tutorialmeta.com/question/nest-js-is-giving-cors-error-even-when-cors-is-enabled
  const whitelist = [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://test-code-knowledge.vercel.app',
    'https://codeteko.vercel.app',
  ];

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', whitelist.join(','));
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  // app.enableCors({
  //   // origin: function (origin, callback) {
  //   //   if (whitelist.indexOf(origin) !== -1) {
  //   //     console.log('allowed cors for:', origin);
  //   //     callback(null, true);
  //   //   } else {
  //   //     console.log('blocked cors for:', origin);
  //   //     callback(new Error('Not allowed by CORS'));
  //   //   }
  //   //   callback(null, true);
  //   // },
  //   origin: whitelist,

  //   // allowedHeaders:
  //   //   'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  //   allowedHeaders: [
  //     'Content-Type',
  //     'Origin',
  //     'X-Requested-With',
  //     'Accept',
  //     'Authorization',
  //   ],
  //   // headers exposed to the client
  //   exposedHeaders: ['Authorization'],
  //   methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE', 'OPTIONS'],
  //   credentials: true,
  // });

  app.enableCors({
    // origin: function (origin, callback) {
    //   if (whitelist.indexOf(origin) !== -1) {
    //     console.log('allowed cors for:', origin);
    //     callback(null, true);
    //   } else {
    //     console.log('blocked cors for:', origin);
    //     callback(new Error('Not allowed by CORS'));
    //   }
    //   callback(null, true);
    // },
    origin: whitelist,

    // allowedHeaders:
    //   'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          imgSrc: ['https://cdn.jsdelivr.net/gh/supertokens/'],
          scriptSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'https://cdn.jsdelivr.net/gh/supertokens/',
          ],
          // manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          // frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  // to solve supertokens dashboar csp error:
  // https://github.com/graphql/graphql-playground/issues/1283
  // app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

  await app.listen(3010);
}
bootstrap();
