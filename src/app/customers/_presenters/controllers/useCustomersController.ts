import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getCustomers } from "../data/services/customers";

const useCustomersController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Customers],
    queryFn: getCustomers,
  });

  return {
    customers: data,
    isLoading: isLoading,
  };
};

export default useCustomersController;
