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
  onSave: (user: User) => void;
  user: User;
};

function UserForm({ user, onSave }: Props): JSX.Element {
  const { professions, isLoading } = useUserFormController();

  const [editUser, setEditUser] = useState<User>();

  useEffect(() => {
    if (professions?.length) {
      const defaultUserValues = {
        seniority: "Senior",
        contractType: "Salary",
      };

      const mixedUser = {
        ...defaultUserValues,
        ...user,
        profession: user.profession?.id
          ? professions.find((p) => p.id === user.profession.id)
          : professions[0],
      };
      setEditUser(mixedUser as User);
    }
  }, [user, professions]);

  if (isLoading || !editUser) {
    return <Loading />;
  }

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Header user={editUser} onSave={onSave} />
      </Grid>
      <Grid item xs={12} mt={3}>
        <BasicInfo onSave={onSave} user={editUser} onChange={setEditUser} />
      </Grid>
      {user.id && (
        <Grid item xs={12} mt={3}>
          <Accounts onSave={onSave} user={editUser} onChange={setEditUser} />
        </Grid>
      )}
    </Grid>
  );
}

export default UserForm;
