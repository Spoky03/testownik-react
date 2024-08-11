import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { QuizState, Question, QuestionSet, UserState, Sidebar } from "../types";
import userService from "../services/userService";

const initialState: QuizState = {
  questions: [],
  state: "waiting",
  active: null,
  selected: [],
  finished: false,
  sidebar: {
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalQuestions: 0,
    masteredQuestions: 0,
    time: 0,
  },
  setId: "",
  preferences: {
    initialRepetitions: 1,
    maxRepetitions: 5,
    additionalRepetitions: 1,
  },
  explanation: {
    visible: false,
    content: "",
  },
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    init: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.sidebar.totalQuestions = action.payload.length;
    },
    reset: (state) => {
      state.questions = [];
      state.state = "waiting";
      state.active = null;
      state.selected = [];
      state.finished = false;
      state.sidebar = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalQuestions: 0,
        masteredQuestions: 0,
        time: 0,
      };
      state.setId = "";
    },
    appendSelected: (state, action: PayloadAction<number>) => {
      if (state.selected.includes(action.payload)) {
        state.selected = state.selected.filter((id) => id !== action.payload);
      } else {
        state.selected.push(action.payload);
      }
      // sort
      state.selected.sort((a, b) => a - b);
    },
    setActive: (state, action: PayloadAction<Question>) => {
      state.active = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    submitAnswers: (state) => {
      if (state.active) {
        if (state.state === "waiting") {
          state.state = "feedback";
          const correct = state.active.answers
            .filter((answer) => answer.correct)
            .map((answer) => answer.id);
          console.log(JSON.stringify(correct), JSON.stringify(state.selected));
          if (JSON.stringify(correct) == JSON.stringify(state.selected)) {
            state.sidebar.correctAnswers++;
            state.active.repeats = state.active.repeats
              ? state.active.repeats - 1
              : 1;
            state.active.repeats === 0 && state.sidebar.masteredQuestions++;
          } else {
            state.sidebar.incorrectAnswers++;
            state.active.repeats = state.active.repeats
              ? state.active.repeats + state.preferences.additionalRepetitions
              : 1;
          }
          const activeQuestionIndex = state.questions.findIndex(
            (question) => question._id === state.active?._id
          );
          if (activeQuestionIndex !== -1) {
            state.questions[activeQuestionIndex] = state.active;
          }
        } else {
          state.selected = [];
          state.state = "waiting";
          const questionsWithRepeats = state.questions.filter(
            (question) => question.repeats
          );
          const questionsWithoutActive = questionsWithRepeats.filter(
            (question) => question._id !== state.active?._id
          );
          if (questionsWithoutActive.length > 0) {
            state.active =
              questionsWithoutActive[
                Math.floor(Math.random() * questionsWithoutActive.length)
              ];
          } else if (questionsWithRepeats.length) {
            state.active =
              questionsWithRepeats[
                Math.floor(Math.random() * questionsWithRepeats.length)
              ];
          } else {
            state.finished = true;
          }
        }
      }
    },
    save: (
      state,
      action: PayloadAction<{
        questions: { id: string; repeats: number }[];
        time: number;
      }>
    ) => {
      const progress = {
        questions: action.payload.questions,
        questionSetId: state.setId,
        sidebar: {
          ...state.sidebar,
          time: action.payload.time,
        },
      };
      userService.saveProgress(progress);
    },
    setSetId: (state, action: PayloadAction<string>) => {
      state.setId = action.payload;
    },
    updatePreferences: (
      state,
      action: PayloadAction<QuizState["preferences"]>
    ) => {
      state.preferences = action.payload;
    },
    updateSidebar: (state, action: PayloadAction<QuizState["sidebar"]>) => {
      state.sidebar = action.payload;
    },
    setSidebar: (state, action: PayloadAction<Sidebar>) => {
      state.sidebar = action.payload;
    },
    setExplanation: (
      state,
      action: PayloadAction<{ visible: boolean; content: string }>
    ) => {
      state.explanation = action.payload;
    },
  },
});

export const {
  init,
  setQuestions,
  appendSelected,
  setActive,
  submitAnswers,
  reset,
  save,
  setSetId,
  updatePreferences,
  updateSidebar,
  setSidebar,
  setExplanation,
} = quizSlice.actions;

export const initializeQuiz = (
  set: QuestionSet,
  initialRepeats: number,
  progress: UserState["progress"]
) => {
  return async (dispatch: AppDispatch) => {
    //find progess for this set
    const setProgress = progress.find((p) => p.questionSetId === set._id);
    const questions = set.questions.map((question: Question) => {
      const progress = setProgress?.questions.find(
        (q: { id: string; repeats: number | undefined }) =>
          q.id === question._id
      );
      return {
        ...question,
        repeats:
          progress?.repeats !== undefined ? progress.repeats : initialRepeats,
      };
    });
    setProgress && dispatch(updateSidebar(setProgress.sidebar));
    dispatch(
      setActive(questions.find((question) => question.repeats) as Question)
    );
    dispatch(init(questions));
  };
};
export const addSelected = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(appendSelected(id));
  };
};
export const setActiveQuestion = (question: Question) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setActive(question));
  };
};
export const submitAnswersAction = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(submitAnswers());
  };
};
export const resetQuiz = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(reset());
  };
};
export const saveQuizProgress = (
  questions: { id: string; repeats: number }[],
  time: number
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(save({ questions, time }));
  };
};
export const setQuizSetId = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSetId(id));
  };
};
export const updateQuizPreferences = (
  preferences: QuizState["preferences"]
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updatePreferences(preferences));
  };
};
export const requestExplanation = (questionId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await userService.getQuestionExplanation(questionId);
      dispatch(setExplanation({ visible: true, content: res }));
    } catch (e) {
      dispatch(
        setExplanation({ visible: true, content: "No explanation available" })
      );
    }
  };
};
export const resetExplanation = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setExplanation({ visible: false, content: "" }));
  };
}

export default quizSlice.reducer;
