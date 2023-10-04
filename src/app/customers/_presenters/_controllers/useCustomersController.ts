import { useQuery } from "@tanstack/react-query";
import { CUSTOMERS_KEY } from "../../_domain/constants";

const useCustomersController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [CUSTOMERS_KEY],
    queryFn: () => getCustomers(),
  });

  return {
    repositories: data,
    isLoading: isLoading,
  };
};

export default useCustomersController;
