import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async createUser(dto: SignUpDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: user.email};
  }

  async getAccessToken(email: string) {
    const payload = { email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`
    });
    return {
      accessToken
    };
  }

  async getCookieAndToken(email: string) {
    const { accessToken } = await this.getAccessToken(email);
    // const cookie = `Authorization=Bearer ${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    const cookie = `Authorization=Bearer ${accessToken}; HttpOnly; SameSite=None; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    return {
      cookie,
      accessToken,
    };
  }


  getCookieForLogOut() {
    return `Authorization=; HttpOnly; Path=/; Max-Age=0`;
  }
}
