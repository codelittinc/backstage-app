import Card from "@mui/material/Card";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import logoSlack from "@/assets/images/small-logos/logo-slack.svg";
import User from "@/app/_domain/interfaces/User";
import { Grid } from "@mui/material";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import Loading from "@/components/Loading";
import Autocomplete from "@/components/Autocomplete";
import useSlackUsersController from "./_presenters/controllers/useSlackUsersController";
import { useEffect, useState } from "react";

interface Props {
  user: User;
  onSave: (user: User) => void;
  onChange: (user: User) => void;
}

//@TODO: allow to have multiple accounts
function Accounts({ user, onSave, onChange }: Props): JSX.Element {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const { servicesIdentifiers } = user;

  const { customers, isLoading } = useCustomersController();

  const { slackUsers, isLoading: isSlackUsersLoading } =
    useSlackUsersController(selectedCustomer);

  useEffect(() => {
    if (servicesIdentifiers.length > 0) {
      setSelectedCustomer(servicesIdentifiers[0].customer);
    }
  }, [servicesIdentifiers]);

  if (isLoading || isSlackUsersLoading) {
    return <Loading />;
  }

  const defaultValue = {
    serviceName: "slack",
    customer: customers.find(
      (customer: Customer) => customer.name == "Codelitt"
    ),
    identifier: "",
  };

  if (!servicesIdentifiers) {
    onChange({
      ...user,
      servicesIdentifiers: [defaultValue],
    });
  }

  const slackIdentifier = servicesIdentifiers[0];
  return (
    <Card id="accounts">
      <Box p={3} lineHeight={1}>
        <Box mb={1}>
          <Typography variant="h5">Accounts</Typography>
        </Box>
        <Typography variant="button" color="text">
          Here you can setup and manage your integration settings.
        </Typography>
      </Box>
      <Box pt={2} pb={3} px={3}>
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
        <Box ml={2} pl={6} pt={2} lineHeight={1}>
          <Typography variant="button" color="text">
            Select your Slack username and the customer you are using it for.
          </Typography>
          <Box ml={2} pl={6} pt={2} lineHeight={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  label={"Customer"}
                  value={slackIdentifier.customer}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id == value.id
                  }
                  onChange={(value: Customer) => {
                    onChange({
                      ...user,
                      servicesIdentifiers: [
                        {
                          ...slackIdentifier,
                          customer: value,
                        },
                      ],
                    });
                  }}
                  options={customers}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  label={"User"}
                  value={slackIdentifier.identifier}
                  onChange={(value) => {
                    onChange({
                      ...user,
                      servicesIdentifiers: [
                        {
                          ...slackIdentifier,
                          identifier: value,
                        },
                      ],
                    });
                  }}
                  options={slackUsers}
                />
              </Grid>
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
                    onClick={() => onSave(user)}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default Accounts;
