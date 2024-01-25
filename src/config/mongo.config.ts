import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { EnvKeyFor } from '../constant/config.constant';

export const getMongoConfig = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => {
  return {
    uri: getMongoUri(configService),
  };
};

const getMongoUri = (configService: ConfigService): string =>
  'mongodb://' +
  configService.get(EnvKeyFor.MONGO_USERNAME) +
  ':' +
  configService.get(EnvKeyFor.MONGO_PASSWORD) +
  '@' +
  configService.get(EnvKeyFor.MONGO_HOST) +
  ':' +
  configService.get(EnvKeyFor.MONGO_PORT) +
  '/' +
  configService.get(EnvKeyFor.MONGO_AUTHDB);
