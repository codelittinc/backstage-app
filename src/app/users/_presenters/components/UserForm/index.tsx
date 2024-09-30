'use client';
import Grid from '@mui/material/Grid';

import { User } from '@/app/_domain/interfaces/User';

import Accounts from './_presenters/Accounts';
import BasicInfo from './_presenters/BasicInfo';
import Header from './_presenters/Header';
import Skills from './_presenters/Skills';

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

      {user?.id && (
        <>
          <Grid item xs={12} mt={3}>
            <Skills userId={user.id} />
          </Grid>
          <Grid item xs={12} mt={3}>
            <Accounts onSave={onSave} user={user} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default UserForm;
