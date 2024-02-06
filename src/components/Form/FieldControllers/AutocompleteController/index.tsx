import { Control, Controller, FieldValues, Path } from "react-hook-form";

import Autocomplete from "@/components/Autocomplete";

type Props<T extends FieldValues> = {
  [key: string]: any;
  control: Control<T>;
  label: string;
  name: Path<T>;
  options: Customer[];
  processSelectedValue?: (
    selectedValue: { id: number } | string
  ) => { id: number } | string | number;
  required?: boolean;
};

const AutocompleteController = <T extends FieldValues>({
  name,
  control,
  required,
  options,
  processSelectedValue,
  ...rest
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required: required && "This field is required",
    }}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      return (
        <Autocomplete
          isOptionEqualToValue={(option: T, value: T) => option.id === value.id}
          options={options}
          helperText={error ? error.message : null}
          onChange={(newValue: unknown) => {
            const processedValue = processSelectedValue
              ? processSelectedValue(newValue)
              : newValue;

            onChange(processedValue);
          }}
          value={value}
          getOptionLabel={(option: T) => option.name}
          required
          {...rest}
        />
      );
    }}
  />
);

export default AutocompleteController;
