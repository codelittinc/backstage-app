import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { User } from "@/app/_domain/interfaces/User";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getUser, updateUser } from "@/app/_presenters/data/users";

const useEditUserController = (userId: number | string) => {
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
        queryKey: [tanstackKeys.Users, userId],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Users, userId],
    queryFn: () => getUser(userId),
  });

  return {
    onSave: (user: User) => {
      mutation.mutate(user);
    },
    user: data,
    isLoading,
  };
};

export default useEditUserController;
