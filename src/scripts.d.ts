declare module "../scripts/*.js" {
  import type { State } from "@/lib/scriptState.ts";

  export function main(input: State): void;
}
