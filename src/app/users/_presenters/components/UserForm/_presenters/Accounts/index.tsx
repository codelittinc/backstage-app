import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { useForm, useWatch } from "react-hook-form";

import { ServiceIdentifier } from "@/app/_domain/interfaces/ServiceIdentifier";
import { User } from "@/app/_domain/interfaces/User";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Typography from "@/components/Typography";

import AzureDevopsDeveloperUserAccountForm from "./_presenters/components/AzureDevopsDeveloperUserAccountForm";
import GithubUserAccountForm from "./_presenters/components/GithubUserAccountForm";
import SlackUserAccountForm from "./_presenters/components/SlackUserAccountForm";

interface Props {
  onSave: (user: User) => void;
  user: User;
}

const getIdentifier = (
  servicesIdentifiers: ServiceIdentifier[],
  customers: Customer[],
  serviceName: string
): ServiceIdentifier => {
  const defaultCustomer = customers.find(
    (customer: Customer) => customer.name == "Codelitt"
  );

  const slackIdentifierFound = servicesIdentifiers?.find(
    (serviceIdentifier: ServiceIdentifier) =>
      serviceIdentifier.serviceName == serviceName
  );

  const defaultSlackIdentifier = {
    id: `${serviceName}-${
      (slackIdentifierFound?.customer || defaultCustomer)?.id
    }`,
    serviceName: serviceName,
    customer: defaultCustomer!,
    identifier: "",
  };

  return {
    ...defaultSlackIdentifier,
    ...slackIdentifierFound,
  };
};

function Accounts({ user, onSave }: Props): JSX.Element {
  const { customers, isLoading } = useCustomersController();

  const { handleSubmit, control, setValue } = useForm<User>({
    defaultValues: user,
  });

  const servicesIdentifiers = useWatch({
    control,
    name: "servicesIdentifiers",
  });
  if (isLoading) {
    return <Loading />;
  }

  const slackIdentifier = getIdentifier(
    servicesIdentifiers,
    customers,
    "slack"
  );

  const githubIdentifier = getIdentifier(
    servicesIdentifiers,
    customers,
    "github"
  );

  const azureDevopsDevIdentifier = getIdentifier(
    servicesIdentifiers,
    customers,
    "azure-devops-dev"
  );

  const onChangeIdentifier = (serviceIdentifier: ServiceIdentifier) => {
    const serviceIdentifierExists = servicesIdentifiers.find(
      (currentServiceIdentifier: ServiceIdentifier) =>
        currentServiceIdentifier.id == serviceIdentifier.id
    );

    var newServiceIdentifiers = [];

    if (serviceIdentifierExists) {
      newServiceIdentifiers = servicesIdentifiers.map(
        (currentServiceIdentifier: ServiceIdentifier) => {
          if (currentServiceIdentifier.id == serviceIdentifier.id) {
            return serviceIdentifier;
          }

          return currentServiceIdentifier;
        }
      );
    } else {
      newServiceIdentifiers = [...servicesIdentifiers, serviceIdentifier];
    }

    setValue("servicesIdentifiers", newServiceIdentifiers);
  };

  const onSubmit = (data: User) => {
    const serviceIdentifiers = servicesIdentifiers?.map(
      (servicesIdentifiers: ServiceIdentifier) => {
        if (typeof servicesIdentifiers.id == "string") {
          return {
            ...servicesIdentifiers,
            id: undefined,
          };
        }

        return servicesIdentifiers;
      }
    );

    onSave({
      ...user,
      servicesIdentifiers: serviceIdentifiers,
    });
  };

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
        <SlackUserAccountForm
          onChange={onChangeIdentifier}
          serviceIdentifier={slackIdentifier}
        />
        <GithubUserAccountForm
          onChange={onChangeIdentifier}
          serviceIdentifier={githubIdentifier}
        />
        <AzureDevopsDeveloperUserAccountForm
          onChange={onChangeIdentifier}
          serviceIdentifier={azureDevopsDevIdentifier}
        />

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
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
}

export default Accounts;
