import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, forwardRef, useImperativeHandle } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TitleIcon from "@mui/icons-material/Title";
import useRichTextEditorController from "./controllers/useRichTextEditorController";

export type RichTextEditorRef = {
  getContent: () => string;
};

type Props = {
  content: string;
  onChange?: (content: string) => void;
  placeholder?: string;
};

const RichTextEditor = forwardRef<RichTextEditorRef, Props>(
  (
    { content: initialContent, onChange, placeholder = "Start writing..." },
    ref
  ) => {
    const {
      content,
      editor: tipTapEditor,
      setEditor,
      handleContentChange,
      getContent,
    } = useRichTextEditorController({
      initialContent,
      onChange,
    });

    useImperativeHandle(ref, () => ({
      getContent,
    }));

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Link.configure({
          openOnClick: false,
        }),
        Underline,
        Placeholder.configure({
          placeholder,
          emptyEditorClass: "is-editor-empty",
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
      ],
      content: content || "<p></p>",
      editable: true,
      onUpdate: ({ editor }) => {
        handleContentChange(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm focus:outline-none max-w-none min-h-[100px] p-4 prose-p:my-0 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-blockquote:my-2",
        },
      },
    });

    useEffect(() => {
      if (editor) {
        setEditor(editor);
      }
    }, [editor, setEditor]);

    useEffect(() => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content);
      }
    }, [content, editor]);

    const MenuBar = () => {
      return (
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 2,
            p: 1,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            "& .MuiToggleButton-root": {
              py: 0.5,
            },
            "& .MuiToggleButton-root.Mui-selected": {
              bgcolor: "action.selected",
            },
          }}
        >
          <ToggleButtonGroup size="small">
            <Tooltip title="Bold">
              <ToggleButton
                value="bold"
                selected={editor?.isActive("bold")}
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                <FormatBoldIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Italic">
              <ToggleButton
                value="italic"
                selected={editor?.isActive("italic")}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                <FormatItalicIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Underline">
              <ToggleButton
                value="underline"
                selected={editor?.isActive("underline")}
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
              >
                <FormatUnderlinedIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <ToggleButtonGroup size="small">
            <Tooltip title="Bullet List">
              <ToggleButton
                value="bulletList"
                selected={editor?.isActive("bulletList")}
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
              >
                <FormatListBulletedIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Numbered List">
              <ToggleButton
                value="orderedList"
                selected={editor?.isActive("orderedList")}
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
              >
                <FormatListNumberedIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <ToggleButtonGroup size="small">
            <Tooltip title="Heading">
              <ToggleButton
                value="heading"
                selected={editor?.isActive("heading")}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <TitleIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Quote">
              <ToggleButton
                value="blockquote"
                selected={editor?.isActive("blockquote")}
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              >
                <FormatQuoteIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <Tooltip title="Add Link">
            <IconButton
              size="small"
              onClick={() => {
                if (!editor) return;
                const url = window.prompt("Enter URL");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    };

    return (
      <Paper
        variant="outlined"
        sx={{
          "& .ProseMirror": {
            minHeight: "100px",
            position: "relative",
            "& p.is-editor-empty:first-child::before": {
              content: "attr(data-placeholder)",
              float: "left",
              color: "text.secondary",
              pointerEvents: "none",
              height: 0,
              position: "absolute",
              top: "1rem",
              left: "1rem",
            },
            "& p:first-of-type": {
              marginTop: 0,
            },
            "& p:last-of-type": {
              marginBottom: 0,
            },
          },
        }}
      >
        <MenuBar />
        <EditorContent editor={editor} />
      </Paper>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
