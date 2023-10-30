import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppStore } from "@/app/_presenters/data/store/store";
import { CUSTOMERS_KEY } from "@/app/customers/_domain/constants";
import {
  getCustomer,
  updateCustomer,
} from "@/app/customers/_presenters/data/services/customers";

const useCustomerController = (customerId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: (result: Customer) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [CUSTOMERS_KEY, result.id],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [CUSTOMERS_KEY, customerId],
    queryFn: () => getCustomer(customerId),
  });

  return {
    onSave: (customer: Customer) => {
      mutation.mutate(customer);
    },
    customer: data,
    isLoading: isLoading || !data,
  };
};

export default useCustomerController;
