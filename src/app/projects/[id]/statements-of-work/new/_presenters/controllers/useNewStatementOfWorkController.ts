import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppStore } from "@/app/_presenters/data/store/store";
import { createStatementOfWork } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";

const useNewStatementsOfWorkController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: createStatementOfWork,
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

  return {
    onSave: (statementOfWork: StatementOfWork) => {
      updateMutation.mutate({ projectId, statementOfWork });
    },
  };
};

export default useNewStatementsOfWorkController;
