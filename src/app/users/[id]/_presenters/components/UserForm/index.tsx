"use client";
import Grid from "@mui/material/Grid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import FormLayout from "@/components/LayoutContainers/FormLayout";
import Loading from "@/components/Loading";

import { User } from "@/app/_domain/interfaces/User";
import useUserFormController from "./_presenters/controllers/useUserFormController";
import Header from "./_presenters/Header";
import BasicInfo from "./_presenters/BasicInfo";
import Accounts from "./_presenters/Accounts";

function UserForm(): JSX.Element {
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

  if (isLoading || !editUser?.id) {
    return <Loading />;
  }

  return (
    <Grid xs={6}>
      <Grid item xs={12}>
        <Header user={editUser} onSave={onSave} />
      </Grid>
      <Grid item xs={12} mt={3}>
        <BasicInfo onSave={onSave} user={editUser} onChange={setEditUser} />
      </Grid>
      <Grid item xs={12} mt={3}>
        <Accounts onSave={onSave} user={editUser} onChange={setEditUser} />
      </Grid>
    </Grid>
  );
}

export default UserForm;
