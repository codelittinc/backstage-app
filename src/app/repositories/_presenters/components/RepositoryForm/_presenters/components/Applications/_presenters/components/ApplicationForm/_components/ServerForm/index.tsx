import { Switch } from "@mui/material";
import Grid from "@mui/material/Grid";

import { Application } from "@/app/repositories/_domain/interfaces/Application";
import Box from "@/components/Box";
import FormField from "@/components/FormField";
import Typography from "@/components/Typography";

function ApplicationForm({
  application,
  onChange,
}: {
  application: Application;
  onChange: Function;
}): JSX.Element {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <FormField
          label="URL"
          placeholder="URL"
          value={application.server?.link || ""}
          onChange={({ target: { value } }) => {
            onChange({
              ...application,
              server: {
                ...application.server,
                link: value,
              },
            });
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display="flex" alignItems="center" lineHeight={1}>
          <Typography variant="caption" fontWeight="regular">
            Has a /health for health checks
          </Typography>
          <Box ml={1}>
            <Switch
              checked={application.server?.supportsHealthCheck}
              onChange={() => {
                onChange({
                  ...application,
                  server: {
                    ...application.server,
                    supportsHealthCheck:
                      !application.server?.supportsHealthCheck,
                  },
                });
              }}
            />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={3}>
        <Box display="flex" alignItems="center" lineHeight={1}>
          <Typography variant="caption" fontWeight="regular">
            Active
          </Typography>
          <Box ml={1}>
            <Switch
              checked={application.server?.active}
              onChange={() => {
                onChange({
                  ...application,
                  server: {
                    ...application.server,
                    active: !application.server?.active,
                  },
                });
              }}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default ApplicationForm;
