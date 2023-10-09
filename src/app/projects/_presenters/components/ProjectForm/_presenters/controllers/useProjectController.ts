import { useAppStore } from "@/app/_presenters/data/store/store";
import { PROJETS_KEY } from "@/app/projects/_domain/constants";
import {
  getProject,
  createProject,
} from "@/app/projects/_presenters/data/services/projects";
import routes from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useProjectController = (projectId: number | undefined) => {
  const router = useRouter();
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: (result) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [PROJETS_KEY, result.id],
      });

      router.push(routes.projectPath(result.id!));
    },
    onError: (err) => showSaveErrorAlert(err),
  });

  const { data, isLoading } = useQuery({
    queryKey: [PROJETS_KEY, projectId],
    queryFn: () => getProject(projectId),
  });

  return {
    onSave: (project: Project) => {
      mutation.mutate(project);
    },
    project: data,
    isLoading: isLoading || !data,
  };
};

export default useProjectController;
