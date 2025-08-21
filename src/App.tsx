import "./App.css";
import { useEditorEffects } from "@/hooks/useEditorEffects";
import { useShareEffect } from "@/hooks/useShareEffect.ts";
import ScriptSelector from "@/components/ScriptSelector";
import ToolbarActions from "@/components/ToolbarActions";
import EditorPanel from "@/components/EditorPanel";
import StatusBar from "@/components/StatusBar";

function App() {
  useEditorEffects();
  useShareEffect();

  return (
    <>
      <main className="h-full flex flex-col gap-4">
        <ToolbarActions />
        <EditorPanel />
        <StatusBar />
      </main>
      <ScriptSelector />
    </>
  );
}

export default App;
