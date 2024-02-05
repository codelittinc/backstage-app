import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Box from "@/components/Box";
import Form from "@/components/Form";
import TextInputController from "@/components/Form/FieldControllers/TextInputController";
import Typography from "@/components/Typography";

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
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Form
        model={customer}
        onSave={onSave}
        defaultModelValues={defaultCustomer}
        renderFields={(control) => (
          <>
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
          </>
        )}
      />
    </Card>
  );
}

export default BasicInfo;
