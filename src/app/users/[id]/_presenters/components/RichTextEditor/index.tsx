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
import { User } from "@/app/_domain/interfaces/User";

export type RichTextEditorRef = {
  handleSave: () => Promise<void>;
};

type Props = {
  user: User;
  onSave?: (updatedUser: User) => void;
  readOnly?: boolean;
};

const RichTextEditor = forwardRef<RichTextEditorRef, Props>(
  ({ user, onSave, readOnly = false }, ref) => {
    const {
      content,
      isEditing,
      isSaving,
      editor,
      setEditor,
      handleContentChange,
      handleFormatClick,
      addLink,
      handleSave,
    } = useRichTextEditorController({
      user,
      onSave,
      readOnly,
    });

    useImperativeHandle(ref, () => ({
      handleSave,
    }));

    const tipTapEditor = useEditor({
      extensions: [
        StarterKit,
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
          class: "prose prose-sm focus:outline-none max-w-none",
        },
      },
      onTransaction: () => {
        if (editor !== tipTapEditor) {
          setEditor(tipTapEditor);
        }
      },
    });

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
                onClick={() =>
                  handleFormatClick(
                    () =>
                      tipTapEditor?.chain().focus().toggleBold().run() || false
                  )
                }
              >
                <FormatBoldIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Italic">
              <ToggleButton
                value="italic"
                selected={tipTapEditor?.isActive("italic")}
                onClick={() =>
                  handleFormatClick(
                    () =>
                      tipTapEditor?.chain().focus().toggleItalic().run() ||
                      false
                  )
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
                  handleFormatClick(
                    () =>
                      tipTapEditor?.chain().focus().toggleUnderline().run() ||
                      false
                  )
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
                  handleFormatClick(
                    () =>
                      tipTapEditor?.chain().focus().toggleBulletList().run() ||
                      false
                  )
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
                  handleFormatClick(
                    () =>
                      tipTapEditor?.chain().focus().toggleOrderedList().run() ||
                      false
                  )
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
                  handleFormatClick(
                    () =>
                      tipTapEditor
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: 2 })
                        .run() || false
                  )
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
                  handleFormatClick(
                    () =>
                      tipTapEditor?.chain().focus().toggleBlockquote().run() ||
                      false
                  )
                }
              >
                <FormatQuoteIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <Tooltip title="Add Link">
            <IconButton
              size="small"
              onClick={addLink}
              color={tipTapEditor?.isActive("link") ? "primary" : "default"}
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
            minHeight: "200px",
            outline: "none",
            p: 2,
            "& p": { marginBottom: 2 },
            "& ul, & ol": { paddingLeft: 2 },
            "& a": { color: "primary.main", textDecoration: "underline" },
            "& blockquote": {
              borderLeft: "3px solid",
              borderColor: "divider",
              pl: 2,
              py: 1,
              my: 2,
              fontStyle: "italic",
            },
            "& h1, & h2, & h3": {
              fontWeight: "bold",
              mb: 2,
            },
            "& h1": { fontSize: "1.8rem" },
            "& h2": { fontSize: "1.5rem" },
            "& h3": { fontSize: "1.2rem" },
            "&:focus": {
              outline: "none",
            },
          },
        }}
      >
        <MenuBar />
        <EditorContent editor={tipTapEditor} />
      </Paper>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
