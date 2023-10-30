import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { USERS_KEY } from "@/app/_domain/constants";
import User from "@/app/_domain/interfaces/User";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getUser, updateUser } from "@/app/_presenters/data/users";

const useUserFormController = (userId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (result) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [USERS_KEY, result.email],
      });
      queryClient.invalidateQueries({
        queryKey: [USERS_KEY, userId],
      });
    },
  });

  const { data, isLoading: isUserLoading } = useQuery({
    queryKey: [USERS_KEY, userId],
    queryFn: () => getUser(userId),
  });

  const { professions, isLoading: isProfessionsLoading } =
    useProfessionsController();

  return {
    onSave: (user: User) => {
      mutation.mutate(user);
    },
    user: data,
    isLoading: isUserLoading || isProfessionsLoading,
    professions: professions,
  };
};

export default useUserFormController;
