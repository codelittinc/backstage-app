import Box from "@/components/Box";
import Typography from "@/components/Typography";
import { Grid } from "@mui/material";
import Autocomplete from "@/components/Autocomplete";
import { ServiceIdentifier } from "@/app/_domain/interfaces/ServiceIdentifier";
import useSlackUserAccountFormController from "./_presenters/controllers/useSlackUserAccountFormController";
import Avatar from "@/components/Avatar";
import logoSlack from "@/assets/images/small-logos/logo-slack.svg";
import FormField from "@/components/FormField";

interface Props {
  onChange: (serviceIdentifier: ServiceIdentifier) => void;
  serviceIdentifier: ServiceIdentifier;
}

function AzureDevopsDeveloperUserAccountForm({
  serviceIdentifier,
  onChange,
}: Props): JSX.Element {
  const { slackUsers, customers } = useSlackUserAccountFormController(
    serviceIdentifier?.customer
  );

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={
              "https://seeklogo.com/images/A/azure-devops-logo-E7364216A7-seeklogo.com.png"
            }
            alt="Slack logo"
            variant="rounded"
          />
          <Box ml={2}>
            <Typography variant="h5" fontWeight="medium">
              Azure Devops Dev
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box ml={2} pl={6} pt={2} lineHeight={1}>
        <Typography variant="button" color="text">
          Set your Azure Devops ID. In case of doubt, ask your team leader how
          to fetch it.
        </Typography>
        <Box ml={2} pl={6} pt={2} lineHeight={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                label={"Customer"}
                value={serviceIdentifier.customer}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id == value.id}
                onChange={(value: Customer) => {
                  return {
                    ...serviceIdentifier,
                    customer: value,
                  };
                }}
                options={customers}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField
                label="Azure Devops ID"
                placeholder="Devops ID"
                value={serviceIdentifier.identifier}
                onChange={({ target: { value } }) => {
                  onChange({
                    ...serviceIdentifier,
                    identifier: value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AzureDevopsDeveloperUserAccountForm;
