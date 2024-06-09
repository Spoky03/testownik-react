import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { QuizState, Question, QuestionSet } from "../types";

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
            state.active.repets = state.active.repets
              ? state.active.repets - 1
              : 1;
            state.active.repets === 0 && state.sidebar.masteredQuestions++;
          } else {
            state.sidebar.incorrectAnswers++;
            state.active.repets = state.active.repets
              ? state.active.repets + 1
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
          const questionsWithRepets = state.questions.filter((question) => question.repets);
          const questionsWithoutActive = questionsWithRepets.filter((question) => question._id !== state.active?._id);
          if (questionsWithoutActive.length > 0) {
            state.active = questionsWithoutActive[Math.floor(Math.random() * questionsWithoutActive.length)];
          }
          else if (questionsWithRepets.length) {
            state.active =
              questionsWithRepets[
                Math.floor(Math.random() * questionsWithRepets.length)
              ];
          } else {
            state.finished = true;
          }
        }
      }
    },
    save: (state) => {
      console.log("Save");
    },
    setSetId: (state, action: PayloadAction<string>) => {
      state.setId = action.payload;
    }
  },
});

export const { init, setQuestions, appendSelected, setActive, submitAnswers, reset,save, setSetId } =
  quizSlice.actions;

export const initializeQuiz = (set: QuestionSet) => {
  return async (dispatch: AppDispatch) => {
    const questions = set.questions.map((question) => ({
      ...question,
      repets: 1,
    }));
    dispatch(
      setActive(questions[Math.floor(Math.random() * questions.length)])
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
}
export const saveQuizProgress = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(save());
  };
}
export const setQuizSetId = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSetId(id));
  };
}

export default quizSlice.reducer;
