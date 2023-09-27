import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getRoadrunnerUrl } from "..";

export const CHANNELS_KEY = "channels";

export interface Channel {
  id: number;
  name: string;
}

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
