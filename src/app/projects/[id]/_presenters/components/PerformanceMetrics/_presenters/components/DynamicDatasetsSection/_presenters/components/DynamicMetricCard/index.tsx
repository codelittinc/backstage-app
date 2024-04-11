import MetricCard from "@/components/MetricCard";
import { Grid } from "@mui/material";

const DynamicMetricCard = (data: any) => {
  return (
    <Grid item xs={3}>
      <MetricCard {...data} />
    </Grid>
  );
};

export default DynamicMetricCard;
