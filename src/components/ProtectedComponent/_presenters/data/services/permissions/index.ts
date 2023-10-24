import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getPermissions = async () => {
  const { data } = await backstageApiClient.get("/permissions.json");
  return data;
};
