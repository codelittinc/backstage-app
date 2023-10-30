import MDInput from "@/components/Input";

interface Props {
  [key: string]: any;
  label?: string;
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
