import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { runCustomScript } from "@/lib/customCode.ts";
import { getState } from "@/lib/scriptState.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  FileCode2,
  PanelRightClose,
  Play,
  RefreshCw,
  Share2,
} from "lucide-react";

export default function ToolbarActions() {
  const {
    editorLanguage,
    code,
    editor,
    customCodeEditorOpen,
    customCode,
    setCustomCodeEditorOpen,
    resetCustomCode,
    setMessage,
  } = useAppStore();

  const [shareCopied, setShareCopied] = useState(false);

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

  const handleShare = async () => {
    try {
      // share data |> JSON.stringify |> base64 |> url encode
      const share = encodeURIComponent(
        btoa(JSON.stringify({ editorLanguage, code, customCode })),
      );
      const url = `${window.location.origin}/?share=${share}`;

      await navigator.clipboard.writeText(url);

      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 3000);
    } catch (err) {
      setMessage(`Error: ${err}`, true);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setCustomCodeEditorOpen(!customCodeEditorOpen)}
      >
        {customCodeEditorOpen ? <PanelRightClose /> : <FileCode2 />}
      </Button>
      {customCodeEditorOpen && (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={handleShare}
            inert={shareCopied}
          >
            {shareCopied ? "Share link copied to clipboard!" : <Share2 />}
          </Button>
          <Button size="sm" variant="outline" onClick={handleResetCustomCode}>
            <RefreshCw />
          </Button>
          <Button size="sm" onClick={handleRunScript}>
            <Play />
          </Button>
        </>
      )}
    </div>
  );
}
