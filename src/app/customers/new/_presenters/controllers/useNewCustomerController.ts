import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { createCustomer } from "@/app/customers/_presenters/data/services/customers";
import routes from "@/routes";

const useNewCustomerController = () => {
  const router = useRouter();
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: (result: Customer) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Customers, result.id],
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

export default useNewCustomerController;
