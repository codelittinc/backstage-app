import { TypographyProps } from "@mui/material";
import { FC, ReactNode, forwardRef } from "react";

import { useMaterialUIController } from "@/theme";

import TypographyRoot from "./TypographyRoot";


interface Props extends TypographyProps {
  [key: string]: any;
  children: ReactNode;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
    | "text"
    | "white";
  fontWeight?: "light" | "regular" | "medium" | "bold" | undefined;
  opacity?: number;
  textGradient?: boolean;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  verticalAlign?:
    | "unset"
    | "baseline"
    | "sub"
    | "super"
    | "text-top"
    | "text-bottom"
    | "middle"
    | "top"
    | "bottom";
}

const Typography: FC<Props | any> = forwardRef(
  (
    {
      color = "dark",
      fontWeight,
      textTransform = "none",
      verticalAlign = "unset",
      textGradient,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <TypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode,
        }}
      >
        {children}
      </TypographyRoot>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
