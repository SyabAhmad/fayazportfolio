import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const KEY = "theme";
const read = () => document.documentElement.dataset.theme === "light" ? "light" : "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* storage disabled — toggle still works for this visit */
    }
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex h-10 w-10 items-center justify-center border border-rule text-fg-soft transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;