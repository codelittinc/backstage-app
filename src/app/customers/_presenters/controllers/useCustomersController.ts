import { useQuery } from "@tanstack/react-query";
import { CUSTOMERS_KEY } from "../../_domain/constants";
import { getCustomers } from "../data/services/customers";
import { useSession } from "next-auth/react";

const useCustomersController = () => {
  const { data: session } = useSession();
  const { user } = session || {};

  const { data, isLoading } = useQuery({
    queryKey: [CUSTOMERS_KEY, user?.email],
    queryFn: () => getCustomers(user),
  });

  return {
    customers: data,
    isLoading: isLoading,
  };
};

export default useCustomersController;
