/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Theme, styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { createRef, forwardRef, useEffect } from "react";

const StyledTextField = styled(TextField)(
  ({ theme, ownerState }: { ownerState: any; theme?: Theme }) => {
    const { palette, functions } = theme;
    const { error, success, disabled } = ownerState;

    const {
      grey,
      transparent,
      error: colorError,
      success: colorSuccess,
    } = palette;
    const { pxToRem } = functions;

    // styles for the input with error={true}
    const errorStyles = () => ({
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: `right ${pxToRem(18)} center`,
      backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

      "& .Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline, &:after": {
          borderColor: colorError.main,
        },
      },

      "& .MuiInputLabel-root.Mui-focused": {
        color: colorError.main,
      },
    });

    // styles for the input with success={true}
    const successStyles = () => ({
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: `right ${pxToRem(18)} center`,
      backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

      "& .Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline, &:after": {
          borderColor: colorSuccess.main,
        },
      },

      "& .MuiInputLabel-root.Mui-focused": {
        color: colorSuccess.main,
      },
    });

    const hideNumberInputArrows = {
      "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button":
        {
          WebkitAppearance: "none",
          margin: 0,
        },
      "& input[type='number']": {
        MozAppearance: "textfield", // For Firefox
      },
    };

    return {
      backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
      pointerEvents: disabled ? "none" : "auto",
      ...(error && errorStyles()),
      ...(success && successStyles()),
      ...hideNumberInputArrows, // Apply the styles to hide number input arrows
    };
  }
);

const InputRoot = forwardRef<any, TextFieldProps>(({ type, ...rest }, ref) => {
  const inputRef = ref || createRef<HTMLInputElement>();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => e.preventDefault();

    const currentInput = inputRef.current as HTMLInputElement;
    if (type === "number" && currentInput) {
      currentInput.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (currentInput) {
        currentInput.removeEventListener("wheel", handleWheel);
      }
    };
  }, [inputRef, type]);

  return <StyledTextField ref={inputRef} type={type} {...rest} />;
});

InputRoot.displayName = "InputRoot";

export default InputRoot;
