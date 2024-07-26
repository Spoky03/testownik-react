import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import userService from "@/services/userService";
import { ChartData, GlobalStatsProps, StatsState } from "@/types";

const initialState: StatsState = {
  lastWeek: [],
  chartData: [],
  weeklyGoal: 0,
  currentGoalTime: 0,
  totalMastered: 0,
};

const statsSlice = createSlice({
  name: "stats",
  initialState: initialState,
  reducers: {
    initLastWeek: (state, action: PayloadAction<GlobalStatsProps[]>) => {
      state.lastWeek = action.payload;
    },
    initChartData: (state, action: PayloadAction<ChartData[]>) => {
      state.chartData = action.payload;
    },
    setGoal: (state, action: PayloadAction<number>) => {
      state.weeklyGoal = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentGoalTime = action.payload;
    },
    initTotalMastered: (state, action: PayloadAction<number>) => {
      state.totalMastered = action.payload;
    },
  },
});

export const {
  initLastWeek,
  initChartData,
  setGoal,
  setCurrentTime,
  initTotalMastered,
} = statsSlice.actions;

export const initializeStats = () => {
  return async (dispatch: AppDispatch) => {
    const { startDate, endDate } = {
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
    };
    const locale = "en-US";
    try {
      const response = await userService.getGlobalStats(startDate, endDate);
      response.sort(
        (a: GlobalStatsProps, b: GlobalStatsProps) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      dispatch(initLastWeek(response));
      const totalMastered = response.reduce(
        (acc: number, stat: GlobalStatsProps) => acc + stat.masteredQuestions,
        0
      );
      dispatch(initTotalMastered(totalMastered));
      const time = response?.find(
        (stat: GlobalStatsProps) =>
          new Date(stat.date).toLocaleDateString() ===
          new Date().toLocaleDateString()
      )?.time;
      dispatch(setCurrentTime(time ?? 0));
      const withWeekdays = response?.map((stat: GlobalStatsProps) => {
        //parse date to weekday
        return {
          weekday: new Date(stat.date).toLocaleDateString(locale, {
            weekday: "long",
          }),
          correct: stat.correctAnswers,
          incorrect: stat.incorrectAnswers,
        };
      });
      dispatch(initChartData(withWeekdays));
    } catch (error) {
      console.log(error);
    }
  };
};
export const setWeeklyGoal = (weeklyTimeGoal: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await userService.saveWeeklyTimeGoal(weeklyTimeGoal);
      dispatch(setGoal(weeklyTimeGoal));
    } catch (error) {
      console.log(error);
    }
  };
};

export default statsSlice.reducer;
