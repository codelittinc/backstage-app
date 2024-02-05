import MDInput from "@/components/Input";

interface Props {
  [key: string]: any;
}

function FormField({ ...rest }: Props): JSX.Element {
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
