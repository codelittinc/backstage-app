import { Autocomplete as MUIAutocomplete } from "@mui/material";
import FormField from "../FormField";

interface AutocompleteProps {
  value?: any;
  defaultValue?: any;
  onChange: (value: any) => void;
  options: any[];
  getOptionLabel?: (value: any) => string;
  label: string;
}

const Autocomplete = ({
  value,
  onChange,
  options,
  getOptionLabel = (value: any) => value,
  label,
}: AutocompleteProps) => {
  const handleChange = (_: any, newValue: any) => {
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
        <FormField
          {...params}
          label={label}
          InputLabelProps={{ shrink: true }}
        />
      )}
      onChange={handleChange}
    />
  );
};

export default Autocomplete;
