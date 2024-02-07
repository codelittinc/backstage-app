import { Control, Controller, FieldValues, Path } from "react-hook-form";

import DatePicker from "@/components/DatePicker";
import FormField from "@/components/FormField";
import { InputProps } from "@/components/Input";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
} & InputProps;

const DatePickerController = <T extends FieldValues>({
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
      console.log(value);
      return (
        <DatePicker
          value={[new Date(value)]}
          mode="single"
          helperText={error ? error.message : null}
          onChange={(e: Array<Date>) => {
            onChange?.(e[0]);
          }}
          input={{
            required,
          }}
          {...rest}
        />
      );
    }}
  />
);

export default DatePickerController;
