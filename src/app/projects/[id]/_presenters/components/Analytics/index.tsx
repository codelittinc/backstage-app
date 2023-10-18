import { Grid } from "@mui/material";
import Box from "@/components/Box";
import AllPullRequestsChart from "./_presenters/components/AllPullRequestsChart";
import PullRequestsByUserChart from "./_presenters/components/PullRequestsByUserChart";
import IssuesChart from "./_presenters/components/IssuesChart ";
import Typography from "@/components/Typography";

const Analytics = ({ project }: { project: Project }) => {
  return (
    <Box>
      <Box>
        <Typography variant="h3">Issues</Typography>
      </Box>
      <Box mt={5}>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <IssuesChart project={project} />
          </Grid>
        </Grid>
      </Box>
      <Box mb={5} mt={3}>
        <Typography variant="h3">Pull requests</Typography>
      </Box>
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
