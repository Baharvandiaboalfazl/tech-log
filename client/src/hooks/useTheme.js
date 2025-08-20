import { useEffect, useState } from "react";

const [theme, setTheme] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme || "light";
});

useEffect(() => {
  const root = window.document.documentElement;
  const isDark = theme === "dark";

  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(theme);

  localStorage.setItem("theme", theme);
}, [theme]);
