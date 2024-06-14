import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { QuizState, Question, QuestionSet, BrowserState} from "../types";
import browserService from "../services/browserService";

const initialState: BrowserState = {
  sets: [],
};

const browserSlice = createSlice({
  name: "browser",
  initialState: initialState,
  reducers: {
    init: (state, action: PayloadAction<QuestionSet[]>) => {
      state.sets = action.payload;
    },
  },
});

export const { init } = browserSlice.actions;

export const initializeBrowser = () => {
  return async (dispatch: AppDispatch) => {
    const sets = await browserService.getAllSets();
    dispatch(init(sets));
  };
};

export default browserSlice.reducer;
