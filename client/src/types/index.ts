export interface Answer {
  id: Key | null | undefined;
  _id: number;
  answer: string;
  correct: boolean;
}
export interface Question {
  _id: number;
  question: string;
  answers: Answer[];
}

export interface QuizState {
  questions: Question[];
}
export interface QuestionSet {
  _id: number | string;
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
export interface State {
  user: User | null;
  token: string | null;
  questionSets: QuestionSet[];
  notification: NotificationType;
}
