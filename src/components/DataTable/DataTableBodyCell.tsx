import { ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import Box from "@/components/Box";

interface Props {
  children: ReactNode;
  noBorder?: boolean;
  align?: "left" | "right" | "center";
}

function DataTableBodyCell({
  noBorder,
  align = "left",
  children,
}: Props): JSX.Element {
  return (
    <Box
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({
        palette: { light },
        typography: { size },
        borders: { borderWidth },
      }: Theme) => ({
        fontSize: size.sm,
        borderBottom: noBorder
          ? "none"
          : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <Box
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DataTableBodyCell;
