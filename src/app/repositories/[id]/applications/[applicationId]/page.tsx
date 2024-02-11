"use client";
import Card from "@mui/material/Card";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import Box from "@/components/Box";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";
import useApplicationController from "./_presenters/components/ApplicationForm/_controllers/useApplicationController";
import { useParams } from "next/navigation";
import ApplicationForm from "./_presenters/components/ApplicationForm";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import { Grid } from "@mui/material";

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
