import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils.ts";
import { useAppStore } from "@/store/appStore";

export default function EditorPanel() {
  const {
    setEditor,
    setEditorLanguages,
    setLanguageSelectorOpen,
    setScriptSelectorOpen,
    setThemeSelectorOpen,
    customCodeEditorOpen,
    editorLanguage,
    code,
    customCode,
    setCode,
    setCustomCode,
    getActualTheme,
  } = useAppStore();

  const actualTheme = getActualTheme();

  function handleEditorMount(
    editor: import("monaco-editor").editor.IStandaloneCodeEditor,
    monaco: typeof import("monaco-editor"),
  ) {
    setEditor(editor);

    setEditorLanguages(
      monaco.languages
        .getLanguages()
        .map((language: { id: string }) => language.id),
    );

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      setScriptSelectorOpen(true);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyL, () => {
      setLanguageSelectorOpen(true);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      setThemeSelectorOpen(true);
    });

    editor.focus();
  }

  return (
    <div className="flex-1 flex border">
      <div className={cn(customCodeEditorOpen ? "w-1/2" : "w-full")}>
        <Editor
          height="100%"
          onMount={handleEditorMount}
          language={editorLanguage}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme={actualTheme}
          options={{
            renderWhitespace: "all",
            useTabStops: false,
            tabSize: 2,
            insertSpaces: false,
          }}
        />
      </div>
      <div className={cn(customCodeEditorOpen ? "w-1/2" : "w-0")}>
        <Editor
          height="100%"
          language="javascript"
          value={customCode}
          onChange={(value) => setCustomCode(value || "")}
          theme={actualTheme}
        />
      </div>
    </div>
  );
}
