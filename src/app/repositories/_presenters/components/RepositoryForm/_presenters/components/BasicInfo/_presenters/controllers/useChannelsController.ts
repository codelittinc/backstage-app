import { CHANNELS_KEY } from "@/app/repositories/_domain/constants";
import { useQuery } from "@tanstack/react-query";
import { getChannels } from "../data/services/channels";

const useChannelsController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [CHANNELS_KEY],
    queryFn: getChannels,
  });

  return {
    channels: data,
    isLoading,
  };
};

export default useChannelsController;
