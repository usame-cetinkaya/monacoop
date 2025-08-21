import { useEffect } from "react";
import { useAppStore } from "@/store/appStore.ts";

export function useShareEffect() {
  const {
    setEditorLanguage,
    setCode,
    setCustomCode,
    setCustomCodeEditorOpen,
    setMessage,
  } = useAppStore();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const shareData = urlParams.get("share");

    if (shareData) {
      try {
        const data = JSON.parse(atob(shareData));

        if (data.editorLanguage) {
          setEditorLanguage(data.editorLanguage);
        }

        if (data.code) {
          setCode(data.code);
        }

        if (data.customCode) {
          setCustomCode(data.customCode);
          setCustomCodeEditorOpen(true);
        }
      } catch (error) {
        setMessage(`Failed to parse share data: ${error}`, true);
      }
    }
  }, []);
}
