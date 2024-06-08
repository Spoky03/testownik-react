export interface Answer {
  id: Key | null | undefined;
  _id: number;
  answer: string;
  correct: boolean;
}
export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
}

export interface QuizState {
  questions: Question[];
}
export interface QuestionSet {
  _id: string;
  name: string;
  questions: Question[];
}
export interface User {
  questionSets: QuestionSet[];
}
export interface NotificationType {
  text: string;
  type: string;
}
//---saves---
export interface SavedQuestion {
  id: string;
  repets: number;
}
export interface SavedSet {
  _id: string;
  questions: SavedQuestion[];
}
export interface State {
  user: User | null;
  token: string | null;
  notification: NotificationType;
  saves: SavedSet[];
}
