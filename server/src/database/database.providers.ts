import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> =>
      mongoose.connect(configService.get<string>('DATABASE_URL')),
    inject: [ConfigService],
  },
];
