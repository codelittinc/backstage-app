import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { createAssignment } from "@/app/_presenters/data/assignments";
import { getRequirement } from "@/app/_presenters/data/requirements";
import { useAppStore } from "@/app/_presenters/data/store/store";
import routes from "@/routes";
import projectTabs from "@/app/projects/_domain/_enums/projectTabs";

const useAssignmentController = (
  requirementId: string,
  statementOfWorkId: string,
  projectId: string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: createAssignment,
    onSuccess: (result: Assignment) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Assignments, result.id],
      });

      router.push(routes.projectPath(projectId, projectTabs.resources));
    },
  });

  const { data: requirement, isLoading } = useQuery({
    queryKey: [tanstackKeys.Requirements, requirementId],
    queryFn: () => getRequirement(requirementId),
  });

  return {
    onSave: (assignment: Assignment) => {
      updateMutation.mutate(assignment);
    },
    requirement,
    isLoading,
  };
};

export default useAssignmentController;
