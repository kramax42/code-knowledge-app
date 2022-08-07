import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from '../user.model';
import { Request } from 'express';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        // 'Bearer ..token..' => '..token..'
        return request?.cookies?.Authorization.split(' ')[1];
      }]),
      secretOrKey: configService.get('JWT_SECRET'),
    });


  }

  async validate({ email }: Pick<UserModel, 'email'>) {
    return email;
  }
}
