import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TitleIcon from "@mui/icons-material/Title";
import useRichTextEditorController from "./controllers/useRichTextEditorController";
import { User } from "@/app/_domain/interfaces/User";

export type RichTextEditorRef = {
  handleSave: () => Promise<void>;
};

type Props = {
  user: User;
  onSave?: (updatedUser: User) => void;
  onChange?: (content: string) => void;
  readOnly?: boolean;
};

const RichTextEditor = forwardRef<RichTextEditorRef, Props>(
  ({ user, onSave, onChange, readOnly = false }, ref) => {
    const {
      content,
      isSaving,
      editor,
      setEditor,
      handleContentChange,
      handleSave,
    } = useRichTextEditorController({
      user,
      onSave,
      onChange,
      readOnly,
    });

    useImperativeHandle(ref, () => ({
      handleSave,
    }));

    const tipTapEditor = useEditor({
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
      ],
      content,
      editable: !readOnly,
      onUpdate: ({ editor }) => {
        handleContentChange(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm focus:outline-none max-w-none min-h-[100px] p-4",
        },
      },
    });

    useEffect(() => {
      if (tipTapEditor) {
        setEditor(tipTapEditor);
      }
    }, [tipTapEditor, setEditor]);

    useEffect(() => {
      if (tipTapEditor && content !== tipTapEditor.getHTML()) {
        tipTapEditor.commands.setContent(content);
      }
    }, [content, tipTapEditor]);

    const MenuBar = () => {
      if (readOnly) return null;

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
              px: 1,
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
                selected={tipTapEditor?.isActive("bold")}
                onClick={() => tipTapEditor?.chain().focus().toggleBold().run()}
              >
                <FormatBoldIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Italic">
              <ToggleButton
                value="italic"
                selected={tipTapEditor?.isActive("italic")}
                onClick={() =>
                  tipTapEditor?.chain().focus().toggleItalic().run()
                }
              >
                <FormatItalicIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Underline">
              <ToggleButton
                value="underline"
                selected={tipTapEditor?.isActive("underline")}
                onClick={() =>
                  tipTapEditor?.chain().focus().toggleUnderline().run()
                }
              >
                <FormatUnderlinedIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <ToggleButtonGroup size="small">
            <Tooltip title="Bullet List">
              <ToggleButton
                value="bulletList"
                selected={tipTapEditor?.isActive("bulletList")}
                onClick={() =>
                  tipTapEditor?.chain().focus().toggleBulletList().run()
                }
              >
                <FormatListBulletedIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Numbered List">
              <ToggleButton
                value="orderedList"
                selected={tipTapEditor?.isActive("orderedList")}
                onClick={() =>
                  tipTapEditor?.chain().focus().toggleOrderedList().run()
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
                selected={tipTapEditor?.isActive("heading")}
                onClick={() =>
                  tipTapEditor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: 2 })
                    .run()
                }
              >
                <TitleIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Quote">
              <ToggleButton
                value="blockquote"
                selected={tipTapEditor?.isActive("blockquote")}
                onClick={() =>
                  tipTapEditor?.chain().focus().toggleBlockquote().run()
                }
              >
                <FormatQuoteIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <Tooltip title="Add Link">
            <IconButton
              size="small"
              onClick={() => {
                if (!tipTapEditor) return;
                const url = window.prompt("Enter URL");
                if (url) {
                  tipTapEditor.chain().focus().setLink({ href: url }).run();
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
      <Paper variant="outlined">
        <MenuBar />
        <EditorContent editor={tipTapEditor} />
      </Paper>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
