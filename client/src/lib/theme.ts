export function getTheme(): string {
  console.log("getTheme")
  const saved = JSON.parse(localStorage.getItem("theme") || "null");
  console.log("saved",saved)
  if (saved===null) {
    console.log("saved is null")
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
export function setTheme(theme: string) {
  localStorage.setItem("theme", JSON.stringify(theme));
  document.body.setAttribute("data-theme", theme);
}