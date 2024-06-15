import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { updateQuizPreferences } from "../../reducers/quizReducer";
import { useState } from "react";

export const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { preferences } = useSelector((state: RootState) => state.quiz);
  const [preferencesForm, setPreferencesForm] = useState(preferences);
  const handlePreferencesChange = (newPreferences: typeof preferencesForm) => {
    dispatch(updateQuizPreferences(newPreferences));
  };
  return (
    <div>
      <div className="flex flex-col gap-4 place-items-center">
        <div className="flex flex-col gap-1 place-items-center">
          <label htmlFor="initialRepetitions" className="font-semibold">
            Initial Repetitions
          </label>
          <input
            className="bg-w-ternary rounded shadow-sm text-primary"
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
          <input
            className="bg-w-ternary rounded shadow-sm text-primary"
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
          <input
            className="bg-w-ternary rounded shadow-sm text-primary"
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
    </div>
  );
};
