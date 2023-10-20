import { useAppStore } from "@/app/_presenters/data/store/store";
import { CUSTOMERS_KEY } from "@/app/customers/_domain/constants";
import {
  getCustomer,
  createCustomer,
} from "@/app/customers/_presenters/data/services/customers";
import routes from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCustomerController = (customerId: number | undefined) => {
  const router = useRouter();
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: (result) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [CUSTOMERS_KEY, result.id],
      });

      router.push(routes.customerPath(result.id!));
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [CUSTOMERS_KEY, customerId],
    queryFn: () => getCustomer(session?.user, customerId),
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
