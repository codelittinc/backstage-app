import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getSkills = async () => {
  const { data } = await backstageApiClient.get("/skills.json");

  return data;
};
