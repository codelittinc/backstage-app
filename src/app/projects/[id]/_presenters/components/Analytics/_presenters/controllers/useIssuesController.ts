import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../data/services/issues"; // Adjusted the import
import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";

const useIssuesController = (project: Project) => {
  const { currentUser } = useCurrentUserController();

  const { data, isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: () => getIssues(project),
    enabled: !!currentUser && !!project,
  });

  return {
    issues: data,
    isLoading: isLoading,
  };
};

export default useIssuesController;
