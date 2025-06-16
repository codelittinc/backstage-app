import { useState, useCallback } from "react";
import { User } from "@/app/_domain/interfaces/User";
import { Editor } from "@tiptap/react";

export type UseRichTextEditorControllerProps = {
  user: User;
  onSave?: (updatedUser: User) => void;
  readOnly?: boolean;
};

export default function useRichTextEditorController({
  user,
  onSave,
  readOnly = false,
}: UseRichTextEditorControllerProps) {
  const [content, setContent] = useState(user.history || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    setIsEditing(true);
  }, []);

  const handleFormatClick = useCallback(
    async (formatFn: () => boolean) => {
      if (!editor) return;
      const success = formatFn();
      if (success) {
        setIsEditing(true);
      }
    },
    [editor]
  );

  const addLink = useCallback(async () => {
    if (!editor) return;
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      setIsEditing(true);
    }
  }, [editor]);

  const handleSave = useCallback(async () => {
    if (!onSave) return;
    try {
      setIsSaving(true);
      const updatedUser = {
        ...user,
        history: content,
      };
      await onSave(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  }, [content, onSave, user]);

  return {
    content,
    isEditing,
    isSaving,
    editor,
    setEditor,
    handleContentChange,
    handleFormatClick,
    addLink,
    handleSave,
  };
}
