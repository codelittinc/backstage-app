import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import FormField from "../../../../../../FormField";
import { useEffect } from "react";
import { Application } from "@/api/applications";
import { Autocomplete, Switch } from "@mui/material";

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
      <Grid item xs={12} md={3}>
        <Box display="flex" alignItems="center" lineHeight={1}>
          <Typography variant="caption" fontWeight="regular">
            {application.server?.supportsHealthCheck
              ? "Apply Health check"
              : "Do not apply Health check"}
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
            {application.server?.active ? "Active" : "Inactive"}
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