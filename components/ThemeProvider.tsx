"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // sync initial state from the class set by the no-flash script
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const apply = (t: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
    root.classList.toggle("light", t === "light");
    try {
      localStorage.setItem("theme", t);
    } catch {}
    setTheme(t);
  };

  const toggle = () => apply(theme === "dark" ? "light" : "dark");

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/** Runs before paint to set the theme class and avoid a flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';var r=document.documentElement;r.classList.add(t);r.classList.remove(t==='dark'?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}})();`;
