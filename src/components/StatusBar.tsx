import { cn } from "@/lib/utils.ts";
import { useAppStore } from "@/store/appStore";
import ThemeSelector from "@/components/ThemeSelector.tsx";
import LanguageSelector from "@/components/LanguageSelector";

export default function StatusBar() {
  const { info, isError } = useAppStore();

  return (
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
      <ThemeSelector />
      <LanguageSelector />
    </div>
  );
}
