import { FC, ReactNode, forwardRef } from "react";
import { BadgeProps } from "@mui/material";
import MDBadgeRoot from "./MDBadgeRoot";
interface Props extends Omit<BadgeProps, "color" | "variant"> {
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  variant?: "gradient" | "contained";
  size?: "xs" | "sm" | "md" | "lg";
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  children?: ReactNode;
  container?: boolean;
  [key: string]: any;
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
