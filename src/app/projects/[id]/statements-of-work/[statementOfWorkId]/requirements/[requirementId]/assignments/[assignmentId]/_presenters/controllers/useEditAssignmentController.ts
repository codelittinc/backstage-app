import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import {
  getAssignment,
  updateAssignment,
} from "@/app/_presenters/data/assignments";
import { getRequirement } from "@/app/_presenters/data/requirements";
import { useAppStore } from "@/app/_presenters/data/store/store";

const useEditAssignmentController = (
  assignmentId: string,
  requirementId: string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateAssignment,
    onSuccess: () => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Assignments, assignmentId],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Requirements, requirementId],
    queryFn: () => getRequirement(requirementId),
  });

  const { data: assignment, isLoading: isLoadingAssignment } = useQuery({
    queryKey: [tanstackKeys.Assignments, assignmentId],
    queryFn: () => getAssignment(assignmentId),
  });

  return {
    onSave: (assignment: Assignment) => {
      updateMutation.mutate(assignment);
    },
    assignment: assignment,
    requirement: data,
    isLoading: isLoading || isLoadingAssignment,
  };
};

export default useEditAssignmentController;
