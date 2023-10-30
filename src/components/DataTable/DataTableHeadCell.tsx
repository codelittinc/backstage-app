import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";
import { ReactNode } from "react";

import Box from "@/components/Box";
import { useMaterialUIController } from "@/theme";

// Declaring props types for DataTableHeadCell
interface Props {
  align?: "left" | "right" | "center";
  children: ReactNode;
  sorted?: false | "none" | "asce" | "desc";
  width?: string | number;
}

function DataTableHeadCell({
  width = "auto",
  children,
  sorted = "none",
  align = "left",
  ...rest
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Box
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }: Theme) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <Box
        {...rest}
        position="relative"
        textAlign={align}
        color={darkMode ? "white" : "secondary"}
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }: Theme) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none",
        })}
      >
        {children}
        {sorted && (
          <Box
            position="absolute"
            top={0}
            right={align !== "right" ? "16px" : 0}
            left={align === "right" ? "-5px" : "unset"}
            sx={({ typography: { size } }: any) => ({
              fontSize: size.lg,
            })}
          >
            <Box
              position="absolute"
              top={-6}
              color={sorted === "asce" ? "text" : "secondary"}
              opacity={sorted === "asce" ? 1 : 0.5}
            >
              <Icon>arrow_drop_up</Icon>
            </Box>
            <Box
              position="absolute"
              top={0}
              color={sorted === "desc" ? "text" : "secondary"}
              opacity={sorted === "desc" ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DataTableHeadCell;
