import { forwardRef, FC } from "react";
import { BoxProps } from "@mui/material";
import BoxRoot from "./BoxRoot";

interface Props extends BoxProps {
  [key: string]: any;
  bgColor?: string;
  borderRadius?: string;
  color?: string;
  coloredShadow?: string;
  opacity?: number;
  shadow?: string;
  variant?: "contained" | "gradient";
}

const Box: FC<Props> = forwardRef(
  (
    {
      variant = "contained",
      bgColor = "transparent",
      color = "dark",
      opacity = 1,
      borderRadius = "none",
      shadow = "none",
      coloredShadow = "none",
      ...rest
    },
    ref
  ) => (
    <BoxRoot
      {...rest}
      ref={ref}
      ownerState={{
        variant,
        bgColor,
        color,
        opacity,
        borderRadius,
        shadow,
        coloredShadow,
      }}
    />
  )
);

Box.displayName = "Box";

export default Box;
