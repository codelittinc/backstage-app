import axios from "axios";
import { getRoadrunnerUrl } from "../../../../../../../../../../../../api";

export const getChannels = async () => {
  const { data } = await axios.get(getRoadrunnerUrl("/channels.json"));
  return data;
};
