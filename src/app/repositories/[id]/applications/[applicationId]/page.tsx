"use client";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useParams } from "next/navigation";

import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import Box from "@/components/Box";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";

import ApplicationForm from "./_presenters/components/ApplicationForm";
import useApplicationController from "./_presenters/components/ApplicationForm/_controllers/useApplicationController";


type Params = {
  applicationId: string;
  id: string;
};

function Page(): JSX.Element {
  const { applicationId, id: repositoryId } = useParams<Params>();

  const { application, isLoading, onSave } = useApplicationController(
    parseInt(repositoryId),
    parseInt(applicationId)
  );

  if (isLoading) return <Loading />;

  return (
    <FormLayout>
      <Grid item xs={12}>
        <ApplicationForm
          application={application as Application}
          onSave={onSave}
        />
      </Grid>
    </FormLayout>
  );
}

export default Page;
