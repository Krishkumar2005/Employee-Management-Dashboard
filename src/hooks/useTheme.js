import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false); // DEFAULT LIGHT

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light-theme");
    } else {
      root.classList.remove("dark");
      root.classList.add("light-theme");
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((d) => !d) };
}
