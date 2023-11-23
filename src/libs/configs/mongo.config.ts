import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) =>
  'mongodb://ux0myu0nuahtdsz3vjy3:JKzG5YUcbb8DfaPl5otA@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bensvlxryceli4f?replicaSet=rs0';
// 'mongodb://' +
// configService.get('MONGO_LOGIN') +
// ':' +
// configService.get('MONGO_PASSWORD') +
// '@' +
// configService.get('MONGO_HOST') +
// ':' +
// configService.get('MONGO_PORT') +
// '/' +
// configService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
