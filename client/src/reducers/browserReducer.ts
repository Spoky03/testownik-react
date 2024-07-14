import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { QuestionSet, BrowserState} from "../types";
import browserService from "../services/browserService";

const initialState: BrowserState = {
  sets: [],
  searchValue: "",
  sort: {
    value: "likes",
    ascending: false,
  },
};

const browserSlice = createSlice({
  name: "browser",
  initialState: initialState,
  reducers: {
    init: (state, action: PayloadAction<QuestionSet[]>) => {
      state.sets = action.payload;
    },
    setLikes: (state, action: PayloadAction<{id: string, likes: number, liked: boolean}>) => {
      const set = state.sets.find((set) => set._id === action.payload.id);
      if (set) {
        set.likes = action.payload.likes;
        set.liked = action.payload.liked;
      }
    },
    setSortValue: (state, action: PayloadAction<BrowserState['sort']['value']>) => {
      state.sort.value = action.payload;
      switch (action.payload) {
        case "likes":
          state.sets.sort((a, b) => {
            if (state.sort.ascending) {
              return a.likes - b.likes;
            } else {
              return b.likes - a.likes;
            }
          });
          break;
        case "date":
          state.sets.sort((a, b) => {
            if (state.sort.ascending) {
              return new Date(a.metaData.date).getTime() - new Date(b.metaData.date).getTime();
            } else {
              return new Date(b.metaData.date).getTime() - new Date(a.metaData.date).getTime();
            }
          });
          break;
        default:
          return state;
      }
    },
    changeAscending: (state) => {
      state.sort.ascending = !state.sort.ascending;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { init,setLikes, setSortValue, changeAscending, setSearchValue } = browserSlice.actions;

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
};
export const sortSets = (value: BrowserState['sort']['value']) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSortValue(value));
  };
};
export const changeSortDirection = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(changeAscending());
  };
};

export default browserSlice.reducer;
