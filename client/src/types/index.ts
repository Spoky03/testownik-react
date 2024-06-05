export interface Answer {
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