import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Switch } from "@mui/material";
import ServerForm from "./_components/ServerForm";
import LinksTable from "./_components/ServerForm/_components/LinksTable";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import useApplicationsController from "./_controllers/useApplicationFormController";
import Autocomplete from "@/components/Autocomplete";

function ApplicationForm({
  repository,
  application,
  onCancel,
}: {
  repository: Repository;
  application: Application;
  onCancel: Function;
}): JSX.Element {
  const [currentApplication, setCurrentApplication] =
    useState<Application>(application);

  const [hasServer, setHasServer] = useState<boolean>(!!application.server);
  const { onSave } = useApplicationsController(repository.id!);

  useEffect(() => {
    setCurrentApplication(application);
  }, [application]);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Application</Typography>
      </Box>
      <Box pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  label="Environment"
                  defaultValue="development"
                  value={currentApplication.environment}
                  options={["dev", "qa", "prod"]}
                  onChange={(newValue) => {
                    setCurrentApplication({
                      ...currentApplication,
                      environment: newValue || "dev",
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Autocomplete
                  label="External identifiers"
                  freeSolo
                  multiple
                  options={[]}
                  value={
                    currentApplication.externalIdentifiers?.map(
                      (e) => e.text
                    ) || []
                  }
                  onChange={(newValue) => {
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
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" lineHeight={1}>
              <Typography variant="caption" fontWeight="regular">
                Has a public URL
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
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <Box
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
                <Button
                  variant="gradient"
                  color="error"
                  size="small"
                  onClick={() => onCancel()}
                >
                  cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
                <Button
                  variant="gradient"
                  color="info"
                  size="small"
                  onClick={() => {
                    onSave(currentApplication);
                  }}
                >
                  save
                </Button>
              </Grid>
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
          {application?.externalIdentifiers?.length > 0 && (
            <LinksTable application={application} />
          )}
        </Grid>
      </Box>
    </Card>
  );
}

export default ApplicationForm;
