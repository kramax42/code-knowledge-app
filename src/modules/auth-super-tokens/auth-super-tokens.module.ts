import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common';

import { AuthSuperTokensMiddleware } from './auth-super-tokens.middleware';
import {
  ConfigInjectionToken,
  AuthSuperTokensModuleConfig,
} from './config.interface';
import { AuthSuperTokensService } from './auth-super-tokens.service';

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class AuthSuperTokensModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthSuperTokensMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthSuperTokensModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        AuthSuperTokensService,
      ],
      exports: [],
      imports: [],
      module: AuthSuperTokensModule,
    };
  }
}
