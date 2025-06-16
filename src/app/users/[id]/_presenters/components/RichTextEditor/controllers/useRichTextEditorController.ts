import { useState, useCallback } from "react";
import { User } from "@/app/_domain/interfaces/User";
import { Editor } from "@tiptap/react";

export type UseRichTextEditorControllerProps = {
  user: User;
  onSave?: (updatedUser: User) => void;
  onChange?: (content: string) => void;
  readOnly?: boolean;
};

export default function useRichTextEditorController({
  user,
  onSave,
  onChange,
  readOnly = false,
}: UseRichTextEditorControllerProps) {
  const [content, setContent] = useState(user.history || "");
  const [isSaving, setIsSaving] = useState(false);
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

  const handleSave = useCallback(async () => {
    if (!onSave || !editor) return;
    try {
      setIsSaving(true);
      const updatedUser = {
        ...user,
        history: editor.getHTML(),
      };
      await onSave(updatedUser);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  }, [editor, onSave, user]);

  return {
    content,
    isSaving,
    editor,
    setEditor,
    handleContentChange,
    handleSave,
  };
}
