import VerticalBarChart from "@/components/Charts/VerticalBarChart";
import { Grid } from "@mui/material";

const DynamicVerticalChart = (data: any) => {
  return (
    <Grid item xs={12}>
      <VerticalBarChart {...data} />
    </Grid>
  );
};

export default DynamicVerticalChart;
