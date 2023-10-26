import { useAppStore } from "@/app/_presenters/data/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteStatementOfWork,
  getStatementOfWorks,
} from "../data/services/statementsOfWork";
import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

const useStatementsOfWorkController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const { projects, isLoading: isProjectsLoading } = useProjectsController();

  const deleteMutation = useMutation({
    mutationFn: deleteStatementOfWork,
    onSuccess: () => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: ["statements_of_work", projectId],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["statements_of_work", projectId],
    queryFn: () => getStatementOfWorks(projectId!),
    enabled: !!projectId,
  });

  return {
    onDelete: (statementOfWork: StatementOfWork) => {
      deleteMutation.mutate({ projectId, statementOfWork });
    },
    statementsOfWork: data,
    projects: projects,
    isLoading: isLoading || !data || isProjectsLoading,
  };
};

export default useStatementsOfWorkController;
