"use client";
import Grid from "@mui/material/Grid";
import Header from "./_presenters/_components/Header";
import BasicInfo from "./_presenters/_components/BasicInfo";
import { useState } from "react";
import FormLayout from "@/components/LayoutContainers/FormLayout";

interface Props {
  customer: Customer;
  onSave: (customer: Customer) => void;
}

function CustomerForm({ customer, onSave }: Props): JSX.Element {
  const [currentCustomer, updateCurrentCustomer] = useState(customer);

  const sidenavItems = [
    { icon: "person", label: "profile", href: "profile" },
    { icon: "receipt_long", label: "basic info", href: "basic-info" },
  ];

  return (
    <FormLayout sidebarItems={sidenavItems}>
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
