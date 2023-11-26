import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from 'src/libs/configs/mongo.config';
import { AuthModule } from '../auth/auth.module';
import { QuestionsModule } from '../questions/questions.module';
import { SnippetsModule } from '../snippets/snippets.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthSuperTokensModule } from '../auth-super-tokens/auth-super-tokens.module';
@Module({
  imports: [
    AuthSuperTokensModule.forRoot({
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: 'https://try.supertokens.com',
      // apiKey: <API_KEY(if configured)>,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: 'test-code-knowledge',
        apiDomain: 'http://localhost:3010',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: 'api/auth',
        websiteBasePath: '/auth',
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    QuestionsModule,
    SnippetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
