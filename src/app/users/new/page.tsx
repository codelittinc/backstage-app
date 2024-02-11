"use client";
import { Grid } from "@mui/material";

import FormLayout from "@/components/LayoutContainers/FormLayout";

import useNewUserController from "./_presenters/controllers/useNewUserController";
import UserForm from "../_presenters/components/UserForm";

function Page(): JSX.Element {
  const { onSave } = useNewUserController();

  return (
    <FormLayout>
      <Grid item xs={12} pb={2}>
        <UserForm key="user-form" onSave={onSave} />
      </Grid>
    </FormLayout>
  );
}

export default Page;
