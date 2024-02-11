import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { User } from "@/app/_domain/interfaces/User";
import defaultUser from "@/assets/images/icons/users/default.jpg";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";

type Props = {
  user?: User;
};

function Header({ user }: Props): JSX.Element {
  let name = "New user";
  if (user) {
    name = `${user?.firstName} ${user?.lastName}`;
  }

  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={user?.imageUrl || defaultUser.src}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                {name}
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                {user?.profession.name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
