import { AvatarProps } from "@mui/material";
import { FC, forwardRef } from "react";

import MDAvatarRoot from "./MDAvatarRoot";

interface Props extends AvatarProps {
  [key: string]: any;
  bgColor?: string;
  shadow?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "inset";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Avatar: FC<Props> = forwardRef(
  ({ bgColor = "transparent", size = "md", shadow = "none", ...rest }, ref) => (
    <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
  )
);

Avatar.displayName = "Avatar";

export default Avatar;
