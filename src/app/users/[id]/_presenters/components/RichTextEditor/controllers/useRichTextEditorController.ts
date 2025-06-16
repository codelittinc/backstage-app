import { useCallback, useState, useRef } from "react";
import { Editor } from "@tiptap/react";

type UseRichTextEditorControllerProps = {
  initialContent: string;
  onChange?: (content: string) => void;
};

export default function useRichTextEditorController({
  initialContent,
  onChange,
}: UseRichTextEditorControllerProps) {
  const [content, setContent] = useState(initialContent);
  const editorRef = useRef<Editor | null>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  const setEditor = useCallback((editor: Editor | null) => {
    editorRef.current = editor;
  }, []);

  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent);

      // Debounce the onChange callback to prevent too frequent updates
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(() => {
        onChange?.(newContent);
      }, 300);
    },
    [onChange]
  );

  const getContent = useCallback(() => {
    return editorRef.current?.getHTML() || content;
  }, [content]);

  return {
    content,
    editor: editorRef.current,
    setEditor,
    handleContentChange,
    getContent,
  };
}
