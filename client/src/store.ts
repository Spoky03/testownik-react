import { configureStore } from '@reduxjs/toolkit'

import quizReducer from './reducers/quizReducer'
import userReducer from './reducers/userReducer'

const store =  configureStore({
    reducer: {
        quiz: quizReducer,
        user: userReducer
    }
  })  

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch