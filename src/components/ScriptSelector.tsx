import { useEffect, useState } from "react";
import { BoopScriptManager } from "@/lib/scriptManager.ts";
import { getState } from "@/lib/scriptState.ts";
import { analyzeClipboardAndSuggestScripts } from "@/lib/scriptSuggestions.ts";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";

interface ScriptSelectorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editor: import("monaco-editor").editor.IStandaloneCodeEditor | null;
  setMessage: (message: string, isError?: boolean) => void;
}

interface ScriptInfo {
  name: string;
  filename: string;
  description: string;
  tags: string;
  icon: string;
  category: string;
  isSuggested?: boolean;
  suggestionConfidence?: number;
  suggestionReasons?: string[];
}

export default function ScriptSelector({
  open,
  setOpen,
  editor,
  setMessage,
}: ScriptSelectorProps) {
  const [scripts, setScripts] = useState<ScriptInfo[]>([]);

  useEffect(() => {
    if (!open || !editor) return;

    loadScripts()
      .then(() => setMessage("Scripts loaded"))
      .catch((error) =>
        setMessage(`Failed to load scripts: ${error.message}`, true),
      );
  }, [editor, open]);

  async function loadScripts() {
    if (!editor) return null;

    const state = getState(editor, setMessage);
    // Try to get selected text first, fallback to clipboard
    const text: string = state.text;

    // Get script suggestions if we have content
    const suggestions = text ? analyzeClipboardAndSuggestScripts(text) : [];
    const suggestionMap = new Map(suggestions.map((s) => [s.scriptKey, s]));

    const scriptNames = BoopScriptManager.getAvailableScripts();
    const scriptInfos: ScriptInfo[] = [];

    for (const scriptName of scriptNames) {
      const info = BoopScriptManager.getScriptInfo(scriptName);
      const suggestion = suggestionMap.get(scriptName);

      if (info) {
        scriptInfos.push({
          name: info.name,
          filename: scriptName,
          description: info.description,
          tags: info.tags,
          icon: info.icon || "⚡",
          category: info.category,
          isSuggested: !!suggestion,
          suggestionConfidence: suggestion?.confidence,
          suggestionReasons: suggestion?.reasons,
        });
      } else {
        // Fallback for scripts without metadata
        scriptInfos.push({
          name: scriptName.replace(/([A-Z])/g, " $1").trim(),
          filename: scriptName,
          description: `Run ${scriptName} script`,
          tags: "",
          icon: "⚡",
          category: "utility",
          isSuggested: !!suggestion,
          suggestionConfidence: suggestion?.confidence,
          suggestionReasons: suggestion?.reasons,
        });
      }
    }

    // Sort scripts: suggested first (by confidence), then alphabetically
    scriptInfos.sort((a, b) => {
      if (a.isSuggested && !b.isSuggested) return -1;
      if (!a.isSuggested && b.isSuggested) return 1;
      if (a.isSuggested && b.isSuggested) {
        return (b.suggestionConfidence || 0) - (a.suggestionConfidence || 0);
      }
      return a.name.localeCompare(b.name);
    });

    setScripts(scriptInfos);
  }

  const suggestedScripts = scripts.filter((s) => s.isSuggested);
  const otherScripts = scripts.filter((s) => !s.isSuggested);

  if (!editor) return null;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <ScriptGroup
          title="Suggested scripts"
          scripts={suggestedScripts}
          setOpen={setOpen}
          editor={editor}
          setMessage={setMessage}
        />
        <ScriptGroup
          title="Other scripts"
          scripts={otherScripts}
          setOpen={setOpen}
          editor={editor}
          setMessage={setMessage}
        />
      </CommandList>
    </CommandDialog>
  );
}

interface ScriptGroupProps {
  title: string;
  scripts: ScriptInfo[];
  setOpen: (open: boolean) => void;
  editor: import("monaco-editor").editor.IStandaloneCodeEditor;
  setMessage: (message: string, isError?: boolean) => void;
}

function ScriptGroup({
  title,
  scripts,
  setOpen,
  editor,
  setMessage,
}: ScriptGroupProps) {
  if (scripts.length === 0) return null;

  return (
    <CommandGroup heading={`${title} (${scripts.length})`}>
      {scripts.map((script) => (
        <CommandItem
          key={script.filename}
          onSelect={() => {
            setOpen(false);
            BoopScriptManager.executeScript(
              script.filename,
              getState(editor, setMessage),
            );
          }}
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">{script.icon || "⚡"}</span>
            {script.isSuggested && <span className="text-lg">⭐</span>}
            {script.name}
          </span>
          <span className="ml-auto text-gray-500 dark:text-gray-400">
            {script.isSuggested ? script.suggestionReasons : script.description}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
