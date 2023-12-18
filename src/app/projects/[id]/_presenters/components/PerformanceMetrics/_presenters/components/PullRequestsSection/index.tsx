import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import Typography from "@/components/Typography";

import PullRequestReviewsByUserChart from "./_presenters/components/PullRequestReviewsByUserChart";
import PullRequestsByUserChart from "./_presenters/components/PullRequestsByUserChart";
import AllPullRequestsChart from "./_presenters/components/PullRequestsChart";
import PullRequestsCloseDurationByUserChart from "./_presenters/components/PullRequestsCloseDurationByUserChart";

interface Props {
  endDateFilter?: string | undefined;
  interval: string;
  project: Project;
  startDateFilter?: string | undefined;
}

export const PullRequestsSection = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  return (
    <>
      <Box mt={3}>
        <Typography variant="h3">Pull requests</Typography>
      </Box>
      <Box mt={1}> </Box>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12} mt={3}>
          <AllPullRequestsChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item sm={6} xs={12} mt={3}>
          <PullRequestsByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item sm={6} xs={12} mt={3}>
          <PullRequestsCloseDurationByUserChart
            project={project}
            startDateFilter={startDateFilter}
            endDateFilter={endDateFilter}
            interval={interval}
          />
        </Grid>
        <Grid item sm={6} xs={12} mt={3}>
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
