import { roadrunnerApiClient } from "@/app/_presenters/data/auth/roadrunnerApiAxios";

export const getChannels = async () => {
  const { data } = await roadrunnerApiClient.get("/channels.json");
  return data;
};
