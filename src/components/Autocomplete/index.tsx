import { Chip, Autocomplete as MUIAutocomplete } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef } from "react";

import FormField from "../FormField";

interface AutocompleteProps {
  defaultValue?: any;
  freeSolo?: boolean;
  getOptionLabel?: (value: any) => string;
  isOptionEqualToValue?: (option: any, value: any) => boolean;
  label: string;
  multiple?: boolean;
  onChange: (value: any) => void;
  options: any[];
  placeholder?: string;
  showArrows?: boolean;
  value?: any;
}

const Autocomplete = forwardRef(
  (
    {
      value,
      onChange,
      options,
      getOptionLabel = (value: any) => value,
      label,
      freeSolo,
      multiple,
      isOptionEqualToValue,
      placeholder,
      showArrows = true,
    }: AutocompleteProps,
    ref
  ) => {
    const handleChange = (_: any, newValue: any) => {
      onChange(newValue);
    };

    const localInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (localInputRef.current) {
          localInputRef.current.focus();
        }
      },
    }));

    return (
      <MUIAutocomplete
        isOptionEqualToValue={isOptionEqualToValue}
        freeSolo={freeSolo}
        multiple={multiple}
        getOptionLabel={getOptionLabel}
        value={value}
        options={options}
        renderOption={(props, option) => (
          <li
            {...props}
            key={typeof option != "string" ? JSON.stringify(option) : option}
          >
            {getOptionLabel(option)}
          </li>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            return (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={`${option}-${index}`}
              />
            );
          })
        }
        renderInput={(params) => {
          const inputProps = params.InputProps as any;
          if (!showArrows) {
            inputProps.endAdornment = null;
          }

          return (
            <FormField
              {...params}
              label={label}
              placeholder={placeholder}
              InputLabelProps={{ shrink: true }}
              InputProps={inputProps}
              inputRef={localInputRef}
            />
          );
        }}
        onChange={handleChange}
      />
    );
  }
);

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
