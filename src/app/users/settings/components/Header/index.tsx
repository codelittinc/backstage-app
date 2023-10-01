import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Avatar from "@/components/Avatar";
import currentUserController from "@/app/_presenters/_controllers/useCurrentUserController";

function Header(): JSX.Element {
  const [active, setActive] = useState<boolean>(true);
  const handleSetActive = () => setActive(!active);
  const { currentUser: user } = currentUserController();
  if (!user) {
    return <></>;
  }
  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={user.image}
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
                CEO / Co-Founder
              </Typography>
            </Box>
          </Grid>
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
                <Switch checked={active} onChange={handleSetActive} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
