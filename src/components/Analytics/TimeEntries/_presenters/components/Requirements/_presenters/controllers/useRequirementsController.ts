import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getRequirements } from "@/app/_presenters/data/requirements";

const useRequirementsController = (
  startDateFilter: string,
  endDateFilter: string,
  projectId?: number,
  statementOfWorkId?: number
) => {
  const customProjectId = statementOfWorkId ? undefined : projectId;
  const { data, isLoading } = useQuery({
    queryKey: [
      tanstackKeys.Requirements,
      startDateFilter,
      endDateFilter,
      customProjectId,
      statementOfWorkId,
    ],
    queryFn: () =>
      getRequirements({
        projectId: customProjectId,
        startDate: startDateFilter,
        endDate: endDateFilter,
        statementOfWorkId,
      }),
  });

  return {
    requirements: data,
    isLoading: isLoading,
  };
};

export default useRequirementsController;
