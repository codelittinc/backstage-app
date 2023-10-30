import { useMemo, ReactNode } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import { LinearScale } from "chart.js/auto";
import Card from "@mui/material/Card";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import configs from "./configs";

Chart.register(LinearScale);
// Declaring props types for ReportsLineChart
interface Props {
  [key: string]: any;
  chart: {
    datasets: {
      data: number[];
      label: string;
    };
    labels: string[];
  };
  color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark";
  description?: string | ReactNode;
  title: string;
}

function ReportsLineChart({
  color = "dark",
  title,
  description,
  chart,
}: Props): JSX.Element {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card sx={{ height: "100%" }}>
      <Box padding="1rem">
        {useMemo(
          () => (
            <Box
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="12.5rem"
            >
              <Line data={data} options={options} />
            </Box>
          ),
          [color, data, options]
        )}
        <Box pt={3} pb={1} px={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography
            component="div"
            variant="button"
            color="text"
            fontWeight="light"
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default ReportsLineChart;
