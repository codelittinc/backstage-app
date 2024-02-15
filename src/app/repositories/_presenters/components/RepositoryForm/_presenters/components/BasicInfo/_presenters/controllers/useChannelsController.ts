import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { useAppStore } from "@/app/_presenters/data/store/store";

import { getChannels } from "../data/services/channels";

const useChannelsController = (customer: Customer | undefined | null) => {
  const { showAlert } = useAppStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: [tanstackKeys.Channels, customer?.id],
    queryFn: () => getChannels(customer!),
    enabled: !!customer,
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
    channels: data,
    isLoading,
  };
};

export default useChannelsController;
