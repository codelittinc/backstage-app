import { Grid } from "@mui/material";
import Box from "@/components/Box";
import AllPullRequestsChart from "./_presenters/components/AllPullRequestsChart";
import PullRequestsByUserChart from "./_presenters/components/PullRequestsByUserChart";

const Analytics = ({ project }: { project: Project }) => {
  return (
    <Box pt={5}>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <AllPullRequestsChart project={project} />
        </Grid>
        <Grid item sm={6}>
          <PullRequestsByUserChart project={project} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Analytics;
