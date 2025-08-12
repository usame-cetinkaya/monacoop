type State = {
  fullText: string;
  selection: string;
  text: string;
  insert: (str: string) => void;
  postInfo: (msg: string) => void;
  postError: (msg: string) => void;
};

type Script = {
  api: number;
  name: string;
  description: string;
  author: string;
  icon: string;
  tags: string[];
  main: (state: State) => void;
};

export const scriptsRegistry: Script[] = [];

function parseMetadata(fnString: string) {
  const match = fnString.match(/\/\*\*([\s\S]*?)\*\*\//);
  if (!match) return null;

  return JSON.parse(match[1]);
}

let loaded = false;

export async function loadScripts() {
  if (loaded) return;

  loaded = true;

  const files = import.meta.glob("@/scripts/*.js", { as: "raw" });

  for (const path in files) {
    try {
      const rawText = (await files[path]()) as string;
      const metadata = parseMetadata(rawText);
      if (!metadata) continue;
      const module = await import(path);

      scriptsRegistry.push({
        ...metadata,
        main: module.main,
      });
    } catch (e) {
      console.error(`Failed to parse metadata for ${path}:`, e);
    }
  }

  scriptsRegistry.sort((a, b) => a.name.localeCompare(b.name));
}

export function getState(
  editor: import("monaco-editor").editor.IStandaloneCodeEditor,
  setInfoMessage: (msg: string, isError?: boolean) => void,
) {
  return {
    get fullText() {
      return editor.getValue() ?? "";
    },
    set fullText(value) {
      editor.setValue(value);
    },
    get selection() {
      const selection = editor?.getSelection();
      if (!selection) return "";
      return editor.getModel()?.getValueInRange(selection) || "";
    },
    set selection(value) {
      const selection = editor.getSelection();
      if (!selection) return;
      editor.executeEdits("", [
        { range: selection, text: value, forceMoveMarkers: true },
      ]);
    },
    get text() {
      const sel = this.selection || "";
      return sel.length > 0 ? sel : this.fullText;
    },
    set text(value) {
      const sel = this.selection || "";
      if (sel.length > 0) {
        this.selection = value;
      } else {
        this.fullText = value;
      }
    },
    insert(str: string) {
      const selection = editor.getSelection();
      if (!selection) return;
      editor.executeEdits("", [
        { range: selection, text: str, forceMoveMarkers: true },
      ]);
    },
    postInfo(msg: string) {
      setInfoMessage(msg);
    },
    postError(msg: string) {
      setInfoMessage(msg, true);
    },
  };
}
