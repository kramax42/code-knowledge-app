import { Test, TestingModule } from '@nestjs/testing';
import { AuthSuperTokensService } from './auth-super-tokens.service';

describe('AuthSuperTokensService', () => {
  let service: AuthSuperTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSuperTokensService],
    }).compile();

    service = module.get<AuthSuperTokensService>(AuthSuperTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
