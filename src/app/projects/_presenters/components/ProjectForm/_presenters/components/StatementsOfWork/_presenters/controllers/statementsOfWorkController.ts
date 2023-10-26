import { useAppStore } from "@/app/_presenters/data/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteStatementOfWork,
  getStatementOfWorks,
  updateStatementOfWork,
} from "../data/services/statementsOfWork";

const useStatementsOfWorkController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateStatementOfWork,
    onSuccess: (result: StatementOfWork) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: ["statement_of_work", result.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["statements_of_work", projectId],
      });
    },
  });

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
    onSave: (statementOfWork: StatementOfWork) => {
      updateMutation.mutate({ projectId, statementOfWork });
    },
    onDelete: (statementOfWork: StatementOfWork) => {
      deleteMutation.mutate({ projectId, statementOfWork });
    },
    statementsOfWork: data,
    isLoading: isLoading || !data,
  };
};

export default useStatementsOfWorkController;
