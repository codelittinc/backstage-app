import { Switch, SwitchProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import Box from "@/components/Box";
import Typography from "@/components/Typography";

type Props<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  labelPosition?: "left" | "right";
  name: Path<T>;
  required?: boolean;
} & SwitchProps;

const SwitchController = <T extends FieldValues>({
  name,
  control,
  required,
  label,
  labelPosition = "left",
  ...rest
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    rules={{
      required: required && "This field is required",
    }}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      const labelLeft = labelPosition === "left";
      const labelElement = (
        <Typography variant="caption" fontWeight="regular">
          {label}
        </Typography>
      );

      return (
        <Box display="flex" alignItems="center" lineHeight={1}>
          {labelLeft && labelElement}
          <Box ml={1}></Box>
          <Switch
            checked={value}
            onChange={() => {
              onChange(!value);
            }}
            {...rest}
          />
          {!labelLeft && labelElement}
        </Box>
      );
    }}
  />
);

export default SwitchController;
