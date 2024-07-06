import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setTheme as setThemeDispatch } from "@/reducers/themeReducer";
export function getTheme(): string {
  const saved = JSON.parse(localStorage.getItem("theme") || "null");
  if (saved===null) {
    const media =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (media) {
      document.body.setAttribute("data-theme", "dark");
      return "dark";
    } else {
      document.body.setAttribute("data-theme", "light");
      return "light";
    }
  }
  document.body.setAttribute("data-theme", saved);
  return saved;
}
export function useTheme() {
  const dispatch = useDispatch<AppDispatch>();

  const setTheme = (theme: string) => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.body.setAttribute("data-theme", theme);
    dispatch(setThemeDispatch(theme));
  };

  return setTheme;
}