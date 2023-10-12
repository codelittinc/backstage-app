"use client";
import Grid from "@mui/material/Grid";
import Header from "./_presenters/components/Header";
import BasicInfo from "./_presenters/components/BasicInfo";
import Accounts from "./_presenters/components/Accounts";
import FormLayout from "@/components/LayoutContainers/FormLayout";
import { useParams } from "next/navigation";
import useUserFormController from "./_presenters/controllers/useUserFormController";
import { useEffect, useState } from "react";
import User from "@/app/_domain/interfaces/User";
import Loading from "@/components/Loading";

const sidenavItems = [
  { icon: "person", label: "profile", href: "profile" },
  { icon: "receipt_long", label: "basic info", href: "basic-info" },
  { icon: "badge", label: "accounts", href: "accounts" },
];

function Settings(): JSX.Element {
  const { id } = useParams();
  const { user, professions, isLoading, onSave } = useUserFormController(
    id as string
  );

  const [editUser, setEditUser] = useState(user as User);

  useEffect(() => {
    const defaultUserValues = {
      profession: professions ? professions![0] : undefined,
      seniority: "Senior",
      contractType: "Salary",
    };

    setEditUser({
      ...defaultUserValues,
      ...user,
    } as User);
  }, [user, professions]);

  if (isLoading || !editUser?.id) {
    return <Loading />;
  }

  return (
    <FormLayout sidebarItems={sidenavItems}>
      <Grid item xs={12}>
        <Header user={editUser} onSave={onSave} />
      </Grid>
      <Grid item xs={12}>
        <BasicInfo onSave={onSave} user={editUser} onChange={setEditUser} />
      </Grid>
      <Grid item xs={12}>
        <Accounts onSave={onSave} user={editUser} onChange={setEditUser} />
      </Grid>
    </FormLayout>
  );
}

export default Settings;
