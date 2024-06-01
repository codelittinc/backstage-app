import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import {
  deleteRequirement,
  getRequirement,
  updateRequirement,
} from "@/app/_presenters/data/requirements";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getStatementOfWork } from "@/app/projects/_presenters/components/ProjectForm/_presenters/components/StatementsOfWork/_presenters/data/services/statementsOfWork";
import { useRouter } from "next/navigation";
import routes from "@/routes";
import projectTabs from "@/app/projects/_domain/_enums/projectTabs";
import { useState } from "react";

const useEditRequirementController = (
  requirementId: string,
  statementOfWorkId: string,
  projectId: string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isDeleted, setIsDeleted] = useState(false);

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
    queryFn: () => {
      return getRequirement(requirementId);
    },
    enabled: !isDeleted,
  });

  const { data: statementOfWork, isLoading: isLoadingStatementOfWork } =
    useQuery({
      queryKey: [tanstackKeys.StatementsOfWork, statementOfWorkId],
      queryFn: () => getStatementOfWork(statementOfWorkId, projectId),
    });

  const deleteMutation = useMutation({
    mutationFn: deleteRequirement,
    onSuccess: async () => {
      router.push(
        routes.projectPath(statementOfWork!.projectId, projectTabs.resources)
      );
      showSaveSuccessAlert();
      setIsDeleted(true);
    },
  });

  return {
    onSave: updateMutation.mutate,
    requirement: data,
    isLoading: isLoading || isLoadingStatementOfWork,
    statementOfWork: statementOfWork,
    onDelete: (requirement: Requirement) => {
      deleteMutation.mutate(requirement);
    },
  };
};

export default useEditRequirementController;
