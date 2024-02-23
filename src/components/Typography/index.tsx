import { TypographyProps } from "@mui/material";
import { FC, ReactNode, forwardRef } from "react";

import { useMaterialUIController } from "@/theme";

import TypographyRoot from "./TypographyRoot";

interface Props extends TypographyProps {
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
  fontWeight?: "light" | "regular" | "medium" | "bold";
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

const Typography: FC<Props> = forwardRef<HTMLDivElement, Props>(
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
    // Retrieve the darkMode value from the Material UI controller
    const [{ darkMode }] = useMaterialUIController();

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
