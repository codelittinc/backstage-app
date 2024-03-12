import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { useAppStore } from "@/app/_presenters/data/store/store";
import {
  deleteProject,
  getProject,
  updateProject,
} from "@/app/projects/_presenters/data/services/projects";
import routes from "@/routes";

const useUpdateProjectController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (result: Project) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Projects, result.id],
      });

      router.push(routes.projectPath(result.slug!));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Projects],
      });
      showSaveSuccessAlert();
    },
    onMutate: (project: Project) => {
      router.push(routes.projectsPath);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Projects, projectId],
    queryFn: () => getProject(projectId),
    refetchInterval: false,
  });

  return {
    onSave: (project: Project) => {
      mutation.mutate(project);
    },
    onDelete: (project: Project) => {
      deleteMutation.mutate(project);
    },
    project: data,
    isLoading: isLoading || !data,
  };
};

export default useUpdateProjectController;
