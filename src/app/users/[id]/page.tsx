"use client";
import Grid from "@mui/material/Grid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import FormLayout from "@/components/LayoutContainers/FormLayout";
import Loading from "@/components/Loading";

import Accounts from "./_presenters/components/Accounts";
import BasicInfo from "./_presenters/components/BasicInfo";
import Header from "./_presenters/components/Header";
import useUserFormController from "./_presenters/controllers/useUserFormController";
import { User } from "@/app/_domain/interfaces/User";

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

    const mixedUser = {
      ...defaultUserValues,
      ...user,
      profession: user?.profession || professions?.[0] || {},
    };
    setEditUser(mixedUser as User);
  }, [user, professions]);

  if (isLoading || !editUser?.id || (professions && professions.length == 0)) {
    return <Loading />;
  }

  return (
    <FormLayout>
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
