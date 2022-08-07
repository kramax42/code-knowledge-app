import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from '../user.model';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
    private readonly authService: AuthService) {
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
    return this.authService.findUser(email);
  }

}
