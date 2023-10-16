import { useQuery } from "@tanstack/react-query";
import { getPullRequests } from "../data/services/pullRequests";
import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";

const useRepositoriesController = (project: Project) => {
  const { currentUser } = useCurrentUserController();

  const { data, isLoading } = useQuery({
    queryKey: ["pull_requests"],
    queryFn: () =>
      getPullRequests({
        state: "merged",
        projectId: project.id,
        startDate: "2023-01-01",
        endDate: "2023-12-31",
      }),
    enabled: !!currentUser && !!project,
  });

  return {
    pullRequests: data,
    isLoading: isLoading,
  };
};

export default useRepositoriesController;
