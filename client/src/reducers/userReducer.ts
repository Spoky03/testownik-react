import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { AppDispatch } from "../store";
import {
  CreatedQuestion,
  NotificationType,
  Question,
  QuestionSet,
  UserState,
} from "../types";

const initialState: UserState = {
  user: {
    sub: "",
    username: "",
    questionSets: [],
    iat: 0,
    exp: 0,
  },
  token: null,
  notification: {
    text: "",
    type: "normal",
  },
  preferences: {
    initialRepetitions: 1,
    maxRepetitions: 5,
  },
  progress: [],
  bookmarks: [],
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      state.notification.text = "Logged In";
    },
    getUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = initialState.user;
      state.notification.text = "Logged Out";
    },
    addSet: (state, action: PayloadAction<any>) => {
      state.user?.questionSets.push(action.payload);
    },
    notify: (state, action: PayloadAction<any>) => {
      state.notification.text = action.payload.text;
      state.notification.type = action.payload.type;
    },
    addQuestionToSet: (state, action: PayloadAction<any>) => {
      if (state.user) {
        const questionSet = state.user.questionSets.filter(
          (set: QuestionSet) => set._id === action.payload.id
        );
        if (questionSet.length > 0) {
          questionSet[0].questions.push(action.payload.createdQuestion);
        }
      }
    },
    editQuestionToSet: (state, action: PayloadAction<any>) => {
      if (state.user) {
        const questionSet = state.user.questionSets.find(
          (set: QuestionSet) => set._id === action.payload.setId
        );
        if (questionSet) {
          questionSet.questions = questionSet.questions.map((q) => {
            if (q._id === action.payload.id) {
              q = action.payload.createdQuestion;
            }
            return q;
          });
        }
      }
    },
    getSets: (state, action: PayloadAction<any>) => {
      state.preferences = action.payload.preferences;
      state.progress = action.payload.progress;
      state.bookmarks = action.payload.bookmarks;
      const foreign = action.payload.foreign.map((set: QuestionSet) => {
        set.foreign = true;
        return set;
      });
      const merged = [...action.payload.questionSets, ...foreign];
      state.user = {
        ...state.user,
        questionSets: merged,
      };
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    deleteQuestion: (state, action: PayloadAction<any>) => {
      const questionSets = state.user?.questionSets;
      if (questionSets) {
        questionSets.forEach((set: QuestionSet) => {
          set.questions = set.questions.filter(
            (question) => question._id !== action.payload
          );
        });
      }
    },
    deleteSet: (state, action: PayloadAction<any>) => {
      state.user.questionSets = state?.user?.questionSets.filter(
        (set: QuestionSet) => set._id !== action.payload
      );
    },
    initProgress: (state, action: PayloadAction<any>) => {
      state.progress = action.payload;
    },
    resetProgress: (state, action: PayloadAction<any>) => {
      state.progress = state.progress.map((set) => {
        if (set.questionSetId === action.payload.id) {
          set = action.payload.resetedSetProgress;
        }
        return set;
      });
    },
    setBookmarks: (state, action: PayloadAction<any>) => {
      state.bookmarks = action.payload;
    },
    setForeignSets: (state, action: PayloadAction<any>) => {
      const foreign = action.payload.map((set: QuestionSet) => {
        set.foreign = true;
        return set;
      });

      // Assuming each QuestionSet has a unique 'id' property
      const updatedQuestionSets = [...state.user.questionSets];

      foreign.forEach((foreignSet : QuestionSet) => {
        const exists = updatedQuestionSets.some(
          (existingSet) => existingSet._id === foreignSet._id
        );
        if (!exists) {
          updatedQuestionSets.push(foreignSet);
        }
      });
      state.user.questionSets = updatedQuestionSets;
    },
    switchPrivacy: (state, action: PayloadAction<{isPrivate: boolean, id: string}>) => {
      const updatedQuestionSets = state.user.questionSets.map((set: QuestionSet) => {
        if (set._id === action.payload.id) {
          set.private = action.payload.isPrivate;
        }
        return set;
      });
      state.user.questionSets = updatedQuestionSets;
    }
  },
});

export const {
  login,
  logout,
  getUser,
  addSet,
  notify,
  addQuestionToSet,
  editQuestionToSet,
  getSets,
  setToken,
  deleteQuestion,
  deleteSet,
  initProgress,
  resetProgress,
  setBookmarks,
  setForeignSets,
  switchPrivacy
} = userSlice.actions;

export const loginUser = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userService.login({ username, password });
      if (res.access_token) {
        userService.setToken(res.access_token);
        dispatch(login(res.access_token));
        dispatch(fetchUser());
        dispatch(fetchAllUserData());
        return { ...res, status: 200 };
      } else {
        return res;
      }
    } catch (error) {
      return error;
    }
  };
};
export const reLoginUser = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      userService.setToken(token);
      const user = await userService.getProfile();
      dispatch(getUser(user));
      dispatch(setToken(token));
    } catch (error) {
      console.error(error);
    }
  };
};
export const fetchUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const user = await userService.getProfile();
      dispatch(getUser(user));
    } catch (error) {
      console.error(error);
    }
  };
};
export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      userService.logout();
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };
};
export const addQuestionSet = (questionSetName: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const createdQuestionSet = await userService.createQuestionSet(
        questionSetName
      );
      dispatch(addSet(createdQuestionSet));
      return createdQuestionSet._id;
    } catch (error) {
      console.error(error);
    }
  };
};
export const createQuestion = (questions: CreatedQuestion[], id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const createdQuestions = await userService.createQuestions(questions, id);
      createdQuestions.forEach((createdQuestion) => {
        dispatch(addQuestionToSet({ createdQuestion, id }));
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const editQuestion = (
  question: CreatedQuestion,
  id: string,
  setId: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const createdQuestion = await userService.editQuestion(question, id);
      dispatch(editQuestionToSet({ createdQuestion, id, setId }));
    } catch (error) {
      console.error(error);
    }
  };
};
// confirm('kocham martyske')
export const notifyUser = (notification: NotificationType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(notify(notification));
  };
};

export const fetchAllUserData = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userService.getAllUserData();
      const foreign = await userService.getForeignSets();
      dispatch(getSets({ ...res, foreign }));
    } catch (error) {
      console.error(error);
    }
  };
};
export const deleteOneQuestion = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await userService.deleteOneQuestion(id);
      dispatch(deleteQuestion(id));
    } catch (error) {
      console.error(error);
    }
  };
};
export const deleteOneQuestionSet = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await userService.deleteOneQuestionSet(id);
      dispatch(deleteSet(id));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getProgress = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const progress = await userService.getProgress();
      dispatch(initProgress(progress));
    } catch (error) {
      console.error(error);
    }
  };
};
export const resetSingleProgress = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resetedSetProgress = await userService.resetProgress(id);
      dispatch(resetProgress({ id, resetedSetProgress }));
    } catch (error) {
      console.error(error);
    }
  };
};
export const addBookmark = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const bookmarks = await userService.addBookmark(id);
      dispatch(setBookmarks(bookmarks));
      const foreign = await userService.getForeignSets();
      dispatch(setForeignSets(foreign));
    } catch (error) {
      console.error(error);
    }
  };
};
export const deleteBookmark = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const bookmarks = await userService.deleteBookmark(id);
      dispatch(setBookmarks(bookmarks));
    } catch (error) {
      console.error(error);
    }
  };
};
export const switchPrivacyOfSet = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const isPrivate = await userService.switchPrivacy(id);
      dispatch(switchPrivacy({id,isPrivate}));
    } catch (error) {
      console.error(error);
    }
  };
}

export default userSlice.reducer;
