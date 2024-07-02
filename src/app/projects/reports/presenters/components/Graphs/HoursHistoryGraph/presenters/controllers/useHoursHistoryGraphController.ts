import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { getTimeEntriesAnalytics } from "@/components/Analytics/TimeEntries/_presenters/data/services/timeEntriesAnalytics";
import { useEffect, useState } from "react";

type Props = {
  statementOfWork: StatementOfWork;
};

type Dataset = {
  label: string;
  data: number[];
};

type DataItem = {
  datasets: Dataset[];
};

async function getHoursForLabel(
  data: DataItem,
  label: string
): Promise<number> {
  const dataset = data.datasets.find((dataset) => dataset.label === label);
  return dataset?.data.reduce((acc, current) => acc + current, 0) || 0;
}

function getFirstAndLastDays(
  startDate: string,
  endDate: string
): { firstDay: string; lastDay: string }[] {
  const result: { firstDay: string; lastDay: string }[] = [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  let current = new Date(start.getFullYear(), start.getMonth(), 1);

  while (current <= end) {
    const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
    const lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);

    result.push({
      firstDay: firstDay.toISOString().split("T")[0],
      lastDay: lastDay.toISOString().split("T")[0],
    });

    current.setMonth(current.getMonth() + 1);
  }

  return result;
}

const useHoursHistoryGraphController = ({ statementOfWork }: Props) => {
  const { startDate, endDate, projectId, id } = statementOfWork;
  const months = getFirstAndLastDays(startDate, endDate);
  const [info, setInfo] = useState<any>();

  useEffect(() => {
    const promises = months.map(({ firstDay, lastDay }) =>
      getTimeEntriesAnalytics(firstDay, lastDay, projectId, id)
    );

    Promise.all(promises).then(async (data) => {
      const monthlyData = await Promise.all(
        data.map(async (dataItem, index) => {
          const workedHours = await getHoursForLabel(dataItem, "Worked");
          const overDeliveredHours = await getHoursForLabel(
            dataItem,
            "Over delivered"
          );

          return {
            month: months[index].firstDay.substring(0, 7), // Format as "YYYY-MM"
            workedHours: workedHours + overDeliveredHours,
          };
        })
      );
      setInfo(monthlyData.filter((item) => item.workedHours > 0));
    });
  }, [id, startDate, endDate]);

  return {
    data: info,
    isLoading: !info,
  };
};

export default useHoursHistoryGraphController;
