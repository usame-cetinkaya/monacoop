import { create } from "zustand";
import { customCodeTemplate } from "@/lib/customCode.ts";

interface AppState {
  editor: import("monaco-editor").editor.IStandaloneCodeEditor | null;
  languageSelectorOpen: boolean;
  scriptSelectorOpen: boolean;
  themeSelectorOpen: boolean;
  editorLanguages: string[];
  editorLanguage: string;
  editorTheme: string;
  editorThemes: Record<string, string>;
  systemPrefersDark: boolean;
  code: string;
  info: string;
  isError: boolean;
  customCode: string;
  customCodeEditorOpen: boolean;
  setEditor: (
    editor: import("monaco-editor").editor.IStandaloneCodeEditor | null,
  ) => void;
  setLanguageSelectorOpen: (open: boolean) => void;
  setScriptSelectorOpen: (open: boolean) => void;
  setThemeSelectorOpen: (open: boolean) => void;
  setEditorLanguages: (languages: string[]) => void;
  setEditorLanguage: (language: string) => void;
  setEditorTheme: (theme: string) => void;
  setSystemPrefersDark: (isDark: boolean) => void;
  setCode: (code: string) => void;
  setMessage: (msg: string, isError?: boolean) => void;
  setCustomCode: (code: string) => void;
  setCustomCodeEditorOpen: (open: boolean) => void;
  resetCustomCode: () => void;
  getActualTheme: () => string;
  getIsDarkMode: () => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  editor: null,
  languageSelectorOpen: false,
  scriptSelectorOpen: false,
  themeSelectorOpen: false,
  editorLanguages: [],
  editorLanguage: localStorage.getItem("editorLanguage") || "javascript",
  editorTheme: localStorage.getItem("editorTheme") || "system",
  editorThemes: {
    System: "system",
    Light: "vs",
    Dark: "vs-dark",
  },
  systemPrefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  code: localStorage.getItem("code") || "",
  info: "Ready",
  isError: false,
  customCode: localStorage.getItem("customCode") || customCodeTemplate,
  customCodeEditorOpen: false,
  setEditor: (
    editor: import("monaco-editor").editor.IStandaloneCodeEditor | null,
  ) => set({ editor }),
  setLanguageSelectorOpen: (open) => set({ languageSelectorOpen: open }),
  setScriptSelectorOpen: (open) => set({ scriptSelectorOpen: open }),
  setThemeSelectorOpen: (open) => set({ themeSelectorOpen: open }),
  setEditorLanguages: (languages) => set({ editorLanguages: languages }),
  setEditorLanguage: (language) => {
    localStorage.setItem("editorLanguage", language);
    set({ editorLanguage: language });
  },
  setEditorTheme: (theme) => {
    localStorage.setItem("editorTheme", theme);
    set({ editorTheme: theme });
  },
  setSystemPrefersDark: (isDark) => set({ systemPrefersDark: isDark }),
  setCode: (code) => {
    localStorage.setItem("code", code);
    set({ code });
  },
  setMessage: (msg, isError = false) => set({ info: msg, isError }),
  setCustomCode: (code) => {
    localStorage.setItem("customCode", code);
    set({ customCode: code });
  },
  setCustomCodeEditorOpen: (open) => set({ customCodeEditorOpen: open }),
  resetCustomCode: () => {
    const code = customCodeTemplate;
    localStorage.setItem("customCode", code);
    set({ customCode: code });
  },
  getActualTheme: () => {
    const { editorTheme, systemPrefersDark } = get();
    return editorTheme === "system"
      ? systemPrefersDark
        ? "vs-dark"
        : "vs"
      : editorTheme;
  },
  getIsDarkMode: () => {
    return get().getActualTheme() === "vs-dark";
  },
}));
