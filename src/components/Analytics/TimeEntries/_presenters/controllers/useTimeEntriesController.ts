import { useQuery } from "@tanstack/react-query";

import { getStatementOfWorks } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";

import { getTimeEntriesAnalytics } from "../data/services/timeEntriesAnalytics";

const useTimeEntriesController = (project: Project, startDate, endDate) => {
  const { data: statementsOfWork } = useQuery({
    queryKey: ["statements_of_work", project.id],
    queryFn: () => getStatementOfWorks(project.id!),
    enabled: !!project.id,
  });

  const statementOfWorkId = statementsOfWork?.[0]?.id;

  const { data, isLoading } = useQuery({
    queryKey: [
      "analytics",
      "time_entries",
      statementOfWorkId,
      startDate,
      endDate,
    ],
    queryFn: () =>
      getTimeEntriesAnalytics(statementOfWorkId, startDate, endDate),
    enabled: !!statementOfWorkId,
  });

  return {
    timeEntries: data,
    isLoading,
  };
};

export default useTimeEntriesController;
