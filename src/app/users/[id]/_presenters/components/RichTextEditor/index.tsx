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
import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
  useRef,
} from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import TitleIcon from "@mui/icons-material/Title";

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
    const debounceTimeoutRef = useRef<NodeJS.Timeout>();

    // Debounced onChange to prevent lag while typing
    const debouncedOnChange = useCallback(
      (content: string) => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
          onChange?.(content);
        }, 300);
      },
      [onChange]
    );

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "rich-text-link",
          },
        }),
        Underline,
        Placeholder.configure({
          placeholder,
          emptyEditorClass: "is-editor-empty",
          showOnlyWhenEditable: true,
          showOnlyCurrent: false,
        }),
      ],
      content: initialContent || "<p></p>",
      editable: true,
      onUpdate: ({ editor }) => {
        const newContent = editor.getHTML();
        debouncedOnChange(newContent);
      },
      onFocus: ({ editor }) => {
        // Ensure proper focus handling
        editor.view.focus();
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none rich-text-content",
        },
      },
    });

    // Sync external content changes with editor
    useEffect(() => {
      if (editor && initialContent !== editor.getHTML()) {
        const { from, to } = editor.state.selection;
        editor.commands.setContent(initialContent || "<p></p>", false);
        // Restore cursor position if possible
        if (from === to) {
          editor.commands.setTextSelection(
            Math.min(from, editor.state.doc.content.size)
          );
        }
      }
    }, [initialContent, editor]);

    // Cleanup debounce timeout on unmount
    useEffect(() => {
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getContent: () => editor?.getHTML() || "",
      }),
      [editor]
    );

    const handleBoldClick = useCallback(() => {
      if (!editor) return;
      editor.chain().focus().toggleBold().run();
    }, [editor]);

    const handleItalicClick = useCallback(() => {
      if (!editor) return;
      editor.chain().focus().toggleItalic().run();
    }, [editor]);

    const handleUnderlineClick = useCallback(() => {
      if (!editor) return;
      editor.chain().focus().toggleUnderline().run();
    }, [editor]);

    const handleBulletListClick = useCallback(() => {
      if (!editor) return;
      editor.chain().focus().toggleBulletList().run();
    }, [editor]);

    const handleOrderedListClick = useCallback(() => {
      if (!editor) return;
      editor.chain().focus().toggleOrderedList().run();
    }, [editor]);

    const handleHeadingClick = useCallback(() => {
      if (!editor) return;
      if (editor.isActive("heading", { level: 2 })) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      }
    }, [editor]);

    const handleBlockquoteClick = useCallback(() => {
      if (!editor) return;
      editor.chain().focus().toggleBlockquote().run();
    }, [editor]);

    const handleLinkClick = useCallback(() => {
      if (!editor) return;

      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("Enter URL", previousUrl);

      if (url === null) return;

      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }, [editor]);

    if (!editor) {
      return (
        <Paper variant="outlined" sx={{ minHeight: 200, p: 2 }}>
          <Box>Loading editor...</Box>
        </Paper>
      );
    }

    return (
      <Paper
        variant="outlined"
        sx={{
          position: "relative",
          "& .rich-text-content": {
            minHeight: "150px",
            padding: "16px",
            "&:focus": {
              outline: "none",
            },
            "& p": {
              margin: "0 0 1em 0",
              "&:last-child": {
                marginBottom: 0,
              },
            },
            "& h1, & h2, & h3": {
              margin: "1.5em 0 0.5em 0",
              "&:first-child": {
                marginTop: 0,
              },
            },
            "& ul, & ol": {
              paddingLeft: "1.5em",
              margin: "0 0 1em 0",
            },
            "& blockquote": {
              borderLeft: "3px solid #ddd",
              paddingLeft: "1em",
              margin: "1em 0",
              fontStyle: "italic",
            },
            "& .rich-text-link": {
              color: "primary.main",
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "none",
              },
            },
            "& p.is-editor-empty:first-child::before": {
              content: "attr(data-placeholder)",
              float: "left",
              color: "text.secondary",
              pointerEvents: "none",
              height: 0,
              fontStyle: "italic",
            },
          },
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            p: 1,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            backgroundColor: "grey.50",
            "& .MuiToggleButton-root": {
              py: 0.5,
              border: "none",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            },
            "& .MuiToggleButton-root.Mui-selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          }}
        >
          <ToggleButtonGroup
            size="small"
            sx={{ "& .MuiToggleButtonGroup-grouped": { border: "none" } }}
          >
            <Tooltip title="Bold (Ctrl+B)">
              <ToggleButton
                value="bold"
                selected={editor.isActive("bold")}
                onClick={handleBoldClick}
              >
                <FormatBoldIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Italic (Ctrl+I)">
              <ToggleButton
                value="italic"
                selected={editor.isActive("italic")}
                onClick={handleItalicClick}
              >
                <FormatItalicIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Underline (Ctrl+U)">
              <ToggleButton
                value="underline"
                selected={editor.isActive("underline")}
                onClick={handleUnderlineClick}
              >
                <FormatUnderlinedIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            size="small"
            sx={{ "& .MuiToggleButtonGroup-grouped": { border: "none" } }}
          >
            <Tooltip title="Bullet List">
              <ToggleButton
                value="bulletList"
                selected={editor.isActive("bulletList")}
                onClick={handleBulletListClick}
              >
                <FormatListBulletedIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Numbered List">
              <ToggleButton
                value="orderedList"
                selected={editor.isActive("orderedList")}
                onClick={handleOrderedListClick}
              >
                <FormatListNumberedIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            size="small"
            sx={{ "& .MuiToggleButtonGroup-grouped": { border: "none" } }}
          >
            <Tooltip title="Heading 2">
              <ToggleButton
                value="heading"
                selected={editor.isActive("heading", { level: 2 })}
                onClick={handleHeadingClick}
              >
                <TitleIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Quote">
              <ToggleButton
                value="blockquote"
                selected={editor.isActive("blockquote")}
                onClick={handleBlockquoteClick}
              >
                <FormatQuoteIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

          <Tooltip title="Add/Edit Link">
            <IconButton
              size="small"
              onClick={handleLinkClick}
              sx={{
                color: editor.isActive("link")
                  ? "primary.main"
                  : "text.secondary",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <LinkIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <EditorContent editor={editor} />
      </Paper>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
