import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "../../../../FormField";
import { Repository } from "@/api/repositories";
import { useEffect, useState } from "react";
import {
  APPLICATIONS_KEY,
  Application,
  createApplication,
  updateApplication,
} from "@/api/applications";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@mui/material";
import ServerForm from "./_components/ServerForm";

function ApplicationForm({
  repository,
  application,
}: {
  repository: Repository;
  application: Application;
}): JSX.Element {
  const [currentApplication, setCurrentApplication] =
    useState<Application>(application);

  const [hasServer, setHasServer] = useState<boolean>(!!application.server);

  useEffect(() => {
    setCurrentApplication(application);
  }, [application]);

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (currentApplication: Application) =>
      createApplication(repository.id, currentApplication),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APPLICATIONS_KEY, repository.id]);
      },
    }
  );

  const onSave = () => {
    createMutation.mutate(currentApplication);
  };

  const updateMutation = useMutation(
    (application: Application) => updateApplication(repository.id, application),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APPLICATIONS_KEY, repository.id]);
        queryClient.invalidateQueries([
          APPLICATIONS_KEY,
          repository.id,
          application.id,
        ]);
      },
    }
  );

  const onUpdate = () => {
    updateMutation.mutate(currentApplication);
  };

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Application</Typography>
      </Box>
      <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
        <Box
          display="flex"
          justifyContent={{ md: "flex-end" }}
          alignItems="center"
          lineHeight={1}
        >
          <Button
            variant="gradient"
            color="dark"
            size="small"
            onClick={() => {
              currentApplication.id ? onUpdate() : onSave();
            }}
          >
            update repository
          </Button>
        </Box>
      </Grid>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  defaultValue="development"
                  value={currentApplication.environment}
                  options={["dev", "qa", "prod"]}
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      label="Environment"
                      InputLabelProps={{ shrink: true }}
                      onChange={({ target: { value } }) => {
                        setCurrentApplication({
                          ...currentApplication,
                          environment: value,
                        });
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Autocomplete
                  freeSolo
                  multiple
                  options={[]}
                  value={
                    currentApplication.externalIdentifiers?.map(
                      (e) => e.text
                    ) || ""
                  }
                  renderInput={(params) => (
                    <FormField
                      {...params}
                      label="External identifiers"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  onChange={(ba, newValue) => {
                    setCurrentApplication({
                      ...currentApplication,
                      externalIdentifiers: newValue.map((e) => ({
                        text: e,
                      })),
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box display="flex" alignItems="center" lineHeight={1}>
              <Typography variant="caption" fontWeight="regular">
                {hasServer
                  ? "With server for health check"
                  : "Without server for health check"}
              </Typography>
              <Box ml={1}>
                <Switch
                  checked={hasServer}
                  onChange={() => {
                    setHasServer(!hasServer);
                  }}
                />
              </Box>
            </Box>
          </Grid>
          {hasServer ? (
            <ServerForm
              application={currentApplication}
              onChange={setCurrentApplication}
            />
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </Card>
  );
}

export default ApplicationForm;
