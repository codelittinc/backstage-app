import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getAssignments } from "@/app/_presenters/data/assignments";

const useAssignmentsController = (
  startDateFilter: string,
  endDateFilter: string,
  statementOfWorkId: number,
  projectId?: number
) => {
  const customProjectId = statementOfWorkId ? undefined : projectId;
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.Assignments,
      startDateFilter,
      endDateFilter,
      customProjectId,
      statementOfWorkId,
    ],
    queryFn: () =>
      getAssignments({
        projectId: customProjectId,
        startDate: startDateFilter,
        endDate: endDateFilter,
        statementOfWorkIds: [statementOfWorkId],
      }),
  });

  return {
    assignments: data,
    isLoading: isLoading,
  };
};

export default useAssignmentsController;
