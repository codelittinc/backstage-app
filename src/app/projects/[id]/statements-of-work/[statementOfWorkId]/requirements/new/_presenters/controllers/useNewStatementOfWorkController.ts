import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { createStatementOfWork } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import routes from "@/routes";

const useNewStatementsOfWorkController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

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

      router.push(routes.statementOfWorkPath(result.id as number, projectId));
    },
  });

  return {
    onSave: (statementOfWork: StatementOfWork) => {
      updateMutation.mutate({ projectId, statementOfWork });
    },
  };
};

export default useNewStatementsOfWorkController;
