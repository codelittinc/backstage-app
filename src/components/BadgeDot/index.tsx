import { FC, forwardRef } from "react";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { Badge } from "@mui/material";

// declaring props types for BadgeDot
interface Props {
  variant?: "gradient" | "contained";
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "xs" | "sm" | "md" | "lg";
  badgeContent: string;
  font?:
    | {
        color: string;
        weight: string;
      }
    | any;
  [key: string]: any;
}

const BadgeDot: FC<Props> = forwardRef(
  (
    {
      variant = "contained",
      color = "info",
      size = "xs",
      badgeContent,
      font = {},
      ...rest
    },
    ref
  ) => {
    let finalSize;
    let fontSize: any;
    let padding;

    if (size === "sm") {
      finalSize = "0.5rem";
      fontSize = "caption";
      padding = "0.45em 0.775em";
    } else if (size === "lg") {
      finalSize = "0.625rem";
      fontSize = "body2";
      padding = "0.85em 1.375em";
    } else if (size === "md") {
      finalSize = "0.5rem";
      fontSize = "button";
      padding = "0.65em 1em";
    } else {
      finalSize = "0.375rem";
      fontSize = "caption";
      padding = "0.45em 0.775em";
    }

    const validColors = [
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ];

    const validColorIndex = validColors.findIndex((el) => el === color);

    return (
      <Box ref={ref} display="flex" alignItems="center" p={padding} {...rest}>
        <Box
          component="i"
          display="inline-block"
          width={finalSize}
          height={finalSize}
          borderRadius="50%"
          bgColor={validColors[validColorIndex]}
          variant={variant}
          mr={1}
        />
        <Typography
          variant={fontSize}
          fontWeight={font.weight ? font.weight : "regular"}
          color={font.color ? font.color : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {badgeContent}
        </Typography>
      </Box>
    );
  }
);

BadgeDot.displayName = "BadgeDot";

export default BadgeDot;
