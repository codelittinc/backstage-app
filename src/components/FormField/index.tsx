import MDInput, { InputProps } from "@/components/Input";

function FormField({ ...rest }: InputProps): JSX.Element {
  return (
    <MDInput
      variant="standard"
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
  );
}

export default FormField;
