import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import {
  deleteAssignment,
  getAssignment,
  updateAssignment,
} from "@/app/_presenters/data/assignments";
import { getRequirement } from "@/app/_presenters/data/requirements";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { useRouter } from "next/navigation";
import routes from "@/routes";
import projectTabs from "@/app/projects/_domain/_enums/projectTabs";
import { useState } from "react";
import { set } from "date-fns";

const useEditAssignmentController = (
  assignmentId: string,
  requirementId: string,
  projectId: string
) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);

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
    enabled: !isDeleted,
  });

  const { data: assignment, isLoading: isLoadingAssignment } = useQuery({
    queryKey: [tanstackKeys.Assignments, assignmentId],
    queryFn: () => getAssignment(assignmentId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAssignment,
    onSuccess: async () => {
      setIsDeleted(true);
      router.push(routes.projectPath(projectId, projectTabs.resources));
      showSaveSuccessAlert();
    },
  });

  return {
    onSave: (assignment: Assignment) => {
      updateMutation.mutate(assignment);
    },
    assignment: assignment,
    requirement: data,
    isLoading: isLoading || isLoadingAssignment,
    onDelete: (assignment: Assignment) => {
      deleteMutation.mutate(assignment);
    },
  };
};

export default useEditAssignmentController;
