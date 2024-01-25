import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { useAppStore } from "@/app/_presenters/data/store/store";
import {
  getStatementOfWork,
  updateStatementOfWork,
} from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";

const useNewStatementsOfWorkController = (
  statementOfWorkId: number | string,
  projectId: number | string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateStatementOfWork,
    onSuccess: (result: StatementOfWork) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: ["statement_of_work", statementOfWorkId],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["statements_of_work", statementOfWorkId],
    queryFn: () => getStatementOfWork(statementOfWorkId, projectId!),
    enabled: !!(projectId && statementOfWorkId),
  });

  return {
    onSave: (statementOfWork: StatementOfWork) => {
      updateMutation.mutate({ projectId, statementOfWork });
    },
    statementOfWork: data,
    isLoading: isLoading,
  };
};

export default useNewStatementsOfWorkController;
