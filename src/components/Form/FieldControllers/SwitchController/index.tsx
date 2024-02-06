import { Switch, SwitchProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import Box from "@/components/Box";
import Typography from "@/components/Typography";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  name: Path<T>;
  required?: boolean;
} & SwitchProps;

const SwitchController = <T extends FieldValues>({
  name,
  control,
  required,
  label,
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
        <Box display="flex" alignItems="center" lineHeight={1}>
          <Typography variant="caption" fontWeight="regular">
            {label}
          </Typography>
          <Box ml={1}></Box>
          <Switch
            checked={value}
            onChange={() => {
              onChange(!value);
            }}
            {...rest}
          />
        </Box>
      );
    }}
  />
);

export default SwitchController;
