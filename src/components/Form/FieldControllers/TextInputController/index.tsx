import { Controller } from "react-hook-form";

import FormField from "@/components/FormField";

type Props = {
  [key: string]: any;
  control: any;
  label: string;
  name: string;
};

const TextInputController = ({
  name,
  control,
  label,
  placeholder,
  required,
  ...rest
}: Props) => {
  let rules = {};

  if (required) {
    rules = Object.assign(rules, { required: "This field is required" });
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormField
            helperText={error ? error.message : null}
            placeholder={placeholder}
            error={!!error}
            onChange={onChange}
            value={value}
            label={label}
            required={required}
            {...rest}
          />
        );
      }}
    />
  );
};

export default TextInputController;
