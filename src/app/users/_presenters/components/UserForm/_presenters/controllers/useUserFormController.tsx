import { useMutation, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { User } from "@/app/_domain/interfaces/User";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { updateUser } from "@/app/_presenters/data/users";

const useUserFormController = () => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (result) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Users, result.email],
      });
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Users, result.id],
      });
    },
  });

  const { professions, isLoading: isProfessionsLoading } =
    useProfessionsController();

  return {
    onSave: (user: User) => {
      mutation.mutate(user);
    },
    isLoading: isProfessionsLoading,
    professions: professions,
  };
};

export default useUserFormController;
