import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { Control, DefaultValues, useForm } from "react-hook-form";

import { mergeObjects } from "@/app/_presenters/utils/objects";
import Box from "@/components/Box";
import Button from "@/components/Button";

type Model = Record<string, unknown>;

type Props<T extends Model> = {
  defaultModelValues: T;
  model?: T;
  onSave: (object: T) => void;
  renderFields: (control: Control<T>) => JSX.Element | JSX.Element[];
};

function Form<T extends Model>({
  model,
  defaultModelValues,
  onSave,
  renderFields,
}: Props<T>): JSX.Element {
  const router = useRouter();

  const defaultValues = mergeObjects(
    defaultModelValues,
    model || {}
  ) as DefaultValues<T>;

  const { handleSubmit, control } = useForm<T>({
    defaultValues,
  });

  return (
    <Box component="form" pb={3} px={3}>
      <Grid container spacing={3}>
        {renderFields(control)}
      </Grid>
      <Grid container flexDirection={"row-reverse"}>
        <Grid
          item
          xs={12}
          lg={3}
          display={"flex"}
          justifyContent={"space-between"}
          pt={3}
        >
          <Button
            variant="gradient"
            color="dark"
            size="small"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="info"
            size="small"
            onClick={() => handleSubmit(onSave)()}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
