import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import VerticalBarChart from "@/components/Charts/VerticalBarChart";
import Loading from "@/components/Loading";

import useHoursHistoryGraphController from "./presenters/controllers/useHoursHistoryGraphController";


type Props = {
  statementOfWork: StatementOfWork;
};

const HoursHistoryGraph = ({ statementOfWork }: Props) => {
  const { data, isLoading } = useHoursHistoryGraphController({
    statementOfWork,
  });

  if (isLoading) {
    return <Loading />;
  }

  const barChartData = {
    labels: ["Worked hours"],
    datasets: (data || []).map((d: any) => ({
      label: d.month,
      color: "success",
      data: [d.workedHours],
    })),
  };

  return (
    <VerticalBarChart
      title="Consumed hours by month to date"
      chart={barChartData}
      valueType={"number"}
    />
  );
};

export default HoursHistoryGraph;
