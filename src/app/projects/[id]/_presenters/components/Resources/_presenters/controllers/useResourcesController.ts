import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { getAssignments } from "@/app/_presenters/data/assignments";
import { getRequirements } from "@/app/_presenters/data/requirements";

const useResourcesController = (
  statementOfWork: StatementOfWork,
  startDate: string,
  endDate: string
) => {
  const { id } = statementOfWork;
  const projectId = id ? undefined : statementOfWork.projectId;

  const { data: requirements, isLoading: isLoadingRequirements } = useQuery({
    queryKey: [tanstackKeys.Requirements, startDate, endDate, id, projectId],
    queryFn: () =>
      getRequirements({
        projectId: projectId,
        startDate: startDate,
        endDate: endDate,
        statementOfWorkId: id,
      }),
    enabled: !!id || !!projectId,
  });

  const { data: assignments, isLoading: isLoadingAssignmnents } = useQuery({
    queryKey: [tanstackKeys.Assignments, startDate, endDate, id, projectId],
    queryFn: () =>
      getAssignments({
        projectId,
        startDate: startDate,
        endDate: endDate,
        statementOfWorkId: id,
      }),
    enabled: !!id || !!projectId,
  });

  return {
    requirements: requirements || [],
    assignments: assignments || [],
    isLoading: isLoadingRequirements || isLoadingAssignmnents,
  };
};

export default useResourcesController;
