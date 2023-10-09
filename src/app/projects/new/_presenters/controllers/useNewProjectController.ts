import { useAppStore } from "@/app/_presenters/data/store/store";
import { PROJETS_KEY } from "@/app/projects/_domain/constants";
import { createProject } from "@/app/projects/_presenters/data/services/projects";
import routes from "@/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useProjectController = () => {
  const router = useRouter();
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: (result: Project) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [PROJETS_KEY, result.id],
      });

      router.push(routes.projectPath(result.id!));
    },
    onError: (err: any) => showSaveErrorAlert(err),
  });

  return {
    onSave: (project: Project) => {
      mutation.mutate(project);
    },
  };
};

export default useProjectController;
