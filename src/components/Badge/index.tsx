import { BadgeProps } from "@mui/material";
import { FC, ReactNode, forwardRef } from "react";

import MDBadgeRoot from "./MDBadgeRoot";
interface Props extends Omit<BadgeProps, "color" | "variant"> {
  [key: string]: any;
  border?: boolean;
  children?: ReactNode;
  circular?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  container?: boolean;
  indicator?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "gradient" | "contained";
}

const Badge: FC<Props | any> = forwardRef(
  (
    {
      color = "info",
      variant = "gradient",
      size = "sm",
      circular,
      indicator,
      border,
      container,
      children,
      ...rest
    },
    ref
  ) => (
    <MDBadgeRoot
      {...rest}
      ownerState={{
        color,
        variant,
        size,
        circular,
        indicator,
        border,
        container,
        children,
      }}
      ref={ref}
      color="default"
    >
      {children}
    </MDBadgeRoot>
  )
);

Badge.displayName = "Badge";

export default Badge;
