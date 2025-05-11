import * as React from "react";

// Create a simple wrapper around the theme system
type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Define a default context value
const defaultContextValue: ThemeContextType = {
  theme: "light",
  setTheme: () => {},
};

// Create context with default value to avoid undefined checks
const ThemeContext = React.createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ 
  children,
  defaultTheme = "light" 
}: { 
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  
  React.useEffect(() => {
    // Check for saved theme preference on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      
      if (savedTheme) {
        setThemeState(savedTheme);
      } else if (systemPreference) {
        setThemeState(systemPreference);
      }
    }
  }, []);

  React.useEffect(() => {
    // Apply theme class to document root
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      
      // Remove both classes and then add the current theme
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      
      // Save theme preference
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Create memoized context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    theme,
    setTheme: setThemeState
  }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  return React.useContext(ThemeContext);
}