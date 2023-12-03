import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthSuperTokensGuard } from '../auth-super-tokens/auth-super-tokens.guard';
import supertokens from 'supertokens-node';
import { getAdminRoleValidator } from '../auth-super-tokens/auth-super-tokens.util';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  @UseGuards(new AuthSuperTokensGuard())
  async getUser(@Session() session: SessionContainer) {
    const userId = session.getUserId();
    const userInfo = await supertokens.getUser(userId);

    return userInfo;
  }

  // ...
  @Get('test')
  @UseGuards(new AuthSuperTokensGuard(getAdminRoleValidator()))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    // session.
    // session.getClaimValue();
    return 'you are admin';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
