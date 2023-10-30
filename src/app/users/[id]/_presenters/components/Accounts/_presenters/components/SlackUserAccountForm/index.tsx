import { Grid } from "@mui/material";

import { ServiceIdentifier } from "@/app/_domain/interfaces/ServiceIdentifier";
import logoSlack from "@/assets/images/small-logos/logo-slack.svg";
import Autocomplete from "@/components/Autocomplete";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";

import useSlackUserAccountFormController from "./_presenters/controllers/useSlackUserAccountFormController";


interface Props {
  onChange: (serviceIdentifier: ServiceIdentifier) => void;
  serviceIdentifier: ServiceIdentifier;
}

function SlackUserAccountForm({
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
          <Avatar src={logoSlack.src} alt="Slack logo" variant="rounded" />
          <Box ml={2}>
            <Typography variant="h5" fontWeight="medium">
              Slack
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box ml={2} pl={6} lineHeight={1}>
        <Box pb={2} lineHeight={1}>
          <Grid pt={2} container spacing={3}>
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
              <Autocomplete
                label={"User"}
                value={serviceIdentifier.identifier}
                onChange={(value) => {
                  onChange({
                    ...serviceIdentifier,
                    identifier: value,
                  });
                }}
                options={slackUsers}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default SlackUserAccountForm;
