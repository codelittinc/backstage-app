import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { CUSTOMERS_KEY } from "../../_domain/constants";
import { getCustomers } from "../data/services/customers";

const useCustomersController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [CUSTOMERS_KEY],
    queryFn: getCustomers,
  });

  return {
    customers: data,
    isLoading: isLoading,
  };
};

export default useCustomersController;
