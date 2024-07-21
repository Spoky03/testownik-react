import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { AppDispatch } from "../store";
import { CreatedQuestion, FetchedUser, Question, QuestionSet, UserState } from "../types";
import browserService from "@/services/browserService";

const initialState: UserState = {
  user: {
    sub: "",
    username: "",
    email: "",
    questionSets: [],
    iat: 0,
    exp: 0,
    token: null,
  },

  preferences: {
    initialRepetitions: 1,
    maxRepetitions: 5,
  },
  progress: [],
  bookmarks: [],
  settings: {
    agreements: false,
    newsletter: false,
  },
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    getUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
    addSet: (state, action: PayloadAction<QuestionSet>) => {
      state.user?.questionSets.push(action.payload);
    },
    addQuestionToSet: (
      state,
      action: PayloadAction<{ createdQuestion: Question; id: string }>
    ) => {
      if (state.user) {
        const questionSet = state.user.questionSets.filter(
          (set: QuestionSet) => set._id === action.payload.id
        );
        if (questionSet.length > 0) {
          questionSet[0].questions.push(action.payload.createdQuestion);
        }
      }
    },
    editSet: (state, action: PayloadAction<QuestionSet>) => {
      if (state.user) {
        state.user.questionSets = state.user.questionSets.map(
          (set: QuestionSet) => {
            if (set._id === action.payload._id) {
              set = action.payload;
            }
            return set;
          }
        );
      }
    },
    editQuestionToSet: (
      state,
      action: PayloadAction<{
        createdQuestion: Question;
        id: string;
        setId: string;
      }>
    ) => {
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
    getSets: (state, action: PayloadAction<FetchedUser>) => {
      state.preferences = action.payload.preferences;
      state.progress = action.payload.progress;
      state.bookmarks = action.payload.bookmarks;
      state.settings = action.payload.settings;
      const foreign = action.payload.foreign.map((set: QuestionSet) => {
        set.foreign = true;
        return set;
      });
      const merged = [...action.payload.questionSets, ...foreign];
      state.user = {
        ...state.user,
        email: action.payload.email,
        questionSets: merged,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      const questionSets = state.user?.questionSets;
      if (questionSets) {
        questionSets.forEach((set: QuestionSet) => {
          set.questions = set.questions.filter(
            (question) => question._id !== action.payload
          );
        });
      }
    },
    deleteSet: (state, action: PayloadAction<string>) => {
      state.user.questionSets = state?.user?.questionSets.filter(
        (set: QuestionSet) => set._id !== action.payload
      );
    },
    initProgress: (state, action: PayloadAction<UserState["progress"]>) => {
      state.progress = action.payload;
    },
    resetProgress: (
      state,
      action: PayloadAction<{
        id: string;
        resetedSetProgress: UserState["progress"][0];
      }>
    ) => {
      state.progress = state.progress.map((set) => {
        if (set.questionSetId === action.payload.id) {
          set = action.payload.resetedSetProgress;
        }
        return set;
      });
    },
    setBookmarks: (state, action: PayloadAction<string[]>) => {
      state.bookmarks = action.payload;
    },
    setForeignSets: (state, action: PayloadAction<QuestionSet[]>) => {
      const foreign = action.payload.map((set: QuestionSet) => {
        set.foreign = true;
        return set;
      });

      // Assuming each QuestionSet has a unique 'id' property
      const updatedQuestionSets = [...state.user.questionSets];

      foreign.forEach((foreignSet: QuestionSet) => {
        const exists = updatedQuestionSets.some(
          (existingSet) => existingSet._id === foreignSet._id
        );
        if (!exists) {
          updatedQuestionSets.push(foreignSet);
        }
      });
      state.user.questionSets = updatedQuestionSets;
    },
    switchPrivacy: (
      state,
      action: PayloadAction<{ isPrivate: boolean; id: string }>
    ) => {
      const updatedQuestionSets = state.user.questionSets.map(
        (set: QuestionSet) => {
          if (set._id === action.payload.id) {
            set.private = action.payload.isPrivate;
          }
          return set;
        }
      );
      state.user.questionSets = updatedQuestionSets;
    },
  },
});

export const {
  login,
  logout,
  getUser,
  addSet,
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
  switchPrivacy,
  editSet,
} = userSlice.actions;

export const loginUser = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userService.login({ username, password });
      if (res.access_token) {
        userService.setToken(res.access_token);
        browserService.setToken(res.access_token);
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
export const registerUser = (username: string, email:string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userService.register({ username, email, password });
      if (res.access_token) {
        userService.setToken(res.access_token);
        browserService.setToken(res.access_token);
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
      browserService.setToken(token);
      const user = await userService.getProfile();
      dispatch(getUser(user));
      dispatch(setToken(token));
      return true;
    } catch (error) {
      // console.error(error);
      return false;
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
export const addQuestionSet = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const createdQuestionSet = await userService.createQuestionSet({
        name,
        description,
      });
      dispatch(addSet(createdQuestionSet));
      return createdQuestionSet._id;
    } catch (error: unknown) {
      console.error(error);
      return error;
    }
  };
};
export const editQuestionSet = ({
  name,
  description,
  id,
}: {
  name: string;
  description: string;
  id: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const createdQuestionSet = await userService.editQuestionSet({
        name,
        description,
        id,
      });
      dispatch(editSet(createdQuestionSet));
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
        dispatch(addQuestionToSet({ createdQuestion: createdQuestion as unknown as Question, id }));
      });
      return { status: 200, message: "Questions added successfully" };
    } catch (error) {
      console.error(error);
      return { status: 400, message: "There was a problem with your request." };
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
      return { status: 200, message: "Question edited successfully" };
    } catch (error) {
      console.error(error);
      return { status: 400, message: "There was a problem with your request." };
    }
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
      return error;
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
      dispatch(switchPrivacy({ id, isPrivate }));
    } catch (error) {
      console.error(error);
    }
  };
};

export default userSlice.reducer;
