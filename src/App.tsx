import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "@/components/LanguageSelector";
import ScriptSelector from "@/components/ScriptSelector";
import "./App.css";
import ThemeSelector from "@/components/ThemeSelector.tsx";
import { cn } from "@/lib/utils.ts";

function App() {
  const editorRef =
    useRef<import("monaco-editor").editor.IStandaloneCodeEditor>(null);
  const monacoRef = useRef<typeof import("monaco-editor")>(null);
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false);
  const [scriptSelectorOpen, setScriptSelectorOpen] = useState(false);
  const [themeSelectorOpen, setThemeSelectorOpen] = useState(false);
  const [editorLanguages, setEditorLanguages] = useState<string[]>([]);
  const [editorLanguage, setEditorLanguage] = useState(
    localStorage.getItem("editorLanguage") || "javascript",
  );
  const editorThemes = {
    System: "system",
    Light: "vs",
    Dark: "vs-dark",
  };
  const [editorTheme, setEditorTheme] = useState(
    localStorage.getItem("editorTheme") || "system",
  );
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const actualTheme =
    editorTheme === "system"
      ? systemPrefersDark
        ? "vs-dark"
        : "vs"
      : editorTheme;
  const isDarkMode = actualTheme === "vs-dark";
  const [code, setCode] = useState<string | undefined>(
    localStorage.getItem("code") || "",
  );
  const [info, setInfo] = useState<string>("Ready");
  const [isError, setIsError] = useState<boolean>(false);

  function handleEditorMount(
    editor: import("monaco-editor").editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor"),
  ) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    setEditorLanguages(
      monaco.languages
        .getLanguages()
        .map((language: { id: string }) => language.id),
    );

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      setScriptSelectorOpen(true);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      setLanguageSelectorOpen(true);
    });

    editor.focus();
  }

  function setMessage(msg: string, isError: boolean = false) {
    setInfo(msg);
    setIsError(isError);
  }

  useEffect(() => {
    if (!languageSelectorOpen && !scriptSelectorOpen) {
      editorRef.current?.focus();
    }
  }, [languageSelectorOpen, scriptSelectorOpen]);

  useEffect(() => {
    localStorage.setItem("code", code || "");
  }, [code]);

  useEffect(() => {
    localStorage.setItem("editorLanguage", editorLanguage);
  }, [editorLanguage]);

  useEffect(() => {
    localStorage.setItem("editorTheme", editorTheme);
  }, [editorTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <main className="h-full flex flex-col gap-4">
        <div className="flex-1 flex border">
          <Editor
            height="100%"
            onMount={handleEditorMount}
            language={editorLanguage}
            value={code}
            onChange={setCode}
            theme={actualTheme}
            options={{
              renderWhitespace: "all",
              useTabStops: false,
              tabSize: 2,
              insertSpaces: false,
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <output
            className={cn(
              "flex-1",
              isError
                ? "text-red-500 dark:text-red-400"
                : "text-gray-700 dark:text-gray-300",
            )}
          >
            {info}
          </output>
          <ThemeSelector
            open={themeSelectorOpen}
            setOpen={setThemeSelectorOpen}
            editorTheme={editorTheme}
            setEditorTheme={setEditorTheme}
            editorThemes={editorThemes}
          />
          <LanguageSelector
            open={languageSelectorOpen}
            setOpen={setLanguageSelectorOpen}
            editorLanguage={editorLanguage}
            setEditorLanguage={setEditorLanguage}
            editorLanguages={editorLanguages}
          />
        </div>
      </main>
      <ScriptSelector
        open={scriptSelectorOpen}
        setOpen={setScriptSelectorOpen}
        editor={editorRef?.current}
        setMessage={setMessage}
      />
    </>
  );
}

export default App;
