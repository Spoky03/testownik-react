export interface RootState {
  quiz: QuizState;
  user: UserState;
  browser: BrowserState;
}
export interface Answer {
  id: number | null | undefined;
  _id: number;
  answer: string;
  correct: boolean;
}
export interface Question {
  forEach(arg0: (question: string) => void): unknown;
  _id: string;
  question: string;
  answers: Answer[];
  repeats?: number;
}
export interface CreatedAnswer {
  id: number;
  answer: string;
  correct: boolean;
}
export interface CreatedQuestion {
  question: string;
  answers: CreatedAnswer[];
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
  preferences: {
    initialRepetitions: number;
    maxRepetitions: number;
    additionalRepetitions: number;
  };
}
export interface BrowserState {
  sets: QuestionSet[];
}
export interface QuestionSet {
  description: string;
  _id: string;
  name: string;
  author: {
    username: string;
    _id: string;
  } | string;
  questions: Question[];
  likes: number;
  liked: boolean;
  foreign?: boolean;
  private?: boolean;
}
export enum SetListTypes {
  QUIZ = "QUIZ",
  BROWSER = "BROWSER",
  EDIT = "EDIT",
  MODAL = "MODAL",
}

export interface User {
  username: string;
  sub: string;
  iat: number;
  exp: number;
  token: string | null;
  questionSets: QuestionSet[];
}
export interface UserState {
  user: User;
  preferences: {
    initialRepetitions: number;
    maxRepetitions: number;
  };
  progress: {
    questionSetId: string;
    questions: { id: string; repeats: number | undefined }[];
    sidebar: Sidebar;
  }[];
  bookmarks: string[];
  settings: {
    agreements: boolean;
    newsletter: boolean;
  };
  }
