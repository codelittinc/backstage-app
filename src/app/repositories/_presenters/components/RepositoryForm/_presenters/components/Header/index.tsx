import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";

function Header({ repository }: { repository: Repository }): JSX.Element {
  const { owner, name, sourceControlType } = repository;

  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={`https://picsum.photos/seed/${repository.slug}/200/300`}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                {owner}/{name}
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                {sourceControlType?.charAt(0)?.toUpperCase() +
                  sourceControlType?.slice(1)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
