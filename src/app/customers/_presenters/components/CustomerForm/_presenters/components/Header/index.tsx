import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Typography from "@/components/Typography";

type Props = {
  customer?: Customer;
};

function Header({ customer }: Props): JSX.Element {
  const name = customer?.name;

  return (
    <Card id="profile">
      <Box p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={`https://picsum.photos/seed/${name}/200/300`}
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;
