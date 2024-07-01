import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { getProjectProgressAnalytics } from "@/app/projects/reports/presenters/data/services/projectProgressAnalytics";
import { getTimeEntriesAnalytics } from "@/components/Analytics/TimeEntries/_presenters/data/services/timeEntriesAnalytics";
import { useQuery } from "@tanstack/react-query";

type Props = {
  statementOfWork: StatementOfWork;
};

const useHoursConsumedGraphController = ({ statementOfWork }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.analyics,
      tanstackKeys.TimeEntries,
      statementOfWork.startDate,
      statementOfWork.endDate,
      statementOfWork.projectId,
      statementOfWork?.id,
    ],
    queryFn: () =>
      getProjectProgressAnalytics(
        statementOfWork.projectId,
        statementOfWork.id!
      ),
  });

  return {
    consumedHours: data?.consumedHours || 0,
    contractHours: data?.contractHours || 0,
    isLoading,
  };
};

export default useHoursConsumedGraphController;
