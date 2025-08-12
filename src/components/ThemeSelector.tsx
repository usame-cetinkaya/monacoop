import { useEffect } from "react";
import { useAppStore } from "@/store/appStore.ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export default function ThemeSelector() {
  const {
    themeSelectorOpen: open,
    setThemeSelectorOpen: setOpen,
    editor,
    editorTheme,
    setEditorTheme,
    editorThemes,
  } = useAppStore();

  useEffect(() => {
    if (!editor) return;

    if (!open) {
      setTimeout(() => {
        editor.focus();
      }, 0);
    }
  }, [editor, open]);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        setEditorTheme(value);
        setOpen(false);
      }}
      value={editorTheme}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Editor theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {Object.entries(editorThemes).map(([displayName, value]) => (
            <SelectItem key={value} value={value}>
              {displayName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
