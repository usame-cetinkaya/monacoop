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
  editorThemes: string[];
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
          {editorThemes.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {theme}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
