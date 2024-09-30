import { Control, Controller, FieldValues, Path } from "react-hook-form";

import Autocomplete from "@/components/Autocomplete";

export type Option = { id: number | string; name: string };

type Props<T extends FieldValues> = {
  [key: string]: any;
  control: Control<T>;
  label: string;
  name: Path<T>;
  options?: { id: number | string; name: string }[] | string[] | number[];
  required?: boolean;
  withObjectValue?: boolean;
};

const AutocompleteController = <T extends FieldValues>({
  name,
  control,
  required,
  options,
  withObjectValue = true,
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
          isOptionEqualToValue={(option: T, value: T) => {
            const isOptionObject = typeof option === "object";
            const isValueObject = typeof value === "object";

            if (!isValueObject && typeof option === "object") {
              return option.id === value;
            } else if (!isValueObject && !isOptionObject) {
              return option === value;
            } else if (isValueObject && isOptionObject) {
              return option.id === value.id;
            }
          }}
          options={options}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={(newValue: T) => {
            const isValueObject = typeof newValue === "object";
            let v = newValue;
            if (!withObjectValue && newValue && isValueObject) {
              v = newValue.id;
            }
            onChange(v);
          }}
          value={value || null}
          getOptionLabel={(option: T) => {
            if (typeof option === "object") {
              return option.name;
            } else if (!withObjectValue) {
              return options.find((op) => op.id === option)?.name;
            }

            return option;
          }}
          required
          {...rest}
        />
      );
    }}
  />
);

export default AutocompleteController;
