import { CHANNELS_KEY } from "@/app/repositories/_domain/constants";
import { useQuery } from "@tanstack/react-query";
import { getChannels } from "../data/services/channels";
import { useEffect } from "react";
import { useAppStore } from "@/app/_presenters/data/store/store";

const useChannelsController = (customer: Customer) => {
  const { showAlert } = useAppStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: [CHANNELS_KEY, customer?.id],
    queryFn: () => getChannels(customer),
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
