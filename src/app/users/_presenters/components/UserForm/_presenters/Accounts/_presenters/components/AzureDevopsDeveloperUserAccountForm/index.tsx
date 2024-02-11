import { Grid } from "@mui/material";

import Profession from "@/app/_domain/interfaces/Profession";
import { ServiceIdentifier } from "@/app/_domain/interfaces/ServiceIdentifier";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import Autocomplete from "@/components/Autocomplete";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import FormField from "@/components/FormField";
import Typography from "@/components/Typography";

interface Props {
  onChange: (serviceIdentifier: ServiceIdentifier) => void;
  profession: Profession;
  serviceIdentifier: ServiceIdentifier;
}

function AzureDevopsDeveloperUserAccountForm({
  serviceIdentifier,
  onChange,
  profession,
}: Props): JSX.Element {
  const { customers } = useCustomersController();

  if (profession.name != "Engineer") {
    return <></>;
  }

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
      <Box ml={2} pl={6} lineHeight={1}>
        <Box pb={2} lineHeight={1}>
          <Grid pt={2} container spacing={3}>
            <Grid item xs={12} sm={5}>
              <Autocomplete
                label={"Customer"}
                value={serviceIdentifier.customer}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id == value.id}
                onChange={(value: Customer) => {
                  onChange({
                    ...serviceIdentifier,
                    customer: value,
                  });
                }}
                options={customers}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
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
