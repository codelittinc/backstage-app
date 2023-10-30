import { Chip, Autocomplete as MUIAutocomplete } from "@mui/material";
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
  value?: any;
}

const Autocomplete = ({
  value,
  onChange,
  options,
  getOptionLabel = (value: any) => value,
  label,
  freeSolo,
  multiple,
  isOptionEqualToValue,
}: AutocompleteProps) => {
  const handleChange = (_: any, newValue: any) => {
    onChange(newValue);
  };

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
