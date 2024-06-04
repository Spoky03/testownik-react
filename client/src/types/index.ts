export interface Answer {
    id: number;
    answer: string;
    correct: boolean;
}
export interface Question {
    id: number;
    question: string;
    answers: Answer[];
    }


export interface QuizState {
    questions: Question[];
}