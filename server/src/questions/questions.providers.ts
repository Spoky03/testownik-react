import { Connection } from 'mongoose';
import { QuestionSchema } from '../schemas/question.schema';
import { QuestionSetSchema } from 'src/schemas/questionSet.schema';
import { UserSchema } from 'src/schemas/user.schema';

export const questionProviders = [
  {
    provide: 'QUESTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Question', QuestionSchema),
    inject: ['DATABASE_CONNECTION'],
  },

  {
    provide: 'QUESTIONSET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('QuestionSets', QuestionSetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
