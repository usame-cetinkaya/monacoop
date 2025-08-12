import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

interface ThemeSelectorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editorTheme: string;
  setEditorTheme: (language: string) => void;
  editorThemes: Record<string, string>;
}
export default function ThemeSelector({
  open,
  setOpen,
  editorTheme,
  setEditorTheme,
  editorThemes,
}: ThemeSelectorProps) {
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
