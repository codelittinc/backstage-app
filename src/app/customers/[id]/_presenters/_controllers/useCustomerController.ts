import { useAppStore } from "@/app/_presenters/_data/store/store";
import { CUSTOMERS_KEY } from "@/app/customers/_domain/constants";
import {
  getCustomer,
  updateCustomer,
} from "@/app/customers/_presenters/_data/services/customers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useCustomerController = (customerId: number) => {
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: (result: Customer) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [CUSTOMERS_KEY, result.id],
      });
    },
    onError: (err: any) => showSaveErrorAlert(err),
  });

  const { data, isLoading } = useQuery({
    queryKey: [CUSTOMERS_KEY, customerId],
    queryFn: () => getCustomer(session?.user, customerId),
  });

  return {
    onSave: (customer: Customer) => {
      mutation.mutate({ user_session: session?.user, customer });
    },
    customer: data,
    isLoading: isLoading || !data,
  };
};

export default useCustomerController;
