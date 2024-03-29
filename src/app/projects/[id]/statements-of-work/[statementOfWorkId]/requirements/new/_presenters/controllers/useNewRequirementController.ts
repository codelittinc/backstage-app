import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { createRequirement } from "@/app/_presenters/data/requirements";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getStatementOfWork } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import routes from "@/routes";
import projectTabs from "@/app/projects/_domain/_enums/projectTabs";

const useRequirementController = (
  statementOfWorkId: string,
  projectId: string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: createRequirement,
    onSuccess: (result: Requirement) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Requirements, result.id],
      });

      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Requirements, projectId],
      });

      router.push(routes.projectPath(projectId, projectTabs.resources));
    },
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
    statementOfWork,
    isLoading: isLoadingStatementOfWork,
  };
};

export default useRequirementController;
