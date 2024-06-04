import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import quizService from '../services/quizService';
import { AppDispatch } from '../store';
import { QuizState, Question } from '../types';


const initialState: QuizState = {
  questions: []
}
const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialState,
    reducers: {
      init: (state, action: PayloadAction<Question[]>) => {
        state.questions = action.payload;
      }
    }
})
  
export const { init } = quizSlice.actions


export const initializeQuiz = () => {
  return async (dispatch: AppDispatch) => {
    const questions = await quizService.getAll()
    dispatch(init(questions))
  }
}



export default quizSlice.reducer