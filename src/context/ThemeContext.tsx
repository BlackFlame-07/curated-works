import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_theme") as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
    }
    // Default to clean crisp LIGHT mode
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("portfolio_theme", theme);

    // Sync mobile browser status bar color (Safari iOS & Chrome Android)
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", theme === "dark" ? "#000000" : "#ffffff");
  }, [theme]);


  const triggerTransition = () => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 350);
  };

  const toggleTheme = () => {
    triggerTransition();
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme: Theme) => {
    triggerTransition();
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
