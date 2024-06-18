import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { QuestionSet, BrowserState} from "../types";
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
    setLikes: (state, action: PayloadAction<{id: string, likes: number, liked: boolean}>) => {
      console.log(action.payload);
      const set = state.sets.find((set) => set._id === action.payload.id);
      if (set) {
        set.likes = action.payload.likes;
        set.liked = action.payload.liked;
      }
    }
  },
});

export const { init,setLikes } = browserSlice.actions;

export const initializeBrowser = () => {
  return async (dispatch: AppDispatch) => {
    const sets = await browserService.getAllSets();
    dispatch(init(sets));
  };
};
export const likeSet = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const {likes, liked} = await browserService.switchLike(id);
      dispatch(setLikes({ id, likes, liked }));
    }
    catch (error) {
      console.log(error);
    }
  };
}

export default browserSlice.reducer;
