import { Control, Controller } from "react-hook-form";

import FormField from "@/components/FormField";

type Props = {
  [key: string]: any;
  control: Control;
  label: string;
  name: string;
};

const TextInputController = ({ name, control, required, ...rest }: Props) => (
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
