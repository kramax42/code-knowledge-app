import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../../libs/guards/jwt.guard';
import { RequestWithUser } from './interfaces/request-with-user';

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
  async signIn(@Req() request: Request, @Body() { email, password }: SignInDto) {
    const { email: validatedEmail } = await this.authService.validateUser(email, password);
    const { cookie, accessToken } = await this.authService.getCookieAndToken(validatedEmail);
    request.res.setHeader('Set-Cookie', cookie);
    request.res.send(accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('log-out')
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    request.res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async authMe(@Req() request: RequestWithUser) {
    const user = request.user
    const { accessToken } = await this.authService.getCookieAndToken(user.email);
    return (
      {
        user: {
          email: user.email,
          name: user.name,
          role: user.role
        },
        accessToken
      });
  }
}
