import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { AppDispatch } from "../store";

const initialState = {
    user: null,
    token: null,
    notification : {
        text: '',
        type: 'normal'
    }
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
    }
    
  },
});

export const { login, logout, getUser, addSet } = userSlice.actions;

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

export default userSlice.reducer;
