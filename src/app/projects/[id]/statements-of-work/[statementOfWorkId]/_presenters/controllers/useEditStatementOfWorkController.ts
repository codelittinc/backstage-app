import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { useAppStore } from "@/app/_presenters/data/store/store";
import {
  deleteStatementOfWork,
  getStatementOfWork,
  updateStatementOfWork,
} from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import routes from "@/routes";

const useNewStatementsOfWorkController = (
  statementOfWorkId: number | string,
  projectId: number | string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: updateStatementOfWork,
    onSuccess: () => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.StatementsOfWork, statementOfWorkId],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStatementOfWork,
    onSuccess: () => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.StatementsOfWork, projectId],
      });
    },
    onMutate: () => {
      router.push(routes.projectPath(projectId, 1));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.StatementsOfWork, statementOfWorkId],
    queryFn: () => getStatementOfWork(statementOfWorkId, projectId!),
    enabled: !!(projectId && statementOfWorkId),
  });

  return {
    onSave: (statementOfWork: StatementOfWork) => {
      updateMutation.mutate({ projectId, statementOfWork });
    },
    onDelete: (statementOfWork: StatementOfWork) => {
      deleteMutation.mutate({ statementOfWork });
    },
    statementOfWork: data,
    isLoading: isLoading,
  };
};

export default useNewStatementsOfWorkController;
