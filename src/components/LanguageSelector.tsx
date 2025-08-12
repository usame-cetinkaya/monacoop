import { useEffect } from "react";
import { useAppStore } from "@/store/appStore.ts";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Check, ChevronsUpDown } from "lucide-react";

export default function LanguageSelector() {
  const {
    languageSelectorOpen: open,
    setLanguageSelectorOpen: setOpen,
    editor,
    editorLanguage,
    setEditorLanguage,
    editorLanguages,
  } = useAppStore();

  useEffect(() => {
    if (!editor) return;

    if (!open) editor.focus();
  }, [editor, open]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {editorLanguage}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {editorLanguages.map((language) => (
                <CommandItem
                  key={language}
                  value={language}
                  onSelect={(currentValue) => {
                    setEditorLanguage(currentValue);
                    setOpen(false);
                  }}
                >
                  {language}
                  <Check
                    className={cn(
                      "ml-auto",
                      language === editorLanguage ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
