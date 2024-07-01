import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useHoursConsumedGraphController from "./presenters/controllers/useHoursConsumedGraphController";
import Loading from "@/components/Loading";
import { Grid } from "@mui/material";
import PieChart from "@/components/Charts/PieChart";

type Props = {
  statementOfWork: StatementOfWork;
};

const HoursConsumedGraph = ({ statementOfWork }: Props) => {
  const { consumedHours, contractHours, isLoading } =
    useHoursConsumedGraphController({
      statementOfWork,
    });

  if (isLoading) {
    return <Loading />;
  }

  const consumedHoursPercentage = (consumedHours / contractHours) * 100;

  const contractHoursPercentage = 100 - consumedHoursPercentage;

  const pieChartData = {
    labels: [
      `Consumed hours: ${consumedHours}`,
      `Available hours: ${contractHours - consumedHours}`,
      `Contract hours: ${contractHours}`,
    ],
    datasets: {
      label: "Projects",
      backgroundColors: ["success", "error", "info"],
      data: [consumedHoursPercentage, contractHoursPercentage, 0],
    },
  };

  return (
    <PieChart
      icon={{ color: "success", component: "donut_small" }}
      title="Hours consumed"
      chart={pieChartData}
    />
  );
};

export default HoursConsumedGraph;
