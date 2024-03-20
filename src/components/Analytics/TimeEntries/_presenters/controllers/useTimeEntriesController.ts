import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";

import { getTimeEntriesAnalytics } from "../data/services/timeEntriesAnalytics";

const useTimeEntriesController = (
  startDate: string,
  endDate: string,
  project?: Project,
  statementOfWork?: StatementOfWork
) => {
  const projectId = statementOfWork?.id ? undefined : project?.id;
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.analyics,
      tanstackKeys.TimeEntries,
      startDate,
      endDate,
      projectId,
      statementOfWork?.id,
    ],
    queryFn: () =>
      getTimeEntriesAnalytics(
        startDate,
        endDate,
        projectId,
        statementOfWork?.id
      ),
  });

  const { data: statementsOfWork, isLoading: isLoadingStatementsOfWork } =
    useQuery({
      queryKey: [tanstackKeys.StatementsOfWork, project?.id],
      queryFn: () => getStatementOfWorks(project?.id, startDate, endDate),
    });

  return {
    timeEntries: data,
    statementsOfWork,
    isLoading: isLoading || isLoadingStatementsOfWork,
  };
};

export default useTimeEntriesController;
