import FormField from "@/app/users/settings/FormField";
import { Autocomplete as MUIAutocomplete, TextField } from "@mui/material";
import { useState } from "react";

interface AutocompleteProps {
  value?: any;
  defaultValue?: any;
  onChange: (value: string) => void;
  options: any[];
  getOptionLabel?: Function;
}

const Autocomplete = ({
  value,
  onChange,
  options,
  getOptionLabel = (value: string) => value,
}: AutocompleteProps) => {
  const handleChange = (_, newValue) => {
    onChange(newValue);
  };

  return (
    <MUIAutocomplete
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
      renderInput={(params) => (
        <FormField {...params} label="" InputLabelProps={{ shrink: true }} />
      )}
      onChange={handleChange}
    />
  );
};

export default Autocomplete;
