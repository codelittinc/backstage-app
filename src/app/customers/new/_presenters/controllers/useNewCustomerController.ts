import { useAppStore } from "@/app/_presenters/data/store/store";
import { CUSTOMERS_KEY } from "@/app/customers/_domain/constants";
import { createCustomer } from "@/app/customers/_presenters/data/services/customers";
import routes from "@/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCustomerController = () => {
  const router = useRouter();
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: (result: Customer) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [CUSTOMERS_KEY, result.id],
      });

      router.push(routes.customerPath(result.id!));
    },
    onError: (err: any) => showSaveErrorAlert(err),
  });

  return {
    onSave: (customer: Customer) => {
      mutation.mutate({ user_session: session?.user, customer });
    },
  };
};

export default useCustomerController;
