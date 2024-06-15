import { Connection } from 'mongoose';
import { QuestionSetSchema } from 'src/schemas/questionSet.schema';
import { UserSchema } from 'src/schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'QUESTIONSET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('QuestionSets', QuestionSetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
