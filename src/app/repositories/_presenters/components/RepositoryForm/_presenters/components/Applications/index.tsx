import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { Icon } from "@mui/material";
import { useState } from "react";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import Loading from "@/components/Loading";
import useApplicationsController from "./_presenters/controllers/useApplicationsController";
import ApplicationForm from "./_presenters/components/ApplicationForm";
import ApplicationsTable from "./_presenters/components/ApplicationsTable";

function Applications({ repository }: { repository: Repository }): JSX.Element {
  const { applications, isLoading } = useApplicationsController(repository.id!);
  const [activeApplication, setActiveApplication] =
    useState<Application | null>(null);

  const defaultApplication = {
    repositoryId: repository.id!,
    environment: "dev",
  };

  if (isLoading) return <Loading />;
  return (
    <Card id="applications" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Applications</Typography>
      </Box>
      {activeApplication && (
        <Box component="form" pb={3} px={3}>
          <ApplicationForm
            repository={repository}
            application={activeApplication}
            onCancel={() => setActiveApplication(null)}
          />
        </Box>
      )}
      {applications?.length !== 0 && (
        <Box component="form" pb={3} px={3}>
          <ApplicationsTable
            applications={applications || []}
            repository={repository}
            handleEdit={(application: Application) => {
              setActiveApplication(application);
            }}
          />
        </Box>
      )}
      <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
        <Box component="form" pb={3} px={3}>
          <Button
            variant="gradient"
            color="info"
            onClick={() => setActiveApplication(defaultApplication)}
          >
            <Icon>add</Icon>&nbsp; Add a application
          </Button>
        </Box>
      </Grid>
    </Card>
  );
}

export default Applications;
