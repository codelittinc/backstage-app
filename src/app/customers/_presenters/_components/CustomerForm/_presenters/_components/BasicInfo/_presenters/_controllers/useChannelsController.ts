import { CHANNELS_KEY } from "@/app/repositories/_domain/constants";
import { getChannels } from "@/app/repositories/[id]/_presenters/_components/BasicInfo/_presenters/_data/services/channels";
import { useQuery } from "@tanstack/react-query";

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
