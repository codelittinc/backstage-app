import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

import User from "@/app/_domain/interfaces/User";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import ProtectedComponent from "@/components/ProtectedComponent";
import Typography from "@/components/Typography";
import { abilities, targets } from "@/permissions";

interface Props {
  onSave: (user: User) => void;
  user: User;
}

function Header({ user, onSave }: Props): JSX.Element {
  const { active } = user!;

  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={user.imageUrl}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                {user?.profession.name}
              </Typography>
            </Box>
          </Grid>
          <ProtectedComponent target={targets.user} ability={abilities.change}>
            {user.id && (
              <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
                <Box
                  display="flex"
                  justifyContent={{ md: "flex-end" }}
                  alignItems="center"
                  lineHeight={1}
                >
                  <Typography variant="caption" fontWeight="regular">
                    Active
                  </Typography>
                  <Box ml={1}>
                    <Switch
                      checked={active}
                      onChange={() => {
                        onSave({ ...user, active: !active });
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            )}
          </ProtectedComponent>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
