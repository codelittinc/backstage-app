import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Avatar from "@/components/Avatar";
import { useGetCurrentUser } from "@/api/users";
import { Repository } from "@/api/repositories";
import Button from "@/components/Button";

function Header({
  repository,
}: {
  repository: Repository;
  onChangeActive: Function;
  onSave: Function;
}): JSX.Element {
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
                {sourceControlType.charAt(0).toUpperCase() +
                  sourceControlType.slice(1)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default Header;