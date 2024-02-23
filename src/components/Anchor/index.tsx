import { Box, Icon } from "@mui/material";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Button from "../Button";

type Props = {
  children: React.ReactNode;
  id: string;
};

const Anchor = ({ id, children }: Props) => {
  const [showCopy, setShowCopy] = useState(false);
  const url = window.location.href.split("#")[0];
  const urlWithHash = `${url}#${id}`;

  return (
    <Box
      id={id}
      display="flex"
      alignItems="center"
      onMouseOver={() => setShowCopy(true)}
      onMouseOut={() => setShowCopy(false)}
      width={"fit-content"}
    >
      {children}
      {showCopy && (
        <CopyToClipboard text={urlWithHash}>
          <Button variant="text" color="dark">
            <Icon>copy</Icon>
          </Button>
        </CopyToClipboard>
      )}
    </Box>
  );
};

export default Anchor;
