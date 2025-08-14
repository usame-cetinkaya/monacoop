import type { State } from "@/lib/scriptState.ts";

export const welcomeMessage = `
# React Boop

Port of [Ray Boop] to React, which is a port of [Boop] to Raycast, which is a scriptable scratchpad for developers.

Uses [Monaco React] for the editor, and supports syntax highlighting for multiple languages.

Language, theme, editor data and custom scripts are auto-saved to local storage.

## Keyboard Shortcuts
- ⌘+K Open script selector
- ⌘+L Open language selector for syntax highlighting
- ⌘+J Open theme selector
`.trim();

export const customCodeTemplate = `
/**
 * @typedef {Object} State
 * @property {string} fullText - The complete text content.
 * @property {string} selection - The currently selected text.
 * @property {string} text - The current text being edited or processed.
 * @property {(str: string) => void} insert - Inserts the given string.
 * @property {(msg: string) => void} postInfo - Posts an informational message.
 * @property {(msg: string) => void} postError - Posts an error message.
 */

/**
 * @param {State} state - The current editor state.
 */
function main(state) {
\tconst text = state.text;
\tstate.text = text;
}
`.trim();

export function runCustomScript(customCode: string, state: State): void {
  try {
    const customFunction = new Function("state", customCode + "\nmain(state);");
    customFunction(state);
  } catch (error) {
    state.postError(
      `Custom script error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
