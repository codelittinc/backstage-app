import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Box from "@/components/Box";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

import { useForm } from "react-hook-form";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import { mergeObjects } from "@/app/_presenters/utils/objects";

import { abilities, targets } from "@/permissions";
import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";

const defaultCustomer = {
  name: "",
  ticketTrackingSystemToken: "",
  id: undefined,
  sourceControlToken:
    process.env.NEXT_PUBLIC_DEFAULT_CUSTOMER_SOURCE_CONTROL_TOKEN,
  notificationsToken:
    process.env.NEXT_PUBLIC_DEFAULT_CUSTOMER_NOTIFICATIONS_TOKEN,
  slug: "",
};

type Props = {
  customer?: Customer;
  onSave: (customer: Customer) => void;
};

function BasicInfo({ customer, onSave }: Props): JSX.Element {
  const defaultValues = mergeObjects(defaultCustomer, customer || {});
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextInputController
              label="Name"
              placeholder="Backstage"
              name={"name"}
              control={control}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextInputController
              label="Notifications token"
              name={"notificationsToken"}
              control={control}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputController
              label="Source control token"
              name={"sourceControlToken"}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputController
              label="Ticket traking system token"
              name={"ticketTrackingSystemToken"}
              control={control}
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
              onClick={() => handleSubmit(onSave)()}
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
