import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { Repository } from "@/api/repositories";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import StatusCell from "@/components/DataTable/StatusCell";
import Button from "@/components/Button";
import { Icon } from "@mui/material";
import { useState } from "react";
import ApplicationForm from "./_components/ApplicationForm";
import { Application, useGetApplications } from "@/api/applications";
import ApplicationsTable from "./_components/ApplicationsTable";

const environments = {
  prod: "production",
  dev: "development",
  qa: "qa",
};

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
        {!activeApplication && (
          <Grid item xs={12} md={12} sx={{ textAlign: "right" }}>
            <Button
              variant="gradient"
              color="info"
              onClick={() => setActiveApplication(defaultApplication)}
            >
              <Icon>add</Icon>&nbsp;
            </Button>
          </Grid>
        )}
      </Box>
      <Box component="form" pb={3} px={3}>
        {activeApplication && (
          <ApplicationForm
            repository={repository}
            application={activeApplication}
          />
        )}
      </Box>
      <Box component="form" pb={3} px={3}>
        <ApplicationsTable
          applications={applications}
          repository={repository}
          handleEdit={(application: Application) => {
            setActiveApplication(application);
          }}
        />
      </Box>
    </Card>
  );
}

export default Applications;
