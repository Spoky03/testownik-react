import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getTheme } from "../lib/theme";
interface ThemeState {
  theme: string;
}
const initialState: ThemeState = {
  theme: getTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { set } = themeSlice.actions;

export const setTheme = (theme: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(set(theme));
  };
};

export default themeSlice.reducer;
