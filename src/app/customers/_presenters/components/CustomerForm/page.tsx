"use client";
import Grid from "@mui/material/Grid";
import { useState } from "react";

import FormLayout from "@/components/LayoutContainers/FormLayout";

import BasicInfo from "./_presenters/components/BasicInfo";
import Header from "./_presenters/components/Header";

interface Props {
  customer: Customer;
  onSave: (customer: Customer) => void;
}

function CustomerForm({ customer, onSave }: Props): JSX.Element {
  const [currentCustomer, updateCurrentCustomer] = useState(customer);

  return (
    <FormLayout>
      <Grid item xs={12}>
        <Header customer={customer} />
      </Grid>
      <Grid item xs={12}>
        <BasicInfo
          customer={currentCustomer}
          onChange={updateCurrentCustomer}
          onSave={() => {
            onSave(currentCustomer);
          }}
        />
      </Grid>
    </FormLayout>
  );
}

export default CustomerForm;
