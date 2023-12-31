import { OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";

import InputRoot from "./InputRoot";

interface Props
  extends Omit<OutlinedTextFieldProps | StandardTextFieldProps, "variant"> {
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  variant?: "standard" | "outlined";
}

const Input: FC<Props | any> = forwardRef(
  ({ error, success, disabled, ...rest }, ref) => (
    <InputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
  )
);

Input.displayName = "Input";

export default Input;
