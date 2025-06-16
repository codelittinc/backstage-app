import { useCallback, useState } from "react";
import { Editor } from "@tiptap/react";

export type UseRichTextEditorControllerProps = {
  initialContent: string;
  onChange?: (content: string) => void;
};

export default function useRichTextEditorController({
  initialContent,
  onChange,
}: UseRichTextEditorControllerProps) {
  const [content, setContent] = useState(initialContent);
  const [editor, setEditor] = useState<Editor | null>(null);

  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent);
      if (onChange) {
        onChange(newContent);
      }
    },
    [onChange]
  );

  const getContent = useCallback(() => {
    return editor?.getHTML() || content;
  }, [editor, content]);

  return {
    content,
    editor,
    setEditor,
    handleContentChange,
    getContent,
  };
}
