import { configureStore } from '@reduxjs/toolkit'

import quizReducer from './reducers/quizReducer'
import userReducer from './reducers/userReducer'
import browserReducer from './reducers/browserReducer'
import themeReducer from './reducers/themeReducer'
import statsReducer from './reducers/statsReducer'

const store =  configureStore({
    reducer: {
        quiz: quizReducer,
        user: userReducer,
        browser: browserReducer,
        theme: themeReducer,
        stats: statsReducer
    }
  })  

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch