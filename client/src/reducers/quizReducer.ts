import { createSlice, current } from '@reduxjs/toolkit';
import quizService from '../services/quizService';
import { AppDispatch } from '../store';

const quizSlice = createSlice({
    name: 'quiz',
    initialState: [],
    reducers: {
      init(_state, action) {
        return action.payload
      },
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