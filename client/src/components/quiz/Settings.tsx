import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { updateQuizPreferences } from "../../reducers/quizReducer";
import { useState } from "react";
import { Input } from "../ui/input";

export const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { preferences } = useSelector((state: RootState) => state.quiz);
  const [preferencesForm, setPreferencesForm] = useState(preferences);
  const handlePreferencesChange = (newPreferences: typeof preferencesForm) => {
    dispatch(updateQuizPreferences(newPreferences));
  };
  return (
    <div className="flex flex-col gap-4 place-items-center place-self-center shadow-xl dark:bg-secondary bg-w-secondary px-4 pb-4 pt-5 sm:p-6 sm:pb-10">
      <div className="text-success text-center">Ustawienia</div>
      <div className="flex flex-col gap-1 place-items-center">
        <label htmlFor="initialRepetitions" className="font-semibold">
          Initial Repetitions
        </label>
        <Input
          className="shadow-sm"
          type="number"
          id="initialRepetitions"
          value={preferences.initialRepetitions}
          onChange={(e) => { 
            const newPreferencesForm = {
              ...preferencesForm,
              initialRepetitions: parseInt(e.target.value),
            };
            setPreferencesForm(newPreferencesForm);
            handlePreferencesChange(newPreferencesForm);
          }}
          min={1}
        />
      </div>
      <div className="flex flex-col gap-1 place-items-center">
        <label htmlFor="addRepetitions" className="font-semibold">
          Additional Repetitions
        </label>
        <Input
          className="shadow-sm"
          type="number"
          id="addRepetitions"
          value={preferences.additionalRepetitions}
          onChange={(e) => {
            const newPreferencesForm = {
              ...preferencesForm,
              additionalRepetitions: parseInt(e.target.value),
            };
            setPreferencesForm(newPreferencesForm);
            handlePreferencesChange(newPreferencesForm);
          }}
          min={0}
        />
      </div>
      <div className="flex flex-col gap-1 place-items-center">
        <label htmlFor="maxRepetitions" className="font-semibold">
          Max Repetitions
        </label>
        <Input
          className="shadow-sm"
          type="number"
          id="maxRepetitions"
          value={preferences.maxRepetitions}
          onChange={(e) => {
            const newPreferencesForm = {
              ...preferencesForm,
              maxRepetitions: parseInt(e.target.value),
            };
            setPreferencesForm(newPreferencesForm);
            handlePreferencesChange(newPreferencesForm);
          }}
          min={1}
        />
      </div>
    </div>
  );
};
