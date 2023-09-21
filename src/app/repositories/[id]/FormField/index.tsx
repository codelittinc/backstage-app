import MDInput from "@/components/Input";

interface Props {
  label?: string;
  [key: string]: any;
}

function FormField({ label = "", ...rest }: Props): JSX.Element {
  return (
    <MDInput
      variant="standard"
      label={label}
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
  );
}

export default FormField;
