export interface RootState {
  quiz: QuizState;
  user: UserState;
}
export interface Answer {
  id: number | null | undefined;
  _id: number;
  answer: string;
  correct: boolean;
}
export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  repets?: number;
}
export interface Sidebar {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  masteredQuestions: number;
  time: number;
}
export interface QuizState {
  questions: Question[];
  state: 'waiting' | 'feedback';
  active: Question | null;
  selected: number[];
  finished: boolean;
  sidebar: Sidebar;
  setId: string;
}
export interface QuestionSet {
  _id: string;
  name: string;
  questions: Question[];
}


export interface User {
  username: string;
  sub: string;
  iat: number;
  exp: number;
  questionSets: QuestionSet[];
}
export interface NotificationType {
  text: string;
  type: string;
}
//---saves---

export interface UserState {
  user: User | null;
  token: string | null;
  notification: NotificationType;
  preferences: {
    initialRepetitions: number;
    maxRepetitions: number;
  };
}
