import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { DefaultValues, useForm } from "react-hook-form";

import { mergeObjects } from "@/app/_presenters/utils/objects";
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
  const defaultValues = mergeObjects(
    defaultCustomer,
    customer || {}
  ) as DefaultValues<Customer>;

  const { handleSubmit, control } = useForm<Customer>({
    defaultValues,
  });

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Form onSave={() => handleSubmit(onSave)()}>
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
      </Form>
    </Card>
  );
}

export default BasicInfo;
