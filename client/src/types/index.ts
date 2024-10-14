export interface RootState {
  quiz: QuizState;
  user: UserState;
  browser: BrowserState;
  stats: StatsState;
}
export interface Answer {
  id: number | null | undefined;
  _id: number;
  answer: string;
  correct: boolean;
}
export interface QuestionImage {
  url: string;
}
export interface Question {
  forEach(arg0: (question: string) => void): unknown;
  _id: string;
  question: string;
  answers: Answer[];
  repeats?: number;
  image?: QuestionImage;
  explanation?: string;
  report?: number;
  difficulty?: {
    value: number;
    length: number;
  }
}
export interface CreatedAnswer {
  id: number;
  answer: string;
  correct: boolean;
}
export interface CreatedQuestion {
  question: string;
  answers: CreatedAnswer[];
  explanation?: string;
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
  state: "waiting" | "feedback";
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
  explanation: {
    visible: boolean;
    content: string;
  };
}
export interface BrowserState {
  sets: QuestionSet[];
  searchValue: string;
  sort: {
    value: "likes" | "date" | "name" | null;
    ascending: boolean;
  };
}
export interface GlobalStatsProps {
  correctAnswers: number;
  incorrectAnswers: number;
  masteredQuestions: number;
  totalQuestions: number;
  time: number;
  date: Date;
}
export interface ChartData {
  weekday: string;
  correct: number;
  incorrect: number;
}
export interface FinishedSet {
  setId: string;
  date: Date;
}
export interface StatsState {
  lastWeek: GlobalStatsProps[];
  chartData: ChartData[];
  weeklyGoal: number;
  currentGoalTime: number;
  totalMastered: number;
  finishedSets: FinishedSet[];
}
export interface QuestionSet {
  description: string;
  _id: string;
  name: string;
  author:
    | {
        username: string;
        _id: string;
      }
    | string;
  questions: Question[];
  likes: number;
  liked: boolean;
  foreign?: boolean;
  private?: boolean;
  metaData: {
    tags: string[];
    date: Date;
    subject: string;
  };
}
export enum SetListTypes {
  QUIZ = "QUIZ",
  BROWSER = "BROWSER",
  EDIT = "EDIT",
  MODAL = "MODAL",
}

export interface User {
  username: string;
  email: string;
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

export interface FetchedUser {
  user: User;
  progress: UserState["progress"];
  preferences: UserState["preferences"];
  bookmarks: UserState["bookmarks"];
  foreign: QuestionSet[];
  settings: UserState["settings"];
  questionSets: QuestionSet[];
  email: string;
}

export interface ReportExplanation {
  explanation: string;
  reason: string;
  questionId: string;
}