import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useAppStore } from "@/app/_presenters/data/store/store";
import { CUSTOMERS_KEY } from "@/app/customers/_domain/constants";
import { createCustomer } from "@/app/customers/_presenters/data/services/customers";
import routes from "@/routes";


const useCustomerController = () => {
  const router = useRouter();
  const { showSaveSuccessAlert } = useAppStore();
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
  });

  return {
    onSave: (customer: Customer) => {
      mutation.mutate(customer);
    },
  };
};

export default useCustomerController;
