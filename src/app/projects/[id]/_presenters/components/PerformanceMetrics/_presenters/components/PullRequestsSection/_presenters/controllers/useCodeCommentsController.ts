import { useQuery } from "@tanstack/react-query";

import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";

import { getCodeComments } from "../data/services/codeComments";

const useCodeCommentsController = (
  project: Project,
  startDateFilter: string,
  endDateFilter: string
) => {
  const { currentUser } = useCurrentUserController();

  const { data, isLoading } = useQuery({
    queryKey: ["code_comments", startDateFilter, endDateFilter],
    queryFn: () =>
      getCodeComments({
        projectId: project.id!,
        startDate: startDateFilter,
        endDate: endDateFilter,
      }),
    enabled: !!currentUser && !!project,
  });

  return {
    codeComments: data,
    isLoading: isLoading,
  };
};

export default useCodeCommentsController;
