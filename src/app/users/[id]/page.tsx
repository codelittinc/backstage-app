"use client";
import Grid from "@mui/material/Grid";
import Header from "./_presenters/components/Header";
import BasicInfo from "./_presenters/components/BasicInfo";
import Accounts from "./_presenters/components/Accounts";
import FormLayout from "@/components/LayoutContainers/FormLayout";

function Settings(): JSX.Element {
  const sidenavItems = [
    { icon: "person", label: "profile", href: "profile" },
    { icon: "receipt_long", label: "basic info", href: "basic-info" },
    { icon: "badge", label: "accounts", href: "accounts" },
  ];

  return (
    <FormLayout sidebarItems={sidenavItems}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <BasicInfo />
      </Grid>
      <Grid item xs={12}>
        <Accounts />
      </Grid>
    </FormLayout>
  );
}

export default Settings;
