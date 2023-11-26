import { AppInfo } from 'supertokens-node/types';

export const ConfigInjectionToken = 'ConfigInjectionToken';

export type AuthSuperTokensModuleConfig = {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
};
