import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UsePipes(new ValidationPipe())
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const existedUser = await this.authService.findUser(dto.email);
    if (existedUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Res() res: Response, @Body() { email, password }: SignInDto) {
    await this.authService.validateUser(email, password);
    const { cookie, accessToken } = await this.authService.getCookieAndToken(email);
    res.setHeader('Set-Cookie', cookie);
    res.send(accessToken);
  }
}
