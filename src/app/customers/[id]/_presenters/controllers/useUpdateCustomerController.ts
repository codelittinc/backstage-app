import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { useAppStore } from "@/app/_presenters/data/store/store";
import {
  getCustomer,
  updateCustomer,
} from "@/app/customers/_presenters/data/services/customers";

const useUpdateCustomerController = (customerId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: (result: Customer) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Customers, result.id],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Customers, customerId],
    queryFn: () => getCustomer(customerId),
  });

  return {
    onSave: (customer: Customer) => {
      mutation.mutate(customer);
    },
    customer: data,
    isLoading: isLoading,
  };
};

export default useUpdateCustomerController;
