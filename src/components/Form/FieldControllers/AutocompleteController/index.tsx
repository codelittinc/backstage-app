import { Control, Controller, FieldValues, Path } from "react-hook-form";

import Autocomplete from "@/components/Autocomplete";

type Props<T extends FieldValues> = {
  [key: string]: any;
  control: Control<T>;
  label: string;
  name: Path<T>;
  required?: boolean;
  options: Customer[];
};

const AutocompleteController = <T extends FieldValues>({
  name,
  control,
  required,
  options,
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
          onChange={onChange}
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
