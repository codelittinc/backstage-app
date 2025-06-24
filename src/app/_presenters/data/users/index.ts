import { ApiUser, User } from "@/app/_domain/interfaces/User";

import { fromApiParser, toApiParser } from "./parser";
import { backstageApiClient } from "../auth/backstageApiAxios";

export const getAuthenticatedUser = async (): Promise<User> => {
  const { data } = await backstageApiClient.get("/users/me.json");
  return fromApiParser(data);
};

export const getUser = async (id: number | string): Promise<User> => {
  const { data } = await backstageApiClient.get(`/users/${id}.json`);
  return fromApiParser(data);
};

export const getUsers = async (
  onlyActive = true,
  onlyInternal = false,
  skills = "",
  onlyRehireable = false,
  professionIds: number[] = []
): Promise<User[]> => {
  const { data } = await backstageApiClient.get(`/users.json`, {
    params: {
      only_active: onlyActive,
      only_internal: onlyInternal,
      filter_by_skills: skills,
      only_rehireable: onlyRehireable,
      profession_ids:
        professionIds.length > 0 ? professionIds.join(",") : undefined,
    },
  });
  return data.map(fromApiParser);
};

export const updateUser = async (user: User): Promise<User> => {
  const { data } = await backstageApiClient.put<ApiUser>(
    `/users/${user.id}.json`,
    {
      user: toApiParser(user),
    }
  );

  return fromApiParser(data);
};

export const createUser = async (user: User): Promise<User> => {
  const { data } = await backstageApiClient.post<ApiUser>(`/users.json`, {
    user: toApiParser(user),
  });

  return fromApiParser(data);
};
