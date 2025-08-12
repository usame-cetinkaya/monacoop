import { useEffect } from "react";
import { useAppStore } from "@/store/appStore";

export function useEditorEffects() {
  const { editorTheme, getIsDarkMode, setSystemPrefersDark } = useAppStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setSystemPrefersDark]);

  useEffect(() => {
    if (getIsDarkMode()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [editorTheme]);
}
