import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { useAppStore } from "@/app/_presenters/data/store/store";
import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

import {
  deleteStatementOfWork,
  getStatementOfWorks,
} from "../data/services/statementsOfWork";

const useStatementsOfWorkController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const { projects, isLoading: isProjectsLoading } = useProjectsController();

  const deleteMutation = useMutation({
    mutationFn: deleteStatementOfWork,
    onSuccess: () => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.StatementsOfWork, projectId],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.StatementsOfWork, projectId],
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
