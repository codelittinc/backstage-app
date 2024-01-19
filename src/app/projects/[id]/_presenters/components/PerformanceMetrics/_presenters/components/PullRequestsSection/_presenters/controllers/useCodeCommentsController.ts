import { useQuery } from "@tanstack/react-query";

import {
  CODE_COMMENTS_KEY,
  getCodeComments,
} from "../data/services/codeComments";

const useCodeCommentsController = (
  project: Project,
  startDateFilter: string,
  endDateFilter: string
) => {
  const { data, isLoading } = useQuery({
    queryKey: [CODE_COMMENTS_KEY, startDateFilter, endDateFilter, project.id],
    queryFn: () =>
      getCodeComments({
        projectId: project.id,
        startDate: startDateFilter,
        endDate: endDateFilter,
      }),
  });

  return {
    codeComments: data,
    isLoading: isLoading,
  };
};

export default useCodeCommentsController;
