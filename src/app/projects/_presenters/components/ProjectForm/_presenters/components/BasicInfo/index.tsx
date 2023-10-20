import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import Autocomplete from "@/components/Autocomplete";
import Loading from "@/components/Loading";
import DatePicker from "@/components/DatePicker";
import { Switch } from "@mui/material";
import useChannelsController from "@/app/repositories/_presenters/components/RepositoryForm/_presenters/components/BasicInfo/_presenters/controllers/useChannelsController";

function BasicInfo({
  project,
  onChange,
  onSave,
}: {
  project: Project;
  onChange: Function;
  onSave: Function;
}): JSX.Element {
  const {
    name,
    customer,
    startDate,
    endDate,
    billable,
    metadata,
    slackChannel,
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
          <Grid item xs={12} md={12}>
            <FormField
              label="Metadata"
              placeholder="{'object': 'value'}"
              value={(metadata || "").toString()}
              onChange={({ target: { value } }) => {
                onChange({
                  ...project,
                  metadata: value,
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
