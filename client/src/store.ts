import { configureStore } from '@reduxjs/toolkit'

import quizReducer from './reducers/quizReducer'
import userReducer from './reducers/userReducer'
import browserReducer from './reducers/browserReducer'
import themeReducer from './reducers/themeReducer'

const store =  configureStore({
    reducer: {
        quiz: quizReducer,
        user: userReducer,
        browser: browserReducer,
        theme: themeReducer
    }
  })  

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch