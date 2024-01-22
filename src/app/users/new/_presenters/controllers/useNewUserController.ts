import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { USERS_KEY } from "@/app/_domain/constants";
import { User } from "@/app/_domain/interfaces/User";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { createUser } from "@/app/_presenters/data/users";
import routes from "@/routes";

const useNewUserController = () => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (result) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [USERS_KEY, result.id],
      });

      router.push(routes.userPath(result.slug));
    },
  });

  return {
    onSave: (user: User) => {
      mutation.mutate(user);
    },
  };
};

export default useNewUserController;
