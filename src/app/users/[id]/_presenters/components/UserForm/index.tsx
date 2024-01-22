"use client";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import { User } from "@/app/_domain/interfaces/User";
import Loading from "@/components/Loading";

import Accounts from "./_presenters/Accounts";
import BasicInfo from "./_presenters/BasicInfo";
import useUserFormController from "./_presenters/controllers/useUserFormController";
import Header from "./_presenters/Header";

type Props = {
  user: User;
  onSave: (user: User) => void;
};

function UserForm({ user, onSave }: Props): JSX.Element {
  const { professions, isLoading } = useUserFormController();

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
    <Grid item xs={6}>
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
