import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Box from "@/components/Box";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import Typography from "@/components/Typography";

function BasicInfo({
  customer,
  onChange,
  onSave,
}: {
  customer: Customer;
  onChange: Function;
  onSave: Function;
}): JSX.Element {
  const {
    name,
    sourceControlToken,
    notificationsToken,
    ticketTrackingSystemToken,
  } = customer;

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <FormField
              label="Name"
              placeholder="Backstage"
              value={name || ""}
              onChange={({ target: { value } }) => {
                onChange({
                  ...customer,
                  name: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <FormField
              label="Source control token"
              placeholder="**********"
              value={sourceControlToken || ""}
              onChange={({ target: { value } }) => {
                onChange({
                  ...customer,
                  sourceControlToken: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <FormField
              label="Notifications token"
              placeholder="**********"
              value={notificationsToken || ""}
              onChange={({ target: { value } }) => {
                onChange({
                  ...customer,
                  notificationsToken: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <FormField
              label="Ticket tracking system token"
              placeholder="**********"
              value={ticketTrackingSystemToken || ""}
              onChange={({ target: { value } }) => {
                onChange({
                  ...customer,
                  ticketTrackingSystemToken: value,
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
          <Box
            display="flex"
            justifyContent={{ md: "flex-end" }}
            alignItems="center"
          >
            <Button
              variant="gradient"
              color="dark"
              size="small"
              onClick={() => onSave()}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
}

export default BasicInfo;
