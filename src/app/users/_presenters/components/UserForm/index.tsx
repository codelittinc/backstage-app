"use client";
import Grid from "@mui/material/Grid";

import { User } from "@/app/_domain/interfaces/User";

import Accounts from "./_presenters/Accounts";
import Assignments from "./_presenters/Assignments";
import BasicInfo from "./_presenters/BasicInfo";
import Header from "./_presenters/Header";
import Skills from "./_presenters/Skills";
import ProtectedComponent from "@/components/ProtectedComponent";
import { targets, abilities } from "@/permissions";

type Props = {
  onSave: (user: User) => void;
  user?: User;
};

function UserForm({ user, onSave }: Props): JSX.Element {
  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Header user={user} />
      </Grid>
      <Grid item xs={12} mt={3}>
        <BasicInfo onSave={onSave} user={user} />
      </Grid>

      {user?.id && typeof user.id === "number" && (
        <>
          <Grid item xs={12} mt={3}>
            <Skills userId={user.id} />
          </Grid>
          <Grid item xs={12} mt={3}>
            <Accounts onSave={onSave} user={user} />
          </Grid>
          <ProtectedComponent target={targets.users} ability={abilities.view}>
            <Grid item xs={12} mt={3}>
              <Assignments userId={user.id} />
            </Grid>
          </ProtectedComponent>
        </>
      )}
    </Grid>
  );
}

export default UserForm;
