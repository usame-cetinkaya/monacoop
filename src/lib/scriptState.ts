export type State = {
  fullText: string;
  selection: string;
  text: string;
  insert: (str: string) => void;
  postInfo: (msg: string) => void;
  postError: (msg: string) => void;
};

export function getState(
  editor: import("monaco-editor").editor.IStandaloneCodeEditor,
  setInfoMessage: (msg: string, isError?: boolean) => void,
): State {
  return {
    get fullText() {
      return editor.getValue() ?? "";
    },
    set fullText(value) {
      const model = editor.getModel();
      if (!model) return;
      editor.pushUndoStop();
      editor.executeEdits("script", [
        {
          range: model.getFullModelRange(),
          text: value,
          forceMoveMarkers: true,
        },
      ]);
      editor.pushUndoStop();
    },
    get selection() {
      const selection = editor?.getSelection();
      if (!selection) return "";
      return editor.getModel()?.getValueInRange(selection) || "";
    },
    set selection(value) {
      const selection = editor.getSelection();
      if (!selection) return;
      editor.pushUndoStop();
      editor.executeEdits("script", [
        { range: selection, text: value, forceMoveMarkers: true },
      ]);
      editor.pushUndoStop();
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
      editor.pushUndoStop();
      editor.executeEdits("script", [
        { range: selection, text: str, forceMoveMarkers: true },
      ]);
      editor.pushUndoStop();
    },
    postInfo(msg: string) {
      setInfoMessage(msg);
    },
    postError(msg: string) {
      setInfoMessage(msg, true);
    },
  };
}
