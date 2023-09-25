import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { Repository } from "@/api/repositories";
import Button from "@/components/Button";
import { Icon } from "@mui/material";
import { useState } from "react";
import ApplicationForm from "./_components/ApplicationForm";
import { Application, useGetApplications } from "@/api/applications";
import ApplicationsTable from "./_components/ApplicationsTable";

function Applications({
  repository,
}: {
  repository: Repository;
  onChange: Function;
}): JSX.Element {
  const { data: applications } = useGetApplications(repository.id);
  const [activeApplication, setActiveApplication] =
    useState<Application | null>(null);

  const defaultApplication = {
    repositoryId: repository.id,
    environment: "dev",
  };

  if (!applications) return <div>Loading...</div>;
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
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
      {applications.length !== 0 && (
        <Box component="form" pb={3} px={3}>
          <ApplicationsTable
            applications={applications}
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
