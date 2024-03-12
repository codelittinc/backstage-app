import { OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";
import React, { FC, forwardRef, useEffect, useRef } from "react";

import InputRoot from "./InputRoot";

export interface InputProps
  extends Omit<OutlinedTextFieldProps | StandardTextFieldProps, "variant"> {
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  variant?: "standard" | "outlined";
}

const Input: FC<InputProps> = forwardRef(
  ({ error, success, disabled, ...rest }, ref) => {
    return (
      <InputRoot
        {...rest}
        ref={ref}
        ownerState={{ error, success, disabled }}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
