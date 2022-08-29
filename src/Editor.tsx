import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoScrollPlugin } from "@lexical/react/LexicalAutoScrollPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useRef, useState } from "react";

import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import ActionsPlugin from "./plugins/ActionsPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import ClickableLinkPlugin from "./plugins/ClickableLinkPlugin";

import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";

import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";

import TabFocusPlugin from "./plugins/TabFocusPlugin";

import ToolbarPlugin from "./plugins/ToolbarPlugin";

import ContentEditable from "./ui/ContentEditable";
import Placeholder from "./ui/Placeholder";

export default function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext();
  const placeholder = <Placeholder>Enter Some Text ...</Placeholder>;
  const scrollRef = useRef(null);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <>
      <ToolbarPlugin />
      <div className={`editor-container`} ref={scrollRef}>
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojisPlugin />
        <AutoLinkPlugin />
        <AutoScrollPlugin scrollRef={scrollRef} />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
        />
        <HistoryPlugin externalHistoryState={historyState} />
        <MarkdownShortcutPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <LinkPlugin />
        <ClickableLinkPlugin />
        <TabFocusPlugin />
        {floatingAnchorElem && (
          <>
            <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
        <ActionsPlugin />
        {/* <CharacterLimitPlugin charset={isCharLimit ? "UTF-16" : "UTF-8"} /> */}
      </div>
    </>
  );
}
