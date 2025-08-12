import { Button } from "@/components/ui/button.tsx";
import { Eye, EyeOff, Play, RefreshCw } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { runCustomScript } from "@/lib/customCode.ts";
import { getState } from "@/lib/scriptState.ts";

export default function ToolbarActions() {
  const {
    editor,
    customCodeEditorOpen,
    customCode,
    setCustomCodeEditorOpen,
    resetCustomCode,
    setMessage,
  } = useAppStore();

  const handleRunScript = () => {
    if (!editor || !customCode) return;

    runCustomScript(customCode, getState(editor, setMessage));
  };

  const handleResetCustomCode = () => {
    const ret = confirm(
      "Are you sure you want to reset the custom code? This will overwrite any changes.",
    );
    if (ret) {
      resetCustomCode();
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setCustomCodeEditorOpen(!customCodeEditorOpen)}
      >
        {customCodeEditorOpen ? <EyeOff /> : <Eye />}
      </Button>
      <Button size="sm" variant="outline" onClick={handleResetCustomCode}>
        <RefreshCw />
      </Button>
      <Button size="sm" onClick={handleRunScript}>
        <Play />
      </Button>
    </div>
  );
}
