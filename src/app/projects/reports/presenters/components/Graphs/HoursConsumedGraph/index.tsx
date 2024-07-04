import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useHoursConsumedGraphController from "./presenters/controllers/useHoursConsumedGraphController";
import Loading from "@/components/Loading";
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
      `Consumed: ${consumedHours}`,
      `Remaining: ${contractHours - consumedHours}`,
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
      title="Contract hours to date"
      chart={pieChartData}
      labelPosition="bottom"
    />
  );
};

export default HoursConsumedGraph;
