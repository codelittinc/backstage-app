import { useMemo, ReactNode } from "react";
import { Line } from "react-chartjs-2";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import configs from "./configs";
import colors from "@/assets/theme/base/colors";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Declaring props types for DefaultLineChart
interface Props {
  [key: string]: any;
  chart: {
    datasets: {
      color:
        | "primary"
        | "secondary"
        | "info"
        | "success"
        | "warning"
        | "error"
        | "light"
        | "dark";
      data: number[];
      label: string;
    }[];
    labels: string[];
  };
  description?: string | ReactNode;
  height?: string | number;
  icon?: {
    color?:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "light"
      | "dark";
    component: ReactNode;
  };
  title?: string;
}

function DefaultLineChart({
  icon = { color: "info", component: "" },
  title,
  description,
  height = "19.125rem",
  chart,
}: Props): JSX.Element {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: "transparent",
        fill: true,
        pointBackgroundColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        borderColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        maxBarThickness: 6,
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <Box py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <Box display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <Box
              width="4rem"
              height="4rem"
              bgColor={icon.color || "info"}
              variant="gradient"
              coloredShadow={icon.color || "info"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </Box>
          )}
          <Box mt={icon.component ? -2 : 0}>
            {title && <Typography variant="h6">{title}</Typography>}
            <Box mb={2}>
              <Typography component="div" variant="button" color="text">
                {description}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
      {useMemo(
        () => (
          <Box height={height}>
            <Line data={data} options={options} />
          </Box>
        ),
        [height, data, options]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

export default DefaultLineChart;
