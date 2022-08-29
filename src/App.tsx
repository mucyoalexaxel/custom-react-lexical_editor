import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { SharedHistoryContext } from "./context/SharedHistoryContext";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import LexicalEditorTheme from "./themes/LexicalEditorTheme";

export default function App(): JSX.Element {
  const initialConfig = {
    editorState: null,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: LexicalEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <div className="editor-shell">
          <Editor />
        </div>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
