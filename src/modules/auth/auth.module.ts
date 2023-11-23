import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/libs/configs/jwt.config';
import { AuthController } from './auth.controller';
import { User, userSchema } from 'src/models/user.model';
import { AuthService } from './auth.service';
import { JwtStratagy } from './strategies/jwt.stratagy';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/libs/guards/roles.guard';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
  ],
  // providers: [AuthService, JwtStratagy, {
  //   provide: APP_GUARD,
  //   useClass: RolesGuard,
  // }],

  providers: [AuthService, JwtStratagy],
})
export class AuthModule {}
