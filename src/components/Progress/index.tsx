import { FC, forwardRef } from "react";
import Typography from "@/components/Typography";
import ProgressRoot from "./ProgressRoot";

interface Props {
  variant?: "contained" | "gradient";
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  value: number;
  label?: boolean;
  [key: string]: any;
}

const Progress: FC<Props> = forwardRef(
  (
    { variant = "contained", color = "info", value = 0, label, ...rest },
    ref
  ) => (
    <>
      {label && (
        <Typography variant="button" fontWeight="medium" color="text">
          {value}%
        </Typography>
      )}
      <ProgressRoot
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        ownerState={{ color, value, variant }}
      />
    </>
  )
);

Progress.displayName = "Progress";

export default Progress;
