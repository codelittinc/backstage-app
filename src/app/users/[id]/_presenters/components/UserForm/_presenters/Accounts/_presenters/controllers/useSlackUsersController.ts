import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAppStore } from "@/app/_presenters/data/store/store";

import { getSlackUsers } from "../data/slackUsers";

const useSlackUsersController = (customer: Customer | undefined) => {
  const { showAlert } = useAppStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["slackUsers", customer?.id],
    queryFn: () => {
      return getSlackUsers(customer!);
    },
    enabled: !!customer?.id,
    retry: false,
  });

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
