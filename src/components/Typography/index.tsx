import { FC, ReactNode, forwardRef } from "react";
import { TypographyProps } from "@mui/material";
import TypographyRoot from "./TypographyRoot";
import { useMaterialUIController } from "@/theme";

interface Props extends TypographyProps {
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
  textGradient?: boolean;
  children: ReactNode;
  opacity?: number;
  [key: string]: any;
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
