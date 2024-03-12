import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { getAssignments } from "@/app/_presenters/data/assignments";
import { getRequirements } from "@/app/_presenters/data/requirements";

const useResourcesController = (
  startDate: string,
  endDate: string,
  statementOfWork?: StatementOfWork
) => {
  const statementOfWorkId = statementOfWork?.id;

  const { data: requirements, isLoading: isLoadingRequirements } = useQuery({
    queryKey: [
      tanstackKeys.Requirements,
      startDate,
      endDate,
      statementOfWorkId,
    ],
    queryFn: () =>
      getRequirements({
        startDate: startDate,
        endDate: endDate,
        statementOfWorkId: statementOfWorkId,
      }),
    enabled: !!statementOfWorkId && !!startDate && !!endDate,
  });

  const { data: assignments, isLoading: isLoadingAssignmnents } = useQuery({
    queryKey: [tanstackKeys.Assignments, startDate, endDate, statementOfWorkId],
    queryFn: () =>
      getAssignments({
        startDate: startDate,
        endDate: endDate,
        statementOfWorkIds: [statementOfWorkId],
      }),
    enabled: !!statementOfWorkId && !!startDate && !!endDate,
  });

  return {
    requirements: requirements || [],
    assignments: assignments || [],
    isLoading: isLoadingRequirements || isLoadingAssignmnents,
  };
};

export default useResourcesController;
