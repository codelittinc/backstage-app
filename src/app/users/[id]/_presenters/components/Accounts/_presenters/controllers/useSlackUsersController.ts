import { useQuery } from "@tanstack/react-query";
import { getSlackUsers } from "../data/slackUsers";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { useEffect } from "react";

const useSlackUsersController = (customer: Customer | undefined) => {
  const { showAlert } = useAppStore();

  const { data, isLoading, isError, isLoadingError } = useQuery({
    queryKey: ["slackUsers", customer?.id],
    queryFn: () => {
      return getSlackUsers(customer!);
    },
    enabled: !!customer?.id,
    retry: false,
  });

  console.log(isError, isLoadingError);
  useEffect(() => {
    if (isError) {
      showAlert({
        title: "Notifications token",
        content: `The notifications token for ${customer?.name} is invalid! Please review it on the customer page.`,
        color: "error",
      });
    }
  }, [isError, customer, showAlert]);

  return {
    slackUsers: data || [],
    isLoading,
  };
};

export default useSlackUsersController;
