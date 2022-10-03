import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from 'src/libs/configs/mongo.config';
import { AuthModule } from '../auth/auth.module';
import { QuestionsModule } from '../questions/questions.module';
import { SnippetsModule } from '../snippets/snippets.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
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
export class AppModule { }
