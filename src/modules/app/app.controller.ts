import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthSuperTokensGuard } from '../auth-super-tokens/auth-super-tokens.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ...
  @Get('test')
  @UseGuards(new AuthSuperTokensGuard())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTest(@Session() session: SessionContainer): Promise<string> {
    // TODO: magic
    // session.
    // session.getClaimValue();
    return 'magic';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
