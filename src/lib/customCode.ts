import type { State } from "@/lib/scriptState.ts";

export const customCodeTemplate = `/**
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
`;

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
