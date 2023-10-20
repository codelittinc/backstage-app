import { useQuery } from "@tanstack/react-query";
import { getPullRequests } from "../data/services/pullRequests";
import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";

const useRepositoriesController = (
  project: Project,
  startDateFilter: string,
  endDateFilter: string
) => {
  const { currentUser } = useCurrentUserController();

  const { data, isLoading } = useQuery({
    queryKey: ["pull_requests", startDateFilter, endDateFilter],
    queryFn: () =>
      getPullRequests({
        state: "merged",
        projectId: project.id,
        startDate: startDateFilter,
        endDate: endDateFilter,
      }),
    enabled: !!currentUser && !!project,
  });

  return {
    pullRequests: data,
    isLoading: isLoading,
  };
};

export default useRepositoriesController;
