import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "@/components/LanguageSelector";
import ScriptSelector from "@/components/ScriptSelector";
import "./App.css";

function App() {
  const editorRef =
    useRef<import("monaco-editor").editor.IStandaloneCodeEditor>(null);
  const monacoRef = useRef<typeof import("monaco-editor")>(null);
  const [languageSelectorOpen, setLanguageSelectorOpen] = useState(false);
  const [scriptSelectorOpen, setScriptSelectorOpen] = useState(false);
  const [editorLanguages, setEditorLanguages] = useState<string[]>([]);
  const [editorLanguage, setEditorLanguage] = useState(
    localStorage.getItem("editorLanguage") || "javascript",
  );
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

  return (
    <>
      <main className=" h-full flex flex-col gap-4">
        <div className="flex-1 flex border">
          <Editor
            height="100%"
            onMount={handleEditorMount}
            language={editorLanguage}
            value={code}
            onChange={setCode}
            options={{
              renderWhitespace: "all",
              useTabStops: false,
              tabSize: 2,
              insertSpaces: false,
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <output className={isError ? "text-red-500" : "text-gray-700"}>
            {info}
          </output>
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
