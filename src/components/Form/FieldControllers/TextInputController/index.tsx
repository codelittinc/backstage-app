import { Control, Controller, FieldValues, Path } from "react-hook-form";

import FormField from "@/components/FormField";
import { InputProps } from "@/components/Input";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
} & InputProps;

const TextInputController = <T extends FieldValues>({
  name,
  control,
  required,
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
        <FormField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          required={required}
          {...rest}
        />
      );
    }}
  />
);

export default TextInputController;
