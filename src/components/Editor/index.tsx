import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import PropTypes from "prop-types";
import React from "react";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useMaterialUIController } from "@/theme";

import MDEditorRoot from "./MDEditorRoot";

function MDEditor({ value }: any) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [convertedContent, setConvertedContent] = React.useState(null);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  React.useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  return (
    <MDEditorRoot ownerState={{ darkMode }}>
      {value && typeof value === "function" && value(convertedContent)}
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
    </MDEditorRoot>
  );
}

MDEditor.defaultProps = {
  value: () => {},
};

MDEditor.propTypes = {
  value: PropTypes.func,
};

export default MDEditor;
