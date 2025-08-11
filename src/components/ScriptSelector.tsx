import { useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import { getState, loadScripts, scriptsRegistry } from "@/lib/scriptLoader.ts";
import { ChevronRight } from "lucide-react";

interface ScriptSelectorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editor: import("monaco-editor").editor.IStandaloneCodeEditor | null;
  setMessage: (message: string, isError?: boolean) => void;
}

export default function ScriptSelector({
  open,
  setOpen,
  editor,
  setMessage,
}: ScriptSelectorProps) {
  useEffect(() => {
    loadScripts().then(() => setMessage("Scripts loaded"));
  }, []);

  if (!editor) return null;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {scriptsRegistry.map((script) => (
          <CommandItem
            key={script.name}
            onSelect={() => {
              setOpen(false);
              script.main(getState(editor, setMessage));
            }}
          >
            <span className="flex items-center gap-2">
              <ChevronRight />
              {script.name}
            </span>
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
