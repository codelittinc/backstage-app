import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ReactNode, useMemo } from "react";
import { Bar } from "react-chartjs-2";

import colors from "@/assets/theme/base/colors";
import Box from "@/components/Box";
import Typography from "@/components/Typography";

import configs from "./configs";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

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
  sufix?: string;
  title?: string;
  valueType: "number" | "currency";
}

function VerticalBarChart({
  icon = { color: "info", component: "" },
  title = "",
  description,
  height = "19.125rem",
  chart,
  valueType = "currency",
  sufix = "",
  formatter,
}: Props): JSX.Element {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        fill: false,
        maxBarThickness: 35,
      }))
    : [];

  const { data, options } = configs(
    chart.labels || [],
    chartDatasets,
    valueType,
    sufix,
    formatter
  );

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
            <Bar data={data} options={options} />
          </Box>
        ),
        [data, height, options]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

export default VerticalBarChart;
