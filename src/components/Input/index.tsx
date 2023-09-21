import { FC, forwardRef } from "react";
import { OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";
import InputRoot from "./InputRoot";

interface Props
  extends Omit<OutlinedTextFieldProps | StandardTextFieldProps, "variant"> {
  variant?: "standard" | "outlined";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
}

const Input: FC<Props | any> = forwardRef(
  ({ error, success, disabled, ...rest }, ref) => (
    <InputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
  )
);

Input.displayName = "Input";

export default Input;
