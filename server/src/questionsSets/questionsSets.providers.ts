import { Connection } from 'mongoose';
import { QuestionSetSchema } from 'src/schemas/questionSet.schema';

export const questionSetsProviders = [
  {
    provide: 'QUESTIONSET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('QuestionSets', QuestionSetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
