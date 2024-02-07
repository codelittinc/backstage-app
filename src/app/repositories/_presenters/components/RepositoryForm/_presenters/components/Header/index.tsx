import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";

type Props = {
  repository?: Repository;
};

function Header({ repository }: Props): JSX.Element {
  const name = repository?.name;
  const sourceControlType = repository?.sourceControlType;
  const slug = repository?.slug;
  const owner = repository?.owner;

  const nameDescription = repository ? `${owner}/${name}` : "owner/new-project";
  const ownerDescription = sourceControlType
    ? sourceControlType?.charAt(0)?.toUpperCase() + sourceControlType?.slice(1)
    : "Owner";

  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={`https://picsum.photos/seed/${slug}/200/300`}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                {nameDescription}
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                {ownerDescription}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
