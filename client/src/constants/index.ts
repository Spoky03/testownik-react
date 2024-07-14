import i18n from "i18next";
export const LABELS = {
  VIEW_SETS: "View Sets",
  LOGOUT: "Logout",
  HERO: {
    WELCOME: "Dołącz do nas!",
    WELCOME_BACK: "Welcome back! " || "Witaj z powrotem! ",
    // DESCRIPTION: i18n.t("HERO.DESCRIPTION"),
    ANIMATED: [
      i18n.t("HERO.ANIMATED.egzam"),
      i18n.t("HERO.ANIMATED.kolos"),
      i18n.t("HERO.ANIMATED.test"),
      i18n.t("HERO.ANIMATED.zali"),
    ],
  },
  BROWSER: "Browser",
  SIDEBAR: {
    SETTINGS: "Settings",
    FINISHED: "Finished",
    TOTAL_TIME: "Total time" || "Czas nauki",
    SAVE: "Save",
    SUBMIT: "Submit",
    TOTAL_ANSWERS: "Total answers" || "Udzielone odpowiedzi",
    MASTERED_ANSWERS: "Mastered answers" || "Opanowane pytania",
    TOTAL_QUESTIONS: "Questions count" || "Liczba pytań",
    REPEATS: "Repeats" || "Ponowne wystąpienia",
  },
  LOGIN: {
    LOGIN: "Login",
    SIGNUP: "Sign up",
    USERNAME: "Username",
    PASSWORD: "Password",
    EXPIRED: "Your session has expired. Please log in",
    LOGOUT: "You have been loged out",
  },
};

export default {
  LABELS,
};
