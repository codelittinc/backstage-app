import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { ReactNode, useMemo } from "react";
import { Pie } from "react-chartjs-2";

import Box from "@/components/Box";
import Typography from "@/components/Typography";

import configs from "./configs";

ChartJS.register(ArcElement, LinearScale, Title, Tooltip, Legend);

interface Props {
  [key: string]: any;
  chart: {
    datasets: {
      backgroundColors: string[];
      data: number[];
      label: string;
    };
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
function PieChart({
  icon = { color: "info", component: "" },
  title = "",
  description = "",
  height = "19.125rem",
  chart,
}: Props): JSX.Element {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

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
            <Pie data={data} options={options} />
          </Box>
        ),
        [chart, height]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

export default PieChart;
