import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { AppDispatch } from "../store";
import { json } from "react-router-dom";
import { NotificationType, QuestionSet, State } from "../types";

const initialState:State = {
    user: null,
    token: null,
    notification : {
        text: '',
        type: 'normal'
    },
    questionSets: []
    };
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      state.notification.text = 'Logged In';
    },
    getUser: (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        },
    logout: (state) => {
        state.token = null;
        state.user = null;
        state.notification.text = 'Logged Out';
        },
    addSet: (state, action: PayloadAction<any>) => {
        state.user.questionSets.push(action.payload)
    },
    notify: (state, action: PayloadAction<any>) => {
        state.notification.text = action.payload.text;
        state.notification.type = action.payload.type;
    },
    addQuestionToSet: (state, action: PayloadAction<any>) => {
        console.log(action.payload)
        if (state.user) {
            const questionSet = state.user.questionSets.filter((set: QuestionSet) => set._id === action.payload.id)
            if (questionSet.length > 0) {
                questionSet[0].questions.push(action.payload.createdQuestion)
            }
        }
    }    
  },
});

export const { login, logout, getUser, addSet, notify, addQuestionToSet } = userSlice.actions;

export const loginUser = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userService.login({ username, password });
      if (res.access_token) {
        userService.setToken(res.access_token);
        dispatch(login(res.access_token));
        dispatch(fetchUser());
      } else {
        console.log("error", res);
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const fetchUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const user = await userService.getProfile()
            dispatch(getUser(user))
        } catch (error) {
            console.error(error)
        }
    }
}
export const logoutUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            userService.logout()
            dispatch(logout())
        } catch (error) {
            console.error(error)
        }
    }
}
export const addQuestionSet = (questionSetName : string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const createdQuestionSet = await userService.createQuestionSet(questionSetName)
            console.log(createdQuestionSet)
            dispatch(addSet(createdQuestionSet))
        } catch (error) {
            console.error(error)
        }
    }
}
export const createQuestion = (question : any, id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const createdQuestion = await userService.createQuestion(question, id)
            dispatch(addQuestionToSet({createdQuestion, id}))
        } catch (error) {
            console.error(error)
        }
    } 
  }
  // confirm('kocham martyske')
export const notifyUser = (notification: NotificationType) => {
    return async (dispatch: AppDispatch) => {
        dispatch(notify(notification))
    }
}

export default userSlice.reducer;