import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    // Light is the default — only honour an explicit saved 'dark' choice.
    // System (prefers-color-scheme) is intentionally ignored.
    return localStorage.getItem("eds-theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#0A0908" : "#FAFAF8");
    localStorage.setItem("eds-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = () => setIsDark((p) => !p);

  return { isDark, toggle };
}
