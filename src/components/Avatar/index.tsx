import { FC, forwardRef } from "react";
import { AvatarProps } from "@mui/material";
import MDAvatarRoot from "./MDAvatarRoot";

interface Props extends AvatarProps {
  bgColor?:
    | "transparent"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  shadow?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "inset";
  [key: string]: any;
}

const Avatar: FC<Props> = forwardRef(
  ({ bgColor = "transparent", size = "md", shadow = "none", ...rest }, ref) => (
    <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
  )
);

Avatar.displayName = "Avatar";

export default Avatar;
