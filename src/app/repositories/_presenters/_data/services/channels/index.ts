import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getRoadrunnerUrl } from "../../../../../../api";
import { CHANNELS_KEY } from "@/app/repositories/_domain/constants";

export const getChannels = async () => {
  const { data } = await axios.get(getRoadrunnerUrl("/channels.json"));
  return data;
};

export function useGetChannels() {
  return useQuery({
    queryKey: [CHANNELS_KEY],
    queryFn: getChannels,
  });
}
