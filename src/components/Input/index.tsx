import { OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";
import { FC, forwardRef, WheelEvent } from "react";

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
    // Function to prevent the scroll wheel from changing the input value
    const handleWheel = (e: WheelEvent<HTMLInputElement>) => e.preventDefault();

    // Ensure inputProps contains the onWheel handler to prevent scrolling from changing value
    const inputProps = { ...rest.inputProps, onWheel: handleWheel };

    return (
      <InputRoot
        {...rest}
        ref={ref}
        inputProps={inputProps}
        ownerState={{ error, success, disabled }}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
