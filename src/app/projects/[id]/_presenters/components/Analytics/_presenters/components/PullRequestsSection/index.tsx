import Typography from "@/components/Typography";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import AllPullRequestsChart from "./_presenters/components/PullRequestsChart";
import PullRequestsByUserChart from "./_presenters/components/PullRequestsByUserChart";
import PullRequestReviewsByUserChart from "./_presenters/components/PullRequestReviewsByUserChart";

interface Props {
  project: Project;
  startDateFilter?: string | undefined;
  endDateFilter?: string | undefined;
  interval: string;
}

export const PullRequestsSection = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  return (
    <>
      <Box mb={5} mt={3}>
        <Typography variant="h3">Pull requests</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <AllPullRequestsChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item sm={6}>
          <PullRequestsByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
      </Grid>
      <Box mb={5} mt={3}>
        <Typography variant="h3">Pull request reviews</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <PullRequestReviewsByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
      </Grid>
    </>
  );
};
