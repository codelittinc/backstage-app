import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import {
  getRequirement,
  updateRequirement,
} from "@/app/_presenters/data/requirements";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getStatementOfWork } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";

const useNewStatementsOfWorkController = (
  requirementId: string,
  statementOfWorkId: string,
  projectId: string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateRequirement,
    onSuccess: () => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Requirements, requirementId],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Requirements, requirementId],
    queryFn: () => getRequirement(requirementId),
  });

  const { data: statementOfWork, isLoading: isLoadingStatementOfWork } =
    useQuery({
      queryKey: [tanstackKeys.StatementsOfWork, statementOfWorkId],
      queryFn: () => getStatementOfWork(statementOfWorkId, projectId),
    });

  return {
    onSave: (requirement: Requirement) => {
      updateMutation.mutate(requirement);
    },
    requirement: data,
    isLoading: isLoading || isLoadingStatementOfWork,
    statementOfWork: statementOfWork,
  };
};

export default useNewStatementsOfWorkController;
