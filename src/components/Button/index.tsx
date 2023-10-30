import { ButtonProps } from "@mui/material";
import { FC, ReactNode, forwardRef } from "react";

import { useMaterialUIController } from "@/theme";

import ButtonRoot from "./ButtonRoot";


interface Props extends Omit<ButtonProps, "color" | "variant"> {
  [key: string]: any;
  children?: ReactNode;
  circular?: boolean;
  color?:
    | "white"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
    | "default";
  iconOnly?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "text" | "contained" | "outlined" | "gradient";
}

const Button: FC<Props> = forwardRef(
  (
    {
      color = "white",
      variant = "contained",
      size = "medium",
      circular,
      iconOnly,
      children,
      ...rest
    },
    ref
  ) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <ButtonRoot
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </ButtonRoot>
    );
  }
);

Button.displayName = "Button";

export default Button;
