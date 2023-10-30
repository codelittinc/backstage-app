import { FC, ReactNode, forwardRef } from "react";
import { ButtonProps } from "@mui/material";
import SocialButtonRoot from "./SocialButtonRoot";

interface Props extends Omit<ButtonProps, "color" | "variant"> {
  [key: string]: any;
  children?: ReactNode;
  circular?: boolean;
  color?:
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "pinterest"
    | "youtube"
    | "github"
    | "vimeo"
    | "slack"
    | "dribbble"
    | "reddit"
    | "tumblr";
  iconOnly?: boolean;
  size?: "small" | "medium" | "large";
}

const SocialButton: FC<Props> = forwardRef(
  (
    {
      color = "facebook",
      size = "medium",
      iconOnly,
      circular,
      children,
      ...rest
    },
    ref
  ) => (
    <SocialButtonRoot
      {...rest}
      ref={ref}
      variant="contained"
      color="primary"
      size={size}
      ownerState={{ color, size, iconOnly, circular }}
    >
      {children}
    </SocialButtonRoot>
  )
);

SocialButton.displayName = "SocialButton";

export default SocialButton;
