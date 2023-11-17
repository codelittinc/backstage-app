import { Switch } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import useChannelsController from "@/app/repositories/_presenters/components/RepositoryForm/_presenters/components/BasicInfo/_presenters/controllers/useChannelsController";
import Autocomplete from "@/components/Autocomplete";
import Box from "@/components/Box";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import FormField from "@/components/FormField";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";

function BasicInfo({
  project,
  onChange,
  onSave,
}: {
  onChange: Function;
  onSave: Function;
  project: Project;
}): JSX.Element {
  const {
    name,
    customer,
    startDate,
    endDate,
    billable,
    slackChannel,
    logoUrl,
  } = project;
  const { customers, isLoading } = useCustomersController();

  const { channels, isLoading: isChannelsLoading } =
    useChannelsController(customer);

  if (isLoading || isChannelsLoading) {
    return <Loading />;
  }

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Name"
              placeholder="Backstage"
              value={name}
              onChange={({ target: { value } }) => {
                onChange({
                  ...project,
                  name: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              label={"Customer"}
              value={customer}
              isOptionEqualToValue={(option: Customer, value: Customer) =>
                option.id === value.id
              }
              getOptionLabel={(option: Customer) => option.name}
              onChange={(value: Customer) => {
                onChange({
                  ...project,
                  customer: value,
                });
              }}
              options={customers}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="Start date"
              value={[startDate]}
              onChange={(e: Array<string>) => {
                onChange({
                  ...project,
                  startDate: e[0],
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="End date"
              value={[endDate]}
              onChange={(e: Array<string>) => {
                onChange({
                  ...project,
                  endDate: e[0],
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Box display="flex" alignItems="center" lineHeight={1}>
              <Typography variant="caption" fontWeight="regular">
                Billable
              </Typography>
              <Box ml={1}>
                <Switch
                  checked={billable}
                  onChange={() => {
                    onChange({ ...project, billable: !billable });
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              label={"Slack channel"}
              value={channels.find((channel) => channel.id === slackChannel)}
              getOptionLabel={(option: Customer) => option.name}
              onChange={(value: any) => {
                onChange({
                  ...project,
                  slackChannel: value.id,
                });
              }}
              options={channels}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Logo public url"
              placeholder="https://logo-link-outside-of-backstage.com"
              value={logoUrl}
              onChange={({ target: { value } }) => {
                onChange({
                  ...project,
                  logoUrl: value,
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
            pt={2}
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
